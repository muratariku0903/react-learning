import { NextRequest, NextResponse } from "next/server";
import { Memo, memos } from "../../../lib/store";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const memo = memos.find((e) => e.id === id);
  if (!memo) return NextResponse.json({}, { status: 404 });

  return NextResponse.json({ memo }, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const index = memos.findIndex((e) => e.id === id);
  if (index === -1) return NextResponse.json({}, { status: 404 });

  const { memo } = await req.json();

  if (!memo?.title || memo?.title.length === 0) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  memos.splice(index, 1, memo);

  return NextResponse.json({}, { status: 200 });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const index = memos.findIndex((e) => e.id === id);
  if (index === -1) return NextResponse.json({}, { status: 404 });

  memos.splice(index, 1);

  return NextResponse.json(null, { status: 204 });
}
