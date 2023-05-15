"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { UserCog } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { updateProfileType } from "@/pages/api/updateProfile";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Button from "@/components/ui/Button";

interface ProfileEditDialogProps {
  userId: string;
  username: string;
  bio: string;
}

export default function ProfileEditDialog({
  userId,
  username,
  bio,
}: ProfileEditDialogProps) {
  const [nameState, setNameState] = useState(username);
  const [bioState, setBioState] = useState(bio);

  const router = useRouter();

  async function updateProfile() {
    if (nameState.trim() === "") {
      toast.error("Invalid username.");
      return;
    }

    if (!userId) {
      return null;
    }
    // biostate check
    let body: updateProfileType = {
      userId: userId,
      username: nameState,
      bio: bioState,
    };

    try {
      let req = await axios.post("/api/updateProfile", body);
      router.refresh();
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Something went wrong, please try again.");
      return;
    }
  }

  const [nameCharState, setNameCharState] = useState(nameState.length);
  const [bioCharState, setBioCharState] = useState(bioState.length);

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="flex h-10 items-center justify-center rounded-md border-2 p-2 px-3"
      >
        {/* manually set button style here, as cant use button tag with as child, need to accept forward passing of ref, and cant nest buttons in dom */}
        <div className="inline-flex cursor-pointer items-center justify-center rounded-md bg-transparent text-sm font-medium text-slate-800 transition-colors hover:bg-slate-200 hover:text-slate-700 disabled:pointer-events-none disabled:opacity-50 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-slate-300">
          Edit Profile{" "}
          <span className="pl-2">
            <UserCog></UserCog>
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="text-slate-800 dark:text-slate-200">
        <DialogHeader>
          <DialogTitle asChild className="text-xl font-bold">
            <p>Edit Profile</p>
          </DialogTitle>
          <div className="flex flex-col">
            <label className="text-lg font-semibold" htmlFor="name">
              Name
            </label>
            <input
              autoComplete="off"
              onChange={({ target }) => {
                setNameState(target?.value);
                setNameCharState(target?.value.length);
              }}
              className="rounded-md bg-slate-300 p-2 dark:bg-slate-700"
              id="name"
              defaultValue={nameState}
              maxLength={30}
              spellCheck={false}
              autoFocus={false}
            />
            <div className="mt-1">
              <span className="float-right">{nameCharState}/30</span>
            </div>

            <label className="text-lg font-semibold" htmlFor="bio">
              Bio
            </label>
            <textarea
              autoComplete="off"
              onChange={({ target }) => {
                setBioState(target?.value);
                setBioCharState(target?.value.length);
              }}
              className="h-32 w-full resize-none whitespace-normal rounded-md bg-slate-300 p-2 scrollbar-thin dark:bg-slate-700"
              id="bio"
              defaultValue={bioState}
              maxLength={255}
              spellCheck={false}
            />
            <div className="mt-1">
              <span className="float-right">{bioCharState}/255</span>
            </div>
          </div>

          <Button
            className="w-1/4 whitespace-nowrap p-2"
            variant="default"
            onClick={() => updateProfile()}
          >
            Submit changes
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
