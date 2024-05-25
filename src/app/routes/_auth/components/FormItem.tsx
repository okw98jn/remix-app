import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  type: "email" | "password";
  name: "email" | "password";
  label: "Email" | "Password";
  placeholder: "Email" | "Password";
};

const FormItem: React.FC<Props> = ({ type, name, label, placeholder }) => {
  return (
    <div className="grid w-full items-center gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        id={name}
        placeholder={placeholder}
        name={name}
        required
      />
    </div>
  );
};

export default FormItem;
