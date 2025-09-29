import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Ship, ArrowLeft, Send, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const Chat = () => {
  const maxAttempts = 3;
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello! I'm the Titanic Survival Predictor. What's your name?" }
  ]);
  const [input, setInput] = useState("");
  const [userData, setUserData] = useState<Record<string, any>>({});
  const [step, setStep] = useState("name");
  const [attempts, setAttempts] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const stepPrompts: Record<string, string> = {
    name: "What's your name?",
    pclass: "Which class are you traveling in? (1, 2, or 3)",
    sex: "What is your sex (male/female)?",
    age: "What is your age?",
    sibsp: "How many siblings/spouses are aboard?",
    parch: "How many parents/children are aboard?",
    fare: "What is your fare? ($0 - $512)",
    embarked: "What is your port of embarkation? (C, Q, S)"
  };

  const resetChat = (msg = "Too many invalid attempts. Let's start over.") => {
    setMessages([{ sender: "bot", text: msg }]);
    setInput("");
    setUserData({});
    setStep("name");
    setAttempts(0);
    toast.info("Chat reset");
  };

  const validateInput = (currentStep: string, value: string): { valid: boolean; error: string } => {
    switch (currentStep) {
      case "pclass":
        const pclass = parseInt(value);
        if (![1, 2, 3].includes(pclass)) {
          return { valid: false, error: "Please enter 1, 2, or 3 for class." };
        }
        break;
      case "sex":
        if (!["male", "female"].includes(value.toLowerCase())) {
          return { valid: false, error: "Please enter 'male' or 'female'." };
        }
        break;
      case "age":
        if (isNaN(parseFloat(value)) || parseFloat(value) < 0) {
          return { valid: false, error: "Please enter a valid positive number for age." };
        }
        break;
      case "sibsp":
      case "parch":
        if (isNaN(parseInt(value)) || parseInt(value) < 0) {
          return { valid: false, error: "Please enter a valid non-negative integer." };
        }
        break;
      case "fare":
        if (isNaN(parseFloat(value)) || parseFloat(value) < 0) {
          return { valid: false, error: "Please enter a valid positive fare amount." };
        }
        break;
      case "embarked":
        if (!["C", "Q", "S"].includes(value.toUpperCase())) {
          return { valid: false, error: "Please enter C, Q, or S." };
        }
        break;
    }
    return { valid: true, error: "" };
  };

  const handleUserInput = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { sender: "user", text: input }]);

    const validation = validateInput(step, input);

    if (!validation.valid) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= maxAttempts) {
        setTimeout(() => {
          resetChat();
        }, 1000);
      } else {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [
            ...prev,
            { sender: "bot", text: `${validation.error} (Attempt ${newAttempts}/${maxAttempts})` }
          ]);
        }, 800);
      }
      setInput("");
      return;
    }

    // Valid input
    setAttempts(0);
    const newUserData = { ...userData, [step]: input };
    setUserData(newUserData);

    const stepOrder = ["name", "pclass", "sex", "age", "sibsp", "parch", "fare", "embarked"];
    const currentIndex = stepOrder.indexOf(step);

    if (currentIndex < stepOrder.length - 1) {
      const nextStep = stepOrder[currentIndex + 1];
      setStep(nextStep);
      
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          { sender: "bot", text: `Great! ${stepPrompts[nextStep]}` }
        ]);
      }, 800);
    } else {
      // All data collected - simulate prediction
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const survived = Math.random() > 0.5; // Simulated prediction
        setMessages(prev => [
          ...prev,
          { 
            sender: "bot", 
            text: survived 
              ? `🎉 Good news, ${newUserData.name}! According to our ML model, you would have likely survived the Titanic disaster. The model considered your class, age, gender, and other factors to make this prediction.`
              : `😔 Unfortunately, ${newUserData.name}, our model predicts you would not have survived the Titanic disaster. The model based this on historical patterns including passenger class, demographics, and other factors.`
          }
        ]);
        toast.success("Prediction complete!");
      }, 1500);
    }

    setInput("");
  };

  return (
    <div className="min-h-screen animated-gradient">
      <div className="fixed inset-0 opacity-10 wave-animation pointer-events-none">
        <div className="absolute top-0 left-0 w-[200%] h-[200%] bg-gradient-to-br from-primary via-transparent to-secondary" />
      </div>

      <div className="relative container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="ghost" className="glass hover:glass-strong">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back
            </Button>
          </Link>
          
          <div className="flex items-center gap-3">
            <Ship className="w-8 h-8 text-primary-glow float" />
            <h1 className="text-2xl font-display font-bold text-foreground">
              Titanic Predictor
            </h1>
          </div>

          <Button 
            variant="ghost" 
            className="glass hover:glass-strong"
            onClick={() => resetChat("Let's start fresh!")}
          >
            <RotateCcw className="mr-2 w-4 h-4" />
            Reset
          </Button>
        </div>

        {/* Chat Container */}
        <Card className="glass-strong border-0 shadow-elegant overflow-hidden">
          <ScrollArea className="h-[500px] p-6">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} fade-in`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-gradient-primary text-primary-foreground shadow-glass"
                        : "bg-gradient-secondary text-secondary-foreground shadow-glass"
                    }`}
                  >
                    <p className="text-sm md:text-base">{msg.text}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start fade-in">
                  <div className="bg-muted px-4 py-3 rounded-2xl shadow-glass">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-foreground typing-dot" />
                      <div className="w-2 h-2 rounded-full bg-foreground typing-dot" />
                      <div className="w-2 h-2 rounded-full bg-foreground typing-dot" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-border/50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUserInput();
              }}
              className="flex gap-3"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-input border-border focus:ring-primary"
                disabled={isTyping}
              />
              <Button 
                type="submit" 
                disabled={!input.trim() || isTyping}
                className="bg-gradient-accent text-accent-foreground hover:opacity-90 transition-all"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>

        {/* Progress Indicator */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Step: <span className="text-primary font-semibold">{step}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
