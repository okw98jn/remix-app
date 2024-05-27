import { Link } from "@remix-run/react";

const InternalServerError = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] px-4 md:px-6 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-6xl font-bold tracking-tighter">500</h1>
        <p className="text-gray-500 dark:text-gray-400 text-xl">
          Oops, something went wrong on our end.
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          We re working on fixing the issue. Please try again later.
        </p>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          to="/"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default InternalServerError;
