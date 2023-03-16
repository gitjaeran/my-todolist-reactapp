import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({
    registerId: "",
    registerPw: "",
  });

  const onChangeRegisterHandler = event => {
    const { name, value } = event.target;
    setUser(pre => ({ ...pre, [name]: value }));
  };

  const onSubmitRegisterHandler = async event => {
    event.preventDefault();
    alert("준비중입니다!");
    const data = await axios.post("http://localhost:3001/register", user);
    console.log(data);
  };

  const onClickLoginBtn = event => {
    event.preventDefault();
    alert("준비중입니다!");
  };
  return (
    <div>
      <div>
        <div>Welcome!</div>
        <Link to={"/"}>홈으로 돌아가기</Link>
      </div>

      {/* 회원가입 */}
      <form onSubmit={onSubmitRegisterHandler}>
        <div>회원가입</div>
        <div>
          <label>ID</label>
          <input
            type="text"
            name="registerId"
            value={user.registerId}
            onChange={onChangeRegisterHandler}
          />
        </div>
        <div>
          <label>PW</label>
          <input
            type="text"
            name="registerPw"
            value={user.registerPw}
            onChange={onChangeRegisterHandler}
          />
        </div>
        <div>
          <button>회원가입</button>
        </div>
      </form>

      {/* 로그인 */}
      <form>
        <div>
          <label>ID</label>
          <input />
        </div>
        <div>
          <label>PW</label>
          <input />
        </div>
        <div>
          <button onClick={onClickLoginBtn}>로그인</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
