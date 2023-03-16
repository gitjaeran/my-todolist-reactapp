import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <StContainer>
      <div>MY TODOLIST</div>
      <Link to={`/login`}>LOGIN</Link>
    </StContainer>
  );
};
export default Header;

const StContainer = styled.div`
  border: 1px solid #ddd;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 24px;
`;
