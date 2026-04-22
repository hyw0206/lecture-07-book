import SearchBar from "../components/SearchBar.tsx";
import styled from "styled-components";

const Wrap = styled.div`
  padding: 40px;
`;

function Home() {
  return (
    <Wrap>
      <h2>Google Books 검색</h2>
      <SearchBar />
    </Wrap>
  );
}

export default Home;
