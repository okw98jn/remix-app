import type {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Form, json, useLoaderData } from "@remix-run/react";

import { authenticator } from "@/services/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "remix" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  return await authenticator.logout(request, { redirectTo: "/login" });
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return json(user);
}

export default function Index() {
  const data = useLoaderData();
  console.log(data);

  return (
    <main>
      <Form method="post">
        <button>ログアウト</button>
      </Form>
    </main>
  );
}
