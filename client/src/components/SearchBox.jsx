import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import uuid from "uuid";
import SearchChips from "./SearchChips";

function SearchBox() {
  let [searchValue, setValue] = useState("");
  const setKeywords = useStoreActions(actions => actions.search.setKeywords);
  const setEvent = useStoreActions(actions => actions.search.setEvent);
  const keywords = useStoreState(state => state.search.keywords);

  useEffect(() => {
    var elems = document.querySelectorAll("select");
    var instances = window.M.FormSelect.init(elems);
  });

  function searchSubmission(e) {
    e.preventDefault();
    setKeywords({ id: uuid.v4(), result: searchValue.trim(), type: "keyword" });
    setValue("");
  }

  function searchSelection(e) {
    let option = Array.from(e.target.options).find(item => item.selected);

    if (option.className === "category")
      setKeywords({ id: uuid.v4(), result: e.target.value, type: "category" });
    else if (option.className === "location")
      setKeywords({ id: uuid.v4(), result: e.target.value, type: "location" });
  }

  function sortSelection(e) {
    setKeywords({ id: uuid.v4(), result: e.target.value, type: "sort" });
  }

  return (
    <div className="chips chips-placeholder">
      <div className="row card-panel blue-grey lighten-5 white-text">
        <form id="searchForm" onSubmit={searchSubmission}>
          <div className="input-field col s12 l6">
            <input
              id="search"
              type="text"
              className="validate"
              value={searchValue}
              onChange={e => setValue(e.target.value)}
            />
            <label htmlFor="search">Search by keywords</label>
          </div>
        </form>
        <form id="selectForm">
          <div className="input-field col s12 l6">
            <select
              id="selecc"
              onChange={searchSelection}
              defaultValue="Choose your option"
            >
              <option disabled>Search by category</option>
              <option
                onClick={e => searchSelection(e)}
                className="category"
                value="Photographer"
              >
                Photographer
              </option>
              <option
                onClick={e => searchSelection(e)}
                className="category"
                value="Musical"
              >
                Musicals
              </option>
              <option
                onClick={e => searchSelection(e)}
                className="category"
                value="Caterer"
              >
                Caterers
              </option>
              <option
                onClick={e => searchSelection(e)}
                className="category"
                value="Decorator"
              >
                Decorators
              </option>
              <option disabled>Search by category</option>
              <option
                onClick={e => searchSelection(e)}
                className="location"
                value="Mysore"
              >
                Mysore
              </option>
              <option
                onClick={e => searchSelection(e)}
                className="location"
                value="Hyderabad"
              >
                Hyderabad
              </option>
              <option
                onClick={e => searchSelection(e)}
                className="location"
                value="Mangalore"
              >
                Mangalore
              </option>
              <option
                onClick={e => searchSelection(e)}
                className="location"
                value="Bangalore"
              >
                Bangalore
              </option>
              <option
                onClick={e => searchSelection(e)}
                className="location"
                value="Chennai"
              >
                Chennai
              </option>
              <option
                onClick={e => searchSelection(e)}
                className="location"
                value="Chembur"
              >
                Chembur
              </option>
              <option
                onClick={e => searchSelection(e)}
                className="location"
                value="Pune"
              >
                Pune
              </option>
            </select>
            <label>Filter by</label>
          </div>
          <div className="col s5 m2">
            <label htmlFor="from">Event's starting date</label>
            <input type="date" name="from" id="from" />
          </div>
          <div className="col s5 m2">
            <label htmlFor="from">Event's ending date</label>
            <input type="date" name="to" id="to" />
            <button
              className="btn waves-effect waves-light s2 m2 right"
              onClick={e => {
                e.preventDefault();
                setEvent({
                  from: document.getElementById("from").value,
                  to: document.getElementById("to").value
                });
              }}
            >
              Set date
            </button>
          </div>
          <div className="col s12 m6">
            <label>Sort by</label>
            <select
              id="selecc"
              onChange={sortSelection}
              defaultValue="Choose your option"
            >
              <option disabled>Sort by</option>
              <option value="popular">Popularity</option>
              <option value="pricelo">Price - low to high</option>
              <option value="pricehi">Price - high to low</option>
            </select>
          </div>
        </form>
        {keywords.length !== 0
          ? keywords.map(result => (
              <SearchChips
                search={result.result}
                id={result.id}
                key={result.id}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default SearchBox;
