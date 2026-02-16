function Console({ output = [], error = null }) {
  const hasContent = output.length > 0 || error;

  return (
    <div className="console">
      <h3>Console</h3>
      <pre className="console-output">
        {error && <span className="console-error">{error}</span>}
        {output.map((item, i) => (
          <span key={i} className={`console-line console-type-${item.type}`}>
            {item.line}
          </span>
        ))}
        {!hasContent && "Output will appear here..."}
      </pre>
    </div>
  );
}

export default Console;
