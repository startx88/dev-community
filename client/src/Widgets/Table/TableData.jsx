import React from "react";
import Button from "../../ui/Button";
import Image from "../../ui/Image";
import Icons from "../../ui/Icons";

/** Table Data Component */
const TableData = ({ tabledata, tableheading, edited, deleted, isAction }) => {
  return (
    <tbody>
      {tabledata.map((data, parentIndex) => {
        return (
          <tr key={data[parentIndex]}>
            {data.map((datavalue, index) =>
              tableheading[index] === "_id" ? (
                <></>
              ) : tableheading[index] === "image" ? (
                <td key={index}>
                  <Image width={40} src={datavalue} />
                </td>
              ) : (
                <td style={{ maxWidth: "300px" }} key={index}>
                  {datavalue}
                </td>
              )
            )}
            {isAction && (
              <td>
                <Button
                  id={data._id}
                  clicked={() => edited(data[0])}
                  btnType="outline-primary"
                  classname="btn-sm mr-2"
                >
                  <Icons icon="edit" />
                </Button>
                <Button
                  clicked={() => deleted(data[0])}
                  btnType="outline-danger"
                  classname="btn-sm"
                >
                  <Icons icon="trash" />
                </Button>
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableData;
