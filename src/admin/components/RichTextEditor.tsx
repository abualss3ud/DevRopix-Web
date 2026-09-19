import React, { useState } from 'react';
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Table,
  Eye,
  Edit3,
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  rows?: number;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  label,
  placeholder = 'Write content here (Markdown & structured text supported)...',
  rows = 10,
}) => {
  const [isPreview, setIsPreview] = useState(false);

  const applyFormatting = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('rich-textarea-editor') as HTMLTextAreaElement;
    if (!textarea) {
      onChange(value + prefix + suffix);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || 'text';
    const replacement = prefix + selectedText + suffix;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 50);
  };

  const renderSimplePreview = (markdown: string) => {
    if (!markdown.trim()) {
      return <p className="text-xs text-[#a1a1aa] italic">No content to preview.</p>;
    }

    const lines = markdown.split('\n');
    return (
      <div className="space-y-3 text-xs text-[#27272a] leading-relaxed">
        {lines.map((line, idx) => {
          if (line.startsWith('### ')) {
            return <h3 key={idx} className="text-sm font-bold text-[#0B1220] pt-2">{line.replace('### ', '')}</h3>;
          }
          if (line.startsWith('## ')) {
            return <h2 key={idx} className="text-base font-bold text-[#0B1220] pt-3">{line.replace('## ', '')}</h2>;
          }
          if (line.startsWith('# ')) {
            return <h1 key={idx} className="text-lg font-bold text-[#0B1220] pt-4">{line.replace('# ', '')}</h1>;
          }
          if (line.startsWith('> ')) {
            return (
              <blockquote key={idx} className="border-l-4 border-[#6a5ed9] pl-3 py-1 italic bg-[#f4f4f5] rounded-r text-[#52525b]">
                {line.replace('> ', '')}
              </blockquote>
            );
          }
          if (line.startsWith('- ') || line.startsWith('* ')) {
            return (
              <li key={idx} className="list-disc ml-5 text-[#3f3f46]">
                {line.substring(2)}
              </li>
            );
          }
          if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
            return (
              <li key={idx} className="list-decimal ml-5 text-[#3f3f46]">
                {line.substring(3)}
              </li>
            );
          }
          if (line.startsWith('```')) {
            return (
              <pre key={idx} className="p-3 bg-[#18181b] text-emerald-400 rounded-lg font-mono text-[11px] overflow-x-auto">
                {line.replace(/```/g, '') || '// code block'}
              </pre>
            );
          }
          if (!line.trim()) {
            return <div key={idx} className="h-2" />;
          }
          return <p key={idx}>{line}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="space-y-1.5 text-start">
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-[#27272a]">{label}</label>
          <div className="flex items-center gap-1 bg-[#f4f4f5] p-0.5 rounded-lg border border-[#e4e4e7]">
            <button
              type="button"
              onClick={() => setIsPreview(false)}
              className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors flex items-center gap-1 cursor-pointer ${
                !isPreview ? 'bg-white text-[#27272a] shadow-xs' : 'text-[#71717a] hover:text-[#27272a]'
              }`}
            >
              <Edit3 className="w-3 h-3" />
              <span>Write</span>
            </button>
            <button
              type="button"
              onClick={() => setIsPreview(true)}
              className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors flex items-center gap-1 cursor-pointer ${
                isPreview ? 'bg-white text-[#27272a] shadow-xs' : 'text-[#71717a] hover:text-[#27272a]'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-[#e4e4e7] bg-white overflow-hidden focus-within:border-[#6a5ed9] focus-within:ring-1 focus-within:ring-[#6a5ed9] transition-all">
        {/* Toolbar */}
        {!isPreview && (
          <div className="flex items-center flex-wrap gap-1 p-2 bg-[#fafafa] border-b border-[#e4e4e7]">
            <button
              type="button"
              onClick={() => applyFormatting('**', '**')}
              className="p-1.5 rounded text-[#52525b] hover:bg-[#e4e4e7] hover:text-[#27272a] transition-colors cursor-pointer"
              title="Bold (**text**)"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => applyFormatting('*', '*')}
              className="p-1.5 rounded text-[#52525b] hover:bg-[#e4e4e7] hover:text-[#27272a] transition-colors cursor-pointer"
              title="Italic (*text*)"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <div className="h-4 w-[1px] bg-[#e4e4e7] mx-1" />
            <button
              type="button"
              onClick={() => applyFormatting('# ')}
              className="p-1.5 rounded text-[#52525b] hover:bg-[#e4e4e7] hover:text-[#27272a] transition-colors cursor-pointer"
              title="Heading 1"
            >
              <Heading1 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => applyFormatting('## ')}
              className="p-1.5 rounded text-[#52525b] hover:bg-[#e4e4e7] hover:text-[#27272a] transition-colors cursor-pointer"
              title="Heading 2"
            >
              <Heading2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => applyFormatting('### ')}
              className="p-1.5 rounded text-[#52525b] hover:bg-[#e4e4e7] hover:text-[#27272a] transition-colors cursor-pointer"
              title="Heading 3"
            >
              <Heading3 className="w-3.5 h-3.5" />
            </button>
            <div className="h-4 w-[1px] bg-[#e4e4e7] mx-1" />
            <button
              type="button"
              onClick={() => applyFormatting('- ')}
              className="p-1.5 rounded text-[#52525b] hover:bg-[#e4e4e7] hover:text-[#27272a] transition-colors cursor-pointer"
              title="Bullet List"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => applyFormatting('1. ')}
              className="p-1.5 rounded text-[#52525b] hover:bg-[#e4e4e7] hover:text-[#27272a] transition-colors cursor-pointer"
              title="Numbered List"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => applyFormatting('> ')}
              className="p-1.5 rounded text-[#52525b] hover:bg-[#e4e4e7] hover:text-[#27272a] transition-colors cursor-pointer"
              title="Quote"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => applyFormatting('```\n', '\n```')}
              className="p-1.5 rounded text-[#52525b] hover:bg-[#e4e4e7] hover:text-[#27272a] transition-colors cursor-pointer"
              title="Code Block"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => applyFormatting('[', '](https://example.com)')}
              className="p-1.5 rounded text-[#52525b] hover:bg-[#e4e4e7] hover:text-[#27272a] transition-colors cursor-pointer"
              title="Insert Link"
            >
              <Link className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => applyFormatting('\n| Header 1 | Header 2 |\n| --- | --- |\n| Cell 1 | Cell 2 |\n')}
              className="p-1.5 rounded text-[#52525b] hover:bg-[#e4e4e7] hover:text-[#27272a] transition-colors cursor-pointer"
              title="Table"
            >
              <Table className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Content Area */}
        {isPreview ? (
          <div className="p-4 bg-white min-h-[220px] max-h-[400px] overflow-y-auto">
            {renderSimplePreview(value)}
          </div>
        ) : (
          <textarea
            id="rich-textarea-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            placeholder={placeholder}
            className="w-full p-3.5 text-xs text-[#27272a] focus:outline-none font-mono resize-y"
          />
        )}
      </div>
    </div>
  );
};
