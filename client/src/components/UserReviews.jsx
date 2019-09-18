import React from "react";
import UserReview from "./UserReview";
import { useStore } from "easy-peasy";

function UserReviews() {
  let reviews = useStore(state => state.users.reviews);

  return (
    <ul className="collection col s10 offset-s1 ">
      {reviews.map(item => (
        <UserReview
          key={item.uuid}
          author={item.author}
          title={item.title}
          review={item.review}
          source={item.source}
        />
      ))}
    </ul>
  );
}

export default UserReviews;
