const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const analyzeResume = async (resumeText, jobDescription) => {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
    max_tokens: 1000,
    messages: [
      {
        role: "system",
        content: `You are an expert HR assistant. Compare the resume against the job description.
Respond with ONLY a valid JSON object, no markdown, no backticks:
{
  "matchPercentage": <integer 0-100>,
  "skillsFound": [<list of matching skills>],
  "missingSkills": [<list of missing skills>],
  "summary": "<2-4 sentence summary>"
}`
      },
      {
        role: "user",
        content: `JOB DESCRIPTION:\n${jobDescription}\n\nRESUME:\n${resumeText}`
      }
    ],
  });

  const raw = response.choices[0].message.content.trim();
  const cleaned = raw.replace(/```json|```/gi, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("Could not parse AI response. Please try again.");
  }

  return parsed;
};

module.exports = { analyzeResume };
