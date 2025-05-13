//! Next.js does not allow private env variables to be used in the frontend so we'll need to call this api route from here
//! to the frontend for the LLM to check the matches. 

import { NextRequest, NextResponse } from "next/server";
import { findMatch } from "@/lib/llm";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { parsedText } = await req.json();

        const result = await findMatch(parsedText);
        //! Result shows name and internalId

        return NextResponse.json({ result }); 
    } catch (err:any) {
        console.error("LLM Match Error:", err);
        return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
    }
}
