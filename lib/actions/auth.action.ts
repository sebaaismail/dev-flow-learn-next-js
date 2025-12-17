"use server";

import { ActionResponse, errorResponse } from "@/types/global";
import action from "../handlers/action";
import { SignInSchema, SignUpSchema } from "../validations";
import handleError from "../handlers/error";
import mongoose from "mongoose";
import User from "@/database/user.model";
import bcrypt from "bcryptjs";
import Account from "@/database/account.model";
import { signIn } from "@/auth";
import { NotFoundError } from "../http-errors";

export async function signUpWithCredentials(
  params: AuthCredentials
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: SignUpSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ActionResponse;
  }

  const { name, username, email, password } = validationResult.params!;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingUser = await User.findOne({ email }).session(session);

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const existingUsername = await User.findOne({ username }).session(session);

    if (existingUsername) {
      throw new Error("Username is already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [newUser] = await User.create([{ name, username, email }], {
      session,
    });

    await Account.create(
      [
        {
          userId: newUser._id,
          name,
          provider: "credentials",
          providerAccountId: email,
          password: hashedPassword,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    await signIn("credentials", { email, password, redirect: false });

    return { data: null, success: true, status: 200 };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as errorResponse;
  } finally {
    await session.endSession();
  }
}

export async function signInWithCredentials(
  params: Pick<AuthCredentials, "email" | "password">
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: SignInSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ActionResponse;
  }

  const { email, password } = validationResult.params!;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) throw new NotFoundError("User");

    const existingAccount = await Account.findOne({
      provider: "credentials",
      providerAccountId: email,
    });

    if (!existingAccount) throw new NotFoundError("Account");

    const passwordMatch = await bcrypt.compare(
      password,
      existingAccount.password!
    );

    if (!passwordMatch) throw new Error("Password is incorrect");

    await signIn("credentials", { email, password, redirect: false });

    return { data: null, success: true, status: 200 };
  } catch (error) {
    return handleError(error) as errorResponse;
  }
}
