/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: ["image.tmdb.org"],
	},
	env: {
		TMDB_API_KEY: process.env.TMDB_API_KEY,
	},
};

module.exports = nextConfig;
