import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/generate-quiz', async (req, res) => {
  try {
    const { subject, topic, type, count } = req.body;

    const prompt = `Generate ${count} ${type === 'multiple' ? 'multiple-choice' : 'true/false'} questions about "${topic}" in the subject of "${subject}". 
Each question must include:
1. A clear and concise question
2. ${type === 'multiple' ? 'Four answer options (A, B, C, D)' : 'Two options: True and False'}
3. An answer labeled clearly like: Answer: <Correct Option>.
Keep it educational and challenging.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a professional quiz generator for educational content.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;
    const questions = parseAIResponse(aiResponse, type);

    res.json({ success: true, questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

function parseAIResponse(aiResponse, type) {
  const questions = [];
  const blocks = aiResponse.split(/\n(?=\d+\.)/).filter(q => q.trim());

  blocks.forEach(block => {
    const lines = block.trim().split('\n').filter(line => line.trim());

    const questionLine = lines.find(line => /^[^A-D]/.test(line)) || '';
    const options = lines.filter(line => /^[A-D]\)/.test(line)).map(opt => opt.replace(/^[A-D]\)\s*/, '').trim());
    const answerLine = lines.find(line => /^Answer:/i.test(line)) || '';

    questions.push({
      question: questionLine.trim(),
      options: type === 'multiple' ? options : ['True', 'False'],
      answer: answerLine.replace(/^Answer:\s*/i, '').trim()
    });
  });

  return questions;
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
