import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Ship, ArrowLeft, Send, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface Message {
  sender: "user" | "bot" | "receptionist";
  text: string;
}

const Chat = () => {
  const maxAttempts = 3;
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello! I'm Rose, your Titanic Receptionist. To begin, please tell me your name." }
  ]);
  const [input, setInput] = useState("");
  const [userData, setUserData] = useState<Record<string, any>>({});
  const [step, setStep] = useState("name");
  const [attempts, setAttempts] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typingSender, setTypingSender] = useState<"bot" | "receptionist">("bot");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const backendUrl = "http://127.0.0.1:8000/api/chatbot_ml/";
  const receptionistUrl = "http://127.0.0.1:8000/api/titanic_receptionist/";

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const resetChat = (msg = "Too many invalid attempts. Let's start over.") => {
    setMessages([{ sender: "bot", text: msg }]);
    setInput("");
    setUserData({});
    setStep("name");
    setAttempts(0);
    toast.info("Chat reset");
  };

  const handleUserInput = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { sender: "user", text: input }]);

    let valid = true;
    let errorMsg = "";

    // Validation rules
    switch (step) {
      case "pclass":
        if (![1, 2, 3].includes(parseInt(input))) {
          valid = false;
          errorMsg = "Please enter 1, 2, or 3 for class.";
        }
        break;
      case "sex":
        if (!["male", "female"].includes(input.toLowerCase())) {
          valid = false;
          errorMsg = "Please enter 'male' or 'female'.";
        }
        break;
      case "age":
        if (isNaN(parseFloat(input)) || parseFloat(input) < 0) {
          valid = false;
          errorMsg = "Please enter a valid positive number for age.";
        }
        break;
      case "sibsp":
      case "parch":
        if (isNaN(parseInt(input)) || parseInt(input) < 0) {
          valid = false;
          errorMsg = "Please enter a valid non-negative integer.";
        }
        break;
      case "fare":
        if (isNaN(parseFloat(input)) || parseFloat(input) < 0 || parseFloat(input) > 512) {
          valid = false;
          errorMsg = "Fare should be between 0 and 512.";
        }
        break;
      case "embarked":
        if (!["c", "q", "s"].includes(input.toLowerCase())) {
          valid = false;
          errorMsg = "Please enter C, Q, or S.";
        }
        break;
    }

    // Handle invalid input → receptionist + retry
    if (!valid && step !== "done") {
      setAttempts(prev => prev + 1);
      setIsTyping(true);
      setTypingSender("receptionist");
      try {
        const res = await axios.post(receptionistUrl, { question: input });
        await new Promise(r => setTimeout(r, 800));
        setMessages(prev => [
          ...prev,
          { sender: "receptionist", text: res.data.answer },
          { sender: "bot", text: stepPrompts[step] }
        ]);
      } catch {
        await new Promise(r => setTimeout(r, 800));
        setMessages(prev => [
          ...prev,
          { sender: "receptionist", text: "Receptionist unavailable. Let's continue." },
          { sender: "bot", text: stepPrompts[step] }
        ]);
      }
      setIsTyping(false);
      setTypingSender("bot");
      setInput("");
      return;
    }

    // Valid input → continue
    setAttempts(0);
    const newUserData = { ...userData };

    let nextStep = step;
    switch (step) {
      case "name":
        newUserData.name = input;
        setMessages(prev => [...prev, { sender: "bot", text: `Nice to meet you, ${input}! Which class are you traveling in? (1, 2, or 3)` }]);
        nextStep = "pclass";
        break;
      case "pclass":
        newUserData.Pclass = parseInt(input);
        setMessages(prev => [...prev, { sender: "bot", text: "Sex (male/female)?" }]);
        nextStep = "sex";
        break;
      case "sex":
        newUserData.Sex = input.toLowerCase();
        setMessages(prev => [...prev, { sender: "bot", text: "Age?" }]);
        nextStep = "age";
        break;
      case "age":
        newUserData.Age = parseFloat(input);
        setMessages(prev => [...prev, { sender: "bot", text: "Number of siblings/spouses aboard (SibSp)?" }]);
        nextStep = "sibsp";
        break;
      case "sibsp":
        newUserData.SibSp = parseInt(input);
        setMessages(prev => [...prev, { sender: "bot", text: "Number of parents/children aboard (Parch)?" }]);
        nextStep = "parch";
        break;
      case "parch":
        newUserData.Parch = parseInt(input);
        setMessages(prev => [...prev, { sender: "bot", text: "Fare? ($0 - $512)" }]);
        nextStep = "fare";
        break;
      case "fare":
        newUserData.Fare = parseFloat(input);
        setMessages(prev => [...prev, { sender: "bot", text: "Port of Embarkation (C, Q, S)?" }]);
        nextStep = "embarked";
        break;
      case "embarked":
        newUserData.Embarked = input.toUpperCase();
        try {
          const res = await axios.post(backendUrl, newUserData);
          const { prediction, survival_probability, explanation } = res.data;
          await new Promise(r => setTimeout(r, 600));
          setMessages(prev => [
            ...prev,
            { sender: "bot", text: `Prediction: ${prediction === 1 ? "✅ Survived" : "❌ Did not survive"} (Probability: ${(survival_probability * 100).toFixed(0)}%)` },
            { sender: "bot", text: `Reason: ${explanation.reason}` },
            { sender: "bot", text: `Suggestion: ${explanation.suggestion}` },
            { sender: "bot", text: `Fact: ${explanation.fact}` }
          ]);
        } catch {
          setMessages(prev => [...prev, { sender: "bot", text: "Error contacting backend." }]);
        }
        nextStep = "done";
        break;
    }

    setUserData(newUserData);
    setStep(nextStep);
    setInput("");
  };

  return (
    <div className="relative min-h-screen">

      {/* Titanic Video Background */}
      <video
        src="/videos/titanic.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-30"
      />

      <div className="relative container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="ghost" className="glass hover:glass-strong">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back
            </Button>
          </Link>

          <div className="flex items-center gap-3">
            <Ship className="w-8 h-8 text-primary-glow float" />
            <h1 className="text-2xl font-display font-bold text-foreground">
              Rose – Titanic Receptionist AI
            </h1>
          </div>

          <Button variant="ghost" className="glass hover:glass-strong" onClick={() => resetChat("Let's start fresh!")}>
            <RotateCcw className="mr-2 w-4 h-4" /> Reset
          </Button>
        </div>

        {/* Chat Container */}
        <Card className="bg-white/5 backdrop-blur-sm border-0 shadow-elegant overflow-hidden">

          <ScrollArea className="h-[500px] p-6">
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl ${msg.sender === "user"
                      ? "bg-gradient-primary text-primary-foreground"
                      : msg.sender === "receptionist"
                        ? "bg-orange-500 text-white"
                        : "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-slate-100"
                      }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
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

          {/* Input */}
          {step !== "done" ? (
            <div className="p-4 border-t border-border/50">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleUserInput();
                }}
                className="flex gap-3"
              >
                <Input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-input"
                  disabled={isTyping}
                />
                <Button type="submit" disabled={!input.trim() || isTyping} className="bg-gradient-accent">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          ) : (
            <div className="p-4 border-t border-border/50 text-center">
              <Button onClick={() => resetChat("Hello! I'm the Titanic Survival Predictor. What's your name?")}>
                🔄 Try Once More
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Chat;
