import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { pdfGenerationSchema } from "@shared/schema";
import { z } from "zod";
import puppeteer from "puppeteer";
import { marked } from "marked";

export async function registerRoutes(app: Express): Promise<Server> {
  // PDF generation endpoint
  app.post("/api/generate-pdf", async (req, res) => {
    try {
      const validatedData = pdfGenerationSchema.parse(req.body);

      // Convert markdown to HTML
      const htmlContent = marked(validatedData.markdown);

      // Create full HTML document with GitHub-style CSS
      const fullHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Markdown Document</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500;600&family=Noto+Sans:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@300;400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap');
            
            body {
              font-family: 'Inter', 'Noto Sans', 'Noto Sans SC', 'Noto Sans JP', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Microsoft YaHei', 'SimSun', 'Arial Unicode MS', sans-serif;
              line-height: 1.6;
              color: #24292e;
              max-width: 800px;
              margin: 0 auto;
              padding: 2rem;
              background: white;
            }
            
            h1, h2, h3, h4, h5, h6 {
              margin-top: 2rem;
              margin-bottom: 1rem;
              font-weight: 600;
              line-height: 1.25;
              color: #1a202c;
            }
            
            h1 { font-size: 2rem; border-bottom: 1px solid #e1e4e8; padding-bottom: 0.5rem; }
            h2 { font-size: 1.5rem; border-bottom: 1px solid #e1e4e8; padding-bottom: 0.3rem; }
            h3 { font-size: 1.25rem; }
            h4 { font-size: 1rem; }
            
            p { margin-bottom: 1rem; }
            
            ul, ol {
              margin-bottom: 1rem;
              padding-left: 2rem;
            }
            
            li { margin-bottom: 0.25rem; }
            
            code {
              background: #f6f8fa;
              padding: 0.125rem 0.25rem;
              border-radius: 3px;
              font-family: 'Fira Code', 'Noto Sans Mono', Consolas, Monaco, 'Courier New', 'Microsoft YaHei', 'SimSun', monospace;
              font-size: 0.875em;
            }
            
            pre {
              background: #f6f8fa;
              padding: 1rem;
              border-radius: 6px;
              overflow-x: auto;
              margin: 1rem 0;
              border: 1px solid #e1e4e8;
            }
            
            pre code {
              background: none;
              padding: 0;
              font-size: 0.875rem;
              font-family: 'Fira Code', 'Noto Sans Mono', Consolas, Monaco, 'Courier New', 'Microsoft YaHei', 'SimSun', monospace;
            }
            
            blockquote {
              border-left: 4px solid #dfe2e5;
              margin: 1rem 0;
              padding: 0.5rem 1rem;
              background: #f6f8fa;
              color: #6a737d;
            }
            
            table {
              border-collapse: collapse;
              width: 100%;
              margin: 1rem 0;
            }
            
            th, td {
              border: 1px solid #e1e4e8;
              padding: 0.5rem;
              text-align: left;
            }
            
            th {
              background: #f6f8fa;
              font-weight: 600;
            }
            
            a {
              color: #0366d6;
              text-decoration: none;
            }
            
            a:hover {
              text-decoration: underline;
            }
            
            img {
              max-width: 100%;
              height: auto;
            }
            
            hr {
              border: none;
              border-top: 1px solid #e1e4e8;
              margin: 2rem 0;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
        </html>
      `;

      // Launch puppeteer and generate PDF
      const browser = await puppeteer.launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--no-first-run",
          "--no-zygote",
          "--single-process",
          "--disable-gpu",
          "--disable-background-timer-throttling",
          "--disable-backgrounding-occluded-windows",
          "--disable-renderer-backgrounding",
        ],
      });

      const page = await browser.newPage();
      await page.setContent(fullHtml, { waitUntil: "networkidle0" });

      // Wait for fonts to load
      await page.evaluateHandle("document.fonts.ready");

      const pdfBuffer = await page.pdf({
        format: "A4",
        margin: {
          top: "0.5in",
          right: "0.75in",
          bottom: "0.5in",
          left: "0.75in",
        },
        printBackground: true,
      });

      await browser.close();

      // Set response headers for PDF download
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${validatedData.filename}"`,
      );
      res.setHeader("Content-Length", pdfBuffer.length.toString());

      res.end(pdfBuffer);
    } catch (error) {
      console.error("PDF generation error:", error);

      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid request data",
          errors: error.errors,
        });
      }

      res.status(500).json({
        message: "Failed to generate PDF",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
