import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { format } from "date-fns";
import { RootState } from "../../store/index.js";
import "./Index.css";

const mapStateToProps = (state: RootState) => {
  return {
    menu: state.menu,
    articles: state.articles
  };
};

type Props = ReturnType<typeof mapStateToProps>;

const Index = (props: Props) => {
  const cns = classnames("Index", { "menu-is-open": props.menu.isOpen });

  return (
    <div className="Index">
      <h2 className="Index-title">All Stories</h2>
      <div className="Index-Articles">
        {props.articles.map(article => (
          <Link
            className="Index-Article"
            to={`/${article.genre}/${article.title}/`}
            key={article.title}
          >
            <div className="Index-Article-header">
              <time
                className="Index-Article-createdAt"
                dateTime={format(article.updated_at, "YYYY-MM-DD HH:mm:ssZ")}
              >
                {format(article.created_at, "MMM DD").toUpperCase()}
              </time>
              {` / ${article.genre.toUpperCase()}`}
            </div>
            <h3 className="Index-Article-title">{article.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Index);
