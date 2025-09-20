import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { MarkdownEditor } from "@/components/markdown-editor";
import { MarkdownPreview } from "@/components/markdown-preview";
import { ResizablePanes } from "@/components/resizable-panes";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Download, FileText, Loader2 } from "lucide-react";

const DEFAULT_MARKDOWN = `# Welcome to Markdown to PDF Converter

This is a **powerful** and *easy-to-use* tool for converting your Markdown documents to beautifully formatted PDF files.

## Features

- ✅ Real-time live preview
- ✅ Syntax highlighting
- ✅ Professional PDF output
- ✅ Responsive design
- ✅ GitHub-inspired interface
- ✅ Unicode and CJK font support

## International Text Support

- **English**: Hello World!
- **中文**: 你好世界！欢迎使用
- **日本語**: こんにちは世界！
- **한국어**: 안녕하세요 세계!

## Code Example

\`\`\`javascript
function convertToPDF(markdown) {
    // Convert markdown to PDF
    return generatePDF(markdown);
}
\`\`\`

## Formatting Options

You can use all standard Markdown features:

### Lists
- Unordered lists
- **Bold text**
- *Italic text*
- \`Inline code\`

### Tables

| Feature | Status |
|---------|--------|
| Live Preview | ✅ Ready |
| PDF Export | ✅ Ready |
| Responsive | ✅ Ready |

### Blockquotes

> This is a blockquote. You can use it to highlight important information or quotes.

---

Start editing to see your changes in real-time!`;

export default function Home() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const { toast } = useToast();

  const generatePDFMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await apiRequest('POST', '/api/generate-pdf', {
        markdown: content,
        filename: 'document.pdf'
      });
      return response;
    },
    onSuccess: async (response) => {
      // Create blob from response
      const blob = await response.blob();
      
      // Create download URL
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "PDF Generated Successfully",
        description: "Your PDF has been downloaded.",
      });
    },
    onError: (error) => {
      console.error('PDF generation failed:', error);
      toast({
        title: "PDF Generation Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDownloadPDF = () => {
    if (!markdown.trim()) {
      toast({
        title: "No Content",
        description: "Please add some Markdown content before generating a PDF.",
        variant: "destructive",
      });
      return;
    }
    
    generatePDFMutation.mutate(markdown);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold" data-testid="app-title">
                Markdown to PDF
              </h1>
            </div>
            <div className="hidden md:block text-sm text-muted-foreground">
              Convert your Markdown to beautiful PDFs
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleDownloadPDF}
              disabled={generatePDFMutation.isPending}
              className="flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
              data-testid="download-pdf-button"
            >
              {generatePDFMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              <span>{generatePDFMutation.isPending ? "Generating..." : "Download PDF"}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <ResizablePanes
          leftPane={
            <MarkdownEditor
              value={markdown}
              onChange={setMarkdown}
            />
          }
          rightPane={
            <MarkdownPreview content={markdown} />
          }
        />
      </main>
    </div>
  );
}
