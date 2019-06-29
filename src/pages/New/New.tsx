import React, { useState, useCallback } from "react";
import firebase from "firebase/app";
import { firestore } from "../../utils/firebase";
import { Article } from "../../store/articles";

const New = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [genre, setGenre] = useState("");

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
  }, [title, body]);

  return (
    <div className="Add">
      <input
        type="text"
        defaultValue={title}
        onChange={e => setTitle(e.currentTarget.value)}
      />
      <input
        type="text"
        defaultValue={genre}
        onChange={e => setGenre(e.currentTarget.value)}
      />
      <textarea
        defaultValue={body}
        onChange={e => setBody(e.currentTarget.value)}
      />
      <button onClick={post}>POST</button>
    </div>
  );
};

export default New;
