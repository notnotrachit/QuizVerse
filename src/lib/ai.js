"use server";

import Instructor from "@instructor-ai/instructor";
import { z } from "zod";
import Groq from "groq-sdk";

export default async function AIQuestion(quizName, quizDescription) {
  const groqClient = new Groq({
    apiKey: `${process.env.GROQ_API_KEY}`,
  });

  const Question_Schema = z.object({
    question: z.string(),
    answer: z.string(),
    options: z.array(z.string()),
    explanation: z.string().describe("Explanation for the correct answer"),
  });

  const client = Instructor({
    client: groqClient,
    mode: "FUNCTIONS",
  });

    const q = await client.chat.completions.create({
      model: "llama3-groq-70b-8192-tool-use-preview",
      response_model: { schema: Question_Schema, name: "Question" },
      messages: [
        {
          role: "user",
          content: `Give me a tricky mcq question based on ${quizName}.
          The description of the question is ${quizDescription}.
          `,
        },
      ],
    });
    console.log(q);
    return q;



}
