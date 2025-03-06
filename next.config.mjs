/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: ['widgets.sofascore.com', 'api.sofascore.com', 'www.sofascore.app', 'sofascore.app', 'api.sofascore.app', "api.alkora.app", "example.com", 'sofascore.com', 'www.sofascore.com', 'api.sofascore.app']
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/ma/sl',
                permanent: !true,
            },
        ]
    },
};

export default nextConfig;
