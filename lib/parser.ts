import * as mammoth from "mammoth";

//! Function to parse .docx files. Need buffer since docx stored in binary
// This function will take in File object which is named file
// the Promise states that this function is asynchronous and that awaits will be used inside and will resolve to a string when done. 
export async function parseDocxFile(file: File): Promise<string> {
    
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });

    return result.value;
}
