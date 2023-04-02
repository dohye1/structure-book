import React, { ReactNode, useMemo, useRef, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

type Props = {
  children: ReactNode;
  tooltipContent: string;
};

export default function Tooltip({ children, tooltipContent }: Props) {
  const [active, setActive] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  const { width, height } = useMemo(() => {
    if (!domRef.current) {
      return { width: 0, height: 0 };
    }
    const { width, height } = domRef.current.getBoundingClientRect();
    return { width, height };
  }, [active]);

  return (
    <Container
      ref={domRef}
      onMouseOver={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {children}
      {active && (
        <TooltipContent width={width} height={height}>
          {tooltipContent}
        </TooltipContent>
      )}
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => css`
    position: relative;
  `}
`;

const TooltipContent = styled.div<{ width: number; height: number }>`
  ${({ theme, width, height }) => css`
    position: absolute;
    top: ${`${height * -1 - 12}px`};
    left: ${`${(width / 2) * -1}px`};
    background-color: rgba(43, 42, 42, 0.4);
    padding: 6px;
    box-sizing: border-box;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    color: ${theme.palette.white};
  `}
`;
