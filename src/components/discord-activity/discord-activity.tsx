import React, { useEffect, useState } from "react";

const DISCORD_USER_ID = "1437013692440121414";

type LanyardData = {
  discord_status: string;
  activities: any[];
  spotify?: {
    song: string;
    artist: string;
    album_art_url: string;
  };
  kv?: Record<string, string>;
};

export default function DiscordActivity() {
  const [data, setData] = useState<LanyardData | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("wss://api.lanyard.rest/socket");

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          op: 2,
          d: { subscribe_to_id: DISCORD_USER_ID },
        })
      );
      setConnected(true);
    };

    ws.onmessage = (event) => {
      const { t, d } = JSON.parse(event.data);
      if (t === "INIT_STATE" || t === "PRESENCE_UPDATE") {
        setData(d);
      }
    };

    ws.onerror = () => {
      setConnected(false);
    };

    return () => ws.close();
  }, []);

  const statusColors: Record<string, string> = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-gray-500",
  };

  const currentActivity = data?.activities.find((act) => act.type === 0);
  const avatarHash = data?.kv?.avatar || "default_avatar_hash";

  return (
    <div className="relative w-full p-6 bg-white/10 dark:bg-black/20 border border-white/10 dark:border-black/10 rounded-xl shadow-lg backdrop-blur-md overflow-hidden">
      {/* Grain Overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMSAwIDAgMCAwIDEgMCAwIDAgMCAxIDAgMCAwIDAuNSAwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')",
        }}
      ></div>

      <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-theme-foreground dark:text-white">
        Current Activity
      </h3>

      {/* Main content */}
      {!connected ? (
        <p className="text-gray-400">Connecting to Discord...</p>
      ) : !data ? (
        <p className="text-gray-400">Discord not linked or no activity detected.</p>
      ) : (
        <>
          {/* User Info */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <img
                src={`https://cdn.discordapp.com/avatars/${DISCORD_USER_ID}/${avatarHash}.png?size=256`}
                className="w-16 h-16 rounded-full"
                alt="Discord Avatar"
              />
              <span
                className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white dark:border-black ${
                  statusColors[data.discord_status]
                }`}
              ></span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">My Discord Presence</h2>
              <p className="text-sm text-gray-300 capitalize">
                Status: {data.discord_status}
              </p>
            </div>
          </div>

          {/* Custom Status */}
          {data.activities.some((a) => a.type === 4) && (
            <div className="mb-3 text-gray-200">
              {data.activities.find((a) => a.type === 4)?.state}
            </div>
          )}

          {/* Current Activity */}
          {currentActivity && (
            <div className="mb-3">
              <h3 className="text-md font-semibold text-white">Playing</h3>
              <p className="text-gray-200">{currentActivity.name}</p>
            </div>
          )}

          {/* Spotify */}
          {data.spotify && (
            <div className="mt-3 p-3 rounded-lg bg-green-900/20 border border-green-700">
              <h3 className="font-semibold text-green-400">Listening on Spotify</h3>
              <div className="flex gap-3 mt-2">
                <img
                  src={data.spotify.album_art_url}
                  className="w-14 h-14 rounded-md"
                  alt="Album Art"
                />
                <div>
                  <p className="font-medium text-white">{data.spotify.song}</p>
                  <p className="text-gray-300 text-sm">{data.spotify.artist}</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Glow Effect */}
      <div className="absolute inset-0 animate-pulse-slow pointer-events-none rounded-xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 opacity-20"></div>

      <style>
        {`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.02); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite ease-in-out;
        }
      `}
      </style>
    </div>
  );
}
