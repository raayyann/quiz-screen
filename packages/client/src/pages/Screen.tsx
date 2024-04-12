import { useEffect, useState } from "react";
import Question from "../components/Question";
import Prize from "../components/Prize";
import List from "../components/List";
import { socket } from "../utils/socket";
import QuestionType from "../interfaces/Question";
import { Lifeline } from "../interfaces/Lifeline";

export default function Screen() {
  // Page
  const [question, setQuestion] = useState(false);
  const [prize, setPrize] = useState(false);
  const [list, setList] = useState(false);

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [prizes, setPrizes] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [usedLifeline, setUsedLifeline] = useState<Lifeline[]>([]);

  useEffect(() => {
    socket.emit("init");

    const onShow = (page: "question" | "prize" | "list") => {
      if (page === "question") setQuestion((question) => !question);
      if (page === "prize") setPrize((prize) => !prize);
      if (page === "list") setList((list) => !list);
    };

    socket.on("show", onShow);

    socket.on("setQuestions", setQuestions);
    socket.on("setPrizes", setPrizes);
    socket.on("setCurrentQuestion", setCurrentQuestion);
    socket.on("setUsedLifeline", setUsedLifeline);

    return () => {
      socket.off("show", onShow);

      socket.off("setQuestions", setQuestions);
      socket.off("setPrizes", setPrizes);
      socket.off("setCurrentQuestion", setCurrentQuestion);
      socket.off("setUsedLifeline", setUsedLifeline);
    };
  }, []);

  return (
    <div className="font-poppins">
      <Question visible={question} question={questions[currentQuestion - 1]} />
      <Prize visible={prize} text={prizes[currentQuestion - 1]} />
      <List
        visible={list}
        currentQuestion={currentQuestion}
        prizes={prizes}
        usedLifeline={usedLifeline}
      />
    </div>
  );
}
