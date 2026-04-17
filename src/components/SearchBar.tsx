import styles from "./SearchBar.module.css";
import { useState, type SubmitEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router";

export default function SearchBar() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    // onSubmit 기본 기능 제거
    e.preventDefault();

    // keyword.trim 해서 빈 문자열이면 걍 리턴!
    if (!keyword.trim()) return;

    // 한글 -> 영어로 변환이 필요함!!
    // encodeURIComponent()

    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <form className={styles.box} onSubmit={onSubmit}>
      <input className={styles.input} onChange={onChange} />
      <button type={"submit"} className={styles.button}>
        검색
      </button>
    </form>
  );
}
