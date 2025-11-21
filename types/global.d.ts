import { NextResponse } from "next/server";

interface Tag {
  _id: string;
  name: string;
  icon?: string;
  typeIcon?: string;
}

interface Author {
  _id: string;
  name: string;
  image?: string;
}

interface Question {
  _id: string;
  title: string;
  tags: Tags[];
  author: Author;
  createdAt: Date;
  upvotes: number;
  answers: number;
  views: number;
}

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status: number;
};

type successResponse<T = null> = ActionResponse<T> & { success: true };

type errorResponse = ActionResponse<null> & { success: false };

type APIErrorResponse = NextResponse<errorResponse>;
type APIResponse<T = null> = NextResponse<successResponse<T> | errorResponse>;
