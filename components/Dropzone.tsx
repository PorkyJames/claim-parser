"use client";
import "./Dropzone.css"
import ResultsTable from "./ResultsTable"
import INSUREDS from "@/lib/data"

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { parseDocxFile } from "@/lib/parser"

type Insured = {
  name: string;
  internalId: string;
};

export default function Dropzone() {

  const [files, setFiles] = React.useState<File[]>([])
  const [status, setStatus] = React.useState<Record<string, "processing" | "done" | "error">>({});
  const [matchMap, setMatchMap] = React.useState<Record<string, Insured | "No Match">>({});

  const updateStatus = (filename: string, status: "processing" | "done" | "error") => {
    setStatus(prev => ({ ...prev, [filename]: status }));
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    
    //! If multiple files, loop through each one
    await Promise.all(
      acceptedFiles.map(async (file) => {
        updateStatus(file.name, "processing");

        let parsedText = "";
        const txt = "text/plain";
        const docx = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

        if (file.type === txt || file.name.toLowerCase().endsWith(".txt")) {
          parsedText = await file.text();
        } else if (file.type === docx || file.name.toLowerCase().endsWith(".docx")) {
          parsedText = await parseDocxFile(file);
        } else {
          console.error("Wrong File Type Provided");
          updateStatus(file.name, "error");
          return;
        }

        const res = await fetch("/api/find-match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ parsedText }),
        });

        const { result } = await res.json();
        console.log("result>>>", result);

        const parsedResult = (() => {
          try {
            return typeof result === "string" ? JSON.parse(result) : result;
          } catch {
            return "No Match";
          }
        })();

        setMatchMap(prev => ({
          ...prev,
          [file.name]: parsedResult || "No Match"
        }));

        updateStatus(file.name, "done");
      })
  );

  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: {
      //! Hopefully get a working solution down the line :( >>>> llamaparse? unstructured? pdf-parse?
      // "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":[".docx"],
      "text/plain": [".txt"],
    },
  })

  return (
    <>
      <div className="dropzone">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p className="text">Drop the files here ...</p> :
              <p className="text">Drag and Drop files here, or Click to Upload</p>
          }
        </div>
      </div>

      <div className="upload-status-list">
        {files.map((file) => (
          <div key={file.name}>
            {file.name} — <strong>{status[file.name]}</strong>
          </div>
        ))}
      </div>

      <div className="results">
          <ResultsTable files={files} matchMap={matchMap} insureds={INSUREDS} />
      </div>

    </>
  )
}
