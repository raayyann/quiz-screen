import Answer, { AnswerResult, Choice } from "./Answer";

export default function Question({
  visible,
  question,
}: {
  visible: boolean;
  question: string;
}) {
  return (
    <div
      className="transition-all duration-500"
      style={{ opacity: visible ? 100 : 0 }}
    >
      <div className="absolute left-[230px] top-[665px] w-[1460px] h-[130px] before:content-[''] before:absolute before:inset-0 before:bg-[#2A2A2A] before:rounded-t-[24px] before:blur-[2px]">
        <div className="flex justify-center items-center text-center h-full relative text-white text-4xl">
          {question}
        </div>
      </div>
      <Answer
        choice={Choice.A}
        text="Supratman"
        reveal={true}
        result={AnswerResult.DEFAULT}
      />
      <Answer
        choice={Choice.B}
        text="Soekarno"
        reveal={true}
        result={AnswerResult.DEFAULT}
      />
      <Answer
        choice={Choice.C}
        text="Leonard Kleinrock"
        reveal={true}
        result={AnswerResult.CORRECT}
      />
      <Answer
        choice={Choice.D}
        text="Joko Widodo"
        reveal={true}
        result={AnswerResult.DEFAULT}
      />
    </div>
  );
}
