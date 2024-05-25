import { Link } from "@remix-run/react";

type Props = {
  title: "ログイン" | "アカウント作成";
  linkText: "アカウント作成" | "ログイン";
  linkPath: "/login" | "/register";
};

const Header: React.FC<Props> = ({ title, linkText, linkPath }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
        {title}
      </h2>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        <Link
          to={linkPath}
          className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
        >
          {linkText}はこちら
        </Link>
      </p>
    </div>
  );
};

export default Header;
