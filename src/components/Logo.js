import { Link } from "react-router-dom";


function Logo() {
    return (
      <Link to="/" className="flex items-center gap-4 z-10">
        <img src='../../logo.png' className="h-10 w-10" alt="The Wild Oasis logo"/>
        <span className="text-xl font-semibold text-primary-100">
          Luxurious
        </span>
      </Link>
    );
  }
  
  export default Logo;