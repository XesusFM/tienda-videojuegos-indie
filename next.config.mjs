/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: "10mb", // Aumenta el límite a 10MB
        },
    },
};

export default nextConfig;
