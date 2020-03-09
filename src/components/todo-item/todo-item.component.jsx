import React from "react";

const TodoItem = ({ title }) => {
  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: title }}></span>
    </>
  );
};

export default TodoItem;
