import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { listComments } from "../../actions";
import Comment from "../Reviews/Comment/Comment";
import { useEffect } from "react";
import "./CommentListScreen.css";
import AddComment from "../Reviews/AddComment/AddComment";
//import { Loader } from "../../components/Loader/Loader";

const CommentListScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listComments());
  }, [dispatch]);

  const commentList = useSelector((state) => state.commentList);
  const  comments  = commentList;

  if (comments) {
    return (
      <div className="comment-list-screen">
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    );
  
  } else {
    return (
      <div className="comment-list-screen">
        <h1>No hay comentarios</h1>
        <AddComment />
      </div>
    );
  }
};   


        

  // return (
  //   <div className="commentList">
  //     {loading && <p>loading</p>}
  //     {comments.map((comment) => (
  //       <Comment comment={comment} key={comment._id} />
  //     ))}
  //     <AddComment/>
  //   </div>
  // );
//};

export default CommentListScreen;