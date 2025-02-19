import React from "react";

import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

type Props = {
  children: React.ReactNode;
  lang: string;
};

function CodeHighLight({ children, lang }: Props) {
  return (
    <div className="relative bg-code p-3 rounded-md">
      <div className="flex gap-1 mb-1">
        <span className="size-3 block rounded-full bg-red-500"></span>
        <span className="size-3 block rounded-full bg-yellow-500"></span>
        <span className="size-3 block rounded-full bg-green-500"></span>
      </div>
      <SyntaxHighlighter language={lang} style={atomOneDark}>
        {children as string}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeHighLight;
