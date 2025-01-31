"use client";

import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
interface BannerData {
  Featured_One: string;
  Featured_Two: string;
  Featured_Three: string;
}

interface PlayerMonitorProps {
  id: string;
  license: string;
  username: string;
  status: string;
  world: string;
  level: string;
  gems: string;
  golds: string;
  holidaystars: string;
  Banner: BannerData;
  lastestUpdate: string;
  updated_at: string;
}

const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const PlayerMonitor: React.FC<PlayerMonitorProps> = ({
  username,
  status,
  world,
  level,
  gems,
  golds,
  holidaystars,
  updated_at,
}) => {
  // const [open, setOpen] = useState(false);
  // const [confirmDialog, setConfirmDialog] = useState(false);

  // const current = 100000; // ค่าปัจจุบัน
  // const max = 100000;  // ค่าเป้าหมาย

  // const isComplete = current >= max; // ตรวจสอบว่าค่าปัจจุบันถึงเป้าหมายหรือไม่
  
  return (
    <div className="bg-gray-800/50 rounded-lg p-2 border-2 border-gray-800 cursor-pointer hover:border-gray-600 transition">
      <div className="flex justify-between items-center mb-4">
        <div className="text-white text-sm">
          <span className="font-medium">{username}</span>
        </div>
        <span
          className={`px-2 py-1 rounded text-xs ${
            status === "Online"
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          • {status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-1">
        <div className="flex flex-col justify-center items-center bg-blue-500/20 text-blue-400 text-xs p-2 rounded h-full">
          <div className="flex items-center gap-1 text-sm mb-1">
            <Image
              src="/images/aa_assets/Gems.webp"
              alt="Gems"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
          <div className="font-medium text-md">{gems}</div>
        </div>
        <div className="flex flex-col justify-center items-center bg-yellow-500/20 text-yellow-400 text-xs p-2 rounded h-full">
          <div className="flex items-center gap-1 text-sm mb-1">
            <Image
              src="/images/aa_assets/gold.webp"
              alt="Gold"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
          <div className="font-medium text-md">{golds}</div>
        </div>
        <div className="flex flex-col justify-center items-center bg-cyan-500/20 text-cyan-400 text-xs p-2 rounded h-full">
          <div className="flex items-center gap-1 text-sm mb-1">
            <Image
              src="/images/aa_assets/Stars.webp"
              alt="Holiday Stars"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
          <div className="font-medium text-md">{holidaystars}</div>
        </div>
      </div>

      <div className="space-y-2 text-sm pt-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Level</span>
          <span className="text-white">{level}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">In Place</span>
          <span className="text-white">{world}</span>
        </div>
        {/* <div className="flex justify-between">
          <span className="text-gray-400">Farming</span>
          <span className={isComplete ? "text-emerald-500" : "text-white"}>
            {current.toLocaleString()}/{max.toLocaleString()}
          </span>
        </div> */}
      </div>

      <span className="text-gray-400 text-xs text-center block mt-1">
        Last updated: {updated_at ? formatTime(updated_at) : "N/A"}
      </span>

    </div>
  );
};

export default PlayerMonitor;
