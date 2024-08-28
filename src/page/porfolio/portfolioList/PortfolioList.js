import "./portfolioList.scss";

export default function PortfolioList({ id, title, active, setSelected }) {
  return (
    <li
      className={active ? "portfolioList activeList" : "portfolioList"}
      onClick={() => setSelected(id)}
    >
      {title}
    </li>
  );
}
