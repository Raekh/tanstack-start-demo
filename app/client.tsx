import { hydrateRoot } from "react-dom/client";
import { createRouter } from "./router";
import { StartClient } from "@tanstack/react-start";

const router = createRouter();

hydrateRoot(document, <StartClient router={router} />);
