"use server";

import { lucia } from "@/lib/auth";
import db from "@/lib/db";
import { schemaSignIn, schemaSignUp } from "@/lib/schema";
import { ActionResult } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

export async function signIn(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaSignIn.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }

  const existingUser = await db.user.findFirst({
    where: {
      email: validate.data.email,
      role: "customer",
    },
  });

  if (!existingUser) {
    return {
      error: "Email not found",
    };
  }

  const comparePassword = bcrypt.compareSync(
    validate.data.password,
    existingUser.password
  );

  if (!comparePassword) {
    return {
      error: "Email or password incorrect",
    };
  }

  const session = await lucia.createSession(String(existingUser.id), {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/");
}

export async function signUp(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validated = schemaSignUp.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return {
      error: validated.error.errors[0].message,
    };
  }

  const hashPassword = bcrypt.hashSync(validated.data.password, 12);

  try {
    await db.user.create({
      data: {
        email: validated.data.email,
        name: validated.data.name,
        password: hashPassword,
        role: "customer",
      },
    });
  } catch (error) {
    console.log(error);

    if (error instanceof Error && "code" in error) {
      switch (error.code) {
        case "P2002":
          return {
            error: "An account with this email already exists",
          };
        case "P2000":
          return {
            error: "Invalid data provided",
          };
        default:
          break;
      }
    }

    return {
      error: "Failed to sign up",
    };
  }

  return redirect("/sign-in");
}
