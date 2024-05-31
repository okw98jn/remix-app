import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, useLoaderData } from "@remix-run/react";

import axiosInstance from "@/axiosSetting";
import {
  getAuthTokenSession,
  redirectIfUnauthenticated,
} from "@/services/auth.server";
import { commitSession, getSession } from "@/services/session.server";
import { useEffect } from "react";
import { Toaster, showToast } from "@/components/ui/sonner";

export const meta: MetaFunction = () => {
  return [
    { title: "remix" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const authToken = await getAuthTokenSession(request);
  await redirectIfUnauthenticated(authToken);

  const session = await getSession(request.headers.get("cookie"));
  const flashToast = await session.get("flashToast");

  if (flashToast) {
    return json(flashToast, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  await axiosInstance.get("users", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return null;
}

export default function Index() {
  const flashToast = useLoaderData<typeof loader>();

  useEffect(() => {
    if (flashToast) {
      showToast(flashToast.message, flashToast.type);
    }
  }, [flashToast]);

  return (
    <main>
      <Form method="post" action="logout">
        <button>ログアウト</button>
      </Form>
      <Toaster richColors />
    </main>
  );
}
