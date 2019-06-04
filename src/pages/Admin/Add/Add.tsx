import React, { useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import ReactMarkdown from "react-markdown";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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
      <Select
        value={genre}
        onChange={e => {
          setGenre(e.target.value as string);
        }}
      >
        {["common", "technology"].map(genre => (
          <MenuItem value={genre} key={genre}>
            {genre}
          </MenuItem>
        ))}
      </Select>
      <div className="Add-Editor">
        <div className="Add-Editor-edit">
          <TextField
            className="Add-Editor-edit-title"
            type="text"
            onChange={e => {
              setTitle(e.currentTarget.value);
            }}
            defaultValue={title}
            placeholder="Title"
          />
          <TextField
            className="Add-Editor-edit-body"
            multiline
            defaultValue={body}
            onChange={e => {
              setBody(e.currentTarget.value);
            }}
            margin="normal"
            variant="outlined"
            label="Body"
            rows={25}
          />
        </div>
        <div className="Add-Editor-preview">
          <ReactMarkdown source={body} />
        </div>
      </div>
      <Button className="Add-Save" onClick={postArticle} variant="contained">
        Save
      </Button>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Add);
