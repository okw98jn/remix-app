import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { ValidatedForm, validationError } from "remix-validated-form";

import { Button } from "@/components/ui/button";
import Header from "@/routes/_auth/components/Header";
import FormItem from "@/routes/_auth/components/FormItem";
import loginValidator from "@/routes/_auth.login/validator/loginValidator";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await loginValidator.validate(await request.formData());

  if (formData.error) {
    return validationError(formData.error);
  }

  return redirect("/");
}

const Login = () => {
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
        <Button size={"full"} type="submit">
          ログイン
        </Button>
      </ValidatedForm>
    </>
  );
};

export default Login;
