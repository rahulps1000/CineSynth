import { NextResponse } from "next/server";
import axios from "axios";

const apikey = process.env.PERPLEXITY_API;
const url = "https://api.perplexity.ai/chat/completions";

const options = {
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: `Bearer ${apikey}`
  }}

export async function POST(request) {
  const { type, categories, specification } = await request.json();
  if (!type) {
    return NextResponse.json({ status: "error" });
  }
  const query = generateQuery(type, categories, specification);

  const data = JSON.stringify({
    model: 'mistral-7b-instruct',
    messages: [
      {
        role: 'user',
        content: query
      }
    ]
  })

  const response = await axios.post(url,data,options);

  const text = response.data.choices[0].message.content;

  console.log();
  try{
    var movies = text.split("|");
    return NextResponse.json(movies);
  } catch(error) {
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
