import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPEN_AI });

export async function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json(
    { success: true, data: "We got you" },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  const formData = await req.json();
  console.log(formData);
  return NextResponse.json(formData);
}

async function generateCardsFromFile(file: File) {
  // Implementation for generating cards from the file
}
