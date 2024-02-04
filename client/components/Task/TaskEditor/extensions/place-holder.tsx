import Placeholder from "@tiptap/extension-placeholder";

export const CustomPlaceholder = Placeholder.configure({
  placeholder: ({ node }) => {
    if (node.type.name === "heading" && node.attrs.level == 1) {
      return "title";
    } else {
      return "Press '/' for commands...";
    }
  },
});
