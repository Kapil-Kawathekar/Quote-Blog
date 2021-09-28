import React, { useEffect } from "react";
import { Route, useParams } from "react-router";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import HighlightedQuote from "../quotes/HighlightedQuote";
import NoQuotesFound from "../quotes/NoQuotesFound";
import LoadingSpinner from "../UI/LoadingSpinner";

// const DUMMY_DATA = [
//   { id: "q1", author: "Kapil", text: "Learning and improving Skills" },
//   { id: "q2", author: "Vinay", text: "Having a Business" },
// ];

export default function QuoteDetails() {
  const param = useParams();
  //   console.log("Page Detail Loaded"); //Link,Route,history.push() will reload the component
  const { quoteId } = param;
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);
  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (
    status === "completed" &&
    (!loadedQuote || Object.keys(loadedQuote).length === 0)
  ) {
    return <NoQuotesFound></NoQuotesFound>;
  }

  return (
    <div>
      <HighlightedQuote
        text={loadedQuote.text}
        author={loadedQuote.author}
      ></HighlightedQuote>

      <Route path={`/quotes/${param.quoteId}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`/quotes/${param.quoteId}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={`/quotes/${param.quoteId}/comments`}>
        <Comments quoteId={quoteId}></Comments>
      </Route>
    </div>
  );
}
