import { AnswerResult, Choice } from "../interfaces/Answer";
import Answer from "./Answer";
import QuestionType from "../interfaces/Question";
import { useEffect, useState } from "react";
import { socket } from "../utils/socket";
import { Lifeline } from "../interfaces/Lifeline";
import { sounds } from "../utils/audio";

export default function Question({
  visible,
  currentQuestion,
  question,
}: {
  visible: boolean;
  currentQuestion: number;
  question?: QuestionType;
}) {
  const [selected, setSelected] = useState<Choice>();
  const [lockAnswer, setLockAnswer] = useState(false);

  const [answersReveal, setAnswersReveal] = useState<{
    [Choice.A]: boolean;
    [Choice.B]: boolean;
    [Choice.C]: boolean;
    [Choice.D]: boolean;
  }>({
    [Choice.A]: false,
    [Choice.B]: false,
    [Choice.C]: false,
    [Choice.D]: false,
  });

  const getResult = (choice: Choice) =>
    question?.answer === choice && lockAnswer
      ? AnswerResult.CORRECT
      : selected === choice && question?.answer !== selected && lockAnswer
      ? AnswerResult.INCORRECT
      : selected === choice
      ? AnswerResult.SELECTED
      : AnswerResult.DEFAULT;

  useEffect(() => {
    setSelected(undefined);
    setLockAnswer(false);
    setAnswersReveal({
      [Choice.A]: false,
      [Choice.B]: false,
      [Choice.C]: false,
      [Choice.D]: false,
    });

    const onLockAnswer = () => setLockAnswer(true);

    const onLifeline = (lifeline: Lifeline) => {
      if (lifeline === Lifeline.ASK) sounds.lifeline_1_on.play();
      if (lifeline === Lifeline.CALL) sounds.lifeline_2_on.play();
      if (lifeline !== Lifeline.FIFTY) return;
      sounds.fifty_fifty.play();
      const remainingChoices = Object.keys(answersReveal).filter(
        (c) => c !== question!.answer
      );
      const randomIndex = Math.floor(Math.random() * remainingChoices.length);
      const firstChoice = remainingChoices[randomIndex];
      remainingChoices.splice(randomIndex, 1);
      const randomIndex2 = Math.floor(Math.random() * remainingChoices.length);
      const secondChoice = remainingChoices[randomIndex2];
      setAnswersReveal((answersReveal) => {
        return {
          ...answersReveal,
          [firstChoice]: false,
          [secondChoice]: false,
        };
      });
    };

    let revealedAnswer = 0;

    const onRevealAnswer = () => {
      setAnswersReveal({
        [Choice.A]: revealedAnswer >= 0,
        [Choice.B]: revealedAnswer >= 1,
        [Choice.C]: revealedAnswer >= 2,
        [Choice.D]: revealedAnswer >= 3,
      });
      revealedAnswer++;
    };

    socket.on("select", setSelected);
    socket.on("lockAnswer", onLockAnswer);
    socket.on("lifeline", onLifeline);
    socket.on("revealAnswer", onRevealAnswer);

    return () => {
      socket.off("select", setSelected);
      socket.off("lockAnswer", onLockAnswer);
      socket.off("lifeline", onLifeline);
      socket.off("revealAnswer", onRevealAnswer);
    };
  }, [question]);

  useEffect(() => {
    try {
      if (!lockAnswer) return;
      if (selected === question?.answer) {
        if (currentQuestion >= 1 && currentQuestion <= 4)
          sounds.q1_to_q4_correct.play();
        else {
          sounds.q1_to_q5_bed.pause();
          sounds[`q${currentQuestion}_correct`].play();
        }
      } else {
        if (currentQuestion >= 1 && currentQuestion <= 5)
          sounds.q1_to_q5_lose.play();
        else sounds[`q${currentQuestion}_lose`].play();
      }
    } catch (e) {}
  }, [lockAnswer]);

  return (
    <div
      className="transition-all duration-500"
      style={{ opacity: visible ? 100 : 0 }}
    >
      <div className="absolute left-[230px] top-[665px] w-[1460px] h-[130px] before:content-[''] before:absolute before:inset-0 before:bg-[#2A2A2A] before:rounded-t-[24px] before:blur-[2px]">
        <div className="flex justify-center items-center text-center h-full relative text-white text-4xl">
          {question?.question}
        </div>
      </div>
      <Answer
        choice={Choice.A}
        text={question?.choices.A || ""}
        reveal={answersReveal[Choice.A]}
        result={getResult(Choice.A)}
      />
      <Answer
        choice={Choice.B}
        text={question?.choices.B || ""}
        reveal={answersReveal[Choice.B]}
        result={getResult(Choice.B)}
      />
      <Answer
        choice={Choice.C}
        text={question?.choices.C || ""}
        reveal={answersReveal[Choice.C]}
        result={getResult(Choice.C)}
      />
      <Answer
        choice={Choice.D}
        text={question?.choices.D || ""}
        reveal={answersReveal[Choice.D]}
        result={getResult(Choice.D)}
      />
    </div>
  );
}
