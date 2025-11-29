const BACKEND_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://reduxToDo-backend.onrender.com";

export default BACKEND_URL