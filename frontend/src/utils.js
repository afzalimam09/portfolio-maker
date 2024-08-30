export const getSubdomainAndHost = () => {
    const hostname = window.location.hostname; // e.g., 'subdomain.example.com' or 'localhost'

    let username = "";

    if (hostname === "localhost") {
        username = "afzalimam";
    } else if (
        hostname.endsWith("vercel.app") ||
        hostname.endsWith("netlify.app")
    ) {
        username = "afzalimam";
    } else {
        const parts = hostname.split(".");
        if (parts.length > 2) {
            // Extract subdomain (e.g., 'subdomain' from 'subdomain.example.com')
            username = parts.slice(0, -2).join(".");
        } else {
            username = "afzalimam";
        }
    }
    return { username };
};
