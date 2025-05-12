import * as mammoth from "mammoth";

//! Function to parse .docx files
export async function parseDocxFile(file: File): Promise<string> {
    //Need the buffer since docx file is stored in binary
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });

    return result.value;
}
