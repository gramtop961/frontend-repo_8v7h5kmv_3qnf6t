import { useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';

const seedMessages = {
  general: [
    { id: 'm1', user: 'Alex Johnson', text: 'Welcome to the general channel! 🎉', timestamp: Date.now() - 1000 * 60 * 60 },
    { id: 'm2', user: 'Sam Lee', text: 'Feel free to share updates and plan together here.', timestamp: Date.now() - 1000 * 60 * 45 },
    { id: 'm3', user: 'Taylor Kim', text: 'Launching the new feature this week. Any blockers?', timestamp: Date.now() - 1000 * 60 * 12 },
  ],
  announcements: [
    { id: 'm4', user: 'System', text: 'Town hall at 3 PM. Check your calendars!', timestamp: Date.now() - 1000 * 60 * 20 },
  ],
  random: [
    { id: 'm5', user: 'Alex Johnson', text: 'Drop your best memes here 😄', timestamp: Date.now() - 1000 * 60 * 5 },
  ],
  'u-alex': [
    { id: 'm6', user: 'Alex Johnson', text: 'Hey! Let’s sync later today?', timestamp: Date.now() - 1000 * 60 * 55 },
  ],
};

export default function App() {
  const [current, setCurrent] = useState({ id: 'general', name: 'general', type: 'channel' });
  const [messagesByThread, setMessagesByThread] = useState(seedMessages);

  const messages = useMemo(() => messagesByThread[current.id] || [], [messagesByThread, current.id]);

  const handleSelect = (ctx) => {
    setCurrent(ctx);
  };

  const handleSend = (text) => {
    setMessagesByThread((prev) => {
      const next = { ...prev };
      const list = next[current.id] ? [...next[current.id]] : [];
      list.push({ id: `${current.id}-${Date.now()}`, user: 'You', text, timestamp: Date.now() });
      next[current.id] = list;
      return next;
    });
  };

  return (
    <div className="h-screen w-screen bg-zinc-950 text-zinc-50 flex">
      <Sidebar selected={current} onSelect={handleSelect} />

      <main className="flex-1 flex flex-col min-w-0">
        <ChatHeader context={current} />
        <MessageList messages={messages} />
        <MessageInput onSend={handleSend} />
      </main>
    </div>
  );
}
