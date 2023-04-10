import { NextResponse } from "next/server";

export async function POST(request) {
	const { type, categories, specification } = await request.json();
	if (!type) {
		return NextResponse.json({ status: "error" });
	}
	const query = generateQuery(type, categories, specification);
	const url = "https://api.openai.com/v1/completions";
	const payload = {
		model: "text-davinci-003",
		prompt: query,
		temperature: 0.7,
		max_tokens: 2048,
		top_p: 1.0,
		frequency_penalty: 0.0,
		stream: false,
		presence_penalty: 0.0,
		n: 1,
	};
	const response = await fetch(url, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
		},
		method: "POST",
		body: JSON.stringify(payload),
	});
	var data = await response.json();
	var movies = data.choices[0].text.split("\n").join("").split(",");
	movies = movies.map((m) => m.trim());
	return NextResponse.json(movies);
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
	query += `Please return the names as a comma seperated list without numbering.`;
	return query;
};
