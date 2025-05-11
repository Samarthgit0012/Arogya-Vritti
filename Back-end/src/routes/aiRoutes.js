import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();
// const AI_API_KEY=process.env.AI_API_KEY;

router.post('/ai/assistant', async (req, res) => {
    try {
      const { prompt } = req.body;
  
      // Gemini expects the API key as a query parameter and a specific payload format
      const aiResponse = await axios.post(
        `${process.env.AI_API_URL}?key=${process.env.AI_API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }]
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      res.json({ result: aiResponse.data });
      console.log(aiResponse.data);
    } catch (error) {
      console.error('AI API error:', error.response?.data || error.message);
      res.status(500).json({ error: 'AI API request failed' });
    }
  });

export default router; 