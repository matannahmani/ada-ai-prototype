"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export const ChatMessageMarkdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
          <p
            {...props}
            className="scroll-m-20 !my-8 text-3xl font-extrabold tracking-tight"
          />
        ),
        h2: ({ node, ...props }) => (
          <p
            {...props}
            className="scroll-m-20 w-fit border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0"
          />
        ),
        h3: ({ node, ...props }) => (
          <p
            {...props}
            className="scroll-m-20 text-xl font-semibold tracking-tight"
          />
        ),
        h4: ({ node, ...props }) => (
          <p
            {...props}
            className="scroll-m-20 text-lg font-semibold tracking-tight"
          />
        ),
        p: ({ node, ...props }) => (
          <p {...props} className="leading-7 [&:not(:first-child)]:mt-4" />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote {...props} className="mt-4 border-l-2 pl-6 italic" />
        ),
        tr: ({ node, ...props }) => (
          <tr {...props} className="m-0 border-t p-0 even:bg-muted" />
        ),
        th: ({ node, ...props }) => (
          <th
            {...props}
            className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
          />
        ),
        td: ({ node, ...props }) => (
          <td
            {...props}
            className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
          />
        ),
        ul: ({ node, ...props }) => (
          <ul {...props} className="my-6 ml-6 list-disc [&>li]:mt-2" />
        ),
        code: ({ node, ...props }) => (
          <code
            {...props}
            className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
          />
        ),
        small: ({ node, ...props }) => (
          <small {...props} className="text-sm font-medium leading-none" />
        ),
      }}
      className="prose prose-slate max-w-none"
    >
      {children}
    </ReactMarkdown>
  )
}
