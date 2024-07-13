let url;

if (import.meta.env.VITE_PRODUCTION === "TRUE") {
  url = "https://tuf-server-gules.vercel.app/";
} else {
  url = "http://localhost:3000/";
}

export default url;
