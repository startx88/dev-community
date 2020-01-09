import React from "react";

const Search = ({ searchHandler }) => {
  // Handler
  const handler = event => {
    const { value } = event.target;
    searchHandler(value);
  };

  return (
    <div className="panel-serch">
      <form>
        <input
          name="search"
          onChange={handler}
          type="search"
          className="form-control"
          placeholder="Type keyword"
        />
      </form>
    </div>
  );
};

export default Search;
