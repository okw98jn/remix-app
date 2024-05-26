import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";

import { sessionStorage } from "@/services/session.server";
import { login } from "@/routes/_auth.login/api/login";

export const authenticator = new Authenticator<string>(sessionStorage, {
  sessionErrorKey: "auth-error",
});

authenticator.use(
  new FormStrategy(async ({ form }) => {
    try {
      const token = await login(
        String(form.get("email")),
        String(form.get("password"))
      );

      return token;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }),
  "user-login"
);
