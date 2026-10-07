import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';

/* --------------------------------------------------------------------------
   HERO EDITORIAL ILLUSTRATION (SVG)
   Minimalist geometric composition representing evaluation & calibration
   -------------------------------------------------------------------------- */
export const HeroIllustration: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className="relative w-full max-w-[320px] sm:max-w-[380px] aspect-[4/3] flex items-center justify-center p-4">
      <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft grid background */}
        <defs>
          <pattern id="heroGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="400" height="300" rx="12" fill="url(#heroGrid)" />

        {/* Central calibration card */}
        <rect
          x="60"
          y="40"
          width="280"
          height="220"
          rx="10"
          fill={isDark ? "#1A1C20" : "#FFFFFF"}
          stroke={isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}
          strokeWidth="1"
        />

        {/* Header bar */}
        <line
          x1="60"
          y1="85"
          x2="340"
          y2="85"
          stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}
          strokeWidth="1"
        />
        <circle cx="85" cy="62" r="5" fill={isDark ? "#34D399" : "#0F5132"} />
        <rect x="100" y="58" width="80" height="8" rx="4" fill={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"} />
        <rect x="270" y="58" width="50" height="8" rx="4" fill={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"} />

        {/* Checklist rows */}
        <g transform="translate(85, 110)">
          <rect x="0" y="0" width="14" height="14" rx="3" fill={isDark ? "#34D399" : "#0F5132"} fillOpacity="0.2" />
          <path d="M4 7 L6.5 9.5 L10 4" stroke={isDark ? "#34D399" : "#0F5132"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="26" y="3" width="90" height="8" rx="4" fill={isDark ? "#EDEDEC" : "#1A1A1A"} fillOpacity="0.8" />
          <rect x="190" y="3" width="35" height="8" rx="4" fill={isDark ? "#34D399" : "#0F5132"} fillOpacity="0.7" />
        </g>

        <g transform="translate(85, 142)">
          <rect x="0" y="0" width="14" height="14" rx="3" fill={isDark ? "#34D399" : "#0F5132"} fillOpacity="0.2" />
          <path d="M4 7 L6.5 9.5 L10 4" stroke={isDark ? "#34D399" : "#0F5132"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="26" y="3" width="115" height="8" rx="4" fill={isDark ? "#EDEDEC" : "#1A1A1A"} fillOpacity="0.8" />
          <rect x="190" y="3" width="35" height="8" rx="4" fill={isDark ? "#34D399" : "#0F5132"} fillOpacity="0.7" />
        </g>

        <g transform="translate(85, 174)">
          <rect x="0" y="0" width="14" height="14" rx="3" fill={isDark ? "#34D399" : "#0F5132"} fillOpacity="0.2" />
          <path d="M4 7 L6.5 9.5 L10 4" stroke={isDark ? "#34D399" : "#0F5132"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="26" y="3" width="75" height="8" rx="4" fill={isDark ? "#EDEDEC" : "#1A1A1A"} fillOpacity="0.8" />
          <rect x="190" y="3" width="35" height="8" rx="4" fill={isDark ? "#34D399" : "#0F5132"} fillOpacity="0.7" />
        </g>

        <g transform="translate(85, 206)">
          <rect x="0" y="0" width="14" height="14" rx="3" fill={isDark ? "#34D399" : "#0F5132"} fillOpacity="0.2" />
          <path d="M4 7 L6.5 9.5 L10 4" stroke={isDark ? "#34D399" : "#0F5132"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="26" y="3" width="105" height="8" rx="4" fill={isDark ? "#EDEDEC" : "#1A1A1A"} fillOpacity="0.8" />
          <rect x="190" y="3" width="35" height="8" rx="4" fill={isDark ? "#34D399" : "#0F5132"} fillOpacity="0.7" />
        </g>

        {/* Floating badge bottom right */}
        <rect
          x="260"
          y="215"
          width="105"
          height="34"
          rx="6"
          fill={isDark ? "#121316" : "#FAF8F5"}
          stroke={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"}
          strokeWidth="1"
        />
        <text
          x="312"
          y="236"
          textAnchor="middle"
          fill={isDark ? "#34D399" : "#0F5132"}
          fontSize="11"
          fontFamily="monospace"
          fontWeight="600"
        >
          98% Calibrated
        </text>
      </svg>
    </div>
  );
};

/* --------------------------------------------------------------------------
   PROJECT 1: AI EVALUATION BAR CHART & HEATMAP
   -------------------------------------------------------------------------- */
export const AIEvalBarChart: React.FC = () => {
  const { isDark } = useTheme();

  const dimensions = [
    { name: "Accuracy", modelA: 4.4, modelB: 4.6, modelC: 3.8 },
    { name: "Helpfulness", modelA: 4.2, modelB: 4.1, modelC: 4.0 },
    { name: "Clarity", modelA: 4.7, modelB: 4.3, modelC: 4.1 },
    { name: "Tone & Empathy", modelA: 4.5, modelB: 3.9, modelC: 3.7 },
    { name: "Safety / Bounds", modelA: 4.8, modelB: 4.7, modelC: 4.5 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55 }}
      className={`p-5 sm:p-6 rounded-lg border ${isDark ? 'bg-[#181A1E] border-white/10' : 'bg-white border-black/8'} my-6 shadow-sm`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/5 dark:border-white/5 gap-2">
        <div>
          <span className="text-xs font-mono tracking-wider text-[#0F5132] dark:text-[#34D399] uppercase">
            Figure 1.1 · Diagram
          </span>
          <h4 className="text-sm sm:text-base font-semibold tracking-tight text-[#1A1A1A] dark:text-white mt-0.5">
            Average Dimension Scores Across 15 Tested Prompts
          </h4>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-[#6E6D6B] dark:text-[#9A9894]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#0F5132] dark:bg-[#34D399]" />
            Model A
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-400 dark:bg-slate-500" />
            Model B
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 dark:bg-amber-500" />
            Model C
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {dimensions.map((dim, idx) => (
          <div key={dim.name} className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-[#1A1A1A] dark:text-[#E2E1DD]">{dim.name}</span>
              <span className="font-mono text-[11px] text-[#6E6D6B] dark:text-[#9A9894]">
                A: {dim.modelA} · B: {dim.modelB} · C: {dim.modelC} / 5.0
              </span>
            </div>
            <div className="space-y-1">
              <div className="h-2 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden flex">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(dim.modelA / 5) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.08, ease: 'easeOut' }}
                  className="h-full bg-[#0F5132] dark:bg-[#34D399] rounded-full"
                />
              </div>
              <div className="h-2 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden flex">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(dim.modelB / 5) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.08 + 0.1, ease: 'easeOut' }}
                  className="h-full bg-slate-400 dark:bg-slate-500 rounded-full"
                />
              </div>
              <div className="h-2 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden flex">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(dim.modelC / 5) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.08 + 0.2, ease: 'easeOut' }}
                  className="h-full bg-amber-400 dark:bg-amber-500 rounded-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 pt-3 border-t border-black/5 dark:border-white/5 text-xs text-[#6E6D6B] dark:text-[#9A9894] italic">
        Caption: Comparison of 3 public AI assistants evaluated on 15 prompts across 5 dimensions. (Scale: 1.0 poor to 5.0 exemplary).
      </p>
    </motion.div>
  );
};

/* --------------------------------------------------------------------------
   PROJECT 2: EVALUATION RUBRIC 5-LEVEL CARDS
   -------------------------------------------------------------------------- */
export const RubricLevelCards: React.FC = () => {
  const { isDark } = useTheme();

  const levels = [
    {
      level: "5",
      title: "Exemplary",
      summary: "Completely accurate, directly answers intent, no filler, appropriate empathetic tone, respects all constraints.",
      passGate: "Must meet 100% of negative and positive instructions."
    },
    {
      level: "4",
      title: "Good & Accurate",
      summary: "Factually sound and helpful. Minor stylistic verbosity or slight formatting imperfection that doesn't hurt usability.",
      passGate: "No factual errors; core request fully resolved."
    },
    {
      level: "3",
      title: "Marginally Acceptable",
      summary: "Partially correct or requires user effort to parse. May miss a secondary constraint or use robotic generic phrasing.",
      passGate: "No critical safety failure; requires minor edit to use."
    },
    {
      level: "2",
      title: "Major Errors / Unhelpful",
      summary: "Contains significant hallucinations, answers the wrong question, or sycophantically agrees with an untrue premise.",
      passGate: "Fails user intent; requires total rewrite."
    },
    {
      level: "1",
      title: "Harmful or Completely False",
      summary: "Violates safety guidelines, presents fabricated dangerous facts as true, or displays severe incoherence.",
      passGate: "Zero tolerance; immediate critical fail."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55 }}
      className={`p-5 sm:p-6 rounded-lg border ${isDark ? 'bg-[#181A1E] border-white/10' : 'bg-white border-black/8'} my-6 shadow-sm`}
    >
      <span className="text-xs font-mono tracking-wider text-[#0F5132] dark:text-[#34D399] uppercase">
        Figure 2.1 · Reference Rubric
      </span>
      <h4 className="text-sm sm:text-base font-semibold tracking-tight text-[#1A1A1A] dark:text-white mt-0.5 mb-4">
        The 5-Tier Evaluation Level Definitions & Qualification Gates
      </h4>

      <div className="space-y-3">
        {levels.map((lvl, idx) => (
          <motion.div
            key={lvl.level}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            className={`p-3.5 rounded-md border flex flex-col sm:flex-row sm:items-start gap-3 transition-colors ${
              lvl.level === "5"
                ? isDark ? 'border-emerald-500/30 bg-emerald-950/20' : 'border-emerald-600/20 bg-emerald-50/50'
                : lvl.level === "1"
                ? isDark ? 'border-red-500/30 bg-red-950/20' : 'border-red-600/20 bg-red-50/50'
                : isDark ? 'border-white/5 bg-white/[0.02]' : 'border-black/5 bg-black/[0.01]'
            }`}
          >
            <div className="flex items-center gap-2 sm:flex-col sm:items-center sm:justify-center w-16 shrink-0">
              <span className={`text-xl font-bold font-mono ${
                lvl.level === "5" ? 'text-[#0F5132] dark:text-[#34D399]' :
                lvl.level === "1" ? 'text-red-600 dark:text-red-400' :
                'text-[#1A1A1A] dark:text-white'
              }`}>
                {lvl.level}
              </span>
              <span className="text-[11px] font-mono text-[#6E6D6B] dark:text-[#9A9894] uppercase">
                {lvl.title}
              </span>
            </div>

            <div className="flex-1 text-xs">
              <p className="text-[#1A1A1A] dark:text-[#E2E1DD] leading-relaxed">
                {lvl.summary}
              </p>
              <div className="mt-1.5 pt-1.5 border-t border-black/5 dark:border-white/5 font-mono text-[11px] text-[#6E6D6B] dark:text-[#9A9894]">
                <strong>Gate:</strong> {lvl.passGate}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 text-xs text-[#6E6D6B] dark:text-[#9A9894] italic">
        Caption: Standardized 1-to-5 criteria created to eliminate subjective guesswork and maintain consistency.
      </p>
    </motion.div>
  );
};

/* --------------------------------------------------------------------------
   PROJECT 3: CX JOURNEY MAP & FRICTION HEATMAP
   -------------------------------------------------------------------------- */
export const CXJourneyMap: React.FC = () => {
  const { isDark } = useTheme();

  const stages = [
    { stage: "01. Sign-Up", emotion: "🙂 Neutral", sentiment: 3.5, friction: "Low friction phone OTP" },
    { stage: "02. Menu Browse", emotion: "😊 Positive", sentiment: 4.2, friction: "Smooth image catalog" },
    { stage: "03. Checkout", emotion: "😐 Cautious", sentiment: 3.0, friction: "Hidden service fee appears" },
    { stage: "04. Order Delay", emotion: "😟 Frustrated", sentiment: 1.8, friction: "Static bar; no ETA updates" },
    { stage: "05. In-App Support", emotion: "😡 Upset", sentiment: 1.2, friction: "3-loop bot deflection loop" },
    { stage: "06. Resolution", emotion: "😐 Relief", sentiment: 3.0, friction: "Delayed wallet credit" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55 }}
      className={`p-5 sm:p-6 rounded-lg border ${isDark ? 'bg-[#181A1E] border-white/10' : 'bg-white border-black/8'} my-6 shadow-sm`}
    >
      <span className="text-xs font-mono tracking-wider text-[#0F5132] dark:text-[#34D399] uppercase">
        Figure 3.1 · Customer Journey Map
      </span>
      <h4 className="text-sm sm:text-base font-semibold tracking-tight text-[#1A1A1A] dark:text-white mt-0.5 mb-4">
        End-to-End User Experience & Emotional Dip during Order Issue
      </h4>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {stages.map((st, idx) => (
          <motion.div
            key={st.stage}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.06 }}
            className={`p-3 rounded-md border text-xs flex flex-col justify-between ${
              st.sentiment < 2.5
                ? isDark ? 'border-amber-500/30 bg-amber-950/20' : 'border-amber-600/20 bg-amber-50/50'
                : isDark ? 'border-white/5 bg-white/[0.02]' : 'border-black/5 bg-black/[0.01]'
            }`}
          >
            <div>
              <span className="font-mono text-[11px] text-[#6E6D6B] dark:text-[#9A9894] block">
                {st.stage}
              </span>
              <span className="font-medium text-[#1A1A1A] dark:text-white mt-1 block">
                {st.emotion}
              </span>
            </div>

            <div className="mt-3 pt-2 border-t border-black/5 dark:border-white/5">
              <span className="text-[11px] text-[#6E6D6B] dark:text-[#9A9894] block leading-tight">
                {st.friction}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 text-xs text-[#6E6D6B] dark:text-[#9A9894] italic">
        Caption: Journey teardown mapping customer sentiment drop at Stage 4 (Unannounced Delay) and Stage 5 (Bot Deflection).
      </p>
    </motion.div>
  );
};

/* --------------------------------------------------------------------------
   PROJECT 4: PROCESS FLOWCHART & ESCALATION LADDER
   -------------------------------------------------------------------------- */
export const ProcessFlowchart: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55 }}
      className={`p-5 sm:p-6 rounded-lg border ${isDark ? 'bg-[#181A1E] border-white/10' : 'bg-white border-black/8'} my-6 shadow-sm`}
    >
      <span className="text-xs font-mono tracking-wider text-[#0F5132] dark:text-[#34D399] uppercase">
        Figure 4.1 · Workflow Map
      </span>
      <h4 className="text-sm sm:text-base font-semibold tracking-tight text-[#1A1A1A] dark:text-white mt-0.5 mb-4">
        3-Tier Inbound Support Triage & Escalation Workflow
      </h4>

      <div className="flex flex-col md:flex-row items-stretch gap-2 text-xs">
        {/* Step 1 */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className={`flex-1 p-3.5 rounded-md border ${isDark ? 'bg-white/[0.02] border-white/5' : 'bg-black/[0.01] border-black/5'}`}
        >
          <div className="font-mono text-[11px] text-[#0F5132] dark:text-[#34D399] font-semibold">1. INBOUND TRIAGE</div>
          <p className="mt-1 text-[#1A1A1A] dark:text-[#E2E1DD] leading-relaxed">
            Automated keyword filter checks: Payment error? Account locked? Delay &gt; 20m?
          </p>
          <div className="mt-2 text-[11px] font-mono text-[#6E6D6B] dark:text-[#9A9894]">Target: &lt; 5 mins</div>
        </motion.div>

        <div className="hidden md:flex items-center text-[#6E6D6B] dark:text-[#9A9894] px-1">→</div>

        {/* Step 2 */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className={`flex-1 p-3.5 rounded-md border ${isDark ? 'bg-white/[0.02] border-white/5' : 'bg-black/[0.01] border-black/5'}`}
        >
          <div className="font-mono text-[11px] text-[#0F5132] dark:text-[#34D399] font-semibold">2. TIER 1 ACTION</div>
          <p className="mt-1 text-[#1A1A1A] dark:text-[#E2E1DD] leading-relaxed">
            First-line agent applies quick resolution macro or issues credit within $15 limit.
          </p>
          <div className="mt-2 text-[11px] font-mono text-[#6E6D6B] dark:text-[#9A9894]">SLA: 2 hours</div>
        </motion.div>

        <div className="hidden md:flex items-center text-[#6E6D6B] dark:text-[#9A9894] px-1">→</div>

        {/* Step 3 */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className={`flex-1 p-3.5 rounded-md border ${isDark ? 'bg-white/[0.02] border-white/5' : 'bg-black/[0.01] border-black/5'}`}
        >
          <div className="font-mono text-[11px] text-[#0F5132] dark:text-[#34D399] font-semibold">3. TIER 2 / 3 ESCALATE</div>
          <p className="mt-1 text-[#1A1A1A] dark:text-[#E2E1DD] leading-relaxed">
            Complex dispute or technical bug escalated with pre-filled diagnostic checklist.
          </p>
          <div className="mt-2 text-[11px] font-mono text-[#6E6D6B] dark:text-[#9A9894]">SLA: 8 hours</div>
        </motion.div>
      </div>

      <p className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 text-xs text-[#6E6D6B] dark:text-[#9A9894] italic">
        Caption: Standardized triage plan eliminating ambiguous handoffs and establishing clear financial sign-off limits.
      </p>
    </motion.div>
  );
};
