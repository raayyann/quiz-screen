import { FaPeopleGroup, FaPhone } from "react-icons/fa6";
import Lifeline from "./Lifeline";

export default function List({ visible }: { visible: boolean }) {
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
          <li className="font-bold">15</li>
          <li>14</li>
          <li>13</li>
          <li>12</li>
          <li>11</li>
          <li className="font-bold">10</li>
          <li>9</li>
          <li>8</li>
          <li style={{ color: "#FFEB38" }}>7</li>
          <li>6</li>
          <li className="font-bold">5</li>
          <li>4</li>
          <li>3</li>
          <li>2</li>
          <li>1</li>
        </ul>
      </div>
      <div className="absolute left-[1470px] top-[90px] text-[40px] text-white">
        <ul className="list-disc">
          <li className="font-bold">Rp500.000</li>
          <li>Rp500.000</li>
          <li>Rp500.000</li>
          <li>Rp500.000</li>
          <li>Rp500.000</li>
          <li className="font-bold">Rp500.000</li>
          <li>Rp500.000</li>
          <li>Rp500.000</li>
          <li style={{ color: "#FFEB38" }}>Rp500.000</li>
          <li>Rp500.000</li>
          <li className="font-bold">Rp500.000</li>
          <li>Rp500.000</li>
          <li>Rp500.000</li>
          <li>Rp500.000</li>
          <li>Rp10.000</li>
        </ul>
      </div>
      <Lifeline
        content={<FaPeopleGroup className="text-white text-6xl" />}
        top={423}
        used={false}
      />
      <Lifeline
        content={<span className="text-white text-3xl">50:50</span>}
        top={516}
        used={false}
      />
      <Lifeline
        content={<FaPhone className="text-white text-5xl" />}
        top={606}
        used={false}
      />
    </div>
  );
}
