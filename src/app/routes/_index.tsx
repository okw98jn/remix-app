import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { authenticator } from "@/services/auth.server";
import axiosInstance from "@/axiosSetting";

export const meta: MetaFunction = () => {
  return [
    { title: "remix" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  await axiosInstance.get("users", {
    headers: {
      Authorization: `Bearer ${user}`,
    },
  });

  return 1;
}

export default function Index() {
  return (
    <main>
      <Form method="post" action="logout">
        <button>ログアウト</button>
      </Form>
    </main>
  );
}
