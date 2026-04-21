import { useNavigate } from "react-router";
import styles from "./SearchBar.module.css";
import { type ChangeEvent, type SubmitEvent, useState } from "react";

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
    <form className={styles.box} onSubmit={onSubmit}>
      <input className={styles.input} onChange={onChange} />
      <button type={"submit"} className={styles.button}>
        검색
      </button>
    </form>
  );
}

export default SearchBar;
