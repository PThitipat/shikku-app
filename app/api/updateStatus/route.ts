import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";
import { ResultSetHeader } from "mysql2";

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

    return NextResponse.json({ success: true, updated: result.affectedRows, data: updatedPlayers });
  } catch (error) {
    console.error("Error updating status:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown Error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}