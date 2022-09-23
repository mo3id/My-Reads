import React from "react";
import { useEffect, useState } from "react";

function Select(props) {
  function handleChange(event) {
    props.onChange(event.target.value); //new shelf? /
  }

  return (
    <select id="select" value={props.value} onChange={handleChange}>
      <option value="none" disabled>
        Move to...
      </option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  );
}

export default Select;
