import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { installErrorOverlay } from "./components/ErrorOverlay";

// Install a global overlay to show runtime exceptions (helps diagnose white screens)
installErrorOverlay();

createRoot(document.getElementById("root")!).render(<App />);
