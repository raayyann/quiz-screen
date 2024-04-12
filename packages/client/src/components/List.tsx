import { FaPeopleGroup, FaPhone } from "react-icons/fa6";
import Lifeline from "./Lifeline";
import { Lifeline as LifelineType } from "../interfaces/Lifeline";

export default function List({
  visible,
  currentQuestion,
  prizes,
  usedLifeline,
}: {
  visible: boolean;
  currentQuestion: number;
  prizes: string[];
  usedLifeline: LifelineType[];
}) {
  return (
    <div
      className="absolute transition-all duration-500"
      style={{
        transform: visible ? "translate(0px, 0px)" : "translate(610px, 0px)",
      }}
    >
      <div className="absolute left-[1325px] top-[40px] w-[600px] h-[1000px] bg-[#2A2A2A] rounded-l-[24px] blur-[2px]"></div>
      <div className="absolute left-[1370px] top-[90px] text-[40px] text-white text-center">
        <ul>
          {[...Array(15).keys()].map((num) => (
            <li
              key={num}
              className={num % 5 === 0 ? "font-bold" : ""}
              style={{
                color: 15 - num === currentQuestion ? "#FFEB38" : undefined,
              }}
            >
              {15 - num}
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute left-[1470px] top-[90px] text-[40px] text-white">
        <ul className="list-disc">
          {prizes
            .slice(0, 15)
            .reverse()
            .map((prize, index) => (
              <li
                key={index}
                className={index % 5 === 0 ? "font-bold" : ""}
                style={{
                  color: 15 - index === currentQuestion ? "#FFEB38" : undefined,
                }}
              >
                {prize}
              </li>
            ))}
        </ul>
      </div>
      <Lifeline
        content={<FaPeopleGroup className="text-white text-6xl" />}
        top={423}
        used={usedLifeline.includes(LifelineType.ASK)}
      />
      <Lifeline
        content={<span className="text-white text-3xl">50:50</span>}
        top={516}
        used={usedLifeline.includes(LifelineType.FIFTY)}
      />
      <Lifeline
        content={<FaPhone className="text-white text-5xl" />}
        top={606}
        used={usedLifeline.includes(LifelineType.CALL)}
      />
    </div>
  );
}
