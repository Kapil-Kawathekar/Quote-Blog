import { useState, useEffect, useCallback } from "react";
import useHttp from "../hooks/use-http";
import { getAllComments } from "../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "../comments/CommentsList";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";

const Comments = (props) => {
  const quoteId = props.quoteId;
  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);
  const [isAddingComment, setIsAddingComment] = useState(false);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  const onAddedCommentHandler = useCallback(() => {
    setIsAddingComment(false);
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);
  let comments;
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }
  // console.log("quoteId from comments .js ", quoteId);
  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments}></CommentsList>;
  }
  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <div className="centered">No Comments</div>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteId}
          onAddedComment={onAddedCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
