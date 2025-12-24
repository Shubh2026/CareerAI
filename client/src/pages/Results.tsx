import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { useAnalysis } from "@/hooks/use-analysis";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft, Download, Share2, Target, TrendingUp, AlertTriangle,
  CheckCircle2, XCircle, Map, Briefcase, ChevronRight,
  Bell
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useQueryClient } from "@tanstack/react-query";

export default function Results() {
  const queryClient = useQueryClient();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const result =
    queryClient.getQueryData<any>(["analysis-result"]) ??
    (() => {
      const stored = localStorage.getItem("analysis_result");
      return stored ? JSON.parse(stored) : null;
    })();

  console.log("RESULTS DATA OBJECT =", result);

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Result not found</h2>
        <Link href="/analyze">
          <Button>Create New Analysis</Button>
        </Link>
      </div>
    );
  }

  console.log("RESULTS FILE LOADED");

  const [showExportComingSoon, setShowExportComingSoon] = useState(false);

  const [showComingSoon, setShowComingSoon] = useState(false);

  const getLearningLink = () => {
    const summary = data.profileSummary.toLowerCase();

    if (summary.includes("frontend") || summary.includes("fullstack")) {
      return "https://youtube.com/playlist?list=PLWKjhJtqVAbmMuZ3saqRIBimAKIMYkt0E&si=r8D-QkEiuIYrtLK5"; // Frontend
    }

    if (summary.includes("backend")) {
      return "https://youtube.com/playlist?list=PLWKjhJtqVAbn21gs5UnLhCQ82f923WCgM&si=lUlXMAQFHB61KoyF"; // Backend
    }

    if (summary.includes("ai") || summary.includes("ml")) {
      return "https://youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU&si=K5fbLv_bQUHwraD2"; // AI/ML
    }

    if (summary.includes("cloud")) {
      return "https://youtube.com/playlist?list=PLEiEAq2VkUUIJ3o1tehvtux0_Ynf42CBN&si=fCLZm7w2dmLW368g"; // Cloud / DevOps
    }

    if (summary.includes("data")) {
      return "https://youtu.be/ua-CiDNNj30?si=KMeWwedneVBA2s9x"; // Data Science
    }

    if (summary.includes("ui")) {
      return "https://youtube.com/playlist?list=PLEiEAq2VkUULzCiDV5VyF7zR6zoDIT_eH&si=2whg272Q5CToVJR6"; // UI / UX
    }

    if (summary.includes("cyber")) {
      return "https://youtube.com/playlist?list=PLEiEAq2VkUUJfPOj5nRounXvf3n17PCft&si=FYToB_MoynMSe8gM"; // Cyber Security
    }

    // fallback
    return null;
  };

  const data = result;

  const fitScore =
    data?.careerFitScore ??
    Math.min(
      60 +
      (data?.skillsGap?.strengths?.length || 0) * 10 +
      (data?.recommendedCareers?.length || 0) * 5,
      95
    );

  const extractedName =
    typeof data?.profileSummary === "string"
      ? data.profileSummary.split(",")[0]
      : "User";

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          </Link>

          <div className="flex items-center gap-3">
            {/* Share button */}
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard");
              }}
            >
              <Share2 className="w-4 h-4" /> Share
            </Button>



            {/* Export + Bell stacked */}
            <div className="relative flex flex-col items-center">
              <Button
                size="sm"
                className="gap-2"
                onClick={() => setShowExportComingSoon(true)}
              >
                <Download className="w-4 h-4" /> Export PDF
              </Button>
              <Dialog open={showExportComingSoon} onOpenChange={setShowExportComingSoon}>
                <DialogContent className="max-w-sm text-center">
                  <DialogHeader>
                    <DialogTitle>Export PDF</DialogTitle>
                  </DialogHeader>

                  <p className="text-sm text-muted-foreground">
                    PDF export is coming soon.
                  </p>

                  <p className="text-sm mt-2">
                    This feature will support downloadable reports with
                    AI-powered insights and user history.
                  </p>

                  <Button className="mt-4" onClick={() => setShowExportComingSoon(false)}>
                    Got it
                  </Button>
                </DialogContent>
              </Dialog>


              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="absolute -bottom-20
                 flex items-center justify-center
                 h-9 w-9 rounded-full
                 bg-yellow-500/10
                 border border-yellow-500/30
                 text-yellow-400
                 hover:bg-yellow-500/20
                 hover:scale-105
                 transition"
                    aria-label="AI & Gemini info"
                  >
                    <Bell className="h-5 w-5" />
                  </button>
                </PopoverTrigger>


                <PopoverContent
                  side="bottom"
                  align="end"
                  sideOffset={8}
                  className="w-80 bg-background/95 backdrop-blur border border-white/10 shadow-xl"
                >
                  <div className="space-y-3 text-sm">
                    <p className="font-medium text-foreground">
                      AI & Gemini Status
                    </p>

                    <p className="text-muted-foreground">
                      This report is generated using a deterministic AI logic engine
                      based on your interests, experience, and confidence.
                    </p>

                    <p className="text-muted-foreground">
                      <strong>Gemini API</strong> is integrated at the code level but is
                      currently limited due to API quota constraints.
                    </p>

                    <div>
                      <p className="font-medium text-foreground">Current Approach</p>
                      <ul className="list-disc ml-4 text-muted-foreground">
                        <li>Rule-based & heuristic analysis</li>
                        <li>Transparent and explainable results</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-medium text-foreground">Planned Enhancements</p>
                      <ul className="list-disc ml-4 text-muted-foreground">
                        <li>Gemini-powered reasoning & personalization</li>
                        <li>Real-time skill gap analysis</li>
                        <li>Learning path recommendations with progress tracking</li>
                      </ul>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </header >

      <main className="container mx-auto px-4 md:px-6 py-12 space-y-12 max-w-5xl">

        {/* Profile Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-card via-card to-primary/5 border-primary/20">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <Badge variant="outline" className="mb-2 border-primary/50 text-primary">Analysis Complete</Badge>
                  <CardTitle className="text-3xl md:text-4xl">Career Profile Report</CardTitle>
                  <CardDescription className="text-lg mt-2">
                    Prepared for{" "}<span className="text-foreground font-medium"> {extractedName}</span>{" "}• {new Date().toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Fit Score</span>
                  <div className="text-5xl font-bold font-display text-primary">{fitScore}%</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {data.profileSummary}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Recommended Roles */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold font-display">Recommended Roles</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {data.recommendedCareers.map((career: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full hover:border-primary/50 transition-colors cursor-default">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl">{career.title}</CardTitle>
                      <Badge className={
                        career.matchPercentage > 85 ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                      }>
                        {career.matchPercentage}% Match
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">{career.reasoning}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Market Demand</span>
                        <span className="font-medium">{career.marketDemand}</span>
                      </div>
                      <Progress value={
                        career.marketDemand === "High" ? 90 : career.marketDemand === "Medium" ? 60 : 30
                      } className="h-1.5" />
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-sm text-muted-foreground">Avg. Salary (IN)</span>
                      <span className="font-medium font-mono text-primary">{career.salaryIndia}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Gap Analysis */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold font-display">Skills Analysis</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-green-500/5 border-green-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-green-400">
                  <CheckCircle2 className="w-5 h-5" /> Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data.skillsGap.strengths.map((skill: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-yellow-500/5 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-yellow-400">
                  <TrendingUp className="w-5 h-5" /> To Improve
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data.skillsGap.needsImprovement.map((skill: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-red-500/5 border-red-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-red-400">
                  <AlertTriangle className="w-5 h-5" /> Critical Missing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data.skillsGap.missingCritical.map((skill: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Roadmap */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <Map className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold font-display">Your Personalized Roadmap</h2>
          </div>

          <div className="relative border-l-2 border-white/10 ml-4 md:ml-6 space-y-12">
            {data.roadmap.map((phase: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary ring-4 ring-background" />

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <h3 className="text-xl font-bold font-display">{phase.phase}</h3>
                    <Badge variant="secondary" className="w-fit">{phase.timeline}</Badge>
                  </div>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Focus Areas</h4>
                        <div className="flex flex-wrap gap-2">
                          {phase.focus.map((item: string, j: number) => (
                            <Badge key={j} variant="outline" className="bg-primary/5">{item}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">Expected Outcome</h4>
                        <p className="text-sm text-foreground/80">{phase.outcome}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Next Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-primary to-purple-600 p-8 md:p-12 text-center text-white shadow-2xl shadow-primary/20"
        >
          <h2 className="text-3xl font-bold font-display mb-4">Ready to start?</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Your immediate next step is: <span className="font-semibold text-white">{data.nextAction}</span>
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 h-12 px-8 rounded-full font-semibold"
            onClick={() => {
              const link = getLearningLink();
              if (link) {
                window.open(link, "_blank");
              } else {
                setShowComingSoon(true);
              }
            }}
          >
            Start Learning Now
            <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
        <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
          <DialogContent className="max-w-sm text-center">
            <DialogHeader>
              <DialogTitle>Personalized Learning Paths</DialogTitle>
            </DialogHeader>

            <p className="text-sm text-muted-foreground">
              We’re working on AI-powered learning recommendations tailored exactly
              to your career goals.
            </p>

            <p className="text-sm mt-2">
              This feature will be powered by <strong>Gemini</strong> in future
              versions.
            </p>

            <Button className="mt-4" onClick={() => setShowComingSoon(false)}>
              Got it
            </Button>
          </DialogContent>
        </Dialog>

      </main>
      <footer className="mt-24 text-center text-sm text-muted-foreground">
        Made with ❤️ by Team Neural · Powered by Google Tech
      </footer>
    </div >
  );
}

