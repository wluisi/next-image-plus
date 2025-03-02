import * as React from "react";

import { codeToHtml } from "shiki";
import { ClipboardCopyButton } from "./../ClipboardCopyButton/ClipboardCopyButton";

export type CodeSnippetProps = {
  title?: string;
  code: string;
  language: string;
};

export async function CodeSnippet({ title, code, language }: CodeSnippetProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "nord",
  });
  const paddingClassName = title
    ? "[&>pre]:rounded-b-xl"
    : "[&>pre]:rounded-xl";

  return (
    <div className="code-snippet mb-5 group/copy not-prose">
      {title && (
        <div className="bg-slate-600 rounded-t-xl text-white p-2 text-xs antialiased">
          {title}
        </div>
      )}
      <div className="relative">
        <ClipboardCopyButton text={code} />
        <div
          className={`${paddingClassName} [&>pre]:overflow-x-auto [&>pre]:p-5 [&>pre]:text-xs [&>pre]:antialiased`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
