import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

const registerValidator = withZod(
  z.object({
    email: z
      .string()
      .min(1, { message: "メールアドレスを入力してください" })
      .max(255, { message: "メールアドレスは255文字以内で入力してください" })
      .email({ message: "メールアドレスを正しい形式で入力してください" }),
    password: z
      .string()
      .min(4, { message: "パスワードは4文字以上入力してください" })
      .max(255, { message: "パスワードは255文字以内で入力してください" }),
  })
);

export default registerValidator;
