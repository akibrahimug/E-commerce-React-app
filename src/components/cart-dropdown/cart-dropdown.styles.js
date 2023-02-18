import styled from "styled-components";

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  border-radius: 20px;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
  button {
    margin-top: auto;
    font-size: 14px;
  }
  .hidden {
    visibility: hidden;
  }

  .empty-message {
    font-size: 18px;
    margin: 50px auto;
  }
`;

export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;