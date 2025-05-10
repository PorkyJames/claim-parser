"use client";

import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import ResultsTable from "./ResultsTable"
import "./Dropzone.css"

export default function Dropzone() {

  const [files, setFiles] = React.useState<File[]>([])
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
      setFiles(acceptedFiles)
      console.log(acceptedFiles)
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
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
