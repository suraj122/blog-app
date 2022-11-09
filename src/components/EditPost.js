import React from "react";
import { articlesURL } from "../utils/constant";
import { withRouter } from "../utils/withRouter";

class EditPost extends React.Component {
  constructor(props) {
    super(props);
    let article = this.props.location.state.article;
    this.state = {
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList,
      errors: {
        title: "",
        description: "",
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
    let slug = this.props.params.slug;
    const { navigate } = this.props;
    fetch(articlesURL + "/" + slug, {
      method: "PUT",
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
          throw new Error("Cannot edit article");
        }
        return res.json();
      })
      .then(({ article }) => {
        navigate(`/articles/${slug}`);
      })
      .catch((errors) => {
        this.setState({ errors });
      });
  };

  render() {
    return (
      <section className="container mx-auto mt-16">
        <h1 className="text-center text-3xl font-bold mb-8">Edit Post</h1>
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
            onChange={this.handleChange}
            value={this.state.title}
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
            Update Article
          </button>
        </form>
      </section>
    );
  }
}

export default withRouter(EditPost);
