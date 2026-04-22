import { useNavigate } from "react-router";
import { type ChangeEvent, type SubmitEvent, useState } from "react";
import styled from "styled-components";

const Box = styled.form`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const Button = styled.button`
  padding: 12px 18px;
  border: none;
  background-color: black;
  color: white;
  border-radius: 8px;
  cursor: pointer;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

function SearchBar() {
  // 사용자에게 입력을 받아서, 그걸 /search 라고 하는 주소로 강제 이동 시켜야됨
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const k = keyword.trim();
    if (!k) return;

    navigate(`/search?keyword=${encodeURIComponent(k)}`);
  };

  return (
    <Box onSubmit={onSubmit}>
      <Input onChange={onChange} />
      <Button type={"submit"}>검색</Button>
    </Box>
  );
}

export default SearchBar;
