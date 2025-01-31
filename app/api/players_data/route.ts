import { NextRequest, NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const username = url.searchParams.get("username");

  try {
    const promisePool = mysqlPool.promise();
    let query = "SELECT * FROM players";
    let values: string[] = [];

    if (username) {
      query += " WHERE username = ?";
      values.push(username);
    }

    const [rows] = await promisePool.query(query, values);
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching players data:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const promisePool = mysqlPool.promise();

    const query = `
      INSERT INTO players (license, username, level, gems, golds, holidaystars, world, status, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
      ON DUPLICATE KEY UPDATE
        level = VALUES(level),
        gems = VALUES(gems),
        golds = VALUES(golds),
        holidaystars = VALUES(holidaystars),
        world = VALUES(world),
        status = VALUES(status),
        updated_at = NOW()
    `;

    let values = [
      body.license,
      body.username,
      body.level,
      body.gems,
      body.golds,
      body.holidaystars,
      body.world,
      body.status,
    ];

    await promisePool.query(query, values);

    const [updatedRows] = await promisePool.query("SELECT * FROM players");

    return NextResponse.json({ success: true, data: updatedRows });
  } catch (error) {
    console.error("Error saving player data:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}