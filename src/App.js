import React, { Suspense } from "react";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const { Route, Switch, Redirect } = require("react-router");

// This imports can be used in test development but in deploymernt one should go with Lazy Loading only

// const { default: AllQuotes } = require("./components/pages/AllQuotes");
// const { default: NewQuote } = require("./components/pages/NewQuote");
// const { default: QuoteDetails } = require("./components/pages/QuoteDetails");

//In Development we have to load the code in lazy way so that it will load only requested file
//means all the code will not get loaded at once it will loaded in chunks whenever required
// we can do the same using below code

const AllQuotes = React.lazy(() => import("./components/pages/AllQuotes"));
const NewQuote = React.lazy(() => import("./components/pages/NewQuote"));
const QuoteDetails = React.lazy(() =>
  import("./components/pages/QuoteDetails")
);

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner></LoadingSpinner>
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes"></Redirect>
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes></AllQuotes>
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetails></QuoteDetails>
          </Route>
          <Route path="/new-quote" exact>
            <NewQuote></NewQuote>
          </Route>
          <Route path="*">
            <h1> Not Found ...</h1>
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
