import React from "react";
import { useStoreActions } from "easy-peasy";

function SearchChips({ search, id }) {
  let removeKeyword = useStoreActions(actions => actions.search.removeKeyword);

  return (
    <div className="chip">
      <span style={{ fontSize: "16px" }}>{search}</span>
      <i
        className="clear material-icons tiny"
        style={{ padding: "3px", width: "15px", cursor: "pointer" }}
        onClick={e => {
          e.preventDefault();
          removeKeyword(id);
        }}
      >
        close
      </i>
    </div>
  );
}

export default SearchChips;
