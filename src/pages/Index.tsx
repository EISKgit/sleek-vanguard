import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ship, Brain, Database, Zap, MessageSquare, Shield } from "lucide-react";

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
    { name: "React.js", icon: "⚛️" },
    { name: "Vite", icon: "⚡" },
    { name: "Python & Django", icon: "🐍" },
    { name: "Scikit-learn", icon: "🤖" },
    { name: "LangChain", icon: "🧩" },
    { name: "ChatGroq", icon: "🧠" },
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
              Start Your Journey
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
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-gradient-secondary rounded-full p-3">
              <Ship className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              How It Works
            </h2>
          </div>
          
          <p className="text-lg text-muted-foreground mb-6">
            Welcome aboard, Captain! ⚓ This interactive chat app allows you to explore the fate of Titanic passengers through AI-powered predictions.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-foreground">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Enter passenger details (Name, Gender, Age)</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Specify travel class (1st, 2nd, or 3rd)</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Family information (Siblings, Parents, Children)</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-foreground">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span>Ticket fare ($0 - $512)</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span>Port of embarkation (C, Q, or S)</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span>Get AI-powered survival prediction</span>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-6">
            <p className="text-foreground">
              <strong>🤖 Advanced ML Analysis:</strong> Our model analyzes your inputs and provides detailed explanations and suggestions based on historical patterns.
            </p>
          </div>
        </Card>
      </div>

      {/* Tech Stack Section */}
      <div className="relative container mx-auto px-4 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-foreground">
            Built with Modern Technology
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
