import { Link } from "react-router";

const Logo = ({
  collapsed = false,
  className,
}: {
  collapsed?: boolean;
  className?: string;
}) => {
  return (
    <Link className="flex items-center" to="/">
      <img src={import.meta.env.VITE_CLIENT_URL + "/favicon.ico"} alt="logo" />
      <h1
        className={`text-2xl font-bold tracking-wider ml-2 text-white transition-opacity duration-300 ${className} ${
          collapsed ? "opacity-0" : "opacity-100"
        }`}
      >
        EBC
        <span className="text-green-300">.</span>
      </h1>
    </Link>
  );
};

export default Logo;
