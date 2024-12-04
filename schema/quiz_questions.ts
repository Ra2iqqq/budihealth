import { quizsTypes } from "./quizs";

export interface quiz_questionsTypes {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  quiz_id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  expand: {
    quiz_id: quizsTypes;
  };
}
