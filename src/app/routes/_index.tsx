import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json } from "@remix-run/react";

import axiosInstance from "@/axiosSetting";
import {
  getAuthTokenSession,
  redirectIfUnauthenticated,
} from "@/services/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "remix" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const authToken = await getAuthTokenSession(request);
  await redirectIfUnauthenticated(authToken);

  await axiosInstance.get("users", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return json({ authToken });
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
