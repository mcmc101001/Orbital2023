import { getCurrentUser } from "@/lib/session";
import { User } from "lucide-react";
import Image from "next/image";
import LogoutButton from "@/components/LogoutButton";
import LoginButton from "@/components/LoginButton";

async function UserProfilePic() {
  const user = await getCurrentUser();
  return (
    <li className="mb-2 mt-2 flex flex-col items-center justify-center gap-y-4">
      {user ? (
        <>
          <Image
            loading="lazy"
            src={user.image!}
            alt={user.name ?? "profile image"}
            referrerPolicy="no-referrer"
            width={50}
            height={50}
          />
          <LogoutButton />
        </>
      ) : (
        <>
          <User className="h-12 w-12 text-slate-800 dark:text-slate-200" />
          <LoginButton />
        </>
      )}
    </li>
  );
}

export default UserProfilePic;
