"use client";

import * as React from "react";
import { CheckIcon } from "./../Icons/CheckIcon";
import { ClipboardCopyIcon } from "./../Icons/ClipboardCopyIcon";

export interface ClipboardCopyButtonProps {
  text: string;
}

export function ClipboardCopyButton({ text }: ClipboardCopyButtonProps) {
  const [isCopied, setIsCopied] = React.useState<boolean>(false);

  return (
    <button
      className="absolute top-3 right-5 rounded-md border bg-slate-700 border-slate-400 invisible group-hover/copy:visible"
      onBlur={() => {
        setIsCopied(!isCopied);
      }}
      onClick={() => {
        navigator.clipboard.writeText(text);
        setIsCopied(!isCopied);
      }}
    >
      {isCopied ? (
        <CheckIcon className="h-8 w-8 p-2 text-white" />
      ) : (
        <ClipboardCopyIcon className="h-8 w-8 p-2 text-slate-300 hover:text-white" />
      )}
    </button>
  );
}
