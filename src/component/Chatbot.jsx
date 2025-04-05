import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const API_KEY = "AIzaSyDJCD5gjFScPeqicX7zDSZeco8Mh1o7GfE"; 

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCareerOptions, setShowCareerOptions] = useState(false);
  const [sessionContext, setSessionContext] = useState({});
  const messagesEndRef = useRef(null);

  const suggestions = [
    "How to connect with Aluminis on college connect",
    "Manage Account",
    "Career Suggestions and Roadmaps?",
    "Announcements",
    "Report Fake Accounts!",
    "Something else",
  ];

  const careerOptions = [
    "Full Stack Developer",
    "Front End Developer",
    "Backend Developer",
    "Data Scientist",
    "Blockchain Developer",
    "I'll search myself",
  ];

  const predefinedResponses = {
    "How to connect with Aluminis on college connect": `
      <strong>College connect is the great way to connect with aluminis.</strong><br/>
      I'll help you in connecting with them:<br/>
      1. Go to <strong>"Connect People"</strong> on navigation bar on top of the chatbot window<br/>
      2. Search using the <strong>"username"</strong>, <strong>"Person's name"</strong> or <strong>"College name"</strong><br/>
      3. Send them <strong>"Connection Request"</strong><br/>
      4. Hurray.. you're all set!
    `,
    "Manage Account": `
      <strong>To manage account:</strong> follow these simple steps:<br/>
      1. Go to <strong>"Profile"</strong> on Top right of Navigation Bar<br/>
      2. Manage the profile using the form given:<br/>
      &nbsp;&nbsp;&nbsp;- You can update <strong>Name</strong>, <strong>Profile Picture</strong> and so on..<br/>
      3. You're good to go!
    `,
    "Announcements": `
      <strong>Latest Announcements:</strong><br/>
      - New feature: Alumni Connect launched!<br/>
      - Upcoming webinar on Career Guidance (June 15)<br/>
      - Maintenance scheduled for June 20 (2:00 AM - 4:00 AM)
    `,
    "Report Fake Accounts!": `
      <strong>To report fake accounts:</strong><br/>
      1. Go to the profile you want to report<br/>
      2. Click on <strong>"More Options"</strong> (three dots)<br/>
      3. Select <strong>"Report Account"</strong><br/>
      4. Choose the reason and submit<br/>
      <em>Our team will review within 24 hours</em>
    `
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const formatBoldText = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  const resetConversation = () => {
    setConversation([]);
    setShowCareerOptions(false);
    setSessionContext({});
  };

  const extractName = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("name is")) {
      const match = userMessage.match(/name is (\w+)/i);
      return match?.[1];
    }
    if (lowerMessage.includes("i am")) {
      const match = userMessage.match(/i am (\w+)/i);
      return match?.[1];
    }
    if (lowerMessage.includes("call me")) {
      const match = userMessage.match(/call me (\w+)/i);
      return match?.[1];
    }
    
    return null;
  };

  const handleSend = async (msg) => {
    const userMessage = msg || message.trim();
    if (!userMessage) return;

    setMessage("");

    // Check for exit phrases
    if (userMessage.toLowerCase().includes("bye") || 
        userMessage.toLowerCase().includes("thanks") || 
        userMessage.toLowerCase().includes("thank you")) {
      const goodbyeMessage = sessionContext.name 
        ? `Goodbye, ${sessionContext.name}! Have a great day!` 
        : "Goodbye! Have a great day!";
      setConversation(prev => [...prev, { user: userMessage }, { bot: goodbyeMessage }]);
      setTimeout(resetConversation, 2000);
      return;
    }

    setConversation(prev => prev.filter(msg => msg.bot !== "Typing..."));

    const newConversation = [...conversation, { user: userMessage }];
    setConversation(newConversation);

    // Handle name extraction and confirmation
    const possibleName = extractName(userMessage);
    if (possibleName) {
      setSessionContext(prev => ({ ...prev, name: possibleName }));
      if (userMessage.toLowerCase().includes("name is") || 
          userMessage.toLowerCase().includes("i am") ||
          userMessage.toLowerCase().includes("call me")) {
        const botResponse = `Okay, ${possibleName}. I've noted your name. How can I help you?`;
        setConversation([...newConversation, { bot: formatBoldText(botResponse) }]);
        return;
      }
    }

    // Handle name queries
    if (userMessage.toLowerCase().includes("what is my name")) {
      const botResponse = sessionContext.name 
        ? `Your name is ${sessionContext.name}.` 
        : "I don't know your name yet. What should I call you?";
      setConversation([...newConversation, { bot: formatBoldText(botResponse) }]);
      return;
    }

    let botResponse = "";

    if (userMessage === "Career Suggestions and Roadmaps?") {
      setShowCareerOptions(true);
      botResponse = "Please select the Career you're aiming for:";
    } 
    else if (careerOptions.includes(userMessage)) {
      setShowCareerOptions(false);
      switch (userMessage) {
        case "Full Stack Developer":
          botResponse = "🖥️ <strong>Full Stack Developer Roadmap:</strong><br/>" +
                        "🔹 <strong>Tech Stack:</strong> MERN (MongoDB, Express.js, React.js, Node.js), MEAN (MongoDB, Express.js, Angular, Node.js).<br/>" +
                        "📚 <strong>Suggested Courses:</strong> Love Babbar's MERN, Colt Steele's Web Dev Bootcamp.";
          break;
        case "Front End Developer":
          botResponse = "🎨 <strong>Front End Developer Roadmap:</strong><br/>" +
                        "🔹 <strong>Tech Stack:</strong> HTML, CSS, JavaScript (React.js, Angular, Vue.js).<br/>" +
                        "📚 <strong>Suggested Courses:</strong> Chai aur Code React series, Jonas Schmedtmann's CSS course.";
          break;
        case "Backend Developer":
          botResponse = "💾 <strong>Backend Developer Roadmap:</strong><br/>" +
                        "🔹 <strong>Tech Stack:</strong> Node.js (Express.js), Python (Django/Flask), Java (Spring Boot).<br/>" +
                        "📚 <strong>Suggested Courses:</strong> Hitesh Choudhary's Backend series.";
          break;
        case "Data Scientist":
          botResponse = "📊 <strong>Data Scientist Roadmap:</strong><br/>" +
                        "🔹 <strong>Tech Stack:</strong> Python (Pandas, NumPy, Scikit-learn), TensorFlow, PyTorch.<br/>" +
                        "📚 <strong>Suggested Courses:</strong> Krish Naik's ML, Andrew Ng's ML on Coursera.";
          break;
        case "Blockchain Developer":
          botResponse = "🔗 <strong>Blockchain Developer Roadmap:</strong><br/>" +
                        "🔹 <strong>Tech Stack:</strong> Solidity, Rust, Web3.js.<br/>" +
                        "📚 <strong>Suggested Courses:</strong> Patrick Collins' Ethereum Smart Contracts, Buildspace Solana projects.";
          break;
        case "I'll search myself":
          botResponse = "Okay, what are you looking for?";
          break;
        default:
          botResponse = "I can help with that!";
          break;
      }
    }
    else if (predefinedResponses[userMessage]) {
      botResponse = predefinedResponses[userMessage];
    }
    else {
      setLoading(true);

      try {
        const contextPrompt = sessionContext.name 
          ? `The user's name is ${sessionContext.name}. ` 
          : "";
        
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
          {
            contents: [{ 
              role: "user", 
              parts: [{ 
                text: `${contextPrompt}${userMessage}` 
              }] 
            }],
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        botResponse =
          response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Sorry, I couldn't generate a response.";
          
        if (sessionContext.name && botResponse.toLowerCase().includes("your name")) {
          botResponse = `Your name is ${sessionContext.name}. ` + botResponse;
        }
      } catch (error) {
        console.error("API error:", error);
        botResponse = "⚠️ Error fetching response.";
      } finally {
        setLoading(false);
      }
    }

    setConversation([...newConversation, { bot: formatBoldText(botResponse) }]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center flex-grow">
        <div className="w-[500px] h-[600px] bg-white shadow-xl rounded-lg flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-4 text-lg font-semibold text-center rounded-t-lg">
            🌿 AI Career Chatbot
          </div>

          {conversation.length === 0 && (
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <p className="text-gray-700 mb-2 text-sm">So, what can I help you with?</p>
              <div className="grid grid-cols-2 gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="bg-gray-200 hover:bg-green-500 text-gray-800 hover:text-white px-3 py-2 rounded-lg text-sm transition duration-300"
                    onClick={() => handleSend(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex-1 p-4 overflow-y-auto">
            {conversation.map((msg, index) => (
              <div key={index} className="mb-3">
                {msg.user && <p className="text-blue-700 font-semibold">You: {msg.user}</p>}
                {msg.bot && (
                  <p
                    className="text-gray-800 whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: msg.bot }}
                  ></p>
                )}
              </div>
            ))}
            {loading && (
              <div className="mb-3">
                <p className="text-gray-500 italic">Typing...</p>
              </div>
            )}
            <div ref={messagesEndRef}></div>
          </div>

          {showCareerOptions && (
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <p className="text-gray-700 mb-2">Please select the Career you're aiming for:</p>
              <div className="grid grid-cols-2 gap-2">
                {careerOptions.map((option, index) => (
                  <button
                    key={index}
                    className="bg-gray-200 hover:bg-green-500 text-gray-800 hover:text-white px-3 py-2 rounded-lg text-sm transition duration-300"
                    onClick={() => handleSend(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 border-t flex flex-col">
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 p-2 border rounded-lg"
                placeholder="Type a message..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                className="ml-2 bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={() => handleSend()}
                disabled={loading}
              >
                {loading ? "..." : "Send"}
              </button>
            </div>
            {conversation.length > 0 && (
              <button
                className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-lg text-sm self-end transition duration-300"
                onClick={resetConversation}
              >
                Start New Conversation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
