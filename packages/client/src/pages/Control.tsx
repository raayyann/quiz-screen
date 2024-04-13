import { useEffect, useState } from "react";
import Question from "../interfaces/Question";
import { socket } from "../utils/socket";
import { Choice } from "../interfaces/Answer";
import { Lifeline } from "../interfaces/Lifeline";
import { sounds } from "../utils/audio";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="py-2 px-4 border bg-slate-400 rounded-lg hover:opacity-85 disabled:hover:opacity-100 disabled:cursor-not-allowed"
      {...props}
    >
      {children}
    </button>
  );
}

export default function Control() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [prizes, setPrizes] = useState<string[]>([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [usedLifeline, setUsedLifeline] = useState<Lifeline[]>([]);

  useEffect(() => {
    socket.emit("init");
    socket.emit("controlInit");

    socket.on("setQuestions", setQuestions);
    socket.on("setPrizes", setPrizes);

    socket.on("setCurrentQuestion", setCurrentQuestion);
    socket.on("setUsedLifeline", setUsedLifeline);

    return () => {
      socket.off("setQuestions", setQuestions);
      socket.off("setPrizes", setPrizes);
      socket.off("setCurrentQuestion", setCurrentQuestion);
      socket.off("setUsedLifeline", setUsedLifeline);
    };
  }, []);

  return (
    <div className="m-4">
      <h2 className="text-xl font-bold mb-2">
        Current Question: {currentQuestion}
      </h2>
      <div className="flex gap-2">
        <div className="w-1/3">
          <h2 className="text-2xl font-bold mb-2">Questions</h2>
          <ul>
            {questions.map((q, i) => (
              <li key={i} className="border p-2 rounded-md mb-2">
                <b>Number:</b> {i + 1}
                <br />
                <b>Question:</b> {q.question}
                <br />
                <b>Choices:</b> A. {q.choices[Choice.A]} | B.{" "}
                {q.choices[Choice.B]} | C. {q.choices[Choice.C]} | D.{" "}
                {q.choices[Choice.D]}
                <br />
                <b>Answer:</b> {q.answer}. {q.choices[q.answer]}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/3">
          <h2 className="text-2xl font-bold mb-2">Prize</h2>
          {[...Array(15)].map((_, index) => (
            <input
              key={index}
              className="border p-2 rounded-md mb-2"
              placeholder={`Prize ${index + 1}`}
              value={prizes[index]}
              onChange={(e) => {
                const newPrizes = [...prizes];
                newPrizes[index] = e.target.value;
                setPrizes(newPrizes);
              }}
            />
          ))}
          <Button onClick={() => socket.emit("setPrizes", prizes)}>
            Save Prizes
          </Button>
        </div>
        <div className="w-1/3">
          <h2 className="text-2xl font-bold mb-2">Controls</h2>
          <p>Page</p>
          <Button
            onClick={() => {
              socket.emit("show", "list");
            }}
          >
            Show/Hide List
          </Button>
          <Button
            onClick={() => {
              socket.emit("show", "question");
            }}
          >
            Show/Hide Question
          </Button>
          <Button
            onClick={() => {
              socket.emit("show", "prize");
            }}
          >
            Show/Hide Prize
          </Button>
          <p>Question</p>
          <Button onClick={() => socket.emit("previousQuestion")}>
            Previous Question
          </Button>
          <Button onClick={() => socket.emit("nextQuestion")}>
            Next Question
          </Button>
          <Button onClick={() => socket.emit("revealAnswer")}>
            Reveal Answer
          </Button>
          <p>Answer</p>
          <Button onClick={() => socket.emit("select", Choice.A)}>
            Select A
          </Button>
          <Button onClick={() => socket.emit("select", Choice.B)}>
            Select B
          </Button>
          <Button onClick={() => socket.emit("select", Choice.C)}>
            Select C
          </Button>
          <Button onClick={() => socket.emit("select", Choice.D)}>
            Select D
          </Button>
          <Button onClick={() => socket.emit("lockAnswer")}>Lock Answer</Button>
          <p>Lifeline</p>
          <Button
            onClick={() => socket.emit("lifeline", Lifeline.ASK)}
            disabled={usedLifeline.includes(Lifeline.ASK)}
          >
            Ask the Audience
          </Button>
          <Button
            onClick={() => socket.emit("lifeline", Lifeline.FIFTY)}
            disabled={usedLifeline.includes(Lifeline.FIFTY)}
          >
            50:50
          </Button>
          <Button
            onClick={() => socket.emit("lifeline", Lifeline.CALL)}
            disabled={usedLifeline.includes(Lifeline.CALL)}
          >
            Call a friend
          </Button>
          <Button onClick={() => socket.emit("resetLifeline")}>
            Reset Lifeline
          </Button>
          <p>Sounds</p>
          {Object.keys(sounds).map((sound, i) => (
            <Button key={i} onClick={() => socket.emit("playSound", sound)}>
              {sound}
            </Button>
          ))}
          <Button onClick={() => socket.emit("stopAllSounds")}>
            Stop All Sounds
          </Button>
        </div>
      </div>
    </div>
  );
}
