"use client";
import React, { useState, useRef } from "react";
import styles from "./page.module.css";
import QuillEditor from "@/components/quillEditor/QuillEditor";

const Home = () => {

  const [title, setTitle] = useState('');
  const editorRef = useRef(null);

  const handleTextChange = (content) => {
    console.log("Text change:", content);
  };

  const handleSelectionChange = (range, oldRange, source) => {
    console.log("Selection change:", range);
  };

  return (
    <div className={styles.container}>
      <QuillEditor ref={editorRef} onTextChange={handleTextChange} />
    </div>
  );
};

export default Home;
