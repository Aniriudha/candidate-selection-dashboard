import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core"; // <-- add this
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <App />
    </MantineProvider>
  </StrictMode>
);
