import fs from "fs";
import path from "path";
import express, { Request, Response } from "express";
import { createServer } from "node:http";
import { Server, Socket } from "socket.io";

import Question from "./interfaces/Question";
import { Choice } from "./interfaces/Answer";
import { Lifeline } from "./interfaces/Lifeline";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

const defaultQuestions: Question[] = [
  {
    question: "What is the largest ocean on Earth?",
    choices: {
      A: "Pacific Ocean",
      B: "Atlantic Ocean",
      C: "Indian Ocean",
      D: "Arctic Ocean",
    },
    answer: Choice.A,
  },
  {
    question: "What is the tallest mountain in the world?",
    choices: {
      A: "Mount Everest",
      B: "K2",
      C: "Kangchenjunga",
      D: "Lhotse",
    },
    answer: Choice.A,
  },
  {
    question: "In which year did World War II begin?",
    choices: {
      A: "1939",
      B: "1941",
      C: "1935",
      D: "1945",
    },
    answer: Choice.A,
  },
  {
    question: "What is the name of the first book in the Harry Potter series?",
    choices: {
      A: "Harry Potter and the Chamber of Secrets",
      B: "Harry Potter and the Sorcerer's Stone",
      C: "Harry Potter and the Prisoner of Azkaban",
      D: "Harry Potter and the Goblet of Fire",
    },
    answer: Choice.B,
  },
  {
    question: "What is the chemical symbol for water?",
    choices: {
      A: "H2O",
      B: "CO2",
      C: "NaCl",
      D: "NH3",
    },
    answer: Choice.A,
  },
  {
    question: "Which country hosted the 2020 Summer Olympics?",
    choices: {
      A: "Japan",
      B: "Brazil",
      C: "South Korea",
      D: "France",
    },
    answer: Choice.A,
  },
  {
    question: "What is the scientific name for humans?",
    choices: {
      A: "Homo sapiens",
      B: "Pan troglodytes",
      C: "Ursus arctos",
      D: "Felis catus",
    },
    answer: Choice.A,
  },
  {
    question: "How many colors are there in the rainbow?",
    choices: {
      A: "3",
      B: "7",
      C: "10",
      D: "12",
    },
    answer: Choice.B,
  },
  {
    question: "What is the largest living land animal?",
    choices: {
      A: "Elephant",
      B: "Giraffe",
      C: "Hippopotamus",
      D: "Rhinoceros",
    },
    answer: Choice.A,
  },
  {
    question: "What is the currency of Canada?",
    choices: {
      A: "Dollar",
      B: "Euro",
      C: "Pound",
      D: "Yen",
    },
    answer: Choice.A,
  },
];
const defaultPrizes: string[] = [
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
];

const rooms: Record<
  string,
  {
    questions: Question[];
    prizes: string[];
    currentQuestion: number;
    usedLifeline: Lifeline[];
  }
> = {};

const initRoom = (room: string) => {
  rooms[room] = {
    questions: defaultQuestions,
    prizes: defaultPrizes,
    currentQuestion: 0,
    usedLifeline: [],
  };
};

const updateData = (room: string) => {
  io.to(room).emit("setQuestions", rooms[room].questions);
  io.to(room).emit("setPrizes", rooms[room].prizes);
  io.to(room).emit("setCurrentQuestion", rooms[room].currentQuestion);
  io.to(room).emit("setUsedLifeline", rooms[room].usedLifeline);
};

io.on("connection", (socket) => {
  socket.on("controlInit", (room) => {
    socket.join(room);
    if (!rooms[room]) {
      initRoom(room);
    }

    updateData(room);

    socket.on("setQuestions", (q) => {
      rooms[room].questions = q;
    });

    socket.on("setPrizes", (p) => {
      rooms[room].prizes = p;
      socket.broadcast.to(room).emit("setPrizes", rooms[room].prizes);
    });

    socket.on("previousQuestion", () => {
      rooms[room].currentQuestion--;
      io.to(room).emit("setCurrentQuestion", rooms[room].currentQuestion);
    });

    socket.on("nextQuestion", () => {
      rooms[room].currentQuestion++;
      io.to(room).emit("setCurrentQuestion", rooms[room].currentQuestion);
    });

    socket.on("revealAnswer", () => {
      socket.broadcast.to(room).emit("revealAnswer");
    });

    socket.on("select", (answer: Choice) => {
      socket.broadcast.to(room).emit("select", answer);
    });

    socket.on("lockAnswer", () => {
      socket.broadcast.to(room).emit("lockAnswer");
    });

    socket.on("lifeline", (lifeline: Lifeline) => {
      rooms[room].usedLifeline.push(lifeline);
      io.emit("setUsedLifeline", rooms[room].usedLifeline);
      socket.broadcast.emit("lifeline", lifeline);
    });

    socket.on("resetLifeline", () => {
      rooms[room].usedLifeline = [];
      io.emit("setUsedLifeline", rooms[room].usedLifeline);
    });

    socket.on("playSound", (sound) => {
      socket.broadcast.emit("playSound", sound);
    });

    socket.on("stopAllSounds", () => {
      socket.broadcast.emit("stopAllSounds");
    });

    socket.on("reset", () => {
      initRoom(room);
      updateData(room);
    });

    socket.on("show", (page) => {
      socket.broadcast.emit("show", page);
    });
  });

  socket.on("init", (room) => {
    socket.join(room);
    if (!rooms[room]) {
      initRoom(room);
    }
    updateData(room);
  });
});

app.get("/sounds", (req: Request, res: Response) => {
  const directoryPath = path.join(__dirname, "public/sounds");
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read sounds directory" });
    }

    const sounds = files.map((file) => file.replace(/\.[^/.]+$/, ""));
    res.json({ sounds });
  });
});

app.use(express.static(path.join(__dirname, "public")));

app.use("*", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
