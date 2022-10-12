import React from "react";
import { Link } from "react-router-dom";
import validate from "../utils/validate";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
      },
    };
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };

    validate(name, value, errors);

    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    let { email, password, errors } = this.state;
    return (
      <section className="mx-auto max-w-lg py-12">
        <header className="text-center">
          <h1 className=" text-5xl">Sign in</h1>
          <h6 className="mt-4 text-green-600 text-xl">
            <Link to="/signup">Need an account?</Link>
          </h6>
        </header>
        <form
          className="mt-8 text-center"
          action=""
          onSubmit={this.handleSubmit}
        >
          <input
            className="block w-full border px-4 py-2 mb-3"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />
          <span className="text-xl text-red-600">{errors.email}</span>
          <input
            className="block w-full border px-4 py-2 mb-3 mt-8"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
          />
          <span className="text-xl text-red-600">{errors.password}</span>
          <div className="text-right mt-6">
            <button
              disabled={errors.email || errors.password}
              className="bg-green-600 text-white text-xl px-4 py-2 disabled:bg-gray-400"
            >
              Sign in
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default Login;
