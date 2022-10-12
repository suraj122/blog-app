function PostTag(props) {
  return (
    <ul className="">
      <li
        onClick={props.removeTag}
        className={`border-b-2 inline-block pb-2 ${
          props.activeTag === "" ? "border-green-500 text-green-500" : ""
        }`}
      >
        Global Feed
      </li>
      <li className="border-b-2 inline-block pb-2 border-green-500 text-green-500 ml-6">
        {props.activeTag === "" ? "" : "#" + props.activeTag}
      </li>
    </ul>
  );
}

export default PostTag;
