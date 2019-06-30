import React, { useState, useCallback } from "react";
import firebase from "firebase/app";
import { firestore } from "../../utils/firebase";
import { Article } from "../../store/articles";
import Button from "../../modules/Button/Button";
import TextField from "../../modules/TextField/TextField";
import GenreSelect from "./modules/GenreSelect/GenreSelect";
import Markdown from "../../modules/Markdown/Markdown";
import "./New.css";

const New = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [genre, setGenre] = useState("common");

  const post = useCallback(async () => {
    const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
    const article: Article = {
      title,
      body,
      genre,
      created_at: timestamp,
      updated_at: timestamp
    };
    await firestore.collection("articles").add(article);
    location.href = '/';
  }, [title, body]);

  return (
    <div className="New">
      <section className="New-Title-Genre-Form">
        <TextField
          className="New-Title-Form"
          defaultValue={title}
          onChange={e => setTitle(e.currentTarget.value)}
          placeholder="Title"
        />
        <GenreSelect
          className="New-GenreSelect"
          genre={genre}
          onChange={e => {
            setGenre(e.currentTarget.value);
          }}
        />
      </section>
      <section className="New-Article-Editor">
        <textarea
          className="New-Article-Editor-Textarea"
          rows={64}
          defaultValue={body}
          onChange={e => setBody(e.currentTarget.value)}
        />
        <Markdown className="New-Article-Editor-Preview" src={body} />
      </section>
      <Button className="New-Article-Post" onClick={post}>
        POST
      </Button>
    </div>
  );
};

export default New;
