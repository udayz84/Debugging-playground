import { Link } from "react-router-dom";

function ChallengeCard({ title, description, to }) {
  const content = (
    <>
      <h3 className="challenge-card-title">{title}</h3>
      {description && <p className="challenge-card-desc">{description}</p>}
      <span className="challenge-card-cta">Debug →</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className="challenge-card challenge-card-link">
        {content}
      </Link>
    );
  }

  return <div className="challenge-card">{content}</div>;
}

export default ChallengeCard;
