import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userProfileSchema, type UserProfile } from "@shared/schema";
import { useCreateAnalysis } from "@/hooks/use-analysis";
import { AnalysisLoading } from "@/components/AnalysisLoading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X, Sparkles, Briefcase, GraduationCap, Code2 } from "lucide-react";
import { motion } from "framer-motion";

const INTERESTS_OPTIONS = [
  "Frontend Development", "Backend Systems", "AI/ML", "Data Science", 
  "Product Management", "UI/UX Design", "Cloud Computing", "DevOps", 
  "Cybersecurity", "Blockchain", "Mobile Dev", "Game Dev"
];

export default function Analyze() {
  const { mutate, isPending } = useCreateAnalysis();
  const [interestInput, setInterestInput] = useState("");

  const form = useForm<UserProfile>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: "",
      interests: [],
      skills: "",
      confidence: 3,
      yearsExperience: "0-1",
    },
  });

  const onSubmit = (data: UserProfile) => {
    mutate(data);
  };

  const addInterest = (interest: string) => {
    const current = form.getValues("interests");
    if (!current.includes(interest)) {
      form.setValue("interests", [...current, interest]);
    }
    setInterestInput("");
  };

  const removeInterest = (interest: string) => {
    const current = form.getValues("interests");
    form.setValue("interests", current.filter((i) => i !== interest));
  };

  if (isPending) return <AnalysisLoading />;

  return (
    <div className="min-h-screen bg-background py-12 px-4 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container max-w-2xl mx-auto relative z-10">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-white transition-colors">
            <Sparkles className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-4xl font-display font-bold mb-2">Build Your Profile</h1>
          <p className="text-muted-foreground">Tell us about yourself so our AI can craft your perfect career path.</p>
        </div>

        <Card className="border-white/10 bg-card/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
            <CardDescription>All fields are required for accurate analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-background/50 border-white/10" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currentStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-white/10">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Student">Student</SelectItem>
                            <SelectItem value="Beginner">Beginner (0-2 yrs)</SelectItem>
                            <SelectItem value="Working Professional">Working Professional</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="yearsExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-white/10">
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0-1">0-1 Years</SelectItem>
                            <SelectItem value="1-3">1-3 Years</SelectItem>
                            <SelectItem value="3-5">3-5 Years</SelectItem>
                            <SelectItem value="5+">5+ Years</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="goal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Goal</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-white/10">
                              <SelectValue placeholder="Select goal" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Job">Land a Job</SelectItem>
                            <SelectItem value="Internship">Get an Internship</SelectItem>
                            <SelectItem value="Upskilling">Skill Development</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Areas of Interest</FormLabel>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {field.value?.map((interest) => (
                            <Badge key={interest} variant="secondary" className="pl-3 pr-1 py-1 text-sm bg-primary/20 text-primary hover:bg-primary/30 border-none transition-colors">
                              {interest}
                              <button
                                type="button"
                                onClick={() => removeInterest(interest)}
                                className="ml-2 hover:bg-primary/20 rounded-full p-0.5"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {INTERESTS_OPTIONS.filter(i => !field.value?.includes(i)).map(interest => (
                            <Badge 
                              key={interest} 
                              variant="outline" 
                              className="cursor-pointer hover:border-primary hover:text-primary transition-colors"
                              onClick={() => addInterest(interest)}
                            >
                              + {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technical Skills (Comma separated)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="e.g. React, Python, SQL, Figma..." 
                          className="bg-background/50 border-white/10 min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confidence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between">
                        <span>Confidence Level</span>
                        <span className="text-primary font-bold">{field.value}/5</span>
                      </FormLabel>
                      <FormControl>
                        <Slider
                          min={1}
                          max={5}
                          step={1}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="py-4"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full text-lg h-14 mt-8">
                  Generate Career Roadmap
                  <Sparkles className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper to avoid circular dependency in imports
import { Link } from "wouter";
