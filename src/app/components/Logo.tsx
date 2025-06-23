// src\app\components\Logo.tsx
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
<img src="/favicon.ico" alt="logo" />  {/* fix logo / brand image here */}
      <h1
        className={`text-2xl font-bold tracking-wider ml-2 text-white transition-opacity duration-300 ${className} ${
          collapsed ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* EBC */}
        {/* <span className="text-green-300">.</span> */}
      </h1>
    </Link>
  );
};

export default Logo;
