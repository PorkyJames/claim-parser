import * as mammoth from "mammoth";

//! Function to parse .docx files. Need buffer since docx stored in binary
export async function parseDocxFile(file: File): Promise<string> {
    
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });

    return result.value;
}
