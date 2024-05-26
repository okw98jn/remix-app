import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { ValidatedForm, validationError } from "remix-validated-form";
import { useLoaderData, useNavigation } from "@remix-run/react";
import { TriangleAlert } from "lucide-react";

import Header from "@/routes/_auth/components/Header";
import FormItem from "@/routes/_auth/components/FormItem";
import loginValidator from "@/routes/_auth.login/validator/loginValidator";
import { authenticator } from "@/services/auth.server";
import { commitSession, getSession } from "@/services/session.server";
import LoadingButton from "@/components/element/LoadingButton";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await loginValidator.validate(
    await request.clone().formData()
  );

  if (formData.error) {
    return validationError(formData.error);
  }

  return await authenticator.authenticate("user-login", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));
  const errorMessage = session.get(authenticator.sessionErrorKey)?.message;

  return json(
    { errorMessage },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

const Login = () => {
  const { errorMessage } = useLoaderData<typeof loader>();

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
        {errorMessage && (
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
