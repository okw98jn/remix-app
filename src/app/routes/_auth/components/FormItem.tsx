import { useField } from "remix-validated-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  type: "email" | "password";
  name: "email" | "password";
  label: "メールアドレス" | "パスワード";
  placeholder?: "sample@example.com";
};

const FormItem: React.FC<Props> = ({ type, name, label, placeholder }) => {
  const { error, getInputProps } = useField(name);

  return (
    <div className="grid w-full items-center gap-2">
      <Label htmlFor={name} className={error ? "text-red-500" : ""}>
        {label}
      </Label>
      <Input
        {...getInputProps({ id: name })}
        type={type}
        id={name}
        placeholder={placeholder}
        name={name}
        required
        className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default FormItem;
