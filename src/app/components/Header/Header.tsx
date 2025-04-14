import { Button } from "antd";
import Logo from "../Logo";
import Navigation from "./Navigation";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white text-[#8B7156] shadow-sm fixed top-0 left-0 w-full z-100">
      <div className="container mx-auto px-4 md:px-10 lg:px-16 xl:px-20">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex-shrink-0 ml-0 md:ml-6">
            <Logo className="text-[#8B7156]" />
          </div>
          
          {/* Navigation - Center */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <Navigation />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3 md:space-x-5 mr-0 md:mr-6">
            {/* Search Icon */}
            <button className="text-[#8B7156] hover:text-[#64503C] transition-colors">
              <FiSearch className="w-6 h-6" />
            </button>
            
            {/* Cart Icon */}
            <button className="text-[#8B7156] hover:text-[#64503C] transition-colors relative">
              <FiShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-[#8B7156] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
            
            {/* Sign In Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="text-[#8B7156] hover:text-[#64503C] transition-colors text-lg font-medium">
                Sign In
              </Link>
              <Button 
                className="bg-[#8B7156] text-white border-0 hover:bg-[#64503C] rounded-md h-10 text-base font-medium px-4"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </div>
            
            {/* Mobile menu button - shown only on mobile */}
            <button className="lg:hidden text-[#8B7156] hover:text-[#64503C]">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
