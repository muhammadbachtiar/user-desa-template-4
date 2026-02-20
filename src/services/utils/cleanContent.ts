import { htmlToText } from "html-to-text";

export const cleanContent = (htmlContent: string): string[] => {

  const text = htmlToText(htmlContent, {
    wordwrap: false,
    preserveNewlines: true,
    decodeEntities: true,
    tags: {
      h1: { format: "block" },
      h2: { format: "block" },
      h3: { format: "block" },
      h4: { format: "block" },
      h5: { format: "block" },
      h6: { format: "block" },
      p: { format: "block" },
      div: { format: "block" },
      ul: { format: "block" },
      ol: { format: "block" },
      a: {
        format: "inline",
        options: { noAnchorUrl: true },
      },
      img: { format: "skip" },
      table: { format: "skip" },
      br: { format: "skip" },
      hr: { format: "skip" },
    },
  });

  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p: string) => p.trim())
    .filter((p: string) => p.length > 0);

  return paragraphs;
};