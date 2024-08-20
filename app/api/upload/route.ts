import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  // Get the complete URL
  const { searchParams } = new URL(request.url);
  // Find the search param with the file name
  const filename = searchParams.get("filename");

  // Get the form data and extract the file
  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  // Upload file to Vercel Blob
  const blob = await put(`user/${filename}`, file, { access: "public" });

  return NextResponse.json(blob);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
