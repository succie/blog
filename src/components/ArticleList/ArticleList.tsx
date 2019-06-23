import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { format } from "date-fns";
import { Article } from "../../store/articles";
import "./ArticleList.css";

type Props = {
  articles?: Article[];
  className?: string;
};

const ArticleList = ({ articles, className }: Props) => {
  if (!articles) return null;

  const cns = clsx("ArticleList", className);

  return (
    <nav className={cns}>
      {articles.map(article => (
        <Link to={`/${article.genre}/${article.title}`} key={article.title}>
          <section className="ArticleList-Item">
            <h3 className="ArticleList-Item-title">{article.title}</h3>
            <section className="ArticleList-Item-label">
              <time>{format(article.updated_at.toDate(), "MMM DD")}</time> /{" "}
              {article.genre}
            </section>
          </section>
        </Link>
      ))}
    </nav>
  );
};

export default ArticleList;
