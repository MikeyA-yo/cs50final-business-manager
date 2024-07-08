import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { clientPromise } from "../mongodb";
import { Collection } from "mongodb";
import { Google } from "arctic";

export const google = new Google(
  process.env.GOOGLE_CLIENTID as string,
  process.env.GOOGLE_CLIENTSECRET as string,
  "/api/auth/callback"
);
const client = await clientPromise;
const db = client.db("BusinessManager");
const User = db.collection("users") as Collection<UserDoc>;
const Session = db.collection("sessions") as Collection<SessionDoc>;

const adapter = new MongodbAdapter(Session, User);

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

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
  }
}

interface UserDoc {
  _id: string;
  name: string;
  email: string;
}
interface DatabaseUserAttributes {
  _id: string;
  name: string;
  email: string;
}

interface DatabaseSessionAttributes {
  _id: string;
  expires_at: Date;
  user_id: string;
}
interface SessionDoc {
  _id: string;
  expires_at: Date;
  user_id: string;
}
