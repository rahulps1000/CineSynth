import { NextResponse } from "next/server";
import Bard, { askAI } from "bard-ai";

export async function POST(request) {
  const { type, categories, specification } = await request.json();
  if (!type) {
    return NextResponse.json({ status: "error" });
  }
  const query = generateQuery(type, categories, specification);
  await Bard.init(process.env.BARD_API);
  var response = await askAI(query);
  try {
    var data = response.split("```")[1].replace(/\n/g, "");
    var movies = data.split("|");
    movies = movies.map((m) => m.trim());
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json(response);
  }
}

const generateQuery = (type, categories, specification) => {
  var query = "Give a List of 5 ";
  if (type == "Both") {
    type = "Movie or TV Show";
  }
  query += type;
  if (categories) {
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
