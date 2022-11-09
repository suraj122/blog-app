import React from "react";
import { articlesURL } from "../utils/constant";

class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      body: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let slug = this.props.slug;
    const { body } = this.state;
    fetch(articlesURL + "/" + slug + "/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        comment: {
          body,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Cannot comment");
        } else {
          return res.json();
        }
      })
      .then(({ comment }) => {
        this.setState({
          body: "",
        });
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    if (this.props.user === null) {
      return "";
    }
    const { username, image } = this.props.user;
    return (
      <section className="max-w-2xl mx-auto mt-12">
        <form className="border rounded-md" action="">
          <textarea
            className="block w-full p-3 rounded-md outline-none"
            placeholder="Write Comment"
            name=""
            id=""
            rows="5"
            required
            onChange={this.handleChange}
            value={this.state.value}
          ></textarea>
          <div className="p-4 bg-gray-100 flex items-center justify-between">
            <div>
              <img src={image} alt={username} />
              <strong>{username}</strong>
            </div>

            <button
              className="inline-block bg-green-500 px-2 py-1 text-white font-semibold text-sm rounded-sm"
              onClick={this.handleSubmit}
            >
              Post Comment
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default AddComment;
