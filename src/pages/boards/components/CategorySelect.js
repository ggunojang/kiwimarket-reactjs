// CategorySelect.js
import React, { useContext } from "react";
import { BoardContext } from "../../../contexts/BoardContext";

function CategorySelect({ categoryData, seleteText }) {
  const { dispatch } = useContext(BoardContext);
  const {
    state: { currentCategory },
  } = useContext(BoardContext);
  return (
    <select
      id="category"
      value={currentCategory || ""}
      required
      className="block w-full rounded-md border border-gray-300 p-2.5 text-gray-400 shadow-sm sm:px-4 md:w-auto"
      onChange={(e) =>
        dispatch({
          type: "SET_CURRENT_CATEGORY",
          payload: e.target.value,
        })
      }
    >
      <option value="" disabled>
        {seleteText}
      </option>
      <option value="">
              전체선택
      </option>
      {categoryData.map((item) => (
        <option value={item.bca_key} key={item.bca_id}>
          {item.margin > 0 ? "- " : ""}
          {item.bca_value}
        </option>
      ))}
    </select>
  );
}

export default CategorySelect;
