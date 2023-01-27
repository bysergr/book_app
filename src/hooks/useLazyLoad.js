import { useCallback, useRef } from 'react'

function useLazyLoad({ loading, setPage, hasMore }) {
  const lastBook = useRef();

  const showNext = useCallback(element => {

    if (lastBook.current) {
      lastBook.current.disconnect()
    }

    if (loading === "pending" || !element || !hasMore) {
      return
    }

    const intersection = (entries) => {
      if (entries[0].isIntersecting) {
        setPage((preContent) => preContent + 1);
      }
    };

    lastBook.current = new IntersectionObserver(intersection, {
      rootMargin: "100px",
    });


    lastBook.current.observe(element)
  }, [loading]);

 return { showNext }

}

export default useLazyLoad