import { cloneElement, useMemo } from "react";

type SVGName = "search";

type Props = {
  name: SVGName;
  fill?: string;
};

function SVG({ name, fill }: Props) {
  const { viewBoxHeight, viewBoxWidth, width, height, elements } =
    useMemo(() => {
      switch (name) {
        case "search":
          return {
            viewBoxWidth: 16,
            viewBoxHeight: 16,
            width: 16,
            height: 16,
            elements: [
              // eslint-disable-next-line react/jsx-key
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.5763 13.5812L13.0634 11.0588C13.7222 10.0329 14.1081 8.81882 14.1081 7.52C14.1081 3.87765 11.1622 0.931763 7.51988 0.931763C3.87752 0.931763 0.931641 3.87765 0.931641 7.52C0.931641 11.1624 3.87752 14.1082 7.51988 14.1082C8.82811 14.1082 10.0422 13.7129 11.0587 13.0635L13.5811 15.5765C13.8352 15.8306 14.1928 15.9906 14.5787 15.9906C15.3599 15.9906 15.9905 15.36 15.9905 14.5788C15.9905 14.1929 15.8305 13.8353 15.5763 13.5812ZM7.51988 12.2259C4.92223 12.2259 2.81399 10.1176 2.81399 7.52C2.81399 4.92235 4.92223 2.81412 7.51988 2.81412C10.1175 2.81412 12.2258 4.92235 12.2258 7.52C12.2258 10.1176 10.1175 12.2259 7.51988 12.2259Z"
                fill={fill || "#8F95B2"}
              />,
            ],
          };
      }
    }, [name, fill]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
    >
      {elements.map((element, index) =>
        cloneElement(element, { key: `${index}` })
      )}
    </svg>
  );
}

export default SVG;
