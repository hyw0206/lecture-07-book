import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

type BookType = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    publishedDate: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
  };
};

type ApiResponseType = { items: BookType[] };

const Wrap = styled.div`
  padding: 30px;
`;

const Item = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: white;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  transition: all 0.5s;
  :hover {
    background-color: #f3f3f3;
  }
`;

const Cover = styled.img`
  width: 60px;
  height: 90px;
  object-fit: cover;
  border-radius: 4px;
`;

const NoCover = styled.div`
  width: 60px;
  height: 90px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;
const Authors = styled.div`
  font-size: 12px;
  color: #555;
`;
function Search() {
  // 사용자가 요청한 keyword를 받아서, 그것을 가지고 google API 요청을 하고, 받아온 결과를 화면에 출력해주는 일

  // keyword를 쿼리스트링으로 받겠다
  const [searchParams] = useSearchParams();
  // 이렇게 가져온 searchParams라고 하는 state의 값은 객체
  const keyword = searchParams.get("keyword");

  const [list, setList] = useState<BookType[]>([]);

  useEffect(() => {
    if (!keyword) {
      return;
    }

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=20&key=${API_KEY}`)
      .then(response => response.json())
      .then((json: ApiResponseType) => {
        // 데이터를 받아왔고, 그거에 대해서 자바스크립트 형태로 가공도 했으니
        // 그걸 list라고 하는 state에 저장해야지
        setList(json.items);
      })
      .catch(err => {
        console.log(err);
      });
  }, [keyword]);

  return (
    <Wrap>
      <h3>검색 결과 : {keyword}</h3>

      {/* 검색 결과 (책 목록) 출력 */}
      {/* 데이터가 도착했는지 안했는지, 목록이 있는지 없는지 판단 해줘야 되나? */}
      {list.map((value, index) => (
        <Item key={index} to={`/detail/${value.id}`}>
          {value.volumeInfo.imageLinks ? (
            <Cover src={value.volumeInfo.imageLinks?.thumbnail} alt={value.volumeInfo.title} />
          ) : (
            <NoCover>No Cover</NoCover>
          )}
          <div>
            <Title>{value.volumeInfo.title}</Title>
            {/*
                            array에서 사용할 수 있는 메소드 join(스트링)
                            각 요소를 순회해서 하나의 값을 리턴하는데
                            각 요소 사이에 [매개변수로 제공된 스트링]을 넣어준다.
                        */}
            <Authors>{value.volumeInfo.authors?.join(", ")}</Authors>
          </div>
        </Item>
      ))}
    </Wrap>
  );
}

export default Search;
