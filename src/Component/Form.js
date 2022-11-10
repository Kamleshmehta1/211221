import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Form = (props) => {
  const [value, setValue] = useState();
  const dispatch = useDispatch();

  const getRandomNumber = () => {
    return Math.floor(Date.now() * Math.random(100)).toString();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (props.action === "SUBTASK") {
      dispatch({
        type: "ADD_SUBTASK",
        payload: { data: value, id: props.id, subTask: "" },
      });
    } else {
      dispatch({
        type: "ADD_TODO",
        payload: {
          data: value,
          id: getRandomNumber(),
          subTask: "",
        },
      });
    }
  };
  return (
    <div className="formContainer">
      <input className="formInput" onChange={handleChange} type="search" />
      <button className="addBtn" onClick={handleSubmit}>
        ADD TODO
      </button>
    </div>
  );
};

export default Form;
