"use client";

import React, { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import { useParams } from "next/navigation";
import PlayerMonitor from "@/components/PlayerMonitor";
import { FaCircle } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

interface BannerData {
  Featured_One: string;
  Featured_Two: string;
  Featured_Three: string;
}

interface PlayerData {
  _id?: string;
  license: string;
  status: string;
  username: string;
  world: string;
  level: string;
  gems: string;
  golds: string;
  holidaystars: string;
  Banner: BannerData;
  updated_at: string;
  lastestUpdate: string;
}

export default function UsersPage() {
  const params = useParams();
  const username = params?.username || "";
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("All");

  const fetchData = useCallback(async () => {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/players_data?username=${username}`;
      const response = await fetch(endpoint);
      const result = await response.json();

      if (result.success) {
        setPlayer(result.data[0]); // Set single player
      } else {
        throw new Error(result.error || "Data fetch error");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data");
    }
  }, [username]);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.error("API URL is missing xxxxxxx");
      return;
    }

    fetchData();

    const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);

    socket.on("connect", () => {
      console.log("Connected to WebSocket:", socket.id);
    });

    socket.on("updateData", (data: PlayerData[]) => {
      const updatedPlayer = data.find((player) => player.username === username);
      if (updatedPlayer) setPlayer(updatedPlayer);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
    });

    return () => {
      socket.disconnect();
    };
  }, [username, fetchData]);

  return (
    <div className="min-h-screen bg-[#0B0B13] text-white">
      <div className="container mx-auto py-4 px-4 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">ติดตามสถานะ</h1>
        <div className="flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Search username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[180px] text-white"
          />

          <Select
            value={filterType}
            onValueChange={(value) => setFilterType(value)}
          >
            <SelectTrigger className="w-[180px] text-white">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter</SelectLabel>
                <SelectItem value="All">
                  <div className="flex items-center">
                    <BiWorld className="mr-2 h-4 w-4" />
                    All
                  </div>
                </SelectItem>
                <SelectItem value="Online">
                  <div className="flex items-center">
                    <FaCircle className="mr-2 h-3 w-3 text-green-500" />
                    Online
                  </div>
                </SelectItem>
                <SelectItem value="Offline">
                  <div className="flex items-center">
                    <FaCircle className="mr-2 h-3 w-3 text-red-400" />
                    Offline
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {player ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <PlayerMonitor
              id={player._id || ""}
              license={player.license}
              status={player.status}
              username={player.username}
              level={player.level}
              world={player.world}
              gems={player.gems}
              golds={player.golds}
              holidaystars={player.holidaystars}
              updated_at={player.updated_at}
              lastestUpdate={player.lastestUpdate}
              Banner={player.Banner}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-3xl font-bold mb-2">404</h2>
            <p className="text-gray-300">Player not found</p>
          </div>
        )}
      </div>
    </div>
  );
}