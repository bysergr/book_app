import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LinkBook from "../../components/LinkBook";
import Navbar from "../../components/Navbar";
import useLazyLoad from "../../hooks/useLazyLoad";
import { fetchBooks, selectBooks } from "./booksSlice";

function BooksList() {
  const { items, loading, hasMore } = useSelector(selectBooks);
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { showNext } = useLazyLoad({ loading, setPage, hasMore });

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }

    const promise = dispatch(fetchBooks({ query, page }));

    return () => {
      promise.abort();
    };
  }, [query]);

  useEffect(() => {
    if (!hasMore) {
      return;
    }
    dispatch(fetchBooks({ query, page }));
  }, [page]);

  return (
    <section>
      <Navbar />
      <input
        className="search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Name"
      />
      <div className="links">
        <h1>Books</h1>
        {items.length > 0 &&
          items.map((book, index) => {
            if (index + 1 === items.length) {
              return (
                <LinkBook
                  key={index}
                  title={book.title}
                  to={book.key}
                  refProp={showNext}
                />
              );
            }

            return <LinkBook key={index} title={book.title} to={book.key} />;
          })}
        {loading === "pending" && <p>Loading...</p>}
        {!hasMore && loading !== "pending" ? (
          <p>{query === "" ? "Put a Name" : `Books not found for '${query}'`}</p>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default BooksList;
