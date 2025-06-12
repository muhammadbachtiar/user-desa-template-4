import type React from "react"

interface RichTextContentProps {
  content: string
  className?: string
}

const RichTextContent: React.FC<RichTextContentProps> = ({ content, className = "" }) => {
  return <div className={`prose prose-lg max-w-none ${className}`} dangerouslySetInnerHTML={{ __html: content }} />
}

export default RichTextContent