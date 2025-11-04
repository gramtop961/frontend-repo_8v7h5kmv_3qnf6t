import { useState, useRef } from 'react';
import { Paperclip, Send, Smile } from 'lucide-react';

export default function MessageInput({ onSend, disabled }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  const handleSend = () => {
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue('');
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-zinc-800 p-3 bg-zinc-900/60">
      <div className="rounded-xl border border-zinc-700 bg-zinc-900/70 focus-within:ring-2 focus-within:ring-violet-600">
        <div className="px-2 pt-2">
          <textarea
            ref={textareaRef}
            rows={2}
            value={value}
            disabled={disabled}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message #general"
            className="w-full resize-none bg-transparent outline-none text-zinc-100 placeholder:text-zinc-500 text-sm px-2 py-1"
          />
        </div>
        <div className="flex items-center justify-between px-2 pb-2">
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-md hover:bg-zinc-800 text-zinc-300" title="Add attachment">
              <Paperclip className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-md hover:bg-zinc-800 text-zinc-300" title="Insert emoji">
              <Smile className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!value.trim() || disabled}
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-3 py-1.5 rounded-lg"
          >
            <Send className="h-4 w-4" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
