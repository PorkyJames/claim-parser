"use client";

import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import ResultsTable from "./ResultsTable"
import "./Dropzone.css"
import { parseDocxFile } from "@/lib/parser"

export default function Dropzone() {

  const [files, setFiles] = React.useState<File[]>([])
  
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);

    const formData = new FormData();

    //! If multiple files, loop through each one
    acceptedFiles.forEach(async (file) => {
      formData.append("file", file);

      let parsedText = "";
      const txt ="text/plain";
      const docx = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

      if (file.type === txt || file.name.toLowerCase().endsWith(".txt")) {
        parsedText = await file.text();
      } else if (file.type === docx || file.name.toLowerCase().endsWith(".docx")) {
          parsedText = await parseDocxFile(file);
      } else {
        console.error("Wrong File Type Provided")
      }

      console.log(parsedText) 
    })

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
              <p>Drop the files here ...</p> :
              <p>Drag and Drop files here, or Click to Upload</p>
          }
        </div>
      </div>

      <div className="results">
          <ResultsTable files={files}/>
      </div>

    </>
  )
}
