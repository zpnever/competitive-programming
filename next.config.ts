import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	env: {
		NEXT_PUBLIC_RAPIDAPI_KEY: process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
	},
};

export default nextConfig;
