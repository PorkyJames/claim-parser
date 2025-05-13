# **Claim Parser**

#### Note: Unfortunately, I was unable to implement all of the Functional Requirements as I was unable to include a Levenshtein %, a Jest Test for it, a Select Dropdown if there was "No Match" as well as parse a PDF. I was able to Parse Docx and Txt Files as they were a lot more straightforward. While I am not the happiest about the result, being able to learn Typescript, Next.js, Open AI LLM, and other tools like my life depended on it was an amazing 3 day experience. Thank you for the opportunity to learn these tools within the past 3 days. 

## *Setup*
#### To start, run `npm run dev`
#### Then, navigate to `http://localhost:3000`

## *Architecture* 
#### As the claim parser requires a user to upload files, I decided to utilize **React-Dropzone** for a faster method of implementing an upload feature. Originally, the plan was to parse PDFs, DOCX, and TXT files, however, parsing PDFs proved to be a challenge. Instead of relying on separate packages, I was originally thinking of using the **LlamaParse / LlamaCloud API** to be my one-stop shop for parsing all forms of documents as it integrates well with LLMs. However, after reading through the documentation, I realized that LlamaParse was very well suited for a Python SDK and the documentation pages for Next.js resulted in a 404. With time running out, I decided to switch from LlamaParse, to only parsing DOCX and TXT files using `mammoth` and the built- in `.text()` method, respectively. 

#### Once the data is parsed, it is sent to the LLM for processing. I utilized **GPT 4o-mini's chat completion** capabilities, assigned it a role and gave it a prompt to match with the mock data provided in the assessment in my `@/lib/data`. Another aspect I've learned is that Next.js cannot process environment variables in the frontend, to combat this, I would need to create a new route in the backend using the App Router system from Next.js to process the comparison in the backend in my `app/api/find-match/route.ts`. The text is then parsed in the backend and then sent to the frontend. These are then displayed in the frontend within the result table. 

## *Trade-offs* 
#### I wasn't given much time to deep dive into the trade-offs, but I was thinking about how to return the data after being parsed. Originally, I was planning to have it completely return in text which would be a bit more easier to manipulate. However, through some reading and googling, I was able to discern that JSON would be better as it’s more scalable and easier for LLMs to parse through the data and manipulate it.

#### Next, I was thinking of which API to use to parse all of the documentation. Instead of LlamaParse which relies on a Python SDK, if I wanted to learn more about Next.js and Typescript, it would be more wise to try and attempt to use **PDF.co or Unstructured.io** which all have received great rapport from the dev community. I was also thinking of using Open AI to parse the document, but learned that you cannot directly provide Open AI’s API to take in a document as an input and expect it to parse it. It would have been nice since it would have made the process more smooth. 
