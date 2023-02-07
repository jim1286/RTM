import { colors } from "./../styles";
import styled from "styled-components";

const Button = styled.button`
  background: ${colors.primary};
  border: none;
  border-radius: 15px;
  color: #000;
  height: 46px;
  padding-left: 30px;
  padding-right: 30px;
`;

export default Button;
