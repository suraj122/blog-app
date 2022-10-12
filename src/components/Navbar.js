import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="py-4 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <Link className="text-2xl font-bold text-green-600" to="/">
          <h2>Conduit</h2>
        </Link>
        <ul className="flex items-center">
          <li>
            <NavLink
              activeclassname="active"
              className="text-xl text-gray-500 mr-6 hover:text-green-600"
              to="/"
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              activeclassname="active"
              className="text-xl text-gray-500 mr-6 hover:text-green-600"
              to="/signin"
            >
              Signin
            </NavLink>
          </li>
          <li>
            <NavLink
              activeclassname="active"
              className="text-xl text-gray-500 hover:text-green-600"
              to="/signup"
            >
              Signup
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
