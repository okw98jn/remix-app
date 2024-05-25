type Props = {
  provider: "Google" | "GitHub";
  providerImage: string;
};

const SocialAuthButton: React.FC<Props> = ({ provider, providerImage }) => {
  return (
    <button className="whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex justify-center items-center">
      <img src={providerImage} alt={provider} className="w-6 mr-2" />
      <span>{provider}でログインする</span>
    </button>
  );
};

export default SocialAuthButton;
