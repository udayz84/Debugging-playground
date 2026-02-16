import { useState } from "react";
import Editor from "@monaco-editor/react";

function CodeEditor({ height = "400px", defaultLanguage = "javascript" }) {
  const [value, setValue] = useState("// Write your code here\n");

  return (
    <div className="code-editor">
      <h3>CodeEditor</h3>
      <Editor
        height={height}
        defaultLanguage={defaultLanguage}
        value={value}
        onChange={(newValue) => setValue(newValue ?? "")}
        theme="vs-dark"
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          wordWrap: "on",
          padding: { top: 16 },
        }}
      />
    </div>
  );
}

export default CodeEditor;
