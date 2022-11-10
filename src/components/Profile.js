import React from "react";
import { Link } from "react-router-dom";
import { articlesURL, ROOT_URL } from "../utils/constant";
import { withRouter } from "../utils/withRouter";
import Loader from "./Loader";
import Posts from "./Posts";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "author",
      articles: null,
      user: null,
    };
  }

  fetchData = () => {
    fetch(
      articlesURL + `/?${this.state.activeTab}=${this.props.params.profile}`
    )
      .then((res) => res.json())
      .then((data) => this.setState({ articles: data.articles }));
    fetch(ROOT_URL + `profiles/${this.props.params.profile}`)
      .then((res) => res.json())
      .then((user) => this.setState({ user }));
  };

  componentDidMount() {
    this.fetchData();
  }

  handleFollowing = () => {
    let following = this.state.user.profile.following;
    fetch(ROOT_URL + `/profiles/${this.props.params.profile}/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Cannot follow the profile");
        }
        return res.json();
      })
      .then(({ user }) => (following = !following));
  };

  handleTab = (label) => {
    this.setState(
      {
        activeTab: label,
      },
      this.fetchData
    );
  };

  render() {
    let { articles } = this.state;
    if (this.state.user === null) {
      return <Loader />;
    }
    const { username, bio, image, following } = this.state.user.profile;
    console.log(following);
    return (
      <>
        <header className="bg-gray-300 py-12">
          <div className="text-center container mx-auto">
            <div className="">
              {image === undefined ? (
                <img
                  className="inline-block rounded-full w-20 h-20"
                  src="https://static.productionready.io/images/smiley-cyrus.jpg"
                  alt=""
                />
              ) : (
                <img
                  className="inline-block rounded-full w-20 h-20"
                  src={image}
                  alt=""
                />
              )}

              <h1 className="text-3xl font-bold mt-3">{username}</h1>
              <h2>{bio}</h2>
            </div>
            <div className="text-right mt-4">
              {this.props.user === null ? (
                <button
                  onClick={this.handleFollowing}
                  className="border border-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                >
                  {!following ? `+ Follow ${username}` : `Unfollow ${username}`}
                </button>
              ) : this.props.user.username === username ? (
                <Link
                  to="/settings"
                  className="border border-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                >
                  Edit Profile Settings
                </Link>
              ) : (
                <button
                  onClick={this.handleFollowing}
                  className="border border-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                >
                  {!following ? `+ Follow ${username}` : `Unfollow ${username}`}
                </button>
              )}
            </div>
          </div>
        </header>
        <section className="mt-12">
          <div className="container mx-auto px-24">
            <nav>
              <ul className="border-b flex">
                <li
                  onClick={() => this.handleTab("author")}
                  className={`pb-2 px-3 inline-block text-gray-500 cursor-pointer ${
                    this.state.activeTab === "author"
                      ? "border-b-2 border-green-500 text-green-500"
                      : ""
                  }`}
                >
                  My Articles
                </li>
                {username !== this.props.user ? (
                  <li
                    onClick={() => this.handleTab("favorited")}
                    className={`ml-4 pb-2 px-3 inline-block  text-gray-500 cursor-pointer ${
                      this.state.activeTab === "favorited"
                        ? "border-b-2 border-green-500 text-green-500"
                        : ""
                    }`}
                  >
                    Favourited Articles
                  </li>
                ) : (
                  <li
                    onClick={() => this.handleTab("favorited")}
                    className={`ml-4 pb-2 px-3 inline-block  text-gray-500 cursor-pointer ${
                      this.state.activeTab === "favorited"
                        ? "border-b-2 border-green-500 text-green-500"
                        : ""
                    }`}
                  >
                    My Fav Articles
                  </li>
                )}
              </ul>
            </nav>
            <Posts articles={articles} />
          </div>
        </section>
      </>
    );
  }
}

export default withRouter(Profile);
