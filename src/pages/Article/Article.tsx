import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import { format } from "date-fns";
import { RootState } from "../../store";

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
      <ReactMarkdown
        className="Article-body"
        source={article.body}
        plugins={[breaks]}
      />
    </div>
  );
};

export default Article;
