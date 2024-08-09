import { Lucia, Session, User } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { client as m, clientPromise } from "../mongodb";
import { Collection, ObjectId } from "mongodb";
import { Google } from "arctic";
import { cookies } from "next/headers";
import { cache } from "react";

export const google = new Google(
  process.env.GOOGLE_CLIENTID as string,
  process.env.GOOGLE_CLIENTSECRET as string,
  "https://businessmanager-khaki.vercel.app/api/auth/callback"
);
async function connect() {
  await clientPromise;
}
connect()
const client = m;
const db = client.db("BusinessManager");
const user = db.collection("users") as Collection<UserDoc>;
const session = db.collection("sessions") as Collection<SessionDoc>;

const adapter = new MongodbAdapter(session, user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (data) => {
    return data;
  },
  getSessionAttributes: (data) => {
    return data;
  },
});

export const auth = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }
    const result = await lucia.validateSession(sessionId);
    try {
      if (result.session?.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {}
    return result;
  }
);

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    UserId: ObjectId;
    DatabaseUserAttributes: DatabaseUserAttributes;
    // DatabaseSessionAttributes: DatabaseSessionAttributes;
  }
}

interface UserDoc {
  _id: ObjectId;
  name: string;
  email: string;
  image:string;
}
interface DatabaseUserAttributes {
  _id: ObjectId;
  name: string;
  email: string;
  image:string;
}

// interface DatabaseSessionAttributes {
//   _id: ObjectId;
//   expires_at: Date;
//   user_id: string;
// }
interface SessionDoc {
  _id: string;
  expires_at: Date;
  user_id: ObjectId;
}
