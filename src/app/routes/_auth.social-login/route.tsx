import { ActionFunctionArgs, json } from "@remix-run/node";
import { getSocialLoginUrl } from "@/routes/_auth.social-login/api";
import { SocialLoginProvider } from "@/routes/_auth.social-login/type";

export async function action({ request }: ActionFunctionArgs) {
  const provider = (await request.formData())
    .get("provider")
    ?.toString()
    .toLowerCase() as SocialLoginProvider;

  const socialLoginUrl = await getSocialLoginUrl(provider);
  return json(socialLoginUrl);
}
