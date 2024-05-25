import { Button } from "@/components/ui/button";
import Header from "@/routes/_auth/components/Header";
import FormItem from "@/routes/_auth/components/FormItem";

const Register = () => {
  return (
    <>
      <Header
        title="Create a new account"
        linkText="sign in to your account"
        linkPath="/login"
      />
      <form className="space-y-6">
        <FormItem type="email" name="email" label="Email" placeholder="Email" />
        <FormItem
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
        />
        <Button size={"full"}>Sign up</Button>
      </form>
    </>
  );
};

export default Register;
