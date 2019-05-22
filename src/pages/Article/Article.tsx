import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import ReactMarkdown from "react-markdown";
import "./Article.css";
import { RootState } from "../../store";

const mapStateToProps = (state: RootState) => {
  return {
    articles: state.articles
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  RouteComponentProps<{ genre: string; title: string }>;

const Article = (props: Props) => {
  const { genre, title } = props.match.params;
  const article = props.articles.find(
    article => article.genre === genre && article.title === title
  );

  if (!article) return <h1>Nothing article.</h1>;

  return (
    <div className="Article">
      <div className="Article-header">
        <span className="Article-genre">{genre.toUpperCase()}</span>
        <h1 className="Article-title">{title}</h1>
      </div>
      <div className="Article-body">
        <ReactMarkdown source={article.body} />
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Article);
