import { css } from "@emotion/react";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import { Value } from "react-quill";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const TEXT_EDITOR_HEIGHT = 200;

type Props = {
  value: Value;
  onChange?: (value: string) => void;
  readOnly?: boolean;
};

export default function TextEditor({
  value,
  onChange,
  readOnly = false,
}: Props) {
  return (
    <Container readOnly={readOnly}>
      <QuillNoSSRWrapper
        modules={readOnly ? undefined : modules}
        readOnly={readOnly}
        theme="snow"
        value={value}
        onChange={onChange}
        formats={readOnly ? undefined : formats}
      />
    </Container>
  );
}

const Container = styled.div<{ readOnly: boolean }>`
  ${({ theme, readOnly }) => css`
    background-color: ${theme.palette.white};
    height: fit-content;
    height: ${TEXT_EDITOR_HEIGHT}px;
    color: ${theme.palette.gray2};
    & div.ql-container {
      height: ${TEXT_EDITOR_HEIGHT - 42}px;
    }
    ${readOnly &&
    css`
      height: fit-content;
      background-color: transparent;
      & div.ql-toolbar {
        display: none;
      }
      & div.ql-container {
        border: none;
        height: fit-content;
      }
    `}
  `}
`;

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];
