import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "./Form";

const Display = () => {
  console.log(true);
  const dataArr = useSelector((state) => state.reducer.TODO_DATA);
  console.log(dataArr);
  const dispatch = useDispatch();
  const [id, setID] = useState("");

  const handleEdit = (id) => {
    dispatch({
      type: "EDIT_TODO",
      payload: id,
    });
  };
  const handleDelete = (id) => {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  };

  const checkText = (e) => {
    if (e.target.checked) {
      e.target.nextSibling.style.textDecoration = "line-through";
      e.target.nextSibling.style.opacity = "0.5";
    } else {
      e.target.nextSibling.style.textDecoration = "none";
      e.target.nextSibling.style.opacity = "1";
    }
  };

  const renderElements = (dataArr) => {
    return (
      <ul>
        {dataArr.map((ele, idx) => (
          <div key={idx}>
            <div className="renderSubContainer">
              <input
                type="checkbox"
                onClick={checkText}
                className="checkTodo"
              />
              <li>{ele.data || ele}</li>
              <div className="actionContainer">
                <button onClick={() => setID(ele.id)}>+</button>
                <button onClick={() => handleEdit(ele.id)}>EDIT</button>
                <button onClick={() => handleDelete(ele.id)}>DELETE</button>
              </div>
            </div>
            <div>
              {ele.id === id ? <Form id={ele.id} action="SUBTASK" /> : null}
              {ele.subTask !== undefined && ele.subTask.length !== 0 ? (
                <ul className="childUl">{renderElements(ele.subTask)}</ul>
              ) : null}
            </div>
          </div>
        ))}
      </ul>
    );
  };

  return <div className="renderContainer">{renderElements(dataArr)}</div>;
};
export default Display;
