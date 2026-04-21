import styles from "./Detail.module.css";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import parse from "html-react-parser";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

type BookType = {
  title: string;
  imageLinks?: {
    thumbnail?: string;
  };
  authors?: string[];
  description?: string;
};

function Detail() {
  // 들어온 주소값으로 API 요청을 해서 받아온 데이터를 저장하고 화면 출력
  const [loading, setLoading] = useState<boolean>(true);
  const [book, setBook] = useState<BookType | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`)
      .then(r => r.json())
      .then(json => {
        setBook(json.volumeInfo);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setBook(null);
        setLoading(false);
      });
  }, [id]);
  useEffect(() => {
    console.log(book);
  }, [book]);
  if (loading) return <div className={styles.loading}>책 정보를 불러오는 중입니다..</div>;
  if (!book) return <div className={styles.fail}>책 정보를 불러오는 데 실패했습니다.</div>;

  return (
    <div className={styles.wrap}>
      <button
        className={styles.backBtn}
        onClick={() => {
          navigate(-1);
        }}>
        &larr; 뒤로가기
      </button>
      <div className={styles.titleWrap}>
        <h2 className={styles.title}>{book.title}</h2>
        <div className={styles.authors}>{book.authors ? book.authors.join(", ") : "저자 없음"}</div>
      </div>
      <div className={styles.descWrap}>
        <div className={styles.descImg}>
          {book.imageLinks?.thumbnail ? (
            <img src={book.imageLinks.thumbnail} alt={book.title} />
          ) : (
            <div>{book.title}</div>
          )}
        </div>
        <div className={styles.desc}>
          {book.description ? parse(book.description) : "설명 없음"}
        </div>
      </div>
    </div>
  );
}

export default Detail;
