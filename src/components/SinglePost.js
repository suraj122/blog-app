import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "../utils/withRouter";
import { articlesURL } from "../utils/constant";
import Loader from "./Loader";

class SinglePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
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
  }

  render() {
    if (!this.state.article) {
      return <Loader />;
    }
    let article = this.state.article.article;
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
            </div>
          </header>
          <section className="container mx-auto py-8">
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
          <section className="mt-12 border-t container mx-auto py-12">
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
          ""
        )}
      </>
    );
  }
}

export default withRouter(SinglePost);
