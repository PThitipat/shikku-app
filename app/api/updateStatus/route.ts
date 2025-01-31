import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";
import { ResultSetHeader } from "mysql2";

declare global {
  let io: unknown; // Declare the global.io type with a more specific unknown type
}

export async function POST() {
  try {
    const query = `
      UPDATE players
      SET status = 'Offline'
      WHERE updated_at < NOW() - INTERVAL 5 MINUTE AND status = 'Online'
    `;

    console.log("Executing query:", query);

    const [result] = await (mysqlPool.promise().query(query) as Promise<[ResultSetHeader]>);

    console.log("Affected Rows:", result.affectedRows);

    const [updatedPlayers] = await mysqlPool.promise().query("SELECT * FROM players");

    console.log("Updated Players Data:", updatedPlayers);

    if (global.io) {
      global.io.emit("updateData", updatedPlayers);
      console.log("Data emitted via WebSocket");
    } else {
      console.warn("WebSocket server (global.io) is not initialized.");
    }

    return NextResponse.json({ success: true, updated: result.affectedRows, data: updatedPlayers });
  } catch (error) {
    console.error("Error updating status:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown Error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
