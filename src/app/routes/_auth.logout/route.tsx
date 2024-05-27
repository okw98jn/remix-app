import { authenticator } from "@/services/auth.server";
import { ActionFunction, ActionFunctionArgs } from "@remix-run/node";

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  return await authenticator.logout(request, { redirectTo: "/login" });
};
