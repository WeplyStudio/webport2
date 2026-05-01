"use client"

import { useState } from "react"
import { Loader } from "lucide-react"

interface EstimatedFeature {
  name: string
  description: string
  estimatedPrice: number
}

interface PricingEstimate {
  totalPrice: number
  features: EstimatedFeature[]
  reasoning: string
  timelineWeeks: number
  complexity: "low" | "medium" | "high"
}

export function AIPricingEstimator() {
  const [projectDescription, setProjectDescription] = useState("")
  const [requiredFeatures, setRequiredFeatures] = useState("")
  const [loading, setLoading] = useState(false)
  const [estimate, setEstimate] = useState<PricingEstimate | null>(null)
  const [error, setError] = useState("")

  const handleEstimate = async () => {
    if (!projectDescription.trim() || !requiredFeatures.trim()) {
      setError("Please fill in all fields")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Check if Puter is available
      if (typeof window === "undefined" || !(window as any).puter) {
        throw new Error("Puter AI not available. Please ensure Puter.com script is loaded.")
      }

      const prompt = `You are an expert pricing consultant for a web development & design agency. Based on the project description and required features provided, generate a detailed pricing estimate in JSON format.

Project Description: ${projectDescription}
Required Features: ${requiredFeatures}

Please respond ONLY with valid JSON in this exact format (no additional text before or after):
{
  "totalPrice": <number - estimated total price in USD>,
  "timelineWeeks": <number - estimated project duration>,
  "complexity": <"low" | "medium" | "high">,
  "features": [
    {
      "name": "<feature name>",
      "description": "<brief description>",
      "estimatedPrice": <individual feature price>
    }
  ],
  "reasoning": "<explanation of pricing breakdown>"
}

Consider:
- Basic features (contact forms, simple galleries): $500-2000
- E-commerce functionality: $3000-8000
- Custom integrations/APIs: $1500-5000
- Advanced animations/interactions: $1000-3000
- Maintenance & hosting included for 3 months
- Add 20-30% for custom requirements beyond standard scope

Base rates reference:
- UI/UX Design only: $2800-3500/month
- Full Stack Development: $6400-8000/month
- Custom Projects: $4000-5000/month`

      const response = await (window as any).puter.ai.chat(prompt, {
        model: "claude-sonnet-4.6",
      })

      const content = response.message.content[0].text
      console.log("[v0] Claude response:", content)

      // Parse the JSON response
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error("Could not parse AI response")
      }

      const estimateData = JSON.parse(jsonMatch[0]) as PricingEstimate
      setEstimate(estimateData)
    } catch (err) {
      console.error("[v0] Estimation error:", err)
      setError(err instanceof Error ? err.message : "Failed to generate estimate")
      setEstimate(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-6 md:px-0">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Project Description
            </label>
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Describe your project vision, target audience, and main goals..."
              className="w-full bg-secondary dark:bg-neutral-900 border border-foreground/10 rounded-xl px-4 py-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-blue-500 transition-colors resize-none h-24"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Required Features
            </label>
            <textarea
              value={requiredFeatures}
              onChange={(e) => setRequiredFeatures(e.target.value)}
              placeholder="List features you need: e.g., user authentication, payment integration, real-time chat, etc..."
              className="w-full bg-secondary dark:bg-neutral-900 border border-foreground/10 rounded-xl px-4 py-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-blue-500 transition-colors resize-none h-24"
            />
          </div>

          <button
            onClick={handleEstimate}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-bold text-sm uppercase tracking-widest py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {loading && <Loader className="w-4 h-4 animate-spin" />}
            {loading ? "Generating Estimate..." : "Get AI Estimate"}
          </button>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Estimate Result */}
        <div>
          {estimate ? (
            <div className="bg-secondary dark:bg-neutral-900/50 border border-blue-500/20 rounded-2xl p-6 md:p-8 space-y-6">
              <div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-blue-500 font-bold">Estimated Price</span>
                <div className="text-4xl md:text-5xl font-bold text-foreground mt-2">
                  ${estimate.totalPrice.toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
                    Timeline
                  </span>
                  <p className="text-lg font-bold text-foreground mt-1">{estimate.timelineWeeks} weeks</p>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
                    Complexity
                  </span>
                  <p className="text-lg font-bold text-foreground mt-1 capitalize">
                    {estimate.complexity === "high" && "🔴 High"}
                    {estimate.complexity === "medium" && "🟡 Medium"}
                    {estimate.complexity === "low" && "🟢 Low"}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-foreground/10">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-3">
                  Reasoning
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{estimate.reasoning}</p>
              </div>
            </div>
          ) : (
            <div className="bg-secondary dark:bg-neutral-900/50 border border-foreground/5 rounded-2xl p-6 md:p-8 h-full flex items-center justify-center">
              <p className="text-center text-muted-foreground text-sm">
                Fill in the form and click "Get AI Estimate" to see your project pricing breakdown
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Featured Estimate */}
      {estimate && (
        <div className="mt-12 pt-8 border-t border-foreground/10">
          <h4 className="text-2xl font-bold text-foreground mb-6">Feature Breakdown</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {estimate.features.map((feature) => (
              <div
                key={feature.name}
                className="bg-secondary dark:bg-neutral-900 border border-foreground/10 rounded-xl p-4 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-foreground text-sm">{feature.name}</h5>
                  <span className="text-blue-500 font-bold text-sm">${feature.estimatedPrice.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
