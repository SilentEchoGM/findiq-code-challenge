export type Card = {
  question: string;
  answer: string;
  wrongAnswers: string;
  userId: string;
  id: number;
};

export const isCard = (card: unknown): card is Card =>
  typeof card === "object" &&
  card !== null &&
  "question" in card &&
  "answer" in card &&
  "wrongAnswers" in card &&
  "userId" in card;

export type User = {
  id: string;
  name: string;
};

export const isUser = (user: unknown): user is User =>
  typeof user === "object" && user !== null && "id" in user && "name" in user;
