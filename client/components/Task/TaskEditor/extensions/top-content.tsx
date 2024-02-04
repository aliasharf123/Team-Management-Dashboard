import Document from "@tiptap/extension-document";

export const CustomDocument = Document.extend({
  // https://tiptap.dev/api/schema#content
  content: "heading block*",
});
