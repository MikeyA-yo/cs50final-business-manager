"use server";

import { redirect } from "next/navigation";

export async function CreateAccount(data: FormData) {
  const name = data.get("FirstName");
  const lastName = data.get("LastName");
  const email = data.get("email");
  const password = data.get("password");
  if (name && lastName && email && password) {
    const username = `${name} ${lastName}`;
    const res = await fetch("/api/auth/login/email/create", {
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
    const res = await fetch("/api/auth/login/email", {
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
    return redirect("/");
  }
}
