import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { ensureAnonymousAuth } from "@/lib/firebase";
ensureAnonymousAuth().catch(console.error);

createRoot(document.getElementById("root")!).render(<App />);
