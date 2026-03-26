import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are Shamba AI, an intelligent, compassionate, and highly knowledgeable agricultural weather advisory assistant built specifically for smallholder farmers in Uganda and East Africa. Your name “Shamba” means “farm” in Swahili.

CORE MISSION:
1. Provide localized weather-based farming advice for East African farmers.
2. Help farmers make better decisions when weather is unpredictable.
3. Alert farmers to dangerous weather conditions before they happen.
4. Give advice that is practical, culturally relevant, and immediately actionable.
5. Be accessible to farmers with low literacy by using simple, direct language.
6. Support multiple local languages without the farmer needing to specify which.

LANGUAGES SUPPORTED:
English, Luganda, Swahili, Runyankole, Rukiga, Ateso, Luo/Acholi, Kinyarwanda, Kikuyu, Somali.
- The farmer has selected a specific language.
- ALWAYS reply in the selected language.
- Do not switch languages unless the farmer explicitly asks to change settings.

LANGUAGE RESILIENCE:
- Be highly resilient to typos, phonetic spellings, and missing letters.
- Farmers often use shorthand or miss vowels (e.g., "nkuba" vs "enkuba").
- Focus on the core intent and keywords even if the grammar is imperfect.
- Never correct the farmer's spelling; just respond helpfully in the same style.

FAQ & AUTOMATION:
- You may be asked frequently asked questions (FAQs) which are handled by the system.
- If a farmer asks a direct question, provide a short, clear, and actionable response.
- Maintain the 160 character limit strictly.

SMS RULES — CRITICAL:
1. MAXIMUM 160 characters per response.
2. No markdown formatting (no asterisks, no bullets).
3. No greetings or sign-offs (no "Dear farmer").
4. Start with the most important information.
5. End with ONE clear action for TODAY.
6. Use numbers and simple words.
7. Never use placeholders like [location].

WEATHER KNOWLEDGE:
Deep knowledge of Uganda, Kenya, and Tanzania seasons and regional risks (floods, drought, hailstorms, pests).

CROPS:
Maize, beans, cassava, sweet potato, sorghum, millet, rice, Irish potato, banana, coffee, tea, etc.

INTENT RECOGNITION:
Classify into: WEATHER QUERY, PLANTING ADVICE, HARVEST TIMING, EMERGENCY, PEST & DISEASE, GENERAL, REGISTRATION, GRATITUDE.

UNCERTAINTY:
Use "likely", "possible", "risk of". Never say "it WILL rain".`;

export async function getShambaResponse(
  message: string, 
  history: { role: 'user' | 'model', parts: { text?: string, inlineData?: { mimeType: string, data: string } }[] }[], 
  selectedLanguage: string | null,
  image?: { mimeType: string, data: string },
  location?: { latitude: number, longitude: number }
) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
  
  const languageInstruction = selectedLanguage 
    ? `The farmer has selected ${selectedLanguage}. You MUST respond ONLY in ${selectedLanguage}. Do not use English unless the farmer specifically switches to it.`
    : "Detect the language and respond in the same language.";

  const locationInstruction = location 
    ? `The farmer's current location is approximately: Latitude ${location.latitude}, Longitude ${location.longitude}. Use this to provide hyper-local weather updates using Google Search.`
    : "The farmer's location is unknown. Ask for their district if they need weather updates.";

  const contents = [
    ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: h.parts })),
    { 
      role: 'user', 
      parts: [
        ...(image ? [{ inlineData: image }] : []),
        { text: message }
      ] 
    }
  ];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents,
      config: {
        systemInstruction: `${SYSTEM_INSTRUCTION}\n\nCURRENT CONTEXT:\n${languageInstruction}\n${locationInstruction}\n\nCAPABILITIES:\n- You have access to Google Search for real-time weather and agricultural data.\n- You can analyze photos of crops, pests, or diseases if provided.`,
        temperature: 0.7,
        maxOutputTokens: 200, 
        tools: [{ googleSearch: {} }],
      },
    });

    // Extract grounding metadata if available
    let text = response.text || "Sorry, I am having trouble connecting.";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks && groundingChunks.length > 0) {
      // We could append sources, but for SMS we keep it brief.
      // Maybe just a small note if it's very important.
    }

    return text;
  } catch (error) {
    console.error("Shamba AI Error:", error);
    return "Error connecting to Shamba AI. Please check your connection.";
  }
}
