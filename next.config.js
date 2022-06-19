const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	sassOptions: {
		includePaths: [path.join(__dirname, "styles", "components")],
		prependData: `@import "../utils";`,
	},
};

module.exports = nextConfig;
