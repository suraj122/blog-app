import React from "react";
import { articlesURL } from "../utils/constant";
import Banner from "../components/Banner";
import Posts from "./Posts";
import Pagination from "./Pagination";
import PostTag from "./PostTag";
import Tags from "./Tags";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      articlesCount: null,
      activeIndex: 0,
      activeTag: "",
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (
      prevState.activeIndex !== this.state.activeIndex ||
      prevState.activeTag !== this.state.activeTag
    ) {
      this.fetchData();
    }
  }

  handleActiveTag = (value) => {
    this.setState({
      activeTag: value,
    });
  };
  removeTag = () => {
    this.setState({
      activeTag: "",
    });
  };
  fetchData = () => {
    let offset = this.state.activeIndex * 10;
    let activeTag =
      this.state.activeTag === "" ? "" : "&&tag=" + this.state.activeTag;
    fetch(articlesURL + `/?offset=${offset}&&limit=10${activeTag}`)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          articles: data.articles,
          articlesCount: data.articlesCount,
        })
      );
  };

  handleActiveIndex = (index) => {
    this.setState(
      {
        activeIndex: index,
      },
      this.fetchData
    );
  };

  render() {
    const { articles, articlesCount, activeIndex } = this.state;
    return (
      <>
        <Banner />
        <section className="py-12">
          <div className="container mx-auto flex">
            <div className="w-3/4">
              <PostTag
                activeTag={this.state.activeTag}
                removeTag={this.removeTag}
              />
              <Posts
                articles={articles}
                user={this.props.user}
                isLoggedin={this.props.isLoggedin}
              />
              <Pagination
                count={articlesCount}
                activeIndex={activeIndex}
                handleActiveIndex={this.handleActiveIndex}
              />
            </div>

            <Tags activeTag={this.handleActiveTag} />
          </div>
        </section>
      </>
    );
  }
}

export default Home;
