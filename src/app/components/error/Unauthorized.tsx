import { Form } from "@remix-run/react";

const Unauthorized = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="text-9xl font-bold text-gray-900 dark:text-gray-100">
          401
        </div>
        <div className="text-2xl font-medium text-gray-600 dark:text-gray-400">
          Unauthorized
        </div>
        <div className="max-w-md text-center text-gray-500 dark:text-gray-400">
          You do not have permission to access this page. Please check your
          credentials and try again.
        </div>
        {/* フロント側だけログイン状態になることがないよう一応ログアウトしておく */}
        <Form method="post" action="logout">
          <button className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
            ログアウト
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Unauthorized;
