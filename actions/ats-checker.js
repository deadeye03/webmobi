"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const atsChecker = async (pdfUrl) => {
    try {


        const pdfResp = await fetch(pdfUrl)
            .then((response) => response.arrayBuffer());

        const prompt = `
    Analyze the given PDF resume and return a detailed JSON response that evaluates the resume from multiple perspectives. The analysis should include:

1. **ATS Score (0-100):** Evaluate the resume based on:
   - Proper sectioning (Experience, Skills, Education, Contact Info, etc.)
   - Use of relevant keywords
   - Readability & Formatting (Fonts, Bullet Points, Consistency)
   - Presence of measurable achievements
   - Avoidance of common ATS pitfalls (e.g., graphics, columns, headers, footers)

2. **Job Fit Score (0-100) [if job description is provided]:** Compare the resume against a provided job description to calculate how well it matches in terms of:
   - Required skills
   - Relevant experience
   - Industry-specific keywords
   - Education level match

3. **Readability Score (0-100):** Rate how easy it is to read the resume based on:
   - Sentence structure
   - Avoiding excessive jargon
   - Clarity & conciseness
   - Proper use of action verbs

4. **Improvement Suggestions (Array):** List specific ways the resume can be improved, categorized as:
   - **ATS Optimization** (e.g., "Use standard section headers like 'Work Experience' instead of 'Professional Journey'")
   - **Content Enhancement** (e.g., "Include quantifiable metrics in work experience")
   - **Formatting Issues** (e.g., "Use a standard font like Arial or Calibri for better ATS parsing")
   - **Missing Sections** (e.g., "Add a 'Projects' section to showcase additional skills")

5. **Spelling Mistakes (Array):** List of misspelled words.

6. **Grammatical Errors (Array of Objects):** Show incorrect phrases with suggestions for correction.


7. **Section Completeness (Object):** Indicate whether essential sections are present in the resume.  

(Mark **true** if the section is present, **false** if missing.)

8. **Soft & Hard Skills Analysis (Object):** Extract and categorize skills found in the resume.

9. **Top Missing Keywords (Array):** List of important job-related keywords missing from the resume that could improve ATS compatibility.

10. **Formatting Issues (Array):** Identify any formatting problems like:
- Multiple fonts used
- Inconsistent bullet points
- Poor alignment
- Use of tables or images that ATS can't parse



JSON Output Format:
{
  "ats_score": 78,
  "job_fit_score": 85,
  "readability_score": 90,
  "improvement_suggestions": [
   { category: "categories like Content Enhancemen",
    suggestion:"Use standard section headers like 'Work Experience'"}
  ],
  "spelling_mistakes": [
    "Managment",
    "Resposibilities"
  ],
  "grammatical_errors": [
    {
      "error": "I have worked in many projects",
      "suggestion": "I have worked on many projects"
    }
  ],
  "section_completeness": {
    "Contact_information": true,
    "Summary": true,
    "Work_experience": false,
    "Education": true,
    "Skills": true,
    "Projects": false,
    "Certifications": false
  },
  "skills_analysis": {
    "hard_skills": ["Python", "Machine Learning", "SQL"],
    "soft_skills": ["Leadership", "Problem-Solving", "Teamwork"]
  },
  "missing_keywords": [
    "Agile Methodologies",
    "Data Analysis",
    "Cloud Computing"
  ],
  "formatting_issues": [
    "Multiple fonts used",
    "Inconsistent bullet points",
    "Use of images that ATS may not parse"
  ]
}

**Ensure that the analysis is accurate and provides meaningful suggestions. The ATS score should be based on keyword matching, readability, proper sectioning, and formatting best practices.

               `

        const result = await model.generateContent([
            {
                inlineData: {
                    data: Buffer.from(pdfResp).toString("base64"),
                    mimeType: "application/pdf",
                },
            },
            prompt,
        ]);
        const text = result.response.text();
        // console.log('Raw text:', text);

        // Extract JSON from the response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("No JSON object found in the response");
        }

        let jsonString = jsonMatch[0];
        
        // Clean the JSON string
        jsonString = jsonString
            .replace(/\n/g, " ")
            .replace(/\r/g, " ")
            .replace(/\t/g, " ")
            .replace(/\s+/g, " ")
            .trim();

        try {
            const tips = JSON.parse(jsonString);
            console.log('Parsed JSON:', tips);
            return tips;
        } catch (e) {
            console.error('Error parsing JSON:', e);
            console.error('Cleaned JSON string:', jsonString);
            
            // Attempt to fix and parse the JSON
            const fixedJson = fixJsonString(jsonString);
            if (fixedJson) {
                console.log('Fixed JSON:', fixedJson);
                return fixedJson;
            }
            
            return null; // If all attempts fail, return null
        }
    } catch (error) {
        console.error('Unable to generate AI response', error);
        return null;
    }
};

function fixJsonString(jsonString) {
    // Replace escaped quotes with a placeholder
    jsonString = jsonString.replace(/\\"/g, "ESCAPED_QUOTE");

    // Replace unescaped quotes within values with escaped quotes
    jsonString = jsonString.replace(/"([^"]*)":/g, (match, p1) => `"${p1.replace(/"/g, '\\"')}":`)
                           .replace(/:(\s*)"([^"]*)"/g, (match, p1, p2) => `:${p1}"${p2.replace(/"/g, '\\"')}"`);

    // Replace the placeholder back with escaped quotes
    jsonString = jsonString.replace(/ESCAPED_QUOTE/g, '\\"');

    try {
        return JSON.parse(jsonString);
    } catch (e) {
        console.error('Unable to fix JSON:', e);
        return null;
    }
}