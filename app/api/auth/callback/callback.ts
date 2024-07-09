import { cookies } from "next/headers";
import { google, lucia } from "../auth";
import { OAuth2RequestError } from "arctic";
import { clientPromise } from "../../mongodb";
export async function callback(req: Request) {
  const client = await clientPromise;
  const db = client.db("BusinessManager");
  const users = db.collection("users");
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("state")?.value ?? null;
  const storedCodeVerifier = cookies().get("code_verifier")?.value ?? null;
  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !storedCodeVerifier
  ) {
    return new Response(null, {
      status: 400,
    });
  }
  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier
    );
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
    const user: User = await response.json();
    const userId = await users.findOne({ email: user.email });
    if (userId) {
      const session = await lucia.createSession(userId._id, {});
      const sesssionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sesssionCookie.name,
        sesssionCookie.value,
        sesssionCookie.attributes
      );
      
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }
    const newUser = await users.insertOne({email:user.email, name:user.name,image:user.picture});
    const session = await lucia.createSession(newUser.insertedId, {});
    const sesssionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sesssionCookie.name,
        sesssionCookie.value,
        sesssionCookie.attributes
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      const { request, message, description } = e;
      console.log(request, message, description);
      return new Response(null, {
        status: 400,
        headers: {
          Location: "/",
        },
      });
    }
    return new Response(null, {
        status: 400,
        headers: {
          Location: "/",
        },
      });
    // unknown error
  }
}
interface User {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
}
