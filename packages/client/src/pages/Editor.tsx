import { useState } from "react";
import Question from "../interfaces/Question";
import { Button } from "./Control";
import { Choice } from "../interfaces/Answer";

export default function Editor() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [prizes, setPrizes] = useState<string[]>([
    "Rp10.000", // 1
    "Rp15.000", // 2
    "Rp20.000", // 3
    "Rp25.000", // 4
    "Rp50.000", // 5
    "Rp60.000", // 6
    "Rp70.000", // 7
    "Rp80.000", // 8
    "Rp90.000", // 9
    "Rp100.000", // 10
    "Rp150.000", // 11
    "Rp200.000", // 12
    "Rp250.000", // 13
    "Rp300.000", // 14
    "Rp350.000", // 15
  ]);

  return (
    <div className="flex gap-2 p-4">
      <div className="w-1/2">
        <div className="flex mb-2">
          <h2 className="text-2xl font-bold">Questions</h2>
          <Button
            className="ml-2"
            onClick={() =>
              setQuestions([
                ...questions,
                {
                  question: "Question",
                  choices: {
                    [Choice.A]: "Answer 1",
                    [Choice.B]: "Answer 2",
                    [Choice.C]: "Answer 3",
                    [Choice.D]: "Answer 4",
                  },
                  answer: Choice.B,
                },
              ])
            }
          >
            Add Question
          </Button>
          <Button
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = ".json";
              input.onchange = (e: any) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                  const jsonData = JSON.parse(event.target?.result as string);
                  setQuestions(jsonData);
                };
                reader.readAsText(file);
              };
              input.click();
            }}
          >
            Import JSON
          </Button>
          <Button
            onClick={() => {
              const json = JSON.stringify(questions);
              const blob = new Blob([json], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = prompt("File name") + ".json";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export JSON
          </Button>
          (add up to 15 questions)
        </div>
        <ul>
          {questions.map((question, i) => (
            <li className="border p-2 rounded-md mb-2">
              <b>Number:</b> {i + 1}
              <br />
              <b>Question:</b>{" "}
              <input
                type="text"
                className="outline-none"
                value={question.question}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[i].question = e.target.value;
                  setQuestions(newQuestions);
                }}
                style={{
                  width: question.question.length + 1 + "ch",
                }}
              />
              <br />
              <b>Choices:</b> A.{" "}
              <input
                type="text"
                className="outline-none"
                value={question.choices.A}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[i].choices.A = e.target.value;
                  setQuestions(newQuestions);
                }}
                style={{
                  width: question.choices.A.length + 1 + "ch",
                }}
              />{" "}
              | B.{" "}
              <input
                type="text"
                className="outline-none"
                value={question.choices.B}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[i].choices.B = e.target.value;
                  setQuestions(newQuestions);
                }}
                style={{
                  width: question.choices.B.length + 1 + "ch",
                }}
              />{" "}
              | C.{" "}
              <input
                type="text"
                className="outline-none"
                value={question.choices.C}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[i].choices.C = e.target.value;
                  setQuestions(newQuestions);
                }}
                style={{
                  width: question.choices.C.length + 1 + "ch",
                }}
              />{" "}
              | D.{" "}
              <input
                type="text"
                className="outline-none"
                value={question.choices.D}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[i].choices.D = e.target.value;
                  setQuestions(newQuestions);
                }}
                style={{
                  width: question.choices.D.length + 1 + "ch",
                }}
              />
              <br />
              <b>Answer:</b>{" "}
              <select
                value={question.answer}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[i].answer = e.target.value as Choice;
                  setQuestions(newQuestions);
                }}
              >
                <option value={Choice.A}>A. {question.choices.A}</option>
                <option value={Choice.B}>B. {question.choices.B}</option>
                <option value={Choice.C}>C. {question.choices.C}</option>
                <option value={Choice.D}>D. {question.choices.D}</option>
              </select>
              <br />
              <Button
                onClick={() =>
                  setQuestions(questions.filter((_, index) => index !== i))
                }
              >
                Delete
              </Button>
              <Button
                onClick={() => {
                  if (i > 0) {
                    const newQuestions = [...questions];
                    const temp = newQuestions[i];
                    newQuestions[i] = newQuestions[i - 1];
                    newQuestions[i - 1] = temp;
                    setQuestions(newQuestions);
                  }
                }}
              >
                Move Up
              </Button>
              <Button
                onClick={() => {
                  if (i < questions.length - 1) {
                    const newQuestions = [...questions];
                    const temp = newQuestions[i];
                    newQuestions[i] = newQuestions[i + 1];
                    newQuestions[i + 1] = temp;
                    setQuestions(newQuestions);
                  }
                }}
              >
                Move Down
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-1/2">
        <div className="flex mb-2">
          <h2 className="text-2xl font-bold">Questions</h2>
          <Button
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = ".json";
              input.onchange = (e: any) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                  const jsonData = JSON.parse(event.target?.result as string);
                  setPrizes(jsonData);
                };
                reader.readAsText(file);
              };
              input.click();
            }}
          >
            Import JSON
          </Button>
          <Button
            onClick={() => {
              const json = JSON.stringify(prizes);
              const blob = new Blob([json], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = prompt("File name") + ".json";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export JSON
          </Button>
        </div>
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
      </div>
    </div>
  );
}
