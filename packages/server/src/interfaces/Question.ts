import { Choice } from "./Answer";

export default interface Question {
  question: string;
  choices: {
    [Choice.A]: string;
    [Choice.B]: string;
    [Choice.C]: string;
    [Choice.D]: string;
  };
  answer: Choice;
}
