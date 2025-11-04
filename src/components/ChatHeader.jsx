import { Hash, MoreVertical, Search, Users, Pin, Bell } from 'lucide-react';

export default function ChatHeader({ context }) {
  const isChannel = context?.type === 'channel';

  return (
    <header className="h-14 border-b border-zinc-200/10 bg-zinc-900/40 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/60 flex items-center px-4">
      <div className="flex items-center gap-2 min-w-0">
        {isChannel ? <Hash className="h-5 w-5 text-zinc-300" /> : null}
        <h1 className="font-semibold text-zinc-100 truncate">
          {isChannel ? context?.name : context?.name || 'Direct Message'}
        </h1>
        {isChannel ? (
          <span className="ml-3 text-xs text-zinc-400 hidden sm:inline">Channel</span>
        ) : (
          <span className="ml-3 text-xs text-zinc-400 hidden sm:inline">DM</span>
        )}
      </div>
      <div className="ml-auto flex items-center gap-2 text-zinc-300">
        <button className="hidden md:inline-flex items-center gap-2 text-sm px-2 py-1 rounded hover:bg-zinc-800/70">
          <Users className="h-4 w-4" />
          <span className="hidden lg:inline">Members</span>
        </button>
        <button className="hidden md:inline-flex items-center gap-2 text-sm px-2 py-1 rounded hover:bg-zinc-800/70">
          <Pin className="h-4 w-4" />
          <span className="hidden lg:inline">Pins</span>
        </button>
        <button className="inline-flex items-center gap-2 text-sm px-2 py-1 rounded hover:bg-zinc-800/70">
          <Bell className="h-4 w-4" />
        </button>
        <div className="relative hidden md:block">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            placeholder="Search in conversation"
            className="pl-8 pr-2 py-1.5 rounded-md bg-zinc-800/70 border border-zinc-700 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-600"
          />
        </div>
        <button className="p-2 rounded hover:bg-zinc-800/70">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
