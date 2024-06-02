import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { googleLogin } from "@/routes/_auth.google.callback/api";
import { loginSession } from "@/services/auth.server";
import { commitSession, getSession } from "@/services/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const code = new URL(request.url).searchParams.get("code");

  // キャンセルされた場合はcodeがないのでログイン画面にリダイレクト
  if (!code) {
    return redirect("/login");
  }

  const authToken = await googleLogin(code);

  if (!authToken) {
    const session = await getSession(request.headers.get("cookie"));

    session.flash("loginFailed", {
      title: "ログイン失敗",
      description: "Googleログインに失敗しました。もう一度お試しください",
    });

    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return await loginSession(request, authToken);
}
