"use client";
import { Button } from "@ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

/**
 * @explaination - This component is a button that when clicked, will sign the user in with google
 * @returns - A button that when clicked, will sign the user in with google
 * @clientonly
 */
const ProfileMenuUnlogged = () => (
  <Button onClick={() => signIn("google")} className="font-semibold rounded-full px-8 " size="sm">
    Login
  </Button>
);

export default ProfileMenuUnlogged;
