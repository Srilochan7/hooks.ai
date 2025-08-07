import React, { useState, useEffect } from 'react';
// Import icons for the results section
import { FaCopy, FaHashtag } from 'react-icons/fa';
import { BsTwitterX, BsFacebook, BsLinkedin, BsWhatsapp } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';

// --- Constants and Configuration ---
// Centralized configuration for easy management.
const MIN_HOOK_LENGTH = 30;

const INITIAL_FORM_DATA = {
  hookContent: '',
  tone: 'Professional',
  intent: 'Driving Curiosity',
  audience: [],
  theme: '',
  variants: '3'
};

const dotPattern = `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.6' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E`;

const audienceOptions = ['Subscribers', 'Customers', 'Internal Email', 'Leads', 'Investors', 'Partners', 'Candidates'];
const themeOptions = ['Productivity', 'Marketing', 'Sales', 'Technology', 'Health', 'Finance', 'Education', 'Lifestyle', 'Business', 'Career'];

// Hook templates for different tones and intents
const hookTemplates = {
  'Driving Curiosity': [
    "Ever wondered what secrets lie behind {topic}?",
    "What if I told you that {topic} could change everything?",
    "The hidden truth about {topic} that nobody talks about",
    "Why everyone is secretly obsessed with {topic}",
    "What magic unfolds behind {topic}?",
    "The one thing about {topic} that will blow your mind",
    "Ever wondered why {topic} is suddenly everywhere?",
    "The shocking reality behind {topic} revealed",
  ],
  'Educational': [
    "Here's everything you need to know about {topic}",
    "The complete guide to mastering {topic}",
    "5 essential facts about {topic} you should know",
    "Breaking down {topic}: A beginner's perspective",
    "The science behind {topic} explained simply",
    "How {topic} actually works (step by step)",
    "The ultimate breakdown of {topic}",
  ],
  'Entertainment': [
    "This {topic} story will make your day",
    "You won't believe what happened with {topic}",
    "The funniest thing about {topic} you'll see today",
    "This {topic} moment went viral for all the right reasons",
    "The most entertaining take on {topic} ever",
  ],
  'Inspirational': [
    "How {topic} transformed my entire perspective",
    "The life-changing power of {topic}",
    "Why {topic} is the key to your success",
    "How {topic} can unlock your potential",
    "The inspiring story behind {topic}",
    "Why {topic} is your secret weapon",
  ],
  'Sales': [
    "Why smart people are choosing {topic}",
    "The #1 reason you need {topic} in your life",
    "How {topic} can save you time and money",
    "The game-changing benefits of {topic}",
    "Why {topic} is flying off the shelves",
  ]
};

const toneModifiers = {
  'Professional': (hook) => hook,
  'Casual': (hook) => hook + " 👀",
  'Urgent': (hook) => "🚨 " + hook + " (Don't miss this!)",
  'Friendly': (hook) => hook + " ✨",
  'Mysterious': (hook) => hook + "..."
};

// --- UI Sub-components ---
// Breaking the UI into smaller pieces makes the code much easier to read and maintain.

