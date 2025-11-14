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

  useEffect(() => {
    const ws = new WebSocket("wss://api.lanyard.rest/socket");

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          op: 2,
          d: { subscribe_to_id: DISCORD_USER_ID },
        })
      );
    };

    ws.onmessage = (event) => {
      const { t, d } = JSON.parse(event.data);
      if (t === "INIT_STATE" || t === "PRESENCE_UPDATE") {
        setData(d);
      }
    };

    return () => ws.close();
  }, []);

  if (!data) {
    return <p className="text-gray-400">Loading Discord activity...</p>;
  }

  const statusColors: Record<string, string> = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-gray-500",
  };

  const currentActivity = data.activities.find((act) => act.type === 0);

  const avatarHash = data.kv?.avatar || "default_avatar_hash";

  return (
    <div className="w-full p-4 bg-white/10 dark:bg-black/20 border border-white/10 dark:border-black/10 rounded-xl shadow-lg backdrop-blur-md">
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
    </div>
  );
}
