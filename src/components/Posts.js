import React from "react";

import Loader from "./Loader";
import Post from "./Post";

function Posts(props) {
  const { articles } = props;
  if (!articles) {
    return <Loader />;
  }
  return (
    <>
      {articles.map((article) => (
        <Post key={article.slug} {...article} />
      ))}
    </>
  );
}

export default Posts;
