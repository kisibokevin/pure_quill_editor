'use client';
import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import Quill from "quill";
import "quill/dist/quill.snow.css";



const toolbarOptions = [
	["bold", "italic", "underline", "strike"],
	["blockquote", "code-block"],
	[{ header: 1 }, { header: 2 }],
	[{ list: "ordered" }, { list: "bullet" }],
	[{ script: "sub" }, { script: "super" }],
	[{ indent: "-1" }, { indent: "+1" }],
	[{ direction: "rtl" }],
	[{ size: ["small", false, "large", "huge"] }],
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ color: [] }, { background: [] }],
	[{ font: [] }],
	[{ align: [] }],
	["link", "image", "video"],
	["clean"],
];


// Editor is an uncontrolled React component

const QuillEditor = forwardRef(({ readOnly, defaultValue="", onTextChange, onSelectionChange }, ref) => {

    const containerRef = useRef(null);
    const editorInstanceRef = useRef(null);

    useLayoutEffect(() => {
		const container = containerRef.current;

		const editorContainer = container.appendChild(
			container.ownerDocument.createElement("div")
		);

		const quill = new Quill(editorContainer, {
			modules: {
				syntax: {hljs},
				toolbar: toolbarOptions,	
			},
			theme: "snow",			
			placeholder: 'Create your post...',
			readOnly,
		});

		// Initialize content if defaultValue is provided
		if (defaultValue) {
			quill.setContents(defaultValue);
		}

		// Save the quill instance to the ref
		editorInstanceRef.current = quill;

		// Text change handler
		quill.on("text-change", (...args) => {
			if (onTextChange) {
			onTextChange(quill.getContents(), ...args);
			}
		});

		// Selection change handler
		quill.on("selection-change", (...args) => {
			if (onSelectionChange) {
			onSelectionChange(...args);
			}
		});

		// Attach the quill instance to the forwarded ref
		if (ref) {
			ref.current = quill;
		}

		return () => {
			container.innerHTML = "";
		};
    }, [readOnly, defaultValue, onTextChange, onSelectionChange, ref]);

    return <div ref={containerRef}></div>;

});

QuillEditor.displayName = "QuillEditor";

export default QuillEditor;
