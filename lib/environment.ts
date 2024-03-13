export const checkEnvironment = () => {
    let base_url =
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://chat-app-psi-opal.vercel.app";
    return base_url;
};
