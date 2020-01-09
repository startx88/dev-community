import React, { memo, useState, useEffect, useCallback } from "react";
import TableHeading from "./TableHeading";
import TableData from "./TableData";
import Topbar from "../Toolbar";
import { Search, FilterByRange } from "../Filter";
import Pagination from "../Pagination/Pagination";

const Table = memo(
  ({ data, editHandler, deleteHandler, pagination, pageHandler }) => {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState(data);

    /** Filter Store Data */
    const filterdData = useCallback(() => {
      const filteredData = data.filter(item =>
        search !== ""
          ? item.title.toLowerCase().includes(search.toLowerCase())
          : item
      );
      setResult(filteredData);
    }, [search, data]);

    // Search by Text
    const searchHandler = searchText => {
      setSearch(searchText);
    };

    // Sort By Length
    const sortByRange = value => {
      const sliceValue = data;
      const updateResult = sliceValue.slice(0, value);
      setResult(updateResult);
    };

    useEffect(() => {
      filterdData();
    }, [search, data, filterdData]);

    // extract data
    const tableHeading = Object.keys(result[0] || {});
    const tableData = result.map((item, index) => {
      let updateData = item;
      for (let keys in item) {
        if (Array.isArray(item[keys])) {
          updateData = {
            ...updateData,
            sizes: updateData.sizes.join(",")
          };
        } else if (typeof item[keys] === "object") {
          updateData = {
            ...updateData,
            title: updateData.title.substr(0, 20),
            [keys]: item[keys].title
          };
        }
      }
      return Object.values(updateData);
    });

    return (
      <div className="table-responsive">
        <Topbar>
          <Search searchHandler={searchHandler} />
          <FilterByRange sortHandler={sortByRange} />
        </Topbar>
        <table className="table">
          <TableHeading heading={tableHeading} isAction />
          <TableData
            tabledata={tableData}
            tableheading={tableHeading}
            isAction
            edited={editHandler}
            deleted={deleteHandler}
          />
        </table>
        <Pagination handler={pageHandler} pagination={pagination} />
      </div>
    );
  }
);

export default Table;
