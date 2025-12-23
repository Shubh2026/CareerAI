import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { type UserProfile, type AiResponse } from "@shared/schema";

import { geminiClient } from "./gemini";

// --- MOCK AI ENGINE LOGIC ---
function generateAiAnalysis(profile: UserProfile): AiResponse {
  // 1. Determine Primary Interest
  const primaryInterest = profile.interests[0] || "General Tech";

  // 2. Mock Career Matches based on interest
  let recommendedCareers = [];
  let roadmap = [];
  let skillsGap = {
    strengths: profile.skills.split(',').map(s => s.trim()).filter(s => s.length > 0).slice(0, 3),
    needsImprovement: ["System Design", "Advanced Patterns"],
    missingCritical: ["Cloud Deployment", "Testing"],
  };

  // Logic branching based on keywords in interests
  const interestsLower = profile.interests.map(i => i.toLowerCase());
  const isFrontend = interestsLower.some(i => i.includes("frontend") || i.includes("react") || i.includes("ui"));
  const isBackend = interestsLower.some(i => i.includes("backend") || i.includes("node") || i.includes("api"));
  const isFullstack = isFrontend && isBackend;
  const isAI = interestsLower.some(i => i.includes("ai") || i.includes("ml") || i.includes("data"));

  if (isFullstack) {
    recommendedCareers = [
      {
        title: "Full Stack Engineer",
        matchPercentage: 92,
        reasoning: "Your diverse interest in both frontend and backend technologies makes you a strong candidate for full-stack roles. The market highly values versatility.",
        marketDemand: "Very High",
        salaryIndia: "₹8–18 LPA"
      },
      {
        title: "Product Engineer",
        matchPercentage: 85,
        reasoning: "With a grasp of the full stack, you can own end-to-end product features, which is critical for startups and product-focused companies.",
        marketDemand: "High",
        salaryIndia: "₹10–20 LPA"
      }
    ];
    skillsGap.missingCritical = ["Docker", "CI/CD", "Next.js Advanced"];
    roadmap = [
      {
        phase: "Advanced Frontend",
        timeline: "Month 1",
        focus: ["Server Components", "Performance Optimization", "State Management"],
        outcome: "Mastery of modern UI patterns"
      },
      {
        phase: "Scalable Backend",
        timeline: "Month 2",
        focus: ["Microservices", "Redis/Caching", "Message Queues"],
        outcome: "Ability to build resilient systems"
      },
      {
        phase: "DevOps & Deployment",
        timeline: "Month 3",
        focus: ["Docker", "AWS/Vercel", "GitHub Actions"],
        outcome: "Production-ready engineering skills"
      }
    ];
  } else if (isFrontend) {
    recommendedCareers = [
      {
        title: "Senior Frontend Developer",
        matchPercentage: 95,
        reasoning: "Your specific focus on UI/UX and frontend technologies aligns perfectly with specialized frontend roles.",
        marketDemand: "High",
        salaryIndia: "₹6–15 LPA"
      },
      {
        title: "UI Engineer",
        matchPercentage: 88,
        reasoning: "Focusing on design systems and component libraries is a great niche for your skillset.",
        marketDemand: "Moderate-High",
        salaryIndia: "₹5–12 LPA"
      }
    ];
    skillsGap.missingCritical = ["Performance Tuning", "Accessibility (a11y)", "Testing (Jest/Cypress)"];
    roadmap = [
      {
        phase: "Deep Dive React",
        timeline: "4 Weeks",
        focus: ["Hooks in depth", "Context API", "Render patterns"],
        outcome: "Write efficient, bug-free components"
      },
      {
        phase: "System Architecture",
        timeline: "6 Weeks",
        focus: ["Design Systems", "Monorepos", "Micro-frontends"],
        outcome: "Architect large-scale applications"
      }
    ];
  } else if (isBackend) {
    recommendedCareers = [
      {
        title: "Backend Engineer",
        matchPercentage: 94,
        reasoning: "Your interest in logic, data, and APIs points directly to backend engineering.",
        marketDemand: "Stable & High",
        salaryIndia: "₹7–16 LPA"
      },
      {
        title: "Cloud Architect",
        matchPercentage: 75,
        reasoning: "With more infrastructure knowledge, you could transition into architecture roles.",
        marketDemand: "High",
        salaryIndia: "₹12–25 LPA"
      }
    ];
    skillsGap.missingCritical = ["System Design", "Database Optimization", "Security"];
    roadmap = [
      {
        phase: "Database Mastery",
        timeline: "Month 1",
        focus: ["Complex SQL", "Indexing", "NoSQL patterns"],
        outcome: "Data modelling expertise"
      },
      {
        phase: "Distributed Systems",
        timeline: "Month 2-3",
        focus: ["Load Balancing", "CAP Theorem", "Event-driven Architecture"],
        outcome: "Design scalable backend systems"
      }
    ];
  } else if (isAI) {
    recommendedCareers = [
      {
        title: "AI/ML Engineer",
        matchPercentage: 90,
        reasoning: "The rapid growth of AI makes this a prime career path given your interests.",
        marketDemand: "Explosive",
        salaryIndia: "₹10–25 LPA"
      },
      {
        title: "Data Scientist",
        matchPercentage: 82,
        reasoning: "Strong analytical skills fit well here, though it requires more statistics knowledge.",
        marketDemand: "High",
        salaryIndia: "₹8–20 LPA"
      }
    ];
    skillsGap.missingCritical = ["Python Advanced", "PyTorch/TensorFlow", "Math/Stats"];
    roadmap = [
      {
        phase: "Foundations",
        timeline: "Month 1",
        focus: ["Python", "Pandas", "Linear Algebra"],
        outcome: "Data manipulation fluency"
      },
      {
        phase: "Model Building",
        timeline: "Month 2",
        focus: ["Scikit-Learn", "Neural Networks", "Fine-tuning LLMs"],
        outcome: "Build and deploy basic models"
      }
    ];
  } else {
    // Default / Generalist
    recommendedCareers = [
      {
        title: "Software Engineer",
        matchPercentage: 85,
        reasoning: "A solid generalist foundation is valuable in almost any tech company.",
        marketDemand: "High",
        salaryIndia: "₹5–12 LPA"
      },
      {
        title: "Technical Support Engineer",
        matchPercentage: 70,
        reasoning: "A good entry point to learn systems before moving to development.",
        marketDemand: "Moderate",
        salaryIndia: "₹4–8 LPA"
      }
    ];
    roadmap = [
      {
        phase: "Core CS",
        timeline: "Month 1-2",
        focus: ["Data Structures", "Algorithms", "Networking"],
        outcome: "Pass technical interviews"
      },
      {
        phase: "Project Build",
        timeline: "Month 3",
        focus: ["Full Clone App", "Deployment", "Documentation"],
        outcome: "Portfolio readiness"
      }
    ];
  }

  // 3. Construct Final Response
  return {
    profileSummary: `${profile.name}, based on your profile as a ${profile.currentStatus} with ${profile.yearsExperience} years of experience, you show a strong inclination towards ${primaryInterest}. You have rated your confidence as ${profile.confidence}/5, which suggests you are ${profile.confidence > 3 ? "ready for advanced challenges" : "building your foundational confidence"}.`,
    careerFitScore: Math.min(70 + profile.confidence * 6, 100),
    recommendedCareers,
    skillsGap,
    roadmap,
    nextAction:
      "Start with the first phase of your roadmap and focus on closing one critical skill gap.",
  };

}


export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.analysis.create.path, async (req, res) => {
    try {
      const input = api.analysis.create.input.parse(req.body);

      // Artificial delay to simulate "AI Thinking"
      await new Promise(resolve => setTimeout(resolve, 2000));

      const aiResponse = generateAiAnalysis(input);

      res.status(201).json(aiResponse);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.analysis.get.path, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }

      const analysis = await storage.getAnalysis(id);
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }

      res.json(analysis);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return httpServer;
}
