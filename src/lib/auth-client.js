import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [jwtClient()],
});

const { signIn, signUp, useSession, updateUser, getSession, getToken } =
  authClient;

const signOut = async () => {
  await authClient.signOut();
  window.location.href = "/";
};

export {
  signIn,
  signUp,
  useSession,
  signOut,
  updateUser,
  getSession,
  getToken,
};
