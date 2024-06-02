import type { ActionFunctionArgs } from "@remix-run/node";
import { ValidatedForm, validationError } from "remix-validated-form";
import { useNavigation } from "@remix-run/react";
import { AxiosError } from "axios";

import Header from "@/routes/_auth/components/Header";
import FormItem from "@/routes/_auth/components/FormItem";
import registerValidator from "@/routes/_auth.register/validator";
import LoadingButton from "@/components/element/LoadingButton";
import { loginSession } from "@/services/auth.server";
import { register } from "@/routes/_auth.register/api";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await registerValidator.validate(await request.formData());

  if (formData.error) {
    return validationError(formData.error);
  }

  try {
    const authToken = await register(
      formData.data.email,
      formData.data.password
    );

    return await loginSession(request, authToken);
  } catch (error) {
    const err = error as AxiosError;

    if (err.status === 409) {
      return validationError({
        fieldErrors: {
          email: "メールアドレスは既に使用されています",
        },
      });
    }

    throw err;
  }
}

const Register = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  return (
    <>
      <Header title="アカウント作成" linkText="ログイン" linkPath="/login" />
      <ValidatedForm
        className="space-y-6"
        method="post"
        validator={registerValidator}
      >
        <FormItem
          type="email"
          name="email"
          label="メールアドレス"
          placeholder="sample@example.com"
        />
        <FormItem type="password" name="password" label="パスワード" />
        <LoadingButton
          text="アカウント作成"
          type="submit"
          isLoading={isLoading}
          size="full"
        />
      </ValidatedForm>
    </>
  );
};

export default Register;
