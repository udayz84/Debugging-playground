import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Console from "../components/Console";
import Timer from "../components/Timer";
import Editor from "@monaco-editor/react";
import { runCode } from "../utils/runCode";
import { jsQuestions, getTimeLimit, isOutputCorrect } from "../questions/jsquestions";

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
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerDuration, setTimerDuration] = useState(0);
  const [answerCorrect, setAnswerCorrect] = useState(false);

  useEffect(() => {
    const q = questionId ? getQuestionById(questionId) : null;
    setCode(q ? q.buggyCode : defaultCode);
    setOutput([]);
    setError(null);
    setAnswerCorrect(false);

    // Set timer based on question difficulty
    if (q && q.difficulty) {
      const duration = getTimeLimit(q.difficulty);
      setTimerDuration(duration);
      setTimerRunning(true);
    } else {
      setTimerDuration(0);
      setTimerRunning(false);
    }
  }, [questionId]);

  const handleRun = () => {
    setError(null);
    setOutput([]);
    const { output: logs, error: err } = runCode(code);
    setOutput(logs);
    setError(err);
    if (!err && question?.expectedOutput && isOutputCorrect(logs, question.expectedOutput)) {
      setTimerRunning(false);
      setAnswerCorrect(true);
    }
  };

  return (
    <div className="page playground-page">
      <header className="playground-header">
        <div className="playground-header-left">
          <h1>Playground</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/leaderboard">Leaderboard</Link>
          </nav>
        </div>
        <div className="playground-header-right">
          <Timer
            duration={timerDuration}
            isRunning={timerRunning}
            onExpired={() => {
              setTimerRunning(false);
              alert("Time's up! Your time has expired.");
            }}
            onReset={() => {
              setTimerRunning(true);
            }}
          />
        </div>
      </header>

      {question && (
        <div className="playground-question-info">
          <div className="playground-question-header">
            <h2 className="playground-question-title">{question.title}</h2>
            {question.difficulty && (
              <span className={`difficulty-badge difficulty-${question.difficulty}`}>
                {question.difficulty}
              </span>
            )}
            {answerCorrect && (
              <span className="answer-correct-badge">Correct – timer stopped</span>
            )}
          </div>
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
      </div>
    </div>
  );
}

export default Playground;
