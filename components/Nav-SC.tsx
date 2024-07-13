import { auth } from "@/app/api/auth/auth";
import Nav, { userPreview } from "./Nav";
//btw sc stands for server component
export default async function NavSc() {
  const { user } = await auth();
  let clientUser: userPreview | null;
  if (user) {
    clientUser = {
      name: user.name,
      email: user.email,
    };
  } else {
    clientUser = user;
  }
  return <Nav user={clientUser} />;
}
