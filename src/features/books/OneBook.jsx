import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { fetchBookByName, selectBooks } from "./booksSlice";

function OneBook() {
  const dispatch = useDispatch();
  const { items } = useSelector(selectBooks);
  const { id } = useParams();

  console.log(items);

  useEffect(() => {
    dispatch(fetchBookByName(id));
  }, []);

  return (
    <>
      <Navbar />
      <div className="book">
        <h1>{items.title}</h1>
        {items.description ? <p className="desc">{items.description}</p> : <p className="noDesc">No description</p>}

      </div>
    </>
  );
}

export default OneBook;
