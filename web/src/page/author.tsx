import React from "react";
import  styles from "../css/author.module.css";
import {useHistory} from "react-router-dom";
const AuthorPage=()=>{
  const history = useHistory();
  const handleOnClickBackHome = () => {
    history.push("/");
  };
  return(
      <div className={styles.container}>
        <h1 className={styles.text}>著作権関連のページ</h1>
        <div>
          <p className={styles.text}>room(/room/room_id)の背景画像は<a href="https://jp.freepik.com/vectors/nature">Brgfx - jp.freepik.com によって作成された nature ベクトル</a>です。</p>
        </div>
        <button onClick={handleOnClickBackHome}>Homeに戻る</button>
      </div>
  )
}
export default AuthorPage;
