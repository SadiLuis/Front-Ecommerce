import {
    COMMENT_LIST_FAIL,
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_SUCCESS,
    COMMENT_DELETE,
    COMMENT_PUT,
    COMMENT_POST,
    COMMENT_DELETE_FAIL,
    COMMENT_POST_FAIL,
    COMMENT_REPLY_PUT,
  } from ".../actions/types";
  
  export const commentListReducer = (state = { comments: [] }, action) => {
    switch (action.type) {
      case COMMENT_LIST_REQUEST:
        return { loading: true, comments: [] };
      case COMMENT_LIST_SUCCESS:
        return { loading: false, comments: action.payload };
      case COMMENT_LIST_FAIL:
        return { loading: false, error: action.payload };
      case COMMENT_DELETE:
        return {
          ...state,
          comments: state.comments.filter((x) => x._id !== action.payload._id),
        };
      case COMMENT_DELETE_FAIL:
        return { error: action.payload };
      case COMMENT_POST:
        return { ...state, comments: [...state.comments, action.payload] };
      case COMMENT_POST_FAIL:
        return { error: action.payload };
      case COMMENT_PUT:
        return {
          ...state,
          comments: state.comments.map((x) =>
            x._id === action.payload._id ? action.payload : x
          ),
        };
      case COMMENT_REPLY_PUT:
        return {
          ...state,
          comments: state.comments.replies.map((x) =>
            x._id === action.payload._id ? action.payload : x
          ),
        };
      default:
        return state;
    }
  };
  