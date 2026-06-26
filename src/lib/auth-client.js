import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

const { signIn, signUp, useSession, updateUser, getSession } = authClient;

const signOut = async () => {
  await authClient.signOut();
  window.location.href = "/";
};

export { signIn, signUp, useSession, signOut, updateUser, getSession };
