import { routerParams } from "@/types/global";
import React from "react";

const QuestionDetails = async ({ params }: routerParams) => {
  const { id } = await params;

  // Fetch question details using the id
  // const question = await getQuestionById(id);

  return <div>Question Page: {id} </div>;
};

export default QuestionDetails;
