export type Card = {
  question: string;
  answer: string;
  wrongAnswers: string[];
  userId: string;
};

export type User = {
  id: string;
  name: string;
};
