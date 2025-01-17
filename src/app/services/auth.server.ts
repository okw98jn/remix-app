import { redirect } from "@remix-run/node";

import { commitSession, getSession } from "@/services/session.server";

export async function loginSession(request: Request, authToken: string) {
  const session = await getSession(request.headers.get("cookie"));

  session.set("authToken", authToken);
  session.flash("flashToast", {
    message: "ログインしました",
    type: "success",
  });

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function getAuthTokenSession(request: Request) {
  const session = await getSession(request.headers.get("cookie"));

  const authToken: string = session.get("authToken");

  if (!authToken) {
    return null;
  }

  return authToken;
}

export async function redirectIfUnauthenticated(authToken: string | null) {
  if (!authToken) {
    throw new Response("Unauthorized", { status: 401 });
  }
}

export async function redirectIfAuthenticated(request: Request) {
  const session = await getSession(request.headers.get("cookie"));
  session.flash("flashToast", {
    message: "すでにログインしています",
    type: "error",
  });

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
