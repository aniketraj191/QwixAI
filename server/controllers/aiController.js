import OpenAI from "openai";
import sql from "../configs/db.js";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

const AI = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const TEXT_MODEL = "llama-3.1-8b-instant";

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;

    const response = await AI.chat.completions.create({
      model: TEXT_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful writing assistant. Write clear, well-structured, and high-quality content.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: Number(length) || 800,
    });

    const content = response.choices[0].message.content;

    await sql.query(
      "INSERT INTO creations (user_id, prompt, content, type) VALUES ($1, $2, $3, $4)",
      [userId, prompt, content, "article"]
    );

    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;

    const response = await AI.chat.completions.create({
      model: TEXT_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a professional blog title generator. Create catchy, relevant, and SEO-friendly blog titles.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices[0].message.content;

    await sql.query(
      "INSERT INTO creations (user_id, prompt, content, type) VALUES ($1, $2, $3, $4)",
      [userId, prompt, content, "blog-title"]
    );

    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: { "x-api-key": process.env.CLIPDROP_API_KEY },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      "binary"
    ).toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql.query(
      "INSERT INTO creations (user_id, prompt, content, type, publish) VALUES ($1, $2, $3, $4, $5)",
      [userId, prompt, secure_url, "image", publish ?? false]
    );

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;

    if (!image) {
      return res.json({
        success: false,
        message: "Image file is required.",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    await sql.query(
      "INSERT INTO creations (user_id, prompt, content, type) VALUES ($1, $2, $3, $4)",
      [userId, "Remove background from image", secure_url, "image"]
    );

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const image = req.file;

    if (!image) {
      return res.json({
        success: false,
        message: "Image file is required.",
      });
    }

    if (!object) {
      return res.json({
        success: false,
        message: "Object to remove is required.",
      });
    }

    const { public_id } = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: "image",
    });

    await sql.query(
      "INSERT INTO creations (user_id, prompt, content, type) VALUES ($1, $2, $3, $4)",
      [userId, `Removed ${object} from image`, imageUrl, "image"]
    );

    res.json({ success: true, content: imageUrl });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;

    if (!resume) {
      return res.json({
        success: false,
        message: "Resume file is required.",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume file size exceeds allowed size (5MB).",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `
Review the following resume and provide:
1. Overall strengths
2. Weaknesses
3. Missing keywords/skills
4. ATS improvement suggestions
5. Formatting/content improvements
6. Final rating out of 10

Resume Content:
${pdfData.text}
`;

    const response = await AI.chat.completions.create({
      model: TEXT_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume reviewer and ATS evaluator. Give practical, structured, and professional feedback.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    await sql.query(
      "INSERT INTO creations (user_id, prompt, content, type) VALUES ($1, $2, $3, $4)",
      [userId, "Review the uploaded resume", content, "resume-review"]
    );

    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};