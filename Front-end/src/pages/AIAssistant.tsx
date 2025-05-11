import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic, StopCircle } from "lucide-react";


const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
const AIAssistant = () => {
  const [chatHistory, setChatHistory] = useState<
    { role: "user" | "doctor"; content: string }[]
  >([]);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Start voice recognition
  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleUserQuery(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  // Stop voice recognition
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setListening(false);
  };

  const handleUserQuery = async (text: string) => {
    try {
      setChatHistory((prev) => [...prev, { role: "user", content: text }]);

      const prompt = `You are a professional and experienced healthcare doctor.
Only respond like a qualified physician. Do not ask unnecessary questions.
Do not respond like an assistant or AI.
If a patient describes symptoms, give them direct medical advice, possible medication (OTC or general), and when to visit a hospital.
Avoid saying "I am an AI" or "consult a doctor" unless there's a severe case.
Speak professionally, in simple but clinical language. also detect the language the patient is using and use the same\nPatient: ${text}`;

      // Send prompt to backend AI proxy
      const response = await fetch(`${BACKEND_URL}/api/ai/assistant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      console.log(data);
      const aiText =
        data.result?.candidates?.[0]?.content?.parts?.[0]?.text ||
        data.result?.result ||
        "Sorry, I couldn't process your request.";

      setChatHistory((prev) => [...prev, { role: "doctor", content: aiText }]);
    } catch (error) {
      console.error("AI API Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
              <ArrowLeft size={20} />
              <span className="ml-2">Back to Dashboard</span>
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-blue-700">AI Medical Consultation</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-blue-50 border-b">
            <CardTitle className="text-xl font-semibold text-blue-800">Virtual Medical Consultation</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="h-[500px] overflow-y-auto rounded-lg border bg-white p-4 space-y-4">
                {chatHistory.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <p className="text-center">
                      Click the microphone button below to start your consultation.<br />
                      Describe your symptoms clearly for better assistance.
                    </p>
                  </div>
                ) : (
                  chatHistory.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-white border border-gray-200 text-gray-800"
                        }`}
                      >
                        <div className="font-medium mb-1">
                          {msg.role === "user" ? "You" : "Dr. AI"}
                        </div>
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex justify-center">
                {!listening ? (
                  <Button
                    onClick={startListening}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all hover:scale-105"
                  >
                    <Mic size={20} />
                    Start Consultation
                  </Button>
                ) : (
                  <Button
                    variant="destructive"
                    onClick={stopListening}
                    className="flex items-center gap-2 px-6 py-2 rounded-full transition-all hover:scale-105"
                  >
                    <StopCircle size={20} />
                    End Consultation
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AIAssistant;