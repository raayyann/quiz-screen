import { useEffect, useState } from "react";
import Question from "../components/Question";
import Prize from "../components/Prize";
import List from "../components/List";
import { socket } from "../utils/socket";
import QuestionType from "../interfaces/Question";
import { Lifeline } from "../interfaces/Lifeline";
import { sounds } from "../utils/audio";

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
    socket.emit("init", prompt("Room name"));

    const onShow = (page: "question" | "prize" | "list") => {
      if (page === "question") setQuestion((question) => !question);
      if (page === "prize") setPrize((prize) => !prize);
      if (page === "list") setList((list) => !list);
    };

    const onPlaySound = (sound: string) => {
      sounds[sound].play();
    };

    const onStopAllSounds = () => {
      Object.values(sounds).forEach((sound) => {
        const fadeOut = setInterval(() => {
          if (sound.volume > 0.01) {
            sound.volume -= 0.01;
          } else {
            clearInterval(fadeOut);
            sound.pause();
            sound.currentTime = 0;
            sound.volume = 1;
          }
        }, 25);
      });
    };

    socket.on("show", onShow);

    socket.on("setQuestions", setQuestions);
    socket.on("setPrizes", setPrizes);
    socket.on("setCurrentQuestion", setCurrentQuestion);
    socket.on("setUsedLifeline", setUsedLifeline);
    socket.on("playSound", onPlaySound);
    socket.on("stopAllSounds", onStopAllSounds);

    return () => {
      socket.off("show", onShow);

      socket.off("setQuestions", setQuestions);
      socket.off("setPrizes", setPrizes);
      socket.off("setCurrentQuestion", setCurrentQuestion);
      socket.off("setUsedLifeline", setUsedLifeline);
      socket.off("playSound", onPlaySound);
      socket.off("stopAllSounds", onStopAllSounds);
    };
  }, []);

  useEffect(() => {
    try {
      if (question) {
        if (currentQuestion >= 1 && currentQuestion <= 5)
          sounds.q1_to_q5_bed.play();
        else {
          sounds.q1_to_q5_bed.pause();
          sounds[`q${currentQuestion}_bed`].play();
        }
      } else {
        for (let i = 6; i <= 15; i++) {
          sounds[`q${i}_bed`].pause();
        }
      }
    } catch (e) {}
  }, [question]);

  return (
    <div className="font-poppins">
      <Question
        visible={question}
        currentQuestion={currentQuestion}
        question={questions[currentQuestion - 1]}
      />
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
