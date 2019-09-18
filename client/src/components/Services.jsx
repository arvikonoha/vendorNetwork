import React, { useEffect } from "react";
import uuid from "uuid";
import SearchBox from "./SearchBox";
import SearchResults from "./SearchResults";
import { useStoreActions } from "easy-peasy";

function Services({ category }) {
  const clearKeywords = useStoreActions(
    actions => actions.search.clearKeywords
  );
  const setKeywords = useStoreActions(actions => actions.search.setKeywords);

  useEffect(() => {
    clearKeywords();
    if (category !== "none")
      setKeywords({ id: uuid.v4(), result: category, type: "category" });
  });

  return (
    <>
      <SearchBox />
      <SearchResults category={category} />
    </>
  );
}

export default Services;
