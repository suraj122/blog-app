import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "../utils/withRouter";
import { articlesURL } from "../utils/constant";
import Loader from "./Loader";
import AddComment from "./AddComment";
import Comments from "./Comments";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

class SinglePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      comments: null,
    };
  }

  componentDidMount() {
    let slug = this.props.params.slug;
    fetch(articlesURL + "/" + slug)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          article: data,
        })
      );
    fetch(articlesURL + "/" + slug + "/comments")
      .then((res) => res.json())
      .then((data) => this.setState({ comments: data }));
  }

  handleDelete = () => {
    let slug = this.props.params.slug;
    const { navigate } = this.props;
    fetch(articlesURL + "/" + slug, {
      method: "DELETE",
      headers: {
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Cannot Delte the article");
        }
        return res.json();
      })
      .then(navigate("/"));
  };

  render() {
    if (!this.state.article) {
      return <Loader />;
    }
    let article = this.state.article.article;
    const comments = this.state.comments;
    let slug = this.props.params.slug;
    return (
      <>
        <article>
          <header className="bg-gray-900 py-20">
            <div className="container mx-auto text-white">
              <h1 className="text-white text-3xl">{article.title}</h1>
              <div className="flex items-center mt-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src={article.author.image}
                  alt={article.author.username}
                />
                <div className="ml-3">
                  <cite className="block not-italic text-white">
                    {article.author.username}
                  </cite>
                  <time>{article.createdAt}</time>
                </div>
              </div>
              <div>
                {this.props.user === null ? (
                  ""
                ) : this.props.user.username === article.author.username ? (
                  <div className="flex mt-8">
                    <Link
                      to={`/editor/${slug}`}
                      state={{ article: article }}
                      params={{ article }}
                      className="flex items-center text-gray-400 border border-gray-400 py-1 px-3 rounded-md mr-4 hover:bg-gray-400 hover:text-white"
                    >
                      <PencilIcon className="w-4 h-4 mr-2" />
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={this.handleDelete}
                      className="flex items-center border py-1 px-3 rounded-md border-red-900 text-red-900 hover:bg-red-900 hover:text-white"
                    >
                      <TrashIcon className="w-4 h-4  mr-1" />
                      <span className="">Delete</span>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </header>
          <section className="container mx-auto border-b py-8">
            <p className="text-xl text-gray-600 leading-normal">
              {article.body}
            </p>
            <div className="mt-4">
              {article.tagList.map((tag) => (
                <span
                  key={tag}
                  className="border rounded-xl px-3 py-1 text-sm text-gray-500 inline-block mr-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </article>
        {this.props.user === null ? (
          <section className="mt-12 container mx-auto py-8">
            <div className="max-w-xl mx-auto">
              <p>
                <Link className="text-green-500" to="/signin">
                  Sign in
                </Link>{" "}
                or{" "}
                <Link className="text-green-500" to="/signup">
                  Sign up{" "}
                </Link>
                to add comments on this article
              </p>
            </div>
          </section>
        ) : (
          <AddComment user={this.props.user} slug={this.props.params.slug} />
        )}
        <section className="max-w-2xl mx-auto mt-8 pb-12">
          <Comments
            comments={comments}
            slug={this.props.params.slug}
            user={this.props.user}
          />
        </section>
      </>
    );
  }
}

export default withRouter(SinglePost);
