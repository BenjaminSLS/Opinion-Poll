import React from "react";
import Poll from "../components/Poll";

import { useSelector } from "react-redux";
import { selectFeedPolls } from "../redux/feedSlice";

import { auth } from "../lib/firebase";

export default function Feed() {
  const data = useSelector(selectFeedPolls);

  return (
    <div className="mx-auto bg-gray-200 dark:bg-gray-700 h-full">
      <div className="flex flex-col pt-2 bg-gray-200 dark:bg-gray-700">
        {auth.currentUser ? (
          <></>
        ) : (
          <h1>You need to login to view the feed!</h1>
        )}
        {data ? (
          data.map((poll) => (
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
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
