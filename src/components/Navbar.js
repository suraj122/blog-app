import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="container mx-auto py-6">
      <nav className="flex justify-between items-center">
        <Link className="text-2xl font-bold text-green-600" to="/">
          <h2>Conduit</h2>
        </Link>
        <ul className="flex items-center">
          <li>
            <Link
              className="text-xl text-gray-500 mr-6 hover:text-green-600"
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-xl text-gray-500 mr-6 hover:text-green-600"
              to="/"
            >
              Login
            </Link>
          </li>
          <li>
            <Link className="text-xl text-gray-500 hover:text-green-600" to="/">
              Signup
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
