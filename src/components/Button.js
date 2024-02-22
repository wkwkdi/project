import styled from "styled-components";

const WIDTH = {
  small: 98,
  medium: 200,
  big: 300,
};

const HEIGHT = {
  small: 36,
  medium: 60,
  big: 60,
};
const Button = styled.button`
  // background-color: #fff;
  // border: none;
  // color: #000;
  font-size: 24px;
  width: ${({ size }) => WIDTH[size] ?? WIDTH["medium"]}px;
  height: ${({ size }) => HEIGHT[size] ?? HEIGHT["medium"]}px;
  border-radius: ${({ round }) => (round ? `9999px` : `3px`)};

  &:hover {
    box-shadow: 0 0 8px var(--main-color);
  }
  &:active {
    background-color: #fff;
    color: #333;
    box-shadow: inset 0 0 8px var(--main-color);
  }
`;

export default Button;
