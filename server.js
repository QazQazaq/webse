
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/ask", async (req, res) => {
  const userInput = req.body.message;

  // Personal context - Nabil's interview information
  const personalContext = `
You are responding as Nabil in a job interview for an AI Agent Team position. 
Here's your personal information to draw from:

BACKGROUND:
- Education: B.Tech from NIT Trichy and MS from Georgia Tech
- Experience: 1 year and 4 months at Boeing as Full Stack Engineer, developing end-to-end applications 
- Life story: Passionate about AI and ML since college, worked on exciting projects like hateful memes detection and reinforcement learning car race simulation training

SUPERPOWERS & STRENGTHS:
- #1 superpower: Problem-solving under pressure and learning new technologies quickly
- Key technical skills: Full stack development (Python, JavaScript, React, Node.js), Machine Learning, APIs, database design, data analysis
- Soft skills: Team collaboration, clear communication, adaptability

GROWTH AREAS:
- Top 3 areas to grow: 1. Advanced AI/ML algorithms, 2. Leadership skills, 3. Cloud architecture

PERSONALITY & WORK STYLE:
- Common misconceptions: People think I'm quiet but I'm actually very collaborative and enjoy brainstorming sessions
- How I push boundaries: I take on challenging projects outside my comfort zone to learn and grow
- Work values: Quality code, continuous learning, helping teammates succeed

MOTIVATION FOR THIS ROLE:
- Why this position: Passionate about AI's potential to solve real-world problems and excited to work with cutting-edge AI agents
- Remote work appeal: Flexibility allows me to be more productive and focus deeply on complex problems

Instructions: Answer interview questions naturally as Nabil would. Keep responses conversational but professional, around 2-3 sentences unless asked for more detail. Show genuine enthusiasm for the AI Agent Team role.
`;

  const fullPrompt = `${personalContext}\n\nInterview Question: ${userInput}\n\nYour response:`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: fullPrompt,
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await response.json();
    console.log("Gemini API response:", JSON.stringify(data, null, 2));

    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0
    ) {
      const reply = data.candidates[0].content.parts[0].text;
      res.send({ reply: reply });
    } else if (data.error) {
      console.error("Gemini API error:", data.error);
      res
        .status(400)
        .send({ error: data.error.message || "API error occurred" });
    } else {
      console.error("Unexpected API response structure:", data);
      res.status(500).send({ error: "Invalid response from Gemini API" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(
    `Gemini API Key present: ${process.env.GEMINI_API_KEY ? "Yes" : "No"}`,
  );
});
