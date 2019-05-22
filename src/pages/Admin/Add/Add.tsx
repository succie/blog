import React, { useState, ChangeEvent } from "react";
import ReactMarkdown from "react-markdown";
import "./Add.css";

const Add = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  return (
    <div className="Add">
      <div className="Add-Editor">
        <input
          className="Add-Editor-title"
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value);
          }}
          defaultValue={title}
        />
        <textarea
          className="Add-Editor-body"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setBody(e.currentTarget.value);
          }}
          defaultValue={body}
        />
      </div>
      <div className="Add-Preview">
        <ReactMarkdown source={body} />
      </div>
    </div>
  );
};

export default Add;
