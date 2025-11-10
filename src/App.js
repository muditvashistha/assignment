import React from "react";
import Directory from "./pages/Directory";

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Employee Directory - Penthara Technologies</h1>
      </header>
      <main className="app-main">
        <Directory />
      </main>
      <footer className="app-footer">© {new Date().getFullYear()} • Made by - Mudit Vashistha</footer>
    </div>
  );
}
