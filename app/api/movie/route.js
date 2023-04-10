import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  var result = { result: "error" };
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${name}&page=1&include_adult=false`;
  var response = await fetch(url);
  var data = await response.json();
  data = data["results"][0];
  if (data) {
    result = {
      result: "success",
      title: data["original_title"] || data["original_name"],
      overview: data["overview"],
      release_date: (
        data["release_date"] ||
        data["first_air_date"] ||
        "NA-"
      ).split("-")[0],
      poster: data["poster_path"]
        ? `https://image.tmdb.org/t/p/original${data["poster_path"]}`
        : "/poster.png",
      backdrop: `https://image.tmdb.org/t/p/original${data["backdrop_path"]}`,
      vote_percent: data["vote_average"] * 10 + "%",
      vote_five: (data["vote_average"] / 2).toFixed(1),
      vote_count: data["vote_count"],
    };
  }
  return NextResponse.json(result);
}
