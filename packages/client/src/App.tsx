import { useState } from "react";
import Screen from "./pages/Screen";
import Control, { Button } from "./pages/Control";

export default function App() {
  const [control, setControl] = useState(false);
  const [screen, setScreen] = useState(false);

  if (control) return <Control />;
  if (screen) return <Screen />;
  return (
    <>
      <Button
        onClick={() => {
          setControl(true);
        }}
      >
        Control Panel
      </Button>
      <br />
      <Button
        onClick={() => {
          setScreen(true);
        }}
      >
        Screen
      </Button>
    </>
  );
}
