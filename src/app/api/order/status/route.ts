import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const code = body.data.reference_id;

    await db.order.update({
      where: {
        code: code,
      },
      data: {
        status: body.data.status === "SUCCEEDED" ? "success" : "failed",
      },
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ status: true });
}
