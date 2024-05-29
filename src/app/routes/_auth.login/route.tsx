import {
  json,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { ValidatedForm, validationError } from "remix-validated-form";
import { useLoaderData, useNavigation } from "@remix-run/react";
import { TriangleAlert } from "lucide-react";

import Header from "@/routes/_auth/components/Header";
import FormItem from "@/routes/_auth/components/FormItem";
import loginValidator from "@/routes/_auth.login/validator/loginValidator";
import { loginSession } from "@/services/auth.server";
import { commitSession, getSession } from "@/services/session.server";
import LoadingButton from "@/components/element/LoadingButton";
import { login } from "./api/login";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await loginValidator.validate(
    await request.clone().formData()
  );

  if (formData.error) {
    return validationError(formData.error);
  }

  const session = await getSession(request.headers.get("cookie"));

  const authToken = await login(formData.data.email, formData.data.password);

  if (!authToken) {
    session.flash("isLoginFailed", true);

    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return await loginSession(request, authToken);
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));
  const isLoginFailed = session.get("isLoginFailed") ?? false;

  return json(isLoginFailed, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

const Login = () => {
  const isLoginFailed = useLoaderData<typeof loader>();

  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  return (
    <>
      <Header title="ログイン" linkText="アカウント作成" linkPath="/register" />
      <ValidatedForm
        className="space-y-6"
        method="post"
        validator={loginValidator}
      >
        <FormItem
          type="email"
          name="email"
          label="メールアドレス"
          placeholder="sample@example.com"
        />
        <FormItem type="password" name="password" label="パスワード" />
        {isLoginFailed && (
          <div className="text-red-500 text-sm border border-red-500 rounded px-4 py-2 flex items-center">
            <TriangleAlert className="mr-4 w-5" />
            <p>
              <span className="block">ログイン失敗</span>
              <span className="text-xs">
                メールアドレスとパスワードを確認してください
              </span>
            </p>
          </div>
        )}
        <LoadingButton
          text="ログイン"
          type="submit"
          isLoading={isLoading}
          size="full"
        />
      </ValidatedForm>
    </>
  );
};

export default Login;
