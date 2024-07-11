"use server";

import { redirect } from "next/navigation";
import { formdata } from "./emailsignin";

export async function CreateAccount(data: formdata) {
  const name = data.firstName;
  const lastName = data.lastName;
  const email = data.email;
  const password = data.password;
  if (name && lastName && email && password) {
    const username = `${name} ${lastName}`;
    const res = await fetch("http://localhost:3000/api/auth/login/email/create", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    if (res.status == 302) {
      return redirect("/");
    }
    if (res.status == 400) {
      const text = await res.text();
      return redirect(`/error/${text}`);
    }
  } else if(email && password) {
    const res = await fetch("http://localhost:3000/api/auth/login/email", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (res.status == 302) {
      return redirect("/");
    }
    if (res.status == 400) {
      const text = await res.text();
      return redirect(`/error/${text}`);
    }
     redirect("/");
  }
}
