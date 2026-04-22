// styled에서 제공하는 createGlobalStyle을 이용해서
// 전체 화면에서 제공되는 글로벌 스타일 정의

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;    /* inherit : 부모 요소의 색상을 따라겠음 */
  }
`;

export default GlobalStyle;
