import { PdfReader } from "pdfreader";
import OpenAI from "openai";

export const analyzeResumeWithOpenAI = async (resumeText) => {

    const apiKey = process.env.OPENAI_SECRET_KEY

    const openai = new OpenAI({apiKey});
    const prompt = `Analyse the resume and extract relevant information:\n\n${resumeText}\n\n
                    Return a parsable JSON format with the following structure:{
                    firstName: "first name of this person",
                    lastName: "last name of this person",
                    linkedinURL: "LinkedIn link",
                    gitHubURL: "GitHub link",
                    otherURL: "this person other relevand url (portfolio)",
                    phone1: "this person first phone number if exists",
                    phone2: "this person second phone number if exists",
                    experience: [
                        {
                            company: "first company name",
                            startYear: "year when started working"
                            endYear: "year when finished working, or the word 'current', if still in this position"
                        }
                    education: [
                        {
                            institutionName: "first institution name",
                            degree: "first degree title, eg: 'Bachelor in Computer Science'",
                            startYear: "year when started working"
                            endYear: "year when finished working, or the word 'current', if still in this position"
                        }
                    ]
                    skills: ["an array with all the techincal skills you find"],
                    overview: "a short overview about this professional"
                }
            `

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You will read a RAW resume data and respond structured as JSON file.",
            },
            { role: "user", content: prompt },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
    });

    const responseMessage = completion.choices[0].message.content;

    return JSON.parse(responseMessage)
};

export const extractTextFromPdfBuffer = async (buffer) => {
    return new Promise((resolve, reject) => {
        const reader = new PdfReader();
        let text = '';

        reader.parseBuffer(buffer, (err, item) => {
            if (err) {
                console.error("Error:", err);
                reject(err);
            } else if (item && item.text) {
                text += item.text;
            } else if (!item) {
                console.warn("End of buffer");
                resolve(text);
            }
        });
    });
};
