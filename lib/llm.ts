//! Connect to Open AI here and give it the prompt. 
import OpenAI from "openai"
import INSUREDS, { Insured } from "@/lib/data";

export async function findMatch(parsedText: string) {
    const apiKey = process.env.OPENAI_API_KEY;
    // console.log(apiKey)

    // console.log("Parsed Text Input:", parsedText);

    const gptRole = 
        `
        You are a claims processing assistant. You will receive a list of insured entities and a document's text.
        Compare the document text to each insured entity name using approximate/fuzzy matching (like Levenshtein logic).
        If one name closely matches (e.g. similarity ≥ 0.8), return its "name" and "internalId".
        If no name matches well, respond only with: "No Match".
        `;

    //! JSON Stringify takes in 3 args: the array we want to Jsonify, the replacer, and the space. 
    //! Null for the replacer means that we don't want to omit anything. 
    const userPrompt = `
        Here is the list of insureds:
        ${JSON.stringify(INSUREDS, null, 2)}

        Here is the document text:
        ${parsedText}
    `;


    const messageToGPT = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                {   
                    role: "system", 
                    content: gptRole,
                },
                {
                    role: "user",
                    content: userPrompt,
                }
            ],
            //! Increase for higher creativity
            temperature: 0.2,
            max_tokens: 150
        })
    })

    //! Error handling
    if (!messageToGPT.ok) {
        console.error("Message to GPT is not working as intended")
    }

    const data = await messageToGPT.json();
    const content = data.choices?.[0]?.message?.content?.trim() ?? "No Match";

    return content;
}
