import { useState } from "react";
import Screen from "./Screen";

export default function App() {
  const [panel, setPanel] = useState(false);
  const [screen, setScreen] = useState(false);

  if (panel) return <Screen />;
  if (screen) return <Screen />;
  return (
    <>
      <button
        className="py-2 px-4 bg-slate-400 rounded-lg"
        onClick={() => {
          setPanel(true);
        }}
      >
        Control Panel
      </button>
      <br />
      <button
        className="py-2 px-4 mt-2 bg-slate-400 rounded-lg"
        onClick={() => {
          setScreen(true);
        }}
      >
        Screen
      </button>
    </>
  );
}
