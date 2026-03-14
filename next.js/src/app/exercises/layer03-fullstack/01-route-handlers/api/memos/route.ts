// export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { memos } from "../../lib/store";

export async function GET() {
  return NextResponse.json({ memos }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { memo } = await req.json();

  if (!memo?.title || memo?.title.length === 0)
    return NextResponse.json({ error: "title is required" }, { status: 400 });

  const created = { ...memo, id: crypto.randomUUID() };

  memos.push(created);

  return NextResponse.json({ memo: created }, { status: 201 });
}
