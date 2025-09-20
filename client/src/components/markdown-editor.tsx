import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bold, 
  Italic, 
  Code, 
  Link, 
  Image, 
  List
} from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function MarkdownEditor({ value, onChange, className }: MarkdownEditorProps) {
  const [characterCount, setCharacterCount] = useState(value.length);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setCharacterCount(newValue.length);
  }, [onChange]);

  const insertMarkdown = useCallback((syntax: string, placeholder = "") => {
    // For this implementation, we'll keep it simple
    // In a full implementation, you'd handle cursor position and selection
    const newValue = value + syntax.replace("PLACEHOLDER", placeholder);
    onChange(newValue);
    setCharacterCount(newValue.length);
  }, [value, onChange]);

  const toolbarButtons = [
    { icon: Bold, title: "Bold", syntax: "**PLACEHOLDER**" },
    { icon: Italic, title: "Italic", syntax: "*PLACEHOLDER*" },
    { icon: Code, title: "Code", syntax: "`PLACEHOLDER`" },
    { icon: Link, title: "Link", syntax: "[PLACEHOLDER](url)" },
    { icon: Image, title: "Image", syntax: "![alt](PLACEHOLDER)" },
    { icon: List, title: "List", syntax: "\n- PLACEHOLDER" },
  ];

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Markdown Editor</span>
          <div className="flex items-center space-x-1 ml-4">
            {toolbarButtons.map((button, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="p-1.5 h-auto toolbar-button"
                title={button.title}
                onClick={() => insertMarkdown(button.syntax, button.title.toLowerCase())}
                data-testid={`toolbar-${button.title.toLowerCase()}`}
              >
                <button.icon className="h-3 w-3" />
              </Button>
            ))}
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          <span data-testid="character-count">{characterCount.toLocaleString()}</span> characters
        </div>
      </div>
      
      {/* Editor Content */}
      <div className="flex-1 relative">
        <Textarea
          className="markdown-editor w-full h-full p-4 bg-background text-foreground text-sm leading-6 font-mono placeholder:text-muted-foreground border-0 resize-none focus-visible:ring-0"
          placeholder="Start typing your Markdown here..."
          value={value}
          onChange={handleChange}
          data-testid="markdown-input"
        />
      </div>
    </div>
  );
}
