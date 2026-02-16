import { Link } from "react-router-dom";
import ChallengeCard from "../components/ChallengeCard";
import { jsQuestions } from "../questions/jsquestions";

function Home() {
  return (
    <div className="page home-page">
      <h1>Home</h1>
      <nav>
        <Link to="/playground">Playground</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </nav>

      <section className="home-section">
        <h2 className="section-title">JS</h2>
        <p className="section-desc">Pick a question and debug the code in the Playground.</p>
        <div className="question-grid">
          {jsQuestions.map((q) => (
            <ChallengeCard
              key={q.id}
              title={q.title}
              description={q.description}
              to={`/playground?question=${q.id}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
