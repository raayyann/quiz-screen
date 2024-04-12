import { AnswerResult, Choice } from "../interfaces/Answer";
import "./Answer.css";

export default function Answer({
  choice,
  text,
  reveal,
  result,
}: {
  choice: Choice;
  text: string;
  reveal: boolean;
  result: AnswerResult;
}) {
  const position: any = {
    [Choice.A]: {
      left: "230px",
      top: "825px",
    },
    [Choice.B]: {
      left: "965px",
      top: "825px",
    },
    [Choice.C]: {
      left: "230px",
      top: "940px",
    },
    [Choice.D]: {
      left: "965px",
      top: "940px",
    },
  };

  return (
    <div
      className={`absolute w-[725px] h-[85px] rounded-[24px] before:content-[''] before:absolute before:inset-0 ${result} before:rounded-[24px] before:blur-[2px] before:transition-all before:duration-500`}
      style={{
        left: position[choice].left,
        top: position[choice].top,
      }}
    >
      <div
        className="flex items-center h-full absolute text-6xl font-bold left-6 transition-all duration-500"
        style={{
          color: result === AnswerResult.DEFAULT ? "white" : "black",
        }}
      >
        {choice}
      </div>
      <div
        className="flex items-center h-full absolute text-4xl left-[88px] transition-all duration-500"
        style={{
          color: result === AnswerResult.DEFAULT ? "white" : "black",
          opacity: reveal ? 100 : 0,
        }}
      >
        {text}
      </div>
    </div>
  );
}
