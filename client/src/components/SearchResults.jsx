import React, { useEffect } from "react";
import SearchResult from "./SearchResult";
import { useStoreState, useStoreActions } from "easy-peasy";

function SearchResults() {
  let sort = useStoreState(state => state.search.sort);
  let category = useStoreState(state => state.search.category);
  let keywords = useStoreState(state => state.search.keywords);
  let location = useStoreState(state => state.search.location);
  let eventRange = useStoreState(state => state.search.eventRange);
  let servers = useStoreState(state => state.vendors.servers);
  let getProfiles = useStoreActions(action => action.vendors.getProfiles);

  useEffect(() => {
    getProfiles([location, sort, category, eventRange, keywords]);

    return function() {
      console.log("bye");
    };
  }, [sort, location, category, keywords, eventRange]);

  return (
    <>
      {servers.length === 0 ? (
        <div>No results</div>
      ) : (
        <div className="row" style={{ minHeight: "100vh" }}>
          {servers.map(rresult => (
            <SearchResult
              title={rresult.title}
              category={rresult.category}
              subcategories={rresult.subcategories}
              location={rresult.location}
              source={rresult.picsource}
              key={rresult._id}
              id={rresult._id}
              added={rresult.added}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default SearchResults;
