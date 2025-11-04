import { useState } from 'react';
import { Hash, MessageSquare, Plus, Search, Bell, User, Settings, LogOut, ChevronDown } from 'lucide-react';

const channelsSeed = [
  { id: 'general', name: 'general', type: 'channel' },
  { id: 'announcements', name: 'announcements', type: 'channel' },
  { id: 'random', name: 'random', type: 'channel' },
];

const dmsSeed = [
  { id: 'u-alex', name: 'Alex Johnson', type: 'dm' },
  { id: 'u-sam', name: 'Sam Lee', type: 'dm' },
  { id: 'u-taylor', name: 'Taylor Kim', type: 'dm' },
];

export default function Sidebar({ selected, onSelect }) {
  const [query, setQuery] = useState('');

  const filteredChannels = channelsSeed.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
  const filteredDMs = dmsSeed.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <aside className="h-full w-72 bg-zinc-900 text-zinc-100 flex flex-col border-r border-zinc-800">
      {/* Workspace header */}
      <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded bg-violet-600 flex items-center justify-center text-sm font-bold">V</div>
          <div>
            <div className="font-semibold leading-tight">Vibe Workspace</div>
            <div className="text-xs text-zinc-400 -mt-0.5 flex items-center gap-1">
              All channels <ChevronDown className="h-3 w-3" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-zinc-400">
          <Bell className="h-5 w-5 hover:text-zinc-100 transition-colors" />
          <Settings className="h-5 w-5 hover:text-zinc-100 transition-colors" />
        </div>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search channels, people"
            className="w-full pl-9 pr-3 py-2 rounded-md bg-zinc-800/60 border border-zinc-700 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-600"
          />
        </div>
      </div>

      {/* Channels */}
      <div className="px-3 pb-2">
        <div className="flex items-center justify-between text-xs uppercase tracking-wide text-zinc-400 px-1">
          <span>Channels</span>
          <button className="p-1 rounded hover:bg-zinc-800" title="Create channel">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <nav className="mt-2 space-y-1">
          {filteredChannels.map((ch) => (
            <button
              key={ch.id}
              onClick={() => onSelect(ch)}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm hover:bg-zinc-800 transition-colors ${
                selected?.id === ch.id ? 'bg-zinc-800 text-white' : 'text-zinc-300'
              }`}
            >
              <Hash className="h-4 w-4" />
              <span className="truncate">{ch.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Direct Messages */}
      <div className="px-3 pb-2">
        <div className="flex items-center justify-between text-xs uppercase tracking-wide text-zinc-400 px-1">
          <span>Direct messages</span>
          <button className="p-1 rounded hover:bg-zinc-800" title="New message">
            <MessageSquare className="h-4 w-4" />
          </button>
        </div>
        <nav className="mt-2 space-y-1">
          {filteredDMs.map((dm) => (
            <button
              key={dm.id}
              onClick={() => onSelect(dm)}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm hover:bg-zinc-800 transition-colors ${
                selected?.id === dm.id ? 'bg-zinc-800 text-white' : 'text-zinc-300'
              }`}
            >
              <div className="h-5 w-5 rounded-full bg-emerald-600 inline-flex items-center justify-center text-[10px] font-semibold">
                {dm.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <span className="truncate">{dm.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Profile */}
      <div className="mt-auto p-3 border-t border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center font-semibold">U</div>
          <div className="flex-1">
            <div className="text-sm font-medium">You</div>
            <div className="text-xs text-zinc-400">Active</div>
          </div>
          <button className="p-2 rounded hover:bg-zinc-800" title="Profile">
            <User className="h-5 w-5 text-zinc-300" />
          </button>
          <button className="p-2 rounded hover:bg-zinc-800" title="Sign out">
            <LogOut className="h-5 w-5 text-zinc-300" />
          </button>
        </div>
      </div>
    </aside>
  );
}
