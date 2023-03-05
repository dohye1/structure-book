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
  onChange: (value: string) => void;
};

export default function TextEditor({ value, onChange }: Props) {
  return (
    <Container>
      <QuillNoSSRWrapper
        modules={modules}
        value={value}
        onChange={onChange}
        formats={formats}
        style={{ height: `${TEXT_EDITOR_HEIGHT - 42}px` }}
      />
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.palette.white};
    height: fit-content;
    height: ${TEXT_EDITOR_HEIGHT}px;
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
