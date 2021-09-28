import { Fragment } from "react";
import { useHistory, useLocation } from "react-router";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const QuoteList = (props) => {
  // console.log("Page Loaded");
  const sortQuote = (quotes, ascending) => {
    return quotes.sort((quoteA, quoteB) => {
      if (ascending) {
        return quoteA.id > quoteB.id ? 1 : -1;
      } else {
        return quoteA.id < quoteB.id ? 1 : -1;
      }
    });
  };
  const history = useHistory();
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);

  const isSortingAsc = queryParam.get("sort") === "asc";
  // console.log(queryParam.get("sort"), isSortingAsc);

  const sortedQuote = sortQuote(props.quotes, isSortingAsc);

  const sortHandler = () => {
    history.push("/quotes?sort=" + (isSortingAsc ? "desc" : "asc")); //history will be helpful in changing url
    //whenever url changes it re-render this page
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortHandler}>
          Sort {isSortingAsc ? "Descending" : "Ascending"}
        </button>
      </div>

      <ul className={classes.list}>
        {sortedQuote.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
