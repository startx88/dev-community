import React from "react";

const TableHeading = ({ heading, isAction }) => {
  return (
    <thead>
      <tr>
        {heading.map(head => head !== "_id" && <th key={head}>{head}</th>)}
        {isAction && heading && <th>Actions</th>}
      </tr>
    </thead>
  );
};

export default TableHeading;
