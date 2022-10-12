import React from "react";
import { tagsURL } from "../utils/constant";

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: null,
    };
  }

  componentDidMount() {
    fetch(tagsURL)
      .then((res) => res.json())
      .then((data) => this.setState({ tags: data.tags }));
  }

  render() {
    const { tags } = this.state;
    if (!tags) {
      return (
        <aside className="w-1/4 pl-12">
          <h2>Loading...</h2>
        </aside>
      );
    }
    return (
      <aside className="w-1/4 pl-12">
        <h2 className="text-2xl font-bold mb-4">Popular Tags</h2>
        <ul className="p-4 bg-green-100 rounded-md">
          {tags.map((tag) => (
            <li
              className="inline-block bg-gray-500 text-white rounded-lg m-1 p-1 text-xs"
              key={tag}
              onClick={() => this.props.activeTag(tag)}
            >
              {tag}
            </li>
          ))}
        </ul>
      </aside>
    );
  }
}

export default Tags;
