import React, { useEffect } from "react";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import QuoteList from "../quotes/QuoteList";
import LoadingSpinner from "../UI/LoadingSpinner";
import NoQuotesFound from "../quotes/NoQuotesFound";
// const DUMMY_DATA = [
//   { id: "q1", author: "Kapil", text: "Learning and improving Skills" },
//   { id: "q2", author: "Vinay", text: "Having a Business" },
// ];
export default function AllQuotes() {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

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

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound></NoQuotesFound>;
  }

  return <QuoteList quotes={loadedQuotes} />;
}
