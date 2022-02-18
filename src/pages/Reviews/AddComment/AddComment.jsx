import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../../../actions/index";
import "./addComment.css";

const AddComment = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const handleSend = () => {
    dispatch(postComment({ user: user.user, content: message, score: 0 }));
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="input-form">
      <form className="form">
        <textarea
          value={message}
          onChange={handleInput}
          className="input"
          placeholder="Enter a comment..."
        ></textarea>
      </form>
      <div className="input__footer">
        <img src={user.user.image} alt={user.user.username} />
        <button className="send-btn" onClick={() => handleSend()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default AddComment;
