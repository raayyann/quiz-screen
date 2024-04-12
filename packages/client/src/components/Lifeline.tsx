import { ReactNode } from "react";

export default function Lifeline({
  content,
  top,
  used,
}: {
  content: ReactNode;
  top: number;
  used: boolean;
}) {
  return (
    <div
      className="absolute w-[100px] h-[75px] rounded-3xl transition-all duration-500"
      style={{
        left: 1760,
        top,
        backgroundColor: used ? "#FA4949" : "#0C0C0C",
      }}
    >
      <div className="flex justify-center items-center h-full">{content}</div>
    </div>
  );
}
