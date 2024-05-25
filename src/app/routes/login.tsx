import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-4 py-12 dark:bg-gray-900">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Or{" "}
              <a
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
                href="#"
              >
                create a new account
              </a>
            </p>
          </div>
          <form className="space-y-6">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
            <Button size={"full"}>Sign in</Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                Or sign in with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button className="whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-5 w-5 mr-2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="4"></circle>
                <line x1="21.17" x2="12" y1="8" y2="8"></line>
                <line x1="3.95" x2="8.54" y1="6.06" y2="14"></line>
                <line x1="10.88" x2="15.46" y1="21.94" y2="14"></line>
              </svg>
              Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
