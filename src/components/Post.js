import { Link } from "react-router-dom";

function Post(props) {
  const {
    author,
    createdAt,
    title,
    description,
    slug,
    tagList,
    favoritesCount,
  } = props;
  return (
    <article className="py-8 border-t-2">
      <header className="flex justify-between">
        <div className="flex items-center">
          <img
            className="w-8 h-8 rounded-full"
            src={author.image}
            alt={author.username}
          />
          <div className="ml-2">
            <strong className="block font-normal text-green-500">
              {author.username}
            </strong>
            <strong className="block font-normal text-gray-500">
              {createdAt}
            </strong>
          </div>
        </div>
        <div>
          <button className="border border-green-500 text-green-500 px-2 rounded-sm py-1 hover:bg-green-500 hover:text-white">
            {favoritesCount === 0 ? "♡ 0" : "♥" + favoritesCount}
          </button>
        </div>
      </header>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-2 mb-4 text-lg text-gray-600">{description}</p>
      <Link
        className="text-blue-700 hover:text-green-500"
        to={`/articles/${slug}`}
      >
        Read More...
      </Link>
      <ul className="flex justify-end">
        {tagList.map((tag) => (
          <li className="border-2 px-3 rounded-sm py-1 mx-1" key={tag}>
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
export default Post;
