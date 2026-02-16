/**
 * Runs user code in the browser using eval.
 * Captures console.log/error/warn and returns output + any thrown error.
 */
function formatValue(value) {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (typeof value === "object") {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }
  return String(value);
}

export function runCode(code) {
  const logs = [];
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  const capture = (type) => (...args) => {
    const line = args.map(formatValue).join(" ");
    logs.push({ type, line });
  };

  console.log = capture("log");
  console.error = capture("error");
  console.warn = capture("warn");

  let error = null;

  try {
    eval(code);
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  } finally {
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
  }

  return { output: logs, error };
}
