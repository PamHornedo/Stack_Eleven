import Question from "../models/Question";

export const resolvers = {
  Query: {
    questions: async () => {
      try {
        const questions = await Question.find().sort({ createdAt: -1 });
        console.log(`Found ${questions.length} questions`);
        return questions;
      } catch (error) {
        console.error("Error in questions resolver:", error);
        throw new Error("Failed to fetch questions");
      }
    },

    question: async (_parent, args) => {
      try {
        const question = await Question.findById(args.id);

        if (!question) {
          console.log(`Question not found: ${args.id}`);
          return null;
        }

        console.log(`Found question: ${question.title}`);
        return question;
      } catch (error) {
        console.error("Error in question resolver:", error);
        throw new Error(`Failed to fetch question with ID: ${args.id}`);
      }
    },
  },
};
