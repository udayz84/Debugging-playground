import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Console from "../components/Console";
import Timer from "../components/Timer";
import Editor from "@monaco-editor/react";
import { runCode } from "../utils/runCode";
import { jsQuestions } from "../questions/jsquestions";

const defaultCode = "// Write your code here\n";

function getQuestionById(id) {
  return jsQuestions.find((q) => q.id === id) ?? null;
}

function Playground() {
  const [searchParams] = useSearchParams();
  const questionId = searchParams.get("question");
  const question = questionId ? getQuestionById(questionId) : null;

  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = questionId ? getQuestionById(questionId) : null;
    setCode(q ? q.buggyCode : defaultCode);
    setOutput([]);
    setError(null);
  }, [questionId]);

  const handleRun = () => {
    setError(null);
    setOutput([]);
    const { output: logs, error: err } = runCode(code);
    setOutput(logs);
    setError(err);
  };

  return (
    <div className="page playground-page">
      <h1>Playground</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </nav>

      {question && (
        <div className="playground-question-info">
          <h2 className="playground-question-title">{question.title}</h2>
          <p className="playground-question-desc">{question.description}</p>
        </div>
      )}

      <div className="playground-layout">
        <div className="editor-section">
          <div className="editor-toolbar">
            <button type="button" className="run-btn" onClick={handleRun}>
              Run
            </button>
          </div>
          <Editor
            height="400px"
            language="javascript"
            theme="vs-dark"
            value={code}
            onChange={(newValue) => setCode(newValue ?? "")}
          />
        </div>
        <Console output={output} error={error} />
        <Timer />
      </div>
    </div>
  );
}

export default Playground;
