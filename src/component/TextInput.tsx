import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {};

export default function TextInput(props: Props) {
  return <Input {...props} />;
}

const Input = styled.input`
  ${({ theme }) => css`
    padding: 8px 10px;
    outline: none;
    border: 1px solid ${theme.palette.gray7};
    border-radius: 4px;
    &:hover {
      border: 1px solid ${theme.palette.gray6};
    }
  `}
`;
