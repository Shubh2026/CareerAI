import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { auth } from "@/lib/firebase";

import { ensureAnonymousAuth } from "@/lib/firebase";

console.log("Firebase auth:", auth);

ensureAnonymousAuth().catch(console.error);


createRoot(document.getElementById("root")!).render(<App />);
