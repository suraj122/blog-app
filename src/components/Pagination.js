import React from "react";

function Pagination(props) {
  const { count, activeIndex, handleActiveIndex } = props;
  if (!count === null) {
    return "";
  }
  let pages = [];
  for (let i = 0; i <= count / 10; i++) {
    pages.push(i);
  }
  return (
    <div className="">
      <ul className="flex flex-wrap">
        {pages.map((page, i) => (
          <li
            onClick={() => handleActiveIndex(i)}
            className={`border p-2 mr-3 mb-3 cursor-pointer ${
              activeIndex === i ? "bg-green-500 text-white" : ""
            }`}
            key={page}
          >
            {page + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
