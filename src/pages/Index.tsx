import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ship, Brain, Database, Zap, MessageSquare, Shield } from "lucide-react";
import { Anchor, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { SiReact, SiVite, SiScikitlearn, SiLangchain, SiAxios, SiPostman, SiPandas, SiNumpy, SiJupyter, SiMarkdown, SiNpm, SiDjango } from "react-icons/si";
import { FaPython, FaBrain, FaGitAlt, FaGlobe, FaMap } from "react-icons/fa";





const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Predictions",
      description: "Advanced machine learning model trained on historical Titanic data"
    },
    {
      icon: MessageSquare,
      title: "Interactive Chat",
      description: "Conversational interface that guides you through the prediction process"
    },
    {
      icon: Database,
      title: "Real Historical Data",
      description: "Built using actual passenger records and survival statistics"
    }
  ];
  const techStack = [
    { name: "React.js", icon: <SiReact className="w-6 h-6" style={{ color: "#61DAFB" }} /> },
    { name: "Vite", icon: <SiVite className="w-6 h-6" style={{ color: "#646CFF" }} /> },
    { name: "Python", icon: <FaPython className="w-6 h-6" style={{ color: "#3776AB" }} /> },
    { name: "Django", icon: <SiDjango className="w-6 h-6" style={{ color: "#092E20" }} /> },
    { name: "Scikit-learn", icon: <SiScikitlearn className="w-6 h-6" style={{ color: "#F7931E" }} /> },
    { name: "LangChain", icon: <SiLangchain className="w-6 h-6" style={{ color: "#00BFFF" }} /> },
    { name: "LangGraph", icon: <FaMap className="w-6 h-6" style={{ color: "#FF6F61" }} /> },
    { name: "ChatGroq llama-3", icon: <FaBrain className="w-6 h-6" style={{ color: "#FF6F61" }} /> },
    { name: "Postman", icon: <SiPostman className="w-6 h-6" style={{ color: "#FF6C37" }} /> },
    { name: "Pandas", icon: <SiPandas className="w-6 h-6" style={{ color: "#150458" }} /> },
    { name: "NumPy", icon: <SiNumpy className="w-6 h-6" style={{ color: "#013243" }} /> },
    { name: "Jupyter Notebooks", icon: <SiJupyter className="w-6 h-6" style={{ color: "#F37626" }} /> },
    { name: "Git & GitHub", icon: <FaGitAlt className="w-6 h-6" style={{ color: "#F05032" }} /> },
    { name: "RESTful API", icon: <FaGlobe className="w-6 h-6" style={{ color: "#4CAF50" }} /> },
    { name: "Axios", icon: <SiAxios className="w-6 h-6" style={{ color: "#5A29E4" }} /> },
    { name: "npm", icon: <SiNpm className="w-6 h-6" style={{ color: "#CB3837" }} /> },
    { name: "Markdown", icon: <SiMarkdown className="w-6 h-6" style={{ color: "#083FA1" }} /> },
  ];

  return (
    <div className="min-h-screen animated-gradient overflow-hidden">
      {/* Animated background wave effect */}
      <div className="fixed inset-0 opacity-10 wave-animation pointer-events-none">
        <div className="absolute top-0 left-0 w-[200%] h-[200%] bg-gradient-to-br from-primary via-transparent to-secondary" />
      </div>

      {/* Hero Section */}
      <div className="relative container mx-auto px-4 pt-20 pb-32">
        <div className="text-center max-w-4xl mx-auto fade-in-up">
          <div className="inline-flex items-center justify-center mb-6 float">
            <Ship className="w-20 h-20 text-primary-glow" />
          </div>

          <h1 className="text-6xl md:text-7xl font-display font-bold mb-6 leading-tight">
            <span className="gradient-text">Titanic</span>
            <br />
            <span className="text-foreground">Survival Predictor</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Explore history through AI. Discover if you would have survived the Titanic disaster using advanced machine learning.
          </p>

          <Link to="/chat">
            <Button
              size="lg"
              className="bg-gradient-accent text-accent-foreground hover:opacity-90 transition-all text-lg px-8 py-6 rounded-full shadow-elegant hover:scale-105 hover:shadow-glow"
            >
              <MessageSquare className="mr-2 w-5 h-5" />
              Step Aboard & Chat with AI
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-24 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="glass p-6 border-0 shadow-glass hover:shadow-glow transition-all duration-300 hover:scale-105 fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-primary rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-display font-bold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>


      {/* What It Does Section */}
      <div className="relative container mx-auto px-4 pb-20">
        <Card className="glass-strong max-w-4xl mx-auto p-8 md:p-12 border-0 shadow-elegant">

          {/* Header */}
          <div className="flex items-start gap-4 mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 flex items-center justify-center">
              <Ship className="w-6 h-6 text-white animate-bounce-slow" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              How It Works
            </h2>
          </div>

          {/* Intro Paragraph */}
          <p className="text-lg text-muted-foreground mb-8 flex items-center gap-2">
            <Anchor className="w-5 h-5 text-secondary-foreground animate-pulse" />
            Welcome, Captain! This interactive app lets you input passenger details and receive AI-driven predictions about their survival on the Titanic.
          </p>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">

            {/* Left Column */}
            <div className="space-y-4">
              {[
                "Enter passenger details (Name, Gender, Age)",
                "Specify travel class (1st, 2nd, or 3rd)",
                "Family information (Siblings, Parents, Children)"
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-3 text-foreground cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0 animate-ping-slow" />
                  <span>{step}</span>
                </motion.div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {[
                "Ticket fare ($0 - $512)",
                "Port of embarkation (C, Q, or S)",
                "Get AI-powered survival prediction"
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-3 text-foreground cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="w-3 h-3 rounded-full bg-secondary flex-shrink-0 animate-ping-slow" />
                  <span>{step}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ML Analysis Box */}
          <motion.div
            className="bg-primary/10 border border-primary/20 rounded-lg p-5 mt-6 hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.03 }}
          >
            <p className="text-foreground flex items-center gap-3">
              <Cpu className="w-6 h-6 text-secondary-foreground animate-spin-slow" />
              <strong>Advanced ML Analysis:</strong> Our model analyzes your inputs and provides detailed explanations and suggestions based on historical patterns.
            </p>
          </motion.div>
        </Card>
      </div>


      {/* Tech Stack Section */}
      <div className="relative container mx-auto px-4 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-foreground">
            Built with Modern Tools & Technologies
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="glass px-6 py-3 rounded-full border-0 shadow-glass hover:shadow-glow transition-all hover:scale-110 fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="text-2xl mr-2">{tech.icon}</span>
                <span className="text-foreground font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            Built with React, Vite, and Machine Learning
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
