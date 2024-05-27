import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";

import "./globals.css";
import Unauthorized from "@/components/error/Unauthorized";
import NotFound from "@/components/error/NotFound";
import InternalServerError from "@/components/error/InternalServerError";

export default function App() {
  return (
    <Layout>
      <Outlet />
      <Scripts />
    </Layout>
  );
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="w-full h-screen">
        {children}
        <ScrollRestoration />
      </body>
    </html>
  );
};

const ErrorComponents: Record<number, React.ElementType> = {
  401: Unauthorized,
  404: NotFound,
  500: InternalServerError,
};

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    const ErrorComponent = ErrorComponents[error.status] || InternalServerError;

    return (
      <Layout>
        <ErrorComponent />
      </Layout>
    );
  }

  // TODO:一旦雑なエラーページ
  return (
    <Layout>
      <p className="text-red-600">An unexpected error occurred</p>
    </Layout>
  );
}
