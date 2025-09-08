import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000';
const MIN_HOOK_LENGTH = 10;

const INITIAL_FORM_DATA = {
  hookContent: '',
  intent: 'General',
};

const dotPattern = `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.6' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E`;

const Header = ({ isVisible }) => (
  <div className={`text-center mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Free AI Hook Generator</h1>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Use our AI to generate the perfect attention-grabbing hook in seconds.</p>
  </div>
);

const TextAreaInput = ({ value, onChange }) => (
  <div className="mb-6">
    <label className="block text-lg font-semibold text-gray-900 mb-3">What is your content about?</label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder="e.g., The launch of a new productivity app that helps teams manage tasks..."
      className="w-full p-4 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none resize-none text-gray-900 bg-gray-50 transition"
      rows="4"
    />
    <div className="text-right text-sm text-gray-500 mt-1">Minimum {MIN_HOOK_LENGTH} characters</div>
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

const SubmitButton = ({ isGenerating, isDisabled, onClick }) => (
  <div className="mt-6 text-center">
    <button
      onClick={onClick}
      disabled={isGenerating || isDisabled}
      className="w-full md:w-auto inline-flex items-center justify-center px-10 py-3 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {isGenerating ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
          <span>Generating Hook...</span>
        </>
      ) : (
        <>
          <span className="mr-2 text-lg">🚀</span>
          <span>Generate Hook</span>
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
        className={`ml-4 text-xl transition-colors ${copied ? "text-green-600" : "text-indigo-600 hover:text-blue-800"}`}
        title={copied ? "Copied!" : "Copy Hook"}
      >
        <Copy />
      </button>
    </div>
  );
};

const ResultsSection = ({ hooks, onReset }) => (
  <div className="mt-12 w-full">
    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Your Generated Hook</h2>
    <div className="max-w-3xl mx-auto space-y-5">
      {hooks.map((hook, index) => <HookResultItem key={index} hook={hook} />)}
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

const HookGeneratorScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHooks, setGeneratedHooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => setIsVisible(true), []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (formData.hookContent.trim().length < MIN_HOOK_LENGTH) return;

    setIsGenerating(true);
    setGeneratedHooks([]);
    setError(null);

    try {
      const payload = {
        category: formData.intent,
        content: formData.hookContent,
      };

      const response = await fetch(`${API_BASE_URL}/choose_best_hook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`API Error: ${response.status} ${response.statusText}`);

      const data = await response.json();

      if (data.chosen_hook) {
        setGeneratedHooks([data.chosen_hook]);
      } else if (data.message) {
        setError(data.message);
      } else {
        throw new Error("No hook was returned from the API.");
      }

    } catch (err) {
      console.error("Failed to generate hook:", err);
      setError("Sorry, something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setGeneratedHooks([]);
    setError(null);
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
        <Header isVisible={isVisible} />

        <div className={`transition-all duration-1000 delay-200 w-full max-w-3xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 md:p-8">
            <TextAreaInput value={formData.hookContent} onChange={(e) => setFormData(prev => ({ ...prev, hookContent: e.target.value }))} />

            <div className="flex items-end justify-between mt-6">
              <div className="flex items-end gap-4">
                <CompactSelectInput
                  name="intent"
                  label="Category / Intent"
                  value={formData.intent}
                  onChange={handleInputChange}
                  options={['General', 'Bold', 'Question-based', 'Intriguing', 'Action', 'story-based', 'Motivational', 'List-based']}
                />
              </div>

              <SubmitButton isGenerating={isGenerating} isDisabled={isSubmitDisabled} onClick={handleSubmit} />
            </div>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </div>
        </div>

        {generatedHooks.length > 0 && !isGenerating && <ResultsSection hooks={generatedHooks} onReset={handleReset} />}
      </div>
    </div>
  );
};

export default HookGeneratorScreen;