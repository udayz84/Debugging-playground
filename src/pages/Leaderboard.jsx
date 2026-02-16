import { Link } from "react-router-dom";

function Leaderboard() {
  return (
    <div className="page leaderboard-page">
      <h1>Leaderboard</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/playground">Playground</Link>
      </nav>
      <p>Leaderboard entries will appear here.</p>
    </div>
  );
}

export default Leaderboard;
