import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPEN_AI });

export async function GET(req: NextRequest) {
  return NextResponse.json(
    { success: true, data: "We got you" },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  try {
    // Get the file URL and file name from the request body
    const data = await req.formData();
    const fileUrl = data.get("fileUrl") as string;
    const fileName = data.get("fileName") as string;

    // Fetch the file from the URL
    const response = await fetch(fileUrl);

    if (!response.ok || !response.body) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    // Determine content type
    const contentType =
      response.headers.get("content-type") || "application/octet-stream";

    // Convert ReadableStream to ArrayBuffer
    const arrayBuffer = await response.arrayBuffer();

    // Create a Blob and then a File object
    const blob = new Blob([arrayBuffer]);
    const file = new File([blob], fileName, { type: contentType });

    // Ensure that the file is defined
    if (!file) {
      throw new Error("File could not be created.");
    }

    // Use Assistant
    const assistantId = "asst_KQJa0KKFdLc0xHPkhnPQXMkS";

    const assistant = await openai.beta.assistants.retrieve(assistantId);

    // Upload the file using the File object
    const aiFile = await openai.files.create({
      file,
      purpose: "assistants",
    });

    // Create the thread and attach the uploaded file
    const thread = await openai.beta.threads.create({
      messages: [
        {
          role: "user",
          content:
            "Create 10 concise flashcards of concepts based on the file provided. Only return the array object with the json containing concept and definition. ",
          attachments: [
            { file_id: aiFile.id, tools: [{ type: "file_search" }] },
          ],
        },
      ],
    });

    // Run the assistant to generate flashcards
    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistant.id,
    });

    // Retrieve the messages from the thread
    const messages = await openai.beta.threads.messages.list(thread.id, {
      run_id: run.id,
    });

    // Get the last message in the thread
    const message = messages.data.pop()!;

    // Extract the text content from the message
    let flashcards = [];

    if (
      message.content &&
      message.content[0] &&
      message.content[0].type === "text"
    ) {
      try {
        // Extract the text value and remove the Markdown code block syntax
        const rawText = message.content[0].text.value;
        const jsonText = rawText.replace(/```json|```/g, "").trim();

        // Parse the cleaned JSON string
        flashcards = JSON.parse(jsonText);
      } catch (parseError) {
        console.error("Failed to parse message content as JSON:", parseError);
      }
    } else {
      console.error("Unexpected message content format:", message.content);
    }

    // Return the flashcards to the client
    return NextResponse.json(
      {
        success: true,
        flashcards: flashcards,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
