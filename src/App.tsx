import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./routes/Home.tsx";
import Search from "./routes/Search.tsx";
import Detail from "./routes/Detail.tsx";
import GlobalStyle from "./styles/GlobalStyle.ts";


function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/search"} element={<Search />} />
          <Route path={"/detail/:id"} element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
