import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Poll from "../components/Poll";
import { selectFeedPolls } from "../redux/feedSlice";

export default function Search() {
  const [search, setSearch] = useState("");

  const polls = useSelector(selectFeedPolls);

  const handleSearchText = ({ target: { value } }) => {
    setSearch(value.trim());
  };

  return (
    <div className="h-full bg-gray-200 dark:bg-gray-700">
      <div className="flex flex-col mx-auto pt-2 w-min">
        <h1 className="">Search</h1>
        <input
          type="text"
          placeholder="Insert tag..."
          className="focus:border-blue-600 outline-none border-2 block w-72 shadow-sm sm:text-sm rounded-md"
          onChange={handleSearchText}
        ></input>
      </div>
      <div className="flex flex-col pt-2 bg-gray-200 dark:bg-gray-700">
        {search.length > 0
          ? polls
              .filter((o) => o.tags.startsWith(search))
              .map((poll) => (
                <Poll
                  key={poll.id}
                  caption={poll.caption}
                  options={poll.options}
                  id={poll.id}
                  creatorId={poll.creatorId}
                  creator={poll.creator}
                  tag={poll.tags}
                />
              ))
          : polls.map((poll) => (
              <Poll
                key={poll.id}
                caption={poll.caption}
                options={poll.options}
                id={poll.id}
                creatorId={poll.creatorId}
                creator={poll.creator}
                tag={poll.tags}
              />
            ))}
      </div>
    </div>
  );
}
