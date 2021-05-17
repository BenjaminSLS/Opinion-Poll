import React from "react";
import { useSelector } from "react-redux";
import { selectUserPolls } from "../redux/pollSlice";
import Poll from "../components/Poll";
import { auth } from "../lib/firebase";
export default function Profile() {
  const polls = useSelector(selectUserPolls);
  return (
    <div className="bg-gray-200 dark:bg-gray-700 h-full">
      <div className=" w-min mx-auto">
        <h1 className="dark:text-white text-4xl">
          {auth.currentUser.displayName}
        </h1>
        <h1 className="text-center dark:text-white">{`Polls: ${polls.length}`}</h1>
      </div>
      <div className="flex flex-col pt-2 bg-gray-200 dark:bg-gray-700">
        {auth.currentUser ? (
          <></>
        ) : (
          <h1>You need to login to view the feed!</h1>
        )}
        {polls ? (
          polls.map((poll) => (
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
