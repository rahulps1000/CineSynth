import { useState, useEffect } from "react";
import Image from "next/image";

const fetchMovieData = async (title) => {
	const url = `/api/movie?name=${title}`;
	var response = await fetch(url);
	var data = await response.json();
	return data;
};

function Card({ title }) {
	const [data, setData] = useState(null);
	useEffect(() => {
		fetchMovieData(title).then((data) => {
			setData(data);
		});
	}, [title]);

	return data && data["result"] == "success" ? (
		<div className="relative bg-gray-900 w-full my-5 rounded-xl">
			<Image
				className="absolute w-full h-52 object-cover object-left-top opacity-10 rounded-xl"
				src={`https://image.tmdb.org/t/p/original${data["backdrop"]}`}
				width={300}
				height={300}
				alt={title}
			/>
			<div className="w-full h-52 flex">
				<Image
					className="relative h-full w-auto p-2.5 rounded-2xl"
					src={`https://image.tmdb.org/t/p/original${data["poster"]}`}
					width={300}
					height={300}
					alt={title}
					priority
				/>
				<div className="p-2">
					<h2>
						{data["title"]} ({data["release_date"]})
					</h2>
					<div className="flex h-3.5 text-xs items-center">
						<div className="relative w-fit">
							<div className="absolute flex items-center">
								<div className="w-3.5 h-3.5 bg-gray-700 rounded-full clip-star"></div>
								<div className="w-3.5 h-3.5 bg-gray-700 rounded-full clip-star"></div>
								<div className="w-3.5 h-3.5 bg-gray-700 rounded-full clip-star"></div>
								<div className="w-3.5 h-3.5 bg-gray-700 rounded-full clip-star"></div>
								<div className="w-3.5 h-3.5 bg-gray-700 rounded-full clip-star"></div>
							</div>
							<div
								className="flex items-center overflow-x-hidden"
								style={{ width: data["vote_percent"] }}
							>
								<div className="w-full h-auto grid grid-cols-[repeat(5,1fr)]">
									<div className="w-3.5 h-3.5 bg-yellow-400 rounded-full clip-star"></div>
									<div className="w-3.5 h-3.5 bg-yellow-400 rounded-full clip-star"></div>
									<div className="w-3.5 h-3.5 bg-yellow-400 rounded-full clip-star"></div>
									<div className="w-3.5 h-3.5 bg-yellow-400 rounded-full clip-star"></div>
									<div className="w-3.5 h-3.5 bg-yellow-400 rounded-full clip-star"></div>
								</div>
							</div>
						</div>
						<p className="pl-1">
							{data["vote_five"]} ({data["vote_count"]})
						</p>
					</div>
					<p className="text-lg text-gray-300 line-clamp-5">
						{data["overview"]}
					</p>
				</div>
			</div>
		</div>
	) : data && data["result"] == "error" ? (
		""
	) : (
		<div className="relative bg-gray-900 w-full my-5 rounded-xl skeleton">
			<div className="w-full h-52 flex">
				<Image
					className="relative h-full w-auto p-2.5 rounded-2xl"
					src="/poster.png"
					width={300}
					height={300}
					alt={title}
				/>
				<div className="p-2 w-full">
					<h2 className="skeleton-item w-28 h-5 my-2 rounded-sm"></h2>
					<div className="flex h-3.5 text-xs items-center gap-1">
						<div className="relative w-fit">
							<div className="flex items-center">
								<div className="w-3.5 h-3.5 bg-gray-600 rounded-full clip-star"></div>
								<div className="w-3.5 h-3.5 bg-gray-600 rounded-full clip-star"></div>
								<div className="w-3.5 h-3.5 bg-gray-600 rounded-full clip-star"></div>
								<div className="w-3.5 h-3.5 bg-gray-600 rounded-full clip-star"></div>
								<div className="w-3.5 h-3.5 bg-gray-600 rounded-full clip-star"></div>
							</div>
						</div>
						<p className="skeleton-item pl-1 w-6 h-3.5 rounded-sm"></p>
					</div>
					<div className="skeleton-item w-full h-2/3 my-2 rounded-sm"></div>
				</div>
			</div>
		</div>
	);
}

export default Card;
