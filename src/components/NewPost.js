import React from "react";
import { articlesURL } from "../utils/constant";
import { withRouter } from "../utils/withRouter";

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      tagList: "",
      errrors: {
        title: "",
        about: "",
        body: "",
        tagList: "",
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
    const { title, description, body, tagList } = this.state;
    let { navigate } = this.props;
    fetch(articlesURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList: tagList.split(",").map((tag) => tag.trim()),
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Cannot create article ");
        }
        return res.json();
      })
      .then(({ article }) => {
        navigate("/");
        this.setState({
          title: "",
          description: "",
          body: "",
          tagList: "",
        });
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    return (
      <section className="container mx-auto mt-16">
        <h1 className="text-center text-3xl font-bold mb-8">New Post</h1>
        <form
          onSubmit={this.handleSubmit}
          className="text-right max-w-4xl mx-auto"
          action=""
        >
          <input
            className="block w-full border px-4 py-3 rounded-sm"
            type="text"
            placeholder="Article Title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input
            className="block w-full border px-4 py-3 rounded-sm mt-4"
            type="text"
            placeholder="What's this article about?"
            name="description"
            onChange={this.handleChange}
            value={this.state.description}
          />
          <textarea
            className="block w-full border px-4 py-3 rounded-sm mt-4"
            name="body"
            id=""
            rows="10"
            placeholder="Write your article (in markdown)"
            onChange={this.handleChange}
            value={this.state.body}
          ></textarea>
          <input
            className="block w-full border px-4 py-3 rounded-sm mt-4"
            type="text"
            placeholder="Enter Tags"
            name="tagList"
            onChange={this.handleChange}
            value={this.state.tagList}
          />
          <button
            onClick={this.handleSubmit}
            className="mt-16 bg-green-500 text-white px-6 py-4 text-xl rounded-md"
          >
            Publish Article
          </button>
        </form>
      </section>
    );
  }
}

export default withRouter(NewPost);
