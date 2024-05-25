import { Button } from "@/components/ui/button";
import Header from "@/routes/_auth/components/Header";
import FormItem from "@/routes/_auth/components/FormItem";

const Login = () => {
  return (
    <>
      <Header
        title="Sign in to your account"
        linkText="create a new account"
        linkPath="/register"
      />
      <form className="space-y-6">
        <FormItem type="email" name="email" label="Email" placeholder="Email" />
        <FormItem
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
        />
        <Button size={"full"}>Sign in</Button>
      </form>
    </>
  );
};

export default Login;
