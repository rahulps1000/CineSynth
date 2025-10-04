import { NextResponse } from "next/server";
import OpenAI from "openai";

const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: OPEN_AI_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://cinesynth.vercel.app/",
    "X-Title": "CineSynth",
  },
});

export async function POST(request) {
  const { type, categories, specification } = await request.json();
  if (!type) {
    return NextResponse.json({ status: "error" });
  }
  const query = generateQuery(type, categories, specification);

  const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-chat-v3.1:free",
    messages: [
      {
        role: "user",
        content: query,
      },
    ],
  });
  const text = completion.choices[0].message.content;
  try {
    var movies = text.split("|");
    return NextResponse.json(movies);
  } catch (error) {
    return new NextResponse(JSON.stringify(response), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

const generateQuery = (type, categories, specification) => {
  var query = "Give a List of 5 ";
  if (type == "Both") {
    type = "Movie or TV Show";
  }
  query += type;
  if (categories.length != 0) {
    query += ` that fits the following categories: ${categories} .`;
  }
  if (specification) {
    query += `Make sure it fits the following description as well: ${specification}.`;
  }
  if (categories || specification) {
    `If you do not have 5 recommendations that fit these criteria perfectly, do your best to suggest other ${type} that I might like.`;
  }
  query += `Please return only the movie names seperated by |.I dont want any images or description or year in the resposne as code.`;
  return query;
};
