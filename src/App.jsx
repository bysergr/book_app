import { BrowserRouter, Route, Routes } from "react-router-dom"
import BooksList from "./features/books/booksList"
import OneBook from "./features/books/OneBook"

function App() {
  return (
  <BrowserRouter >
    <Routes>
      <Route path="/" element={<BooksList />} />
      <Route path="/works/:id" element={<OneBook/>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
