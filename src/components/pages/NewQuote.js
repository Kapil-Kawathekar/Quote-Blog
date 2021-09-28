import React, { useEffect } from "react";
import { useHistory } from "react-router";
import QuoteForm from "../quotes/QuoteForm";

import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

export default function NewQuote() {
  const history = useHistory();
  const { sendRequest, status } = useHttp(addQuote);

  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes"); //push method allows the user to go back
    }
  }, [status, history]);

  const onAddQuoteHandler = (formData) => {
    sendRequest(formData);

    console.log(formData);
  };

  return (
    <QuoteForm
      isLoading={status === "pending"}
      onAddQuote={onAddQuoteHandler}
    ></QuoteForm>
  );
}
