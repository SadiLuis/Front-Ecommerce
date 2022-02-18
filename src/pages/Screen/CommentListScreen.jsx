import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { listComments } from "../../../actions/index";
import Comment from "../Reviews/Comment/Comment";
import { useEffect } from "react";
import "./CommentListScreen.css";
import AddComment from "../Reviews/AddComment/AddComment";

const CommentListScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listComments());
  }, [dispatch]);

  const commentList = useSelector((state) => state.commentList);
  const { loading, comments } = commentList;

  return (
    <div className="commentList">
      {loading && <p>loading</p>}
      {comments.map((comment) => (
        <Comment comment={comment} key={comment._id} />
      ))}
      <AddComment />
    </div>
  );
};

export default CommentListScreen;
