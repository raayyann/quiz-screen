import { useEffect, useState } from "react";
import Question from "./components/Question";
import Prize from "./components/Prize";
import List from "./components/List";

export default function Screen() {
  const [question, setQuestion] = useState("");

  useEffect(() => {
    setQuestion("Siapakah penemu internet pertama kali?");
  }, []);

  return (
    <div className="font-poppins">
      <Question visible={true} question={question} />
      <Prize visible={false} text={"Rp500.000"} />
      <List visible={false} />
    </div>
  );
}
