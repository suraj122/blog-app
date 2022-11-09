import React from "react";

import Post from "./Post";

function Posts(props) {
  const { articles } = props;
  return (
    <>
      {articles === null ? (
        <h1 className="mt-8">Loading...</h1>
      ) : articles.length === 0 ? (
        <h1 className="py-8 border-t-2 text-3xl font-bold">
          No articles found
        </h1>
      ) : (
        articles.map((article) => (
          <Post
            key={article.slug}
            {...article}
            user={props.user}
            isLoggedin={props.isLoggedin}
          />
        ))
      )}
    </>
  );
}

export default Posts;
