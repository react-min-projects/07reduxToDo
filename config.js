const BACKEND_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://reduxtodo-backend.onrender.com";

export default BACKEND_URL