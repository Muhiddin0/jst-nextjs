import React from "react";

import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

type Props = {
  children: React.ReactNode;
  lang: string;
};

function CodeHighLight({ children, lang }: Props) {
  return (
    <div className="relative rounded-md bg-code p-3">
      <div className="mb-1 flex gap-1">
        <span className="block size-3 rounded-full bg-red-500"></span>
        <span className="block size-3 rounded-full bg-yellow-500"></span>
        <span className="block size-3 rounded-full bg-green-500"></span>
      </div>
      <SyntaxHighlighter language={lang} style={atomOneDark}>
        {children as string}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeHighLight;
