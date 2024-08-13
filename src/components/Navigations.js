import { Link } from "react-router-dom";

export default function Navigations() {

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link to="/cabins" className="hover:text-accent-400 transition-colors">
            Cabins
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li>
       <Link
            to="/account"
            className="hover:text-accent-400 transition-colors"
          >
            Guest area
          </Link> 
        </li>
      </ul>
    </nav>
  );
}
