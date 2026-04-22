import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import styled from "styled-components";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

type BookType = {
  title: string;
  imageLinks?: {
    thumbnail?: string;
  };
  authors?: string[];
  description?: string;
};

const Loading = styled.div`
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 24px;
  background-color: #eee;
`;

const BackBtn = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #f3f3f3;
  color: #333;
  cursor: pointer;
  transition: all 0.5s;
  align-self: flex-start;
  :hover {
    background-color: #e0e0e0;
    border-color: #999;
  }
`;

const TitleWrap = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
`;

const Title = styled.h2`
  font-size: 2rem;
`;

const Authors = styled.div`
  align-self: flex-end;
  color: rgba(0, 0, 0, 0.5);
`;

const DescWrap = styled.div`
  display: flex;
  gap: 16px;
`;

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
  if (loading) return <Loading>책 정보를 불러오는 중입니다..</Loading>;
  if (!book) return <Loading>책 정보를 불러오는 데 실패했습니다.</Loading>;

  return (
    <Wrap>
      <BackBtn
        onClick={() => {
          navigate(-1);
        }}>
        &larr; 뒤로가기
      </BackBtn>
      <TitleWrap>
        <Title>{book.title}</Title>
        <Authors>{book.authors ? book.authors.join(", ") : "저자 없음"}</Authors>
      </TitleWrap>
      <DescWrap>
        <div>
          {book.imageLinks?.thumbnail ? (
            <img src={book.imageLinks.thumbnail} alt={book.title} />
          ) : (
            <div>{book.title}</div>
          )}
        </div>
        <div>{book.description ? parse(book.description) : "설명 없음"}</div>
      </DescWrap>
    </Wrap>
  );
}

export default Detail;
