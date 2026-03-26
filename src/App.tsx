import React, { useState, useEffect, useRef } from 'react';
import { Send, CloudRain, Sun, AlertTriangle, Info, MapPin, User, Leaf, Camera, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getShambaResponse } from './services/shambaService';
import { LANGUAGE_DATA, LanguageStrings } from './constants/languages';

interface Message {
  id: string;
  text: string;
  sender: 'farmer' | 'shamba';
  timestamp: Date;
  image?: string;
}

const LANGUAGES = [
  { id: '1', name: 'English' },
  { id: '2', name: 'Luganda' },
  { id: '3', name: 'Swahili' },
  { id: '4', name: 'Runyankole' },
  { id: '5', name: 'Rukiga' },
  { id: '6', name: 'Ateso' },
  { id: '7', name: 'Luo/Acholi' },
  { id: '8', name: 'Kinyarwanda' },
  { id: '9', name: 'Kikuyu' },
  { id: '10', name: 'Somali' },
];

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<'language' | 'menu' | 'chat'>('language');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ data: string, mimeType: string } | null>(null);
  const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting
    const langData = LANGUAGE_DATA['English'];
    const welcomeMsg = `${langData.welcome}\n${langData.selectLanguage}\n` + 
      LANGUAGES.map(l => `${l.id}. ${l.name}`).join('\n');
    
    setMessages([{
      id: 'welcome',
      text: welcomeMsg,
      sender: 'shamba',
      timestamp: new Date(),
    }]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setSelectedImage({ data: base64String, mimeType: file.type });
      };
      reader.readAsDataURL(file);
    }
  };

  const addShambaMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text,
      sender: 'shamba',
      timestamp: new Date(),
    }]);
  };

  const showMainMenu = async (lang: string) => {
    setIsLoading(true);
    const langData = LANGUAGE_DATA[lang] || LANGUAGE_DATA['English'];
    
    let menuText = `${langData.mainMenu}\n`;
    langData.faqs.forEach(f => {
      menuText += `${f.id}. ${f.question}\n`;
    });
    menuText += `0. ${langData.askDirect}\n`;
    menuText += `99. ${langData.changeLanguage}`;

    addShambaMessage(menuText);
    setCurrentStep('menu');
    setIsLoading(false);
  };

  const resetToLanguageSelection = () => {
    setSelectedLanguage(null);
    setCurrentStep('language');
    const langData = LANGUAGE_DATA['English'];
    const welcomeMsg = `${langData.welcome}\n${langData.selectLanguage}\n` + 
      LANGUAGES.map(l => `${l.id}. ${l.name}`).join('\n');
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: welcomeMsg,
      sender: 'shamba',
      timestamp: new Date(),
    }]);
  };

  const handleSend = async (e?: React.FormEvent, directText?: string) => {
    e?.preventDefault();
    const messageText = directText || input;
    if ((!messageText.trim() && !selectedImage) || isLoading) return;

    const farmerMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'farmer',
      timestamp: new Date(),
      image: selectedImage ? `data:${selectedImage.mimeType};base64,${selectedImage.data}` : undefined,
    };

    setMessages((prev) => [...prev, farmerMessage]);
    const userInput = messageText.trim();
    const currentImage = selectedImage;
    setInput('');
    setSelectedImage(null);

    if (currentStep === 'language') {
      const lang = LANGUAGES.find(l => l.id === userInput);
      if (lang) {
        setSelectedLanguage(lang.name);
        setIsLoading(true);
        const langData = LANGUAGE_DATA[lang.name];
        addShambaMessage(langData.welcome);
        showMainMenu(lang.name);
      } else {
        addShambaMessage(LANGUAGE_DATA['English'].invalidSelection);
      }
      return;
    }

    if (currentStep === 'menu') {
      const langData = LANGUAGE_DATA[selectedLanguage!] || LANGUAGE_DATA['English'];
      const faq = langData.faqs.find(f => f.id === userInput);
      
      if (userInput === '0') {
        addShambaMessage(langData.askDirect);
        setCurrentStep('chat');
        return;
      }

      if (userInput === '99') {
        resetToLanguageSelection();
        return;
      }

      if (faq) {
        setIsLoading(true);
        // Special handling for weather forecast (Option 1)
        const isWeather = userInput === '1';
        const prompt = isWeather 
          ? `Provide a hyper-local weather forecast for TODAY in ${selectedLanguage}. Use the provided location if available. Keep it under 160 chars.`
          : `Answer this question in ${selectedLanguage}: ${faq.question}. Static answer: ${faq.answer}`;

        const answerMsg = await getShambaResponse(prompt, [], selectedLanguage, undefined, location || undefined);
        addShambaMessage(answerMsg);
        setIsLoading(false);
        setTimeout(() => showMainMenu(selectedLanguage!), 5000);
        return;
      }
      
      // If they typed something else, assume it's a direct question
      setCurrentStep('chat');
    }

    // Direct Chat Mode
    setIsLoading(true);
    const history = messages.map(m => ({
      role: m.sender === 'farmer' ? 'user' as const : 'model' as const,
      parts: [
        ...(m.image ? [{ inlineData: { mimeType: m.image.split(';')[0].split(':')[1], data: m.image.split(',')[1] } }] : []),
        { text: m.text }
      ]
    }));

    const responseText = await getShambaResponse(userInput, history, selectedLanguage, currentImage || undefined, location || undefined);
    addShambaMessage(responseText);
    setIsLoading(false);
    
    setTimeout(async () => {
      const langData = LANGUAGE_DATA[selectedLanguage!] || LANGUAGE_DATA['English'];
      addShambaMessage(langData.backToMenu);
    }, 1500);
  };

  // Handle '0' to go back to menu in chat mode
  useEffect(() => {
    if (currentStep === 'chat' && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender === 'farmer' && lastMsg.text.trim() === '0') {
        showMainMenu(selectedLanguage!);
      }
    }
  }, [messages, currentStep]);

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-shamba-sky shadow-2xl overflow-hidden border-x border-gray-200">
      {/* Header */}
      <header className="bg-shamba-green p-4 text-white flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Shamba AI</h1>
            <p className="text-[10px] opacity-80 uppercase tracking-widest">Agricultural Advisor</p>
          </div>
        </div>
        <div className="flex gap-2">
          {selectedLanguage && (
            <button 
              onClick={resetToLanguageSelection}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              title="Change Language"
            >
              <Globe className="w-5 h-5" />
            </button>
          )}
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`sms-bubble ${msg.sender === 'farmer' ? 'sms-farmer' : 'sms-shamba'}`}
            >
              {msg.image && (
                <img src={msg.image} alt="Farmer upload" className="w-full h-auto rounded-lg mb-2 shadow-sm" referrerPolicy="no-referrer" />
              )}
              {msg.text}
              <div className={`text-[9px] mt-1 opacity-60 ${msg.sender === 'farmer' ? 'text-right' : 'text-left'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {msg.sender === 'shamba' && msg.text.length > 160 && (
                  <span className="ml-2 text-red-200 font-bold">! SMS Split</span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="sms-bubble sms-shamba flex flex-col gap-1"
          >
            <div className="flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
            <span className="text-[10px] opacity-70 italic">
              {selectedLanguage ? (LANGUAGE_DATA[selectedLanguage]?.processing || 'Thinking...') : 'Thinking...'}
            </span>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Quick Actions */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar bg-white/50 border-t border-gray-100">
        {[
          { icon: CloudRain, label: 'Weather', text: 'Will it rain today?' },
          { icon: Leaf, label: 'Planting', text: 'Should I plant maize now?' },
          { icon: MapPin, label: 'Location', text: 'I am in Mbale district.' },
          { icon: AlertTriangle, label: 'Alerts', text: 'Any flood warnings?' },
        ].map((action, i) => (
          <button
            key={i}
            onClick={() => handleSend(undefined, action.text)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 whitespace-nowrap hover:border-shamba-green hover:text-shamba-green transition-all shadow-sm"
          >
            <action.icon className="w-3.5 h-3.5" />
            {action.label}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <footer className="p-4 bg-white border-t border-gray-200">
        {selectedImage && (
          <div className="mb-2 relative inline-block">
            <img 
              src={`data:${selectedImage.mimeType};base64,${selectedImage.data}`} 
              className="w-16 h-16 object-cover rounded-lg border-2 border-shamba-green" 
              alt="Preview"
              referrerPolicy="no-referrer"
            />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-md"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
        <form onSubmit={handleSend} className="relative flex gap-2">
          <div className="relative flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type your message..."
              className="w-full bg-gray-100 border-none rounded-2xl py-3 pl-4 pr-4 text-sm focus:ring-2 focus:ring-shamba-green resize-none min-h-[50px] max-h-[120px]"
              rows={1}
            />
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all active:scale-95"
            >
              <Camera className="w-5 h-5" />
            </button>
            <button
              type="submit"
              disabled={(!input.trim() && !selectedImage) || isLoading}
              className="p-2 bg-shamba-green text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageSelect} 
            accept="image/*" 
            className="hidden" 
          />
        </form>
        <div className="flex justify-between items-center px-1">
          <div className="char-counter">
            {input.length} / 160 characters
          </div>
          <div className="text-[10px] text-gray-400 font-medium">
            Grounding Enabled
          </div>
        </div>
      </footer>
    </div>
  );
}
