"use server";

import { ActionResponse, errorResponse } from "@/types/global";
import action from "../handlers/action";
import { AskAQuestionSchema } from "../validations";
import handleError from "../handlers/error";
import mongoose from "mongoose";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import TagQuestion from "@/database/tag-question.model";

export async function createQuestion(
  params: CreateQuestionParams
): Promise<ActionResponse<Question>> {
  const validationResult = await action({
    params,
    schema: AskAQuestionSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as errorResponse;
  }

  console.log("validationResult:", validationResult);
  const { title, content, tags } = validationResult.params!;
  const userId = validationResult?.session?.user?.id;

  console.log("createQuestion params:", validationResult.params);
  console.log("userId:", userId);
  console.log("title:", title, "content:", content, "tags:", tags);

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    console.log("Creating question with:", {
      title,
      content,
      author: new mongoose.Types.ObjectId(userId),
    });
    const [question] = await Question.create(
      [
        {
          title,
          content,
          author: new mongoose.Types.ObjectId(userId),
        },
      ],
      { session }
    );

    if (!question) {
      throw new Error("Failed to create question");
    }

    const tagIds: mongoose.Types.ObjectId[] = [];

    const tagQuestionDocuments = [];

    // explanation of regex:
    // ^ asserts position at start of a line
    // $ asserts position at end of a line
    // i for case insensitive
    // generally here we want to avoid duplicate tags with different cases and ensure uniqueness
    for (const tag of tags) {
      // use regex for name
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $inc: { questions: 1 } },
        { new: true, upsert: true, session }
      );

      tagIds.push(existingTag._id);

      tagQuestionDocuments.push({
        tag: existingTag._id,
        question: question._id,
      });
    }

    await TagQuestion.insertMany(tagQuestionDocuments, { session });

    await Question.findByIdAndUpdate(
      question._id,
      { $push: { tags: tagIds } },
      { session }
    );

    await session.commitTransaction();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(question)),
      status: 201,
    };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as errorResponse;
  } finally {
    session.endSession();
  }
}
