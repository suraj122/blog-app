import React from "react";
import { userVerifying } from "../utils/constant";
import { withRouter } from "../utils/withRouter";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      email: user.email,
      bio: user.bio === undefined ? "" : user.bio,
      image: user.image === undefined ? "" : user.image,
      username: user.username,
      password: "",
      errors: {
        email: "",
        bio: "",
        image: "",
        username: "",
        password: "",
      },
    };
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };
    this.setState({
      [name]: value,
      errors,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, bio, image, username, password } = this.state;
    const { navigate } = this.props;
    fetch(userVerifying, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        user: {
          email,
          bio,
          image,
          username,
          password,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Cannot update user");
        }
        return res.json();
      })
      .then(({ user }) => {
        navigate(`/${username}`);
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    const { email, bio, image, username, password } = this.state;
    return (
      <section className="container mx-auto mt-12">
        <h1 className="text-center text-3xl font-bold mb-8">Your Settings</h1>
        <div className="max-w-xl mx-auto pb-8">
          <form onSubmit={this.handleSubmit} className="text-right" action="">
            <input
              className="block w-full border px-4 py-3 rounded-sm"
              type="text"
              placeholder="URL of profile picture"
              value={image}
              name="image"
              onChange={this.handleChange}
            />
            <input
              className="block w-full border px-4 py-3 rounded-sm mt-4"
              type="text"
              value={username}
              name="username"
              onChange={this.handleChange}
            />
            <textarea
              className="block w-full border px-4 py-3 rounded-sm mt-4"
              name="bio"
              id=""
              rows="6"
              placeholder="Short bio"
              value={bio}
              onChange={this.handleChange}
            ></textarea>
            <input
              className="block w-full border px-4 py-3 rounded-sm mt-4"
              type="email"
              placeholder="suraj@altcampus.io"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <input
              className="block w-full border px-4 py-3 rounded-sm mt-4"
              type="password"
              placeholder="New Password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            <button
              onClick={this.handleSubmit}
              className="mt-8 bg-green-500 text-white px-4 py-2 text-xl rounded-md"
            >
              Update Settings
            </button>
          </form>
          <div className="border-t mt-4 pt-8">
            <button
              onClick={this.props.logout}
              className="border border-red-400 text-red-400 px-4 py-3 rounded-md hover:bg-red-400 hover:text-white"
            >
              or click here to logout
            </button>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Settings);
