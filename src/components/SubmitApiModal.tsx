import React, { useState } from 'react';
import { X, PlusCircle, Check, Copy, Sparkles, Send } from 'lucide-react';
import { CATEGORIES } from '../data/apiData';
import { ApiSubmission, AuthType, CategoryKey } from '../types';

interface SubmitApiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (newApi: any) => void;
}

export const SubmitApiModal: React.FC<SubmitApiModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<ApiSubmission>({
    name: '',
    website: '',
    category: 'llm',
    description: '',
    freeTier: '',
    auth: 'apiKey',
    docs: '',
    tags: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedMd, setCopiedMd] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.website || !formData.freeTier) return;

    const newApiItem = {
      id: formData.name.toLowerCase().replace(/[^a-z0-0]/g, '-'),
      name: formData.name,
      category: formData.category,
      categoryLabel: CATEGORIES.find(c => c.key === formData.category)?.label || 'General AI',
      description: formData.description || 'Community submitted free AI API.',
      freeTier: formData.freeTier,
      auth: formData.auth,
      website: formData.website,
      docs: formData.docs || formData.website,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : ['Community', 'Free API'],
      popular: false
    };

    onSubmitSuccess(newApiItem);
    setSubmitted(true);
  };

  const generateMarkdownRow = () => {
    return `| [${formData.name}](${formData.website}) | ${formData.description} | ${formData.freeTier} | \`${formData.auth}\` | [Docs](${formData.docs || formData.website}) |`;
  };

  const handleCopyMd = () => {
    navigator.clipboard.writeText(generateMarkdownRow());
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Submit a Free AI API</h2>
              <p className="text-xs text-slate-400">Add a new zero-cost AI service or developer tool to the collective list</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {submitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">API Successfully Added to Directory!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Your API has been temporarily added to your live preview. You can also copy the markdown pull-request row below to submit to the upstream GitHub repository:
              </p>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-200 text-left overflow-x-auto">
                <p className="whitespace-pre-wrap">{generateMarkdownRow()}</p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleCopyMd}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition flex items-center gap-1.5"
                >
                  {copiedMd ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>Copy PR Markdown Row</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">API Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MyFreeLLM"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as CategoryKey })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.key} value={cat.key}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Website URL *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Docs URL</label>
                  <input
                    type="url"
                    placeholder="https://docs.example.com"
                    value={formData.docs}
                    onChange={(e) => setFormData({ ...formData, docs: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Free Tier Quota *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1,000 req/day, $5 free credit"
                    value={formData.freeTier}
                    onChange={(e) => setFormData({ ...formData, freeTier: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Auth Method *</label>
                  <select
                    value={formData.auth}
                    onChange={(e) => setFormData({ ...formData, auth: e.target.value as AuthType })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  >
                    <option value="apiKey">apiKey (API Key required)</option>
                    <option value="None">None (Zero Auth / Public)</option>
                    <option value="OAuth">OAuth (OAuth Login required)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief explanation of model capabilities, speed, context size, etc."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Tags (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Llama 3, Ultra-Fast, Open Source"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition flex items-center gap-1.5 shadow-lg shadow-indigo-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit API Entry</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
