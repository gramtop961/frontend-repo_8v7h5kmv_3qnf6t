import { useEffect, useRef } from 'react';

function Message({ message }) {
  const initials = message.user
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="flex items-start gap-3 px-4 py-3 hover:bg-zinc-800/40">
      <div className="h-9 w-9 rounded bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-xs font-semibold text-white">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <div className="font-medium text-zinc-100 truncate">{message.user}</div>
          <div className="text-xs text-zinc-400">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
        <div className="text-zinc-200 leading-relaxed whitespace-pre-wrap break-words">{message.text}</div>
        {message.attachments?.length ? (
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {message.attachments.map((att, idx) => (
              <div key={idx} className="aspect-video bg-zinc-800/60 border border-zinc-700 rounded-md" />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function MessageList({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="py-2">
        {messages.map((m) => (
          <Message key={m.id} message={m} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
