import { Link, NavLink } from "react-router-dom";

function Navbar(props) {
  return (
    <header className="py-4 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <Link className="text-2xl font-bold text-green-600" to="/">
          <h2>Conduit</h2>
        </Link>
        <div>{props.isLoggedin ? <AuthNavbar /> : <NonAuthNavbar />}</div>
      </nav>
    </header>
  );
}

function NonAuthNavbar() {
  return (
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
  );
}

function AuthNavbar() {
  return (
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
          to="/new-post"
        >
          New Post
        </NavLink>
      </li>
      <li>
        <NavLink
          activeclassname="active"
          className="text-xl text-gray-500 mr-6 hover:text-green-600"
          to="/settings"
        >
          Settings
        </NavLink>
      </li>
      <li>
        <NavLink
          activeclassname="active"
          className="text-xl text-gray-500 hover:text-green-600"
          to="/profile"
        >
          Profile
        </NavLink>
      </li>
    </ul>
  );
}

export default Navbar;
