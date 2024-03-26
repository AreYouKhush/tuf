let url;

if (import.meta.env.VITE_PRODUCTION === "TRUE") {
  url = "https://tuf-production-d7c1.up.railway.app/";
} else {
  url = "http://localhost:3000/";
}

export default url;
