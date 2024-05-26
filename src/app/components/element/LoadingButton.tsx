import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  text: string;
  type: "button" | "submit";
  isLoading: boolean;
  size?: "full";
};

const LoadingButton: React.FC<Props> = ({ text, type, isLoading, size }) => {
  return (
    <Button size={size} type={type} disabled={isLoading}>
      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : text}
    </Button>
  );
};

export default LoadingButton;
