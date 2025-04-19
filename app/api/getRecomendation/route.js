import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function POST(request) {
  const { type, categories, specification } = await request.json();
  if (!type) {
    return NextResponse.json({ status: "error" });
  }
  const query = generateQuery(type, categories, specification);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-04-17",
    contents: query,
  });
  const text = response.text;
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
