import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./Search.module.css";
type BookItem = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
  };
};

export default function Search() {
  // QUERY STRING은 useSearchParams를 사용
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const [params] = useSearchParams();
  const k = params.get("keyword");

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<BookItem[] | null>(null);

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${k}&maxResults=20&key=${API_KEY}`)
      .then(res => res.json())
      .then((json: { items: BookItem[] }) => {
        setList(json.items);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [k, API_KEY]);

  if (loading) return <p>Loading...</p>;
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.searchResult}>검색 결과: {k}</h3>
      <div className={styles.bookWrapper}>
        {list?.map((book: BookItem) => (
          <div key={book.id} className={styles.book}>
            <img
              src={book.volumeInfo.imageLinks?.smallThumbnail}
              alt={book.volumeInfo.title}
              className={styles.bookImage}
            />
            <div className={styles.bookInfo}>
              <div>{book.volumeInfo.title}</div>
              <div className={styles.bookAuthors}>
                {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "저자 정보 없음"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
