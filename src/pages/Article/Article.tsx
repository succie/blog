import React from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { RootState } from "../../store";
import { RouteComponentProps } from "react-router";

type Props = RouteComponentProps<{ genre: string; title: string }>;

const Article = (props: Props) => {
  const { genre, title } = props.match.params;
  const article = useSelector(
    (state: RootState) =>
      state.articles.articles &&
      state.articles.articles.find(
        article => article.title === title && article.genre === genre
      )
  );

  if (!article) return <h1>Nothing article.</h1>;

  return (
    <div className="Article">
      <header className="Article-header">
        <section>
          <time>{format(article.updated_at.toDate(), "MMM DD")}</time> /{" "}
          {article.genre.toUpperCase()}
        </section>
        <h1>{article.title}</h1>
      </header>
      <article className="Article-body">{article.body}</article>
    </div>
  );
};

export default Article;
