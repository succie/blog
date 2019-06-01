import React, { useState, ChangeEvent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import ReactMarkdown from "react-markdown";
import firebase from "firebase/app";
import { Article, articlesAction } from "../../../store/articles";
import "./Add.css";

const mapDispatchToProps = (dispatch: any) => {
  return {
    postArticle: (article: Article) =>
      dispatch(articlesAction.postArticlesRequest(article))
  };
};

type Props = ReturnType<typeof mapDispatchToProps> & RouteComponentProps;

const Add = (props: Props) => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [genre, setGenre] = useState<string>("common");

  const postArticle = () => {
    const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
    const article: Article = {
      title,
      body,
      genre,
      created_at: timestamp,
      updated_at: timestamp
    };
    props.postArticle(article);
    props.history.push("/");
  };

  return (
    <div className="Add">
      <select
        value={genre}
        onChange={e => {
          setGenre(e.currentTarget.value);
        }}
      >
        {["common", "technology"].map(genre => (
          <option value={genre} key={genre}>
            {genre}
          </option>
        ))}
      </select>
      <div className="Add-Editor">
        <div className="Add-Editor-edit">
          <input
            className="Add-Editor-edit-title"
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTitle(e.currentTarget.value);
            }}
            defaultValue={title}
            placeholder="Title"
          />
          <textarea
            className="Add-Editor-edit-body"
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setBody(e.currentTarget.value);
            }}
            defaultValue={body}
          />
        </div>
        <div className="Add-Editor-preview">
          <ReactMarkdown source={body} />
        </div>
      </div>
      <button className="Add-Save" onClick={postArticle}>
        SAVE
      </button>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Add);