const Header = ({ isVisible }) => (
  <div className={`text-center mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
      Free AI Hook Generator
    </h1>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
      Use our AI to generate attention-grabbing hooks in seconds
    </p>
  </div>
);

const TextAreaInput = ({ value, onChange }) => (
  <div className="mb-6">
    <label className="block text-lg font-semibold text-gray-900 mb-3">What is this hook about?</label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder="e.g., The launch of a new productivity app that helps teams manage tasks..."
      className="w-full p-4 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none resize-none text-gray-900 bg-gray-50 transition"
      rows="4"
    />
    <div className="text-right text-sm text-gray-500 mt-1">
      Minimum {MIN_HOOK_LENGTH} characters
    </div>
  </div>
);

const CompactSelectInput = ({ name, label, value, onChange, options }) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-600 focus:ring-1 focus:ring-blue-200 outline-none text-gray-900 bg-white transition text-sm"
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const ThemeSelect = ({ value, onChange, options }) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 mb-1">Theme <span className="text-gray-400">(optional)</span></label>
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full p-2.5 pl-9 border border-gray-300 rounded-md focus:border-blue-600 focus:ring-1 focus:ring-blue-200 outline-none text-gray-900 bg-white appearance-none transition text-sm"
      >
        <option value="">Select</option>
        {options.map((theme) => <option key={theme} value={theme}>{theme}</option>)}
      </select>
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <span className="text-base">✨</span>
      </div>
    </div>
  </div>
);

const AudienceButtonGroup = ({ selected, onToggle, options }) => (
    <div className="mb-8">
      <label className="block text-lg font-semibold text-gray-900 mb-3">Who is the audience for this hook?</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-300 ${
              selected.includes(option)
                ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
);

const SubmitButton = ({ isGenerating, isDisabled, onClick }) => (
  <div className="mt-6 text-center">
    <button
      onClick={onClick}
      disabled={isGenerating || isDisabled}
      className="w-full md:w-auto inline-flex items-center justify-center px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {isGenerating ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
          <span>Generating Hooks...</span>
        </>
      ) : (
        <>
          <span className="mr-2 text-lg">🚀</span>
          <span>Generate Hooks</span>
        </>
      )}
    </button>
  </div>
);

const HookResultItem = ({ hook }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hook);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 flex items-center justify-between">
      <p className="text-lg text-gray-800 font-medium">{hook}</p>
      <button
        onClick={handleCopy}
        className={`ml-4 text-xl transition-colors ${
          copied ? "text-green-600" : "text-blue-600 hover:text-blue-800"
        }`}
        title={copied ? "Copied!" : "Copy Hook"}
      >
        <FaCopy />
      </button>
    </div>
  );
};

const ResultsSection = ({ hooks, onReset }) => (
    <div className="mt-12 w-full">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Your Generated Hooks</h2>
        <div className="max-w-3xl mx-auto space-y-5">
            {hooks.map((hook, index) => (
                <HookResultItem key={index} hook={hook} />
            ))}
        </div>
        <div className="text-center mt-10">
            <button
                onClick={onReset}
                className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
            >
                <span className="mr-2">🔄</span>
                Start Over & Generate More
            </button>
        </div>
    </div>
);


// --- Main Page Component ---
const HookGeneratorScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHooks, setGeneratedHooks] = useState([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAudienceToggle = (audience) => {
    setFormData(prev => ({
      ...prev,
      audience: prev.audience.includes(audience)
        ? prev.audience.filter(a => a !== audience)
        : [...prev.audience, audience]
    }));
  };

  const generateHooks = (content, intent, tone, numVariants) => {
    // Get templates for the selected intent
    const templates = hookTemplates[intent] || hookTemplates['Driving Curiosity'];
    
    // Extract key topic from content (first few words or key phrase)
    const topic = content.split(' ').slice(0, 5).join(' ').toLowerCase().replace(/[^\w\s]/g, '');
    
    // Generate hooks by replacing {topic} with actual content
    const hooks = [];
    const shuffledTemplates = [...templates].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < numVariants && i < shuffledTemplates.length; i++) {
      let hook = shuffledTemplates[i].replace('{topic}', topic);
      
      // Apply tone modifier
      if (toneModifiers[tone]) {
        hook = toneModifiers[tone](hook);
      }
      
      hooks.push(hook);
    }
    
    return hooks;
  };

  const handleSubmit = async () => {
    if (formData.hookContent.trim().length < MIN_HOOK_LENGTH) return;
    
    setIsGenerating(true);
    setGeneratedHooks([]); // Clear previous hooks
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    
    const numToGenerate = parseInt(formData.variants, 10);
    const hooks = generateHooks(
      formData.hookContent,
      formData.intent,
      formData.tone,
      numToGenerate
    );
    
    setGeneratedHooks(hooks);
    setIsGenerating(false);
  };

  const handleReset = () => {
    setGeneratedHooks([]);
    setFormData(INITIAL_FORM_DATA);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const isSubmitDisabled = !formData.hookContent.trim() || formData.hookContent.length < MIN_HOOK_LENGTH;

  return (
    <div
      className="bg-gray-50 text-black min-h-screen relative overflow-x-hidden"
      style={{ 
        backgroundImage: `url("${dotPattern}")`,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }}
    >
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10 flex flex-col items-center">
        
        {/* The main form card */}
        <div className={`transition-all duration-1000 delay-200 w-full max-w-3xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 md:p-8">
            <Header isVisible={isVisible} />
            <TextAreaInput
              value={formData.hookContent}
              onChange={(e) => setFormData(prev => ({...prev, hookContent: e.target.value}))}
            />
            <AudienceButtonGroup
              selected={formData.audience}
              onToggle={handleAudienceToggle}
              options={audienceOptions}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <CompactSelectInput
                  name="tone"
                  label="Tone"
                  value={formData.tone}
                  onChange={handleInputChange}
                  options={['Professional', 'Casual', 'Urgent', 'Friendly', 'Mysterious']}
                />
                <CompactSelectInput
                  name="intent"
                  label="Intent"
                  value={formData.intent}
                  onChange={handleInputChange}
                  options={['Driving Curiosity', 'Educational', 'Entertainment', 'Inspirational', 'Sales']}
                />
                <CompactSelectInput
                  name="variants"
                  label="No. of variants"
                  value={formData.variants}
                  onChange={handleInputChange}
                  options={['1', '2', '3', '4', '5']}
                />
                <ThemeSelect
                    value={formData.theme}
                    onChange={(e) => setFormData(prev => ({...prev, theme: e.target.value}))}
                    options={themeOptions}
                />
            </div>
            <SubmitButton
              isGenerating={isGenerating}
              isDisabled={isSubmitDisabled}
              onClick={handleSubmit}
            />
          </div>
        </div>

        {/* The results section, which appears only after hooks are generated */}
        {generatedHooks.length > 0 && !isGenerating && (
          <ResultsSection hooks={generatedHooks} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default HookGeneratorScreen;