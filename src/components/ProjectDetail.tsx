import React, { useState } from 'react';
import { ProjectDetailData } from '../types/portfolio';
import { useTheme } from '../context/ThemeContext';
import { Lightbox } from './Lightbox';
import { AIEvalBarChart, RubricLevelCards, CXJourneyMap, ProcessFlowchart } from './InlineCharts';
import { ArrowLeft, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { LazyImage } from './LazyImage';

interface ProjectDetailProps {
  project: ProjectDetailData;
  allProjects: ProjectDetailData[];
  onBackToWork: () => void;
  onSelectProject: (p: ProjectDetailData) => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  allProjects,
  onBackToWork,
  onSelectProject
}) => {
  const { isDark } = useTheme();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Combine cover image and gallery images for lightbox
  const allImages = [project.coverImage, ...project.galleryImages];

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  const openLightboxAt = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen pb-24 animate-in fade-in duration-200">
      {/* 1. Full-Width Hero Cover Image & Header */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        {/* Animated Cover image container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => openLightboxAt(0)}
          className="cursor-pointer group relative w-full aspect-[16/9] sm:aspect-[16/8] bg-[#EAE8E3] dark:bg-[#1D2025] rounded-xl overflow-hidden border border-black/8 dark:border-white/10 mb-8 flex flex-col items-center justify-center text-center transition-all hover:border-[#0F5132]/40 shadow-sm"
        >
          <LazyImage
            src={project.coverImage.imageUrl}
            alt={project.coverImage.alt}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            priority={true}
          />

          <div className="absolute bottom-3 right-4 font-mono text-[11px] text-white/95 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-md flex items-center gap-1.5 border border-white/10">
            <span>View full size</span>
          </div>
        </motion.div>

        {/* Title & Metadata Header with Animations */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-[720px]"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-[#6E6D6B] dark:text-[#9A9894] mb-3">
            <span className="text-[#0F5132] dark:text-[#34D399] font-semibold">
              Project {project.number}
            </span>
            <span>·</span>
            <span>{project.tags.join(' / ')}</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1A1A1A] dark:text-white leading-[1.15]"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-4 text-base sm:text-lg text-[#5A5A5A] dark:text-[#A09E9A] leading-relaxed"
          >
            {project.oneLineSummary}
          </motion.p>

          {/* Details Row: Type, Tools Used, Time Spent */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8 pt-6 border-t border-black/8 dark:border-white/8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono"
          >
            <div>
              <span className="text-[#6E6D6B] dark:text-[#9A9894] block">Type</span>
              <span className="text-[#1A1A1A] dark:text-white font-medium mt-0.5 block">{project.typeLabel}</span>
            </div>
            <div>
              <span className="text-[#6E6D6B] dark:text-[#9A9894] block">Tools Used</span>
              <span className="text-[#1A1A1A] dark:text-white font-medium mt-0.5 block">{project.toolsUsed.join(', ')}</span>
            </div>
            <div>
              <span className="text-[#6E6D6B] dark:text-[#9A9894] block">Time Spent</span>
              <span className="text-[#1A1A1A] dark:text-white font-medium mt-0.5 block">{project.timeSpent}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 2. Key Results Strip (3 large numbers with staggered entrance) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        className="w-full border-y border-black/8 dark:border-white/8 bg-black/[0.015] dark:bg-white/[0.015] py-8 my-8"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {project.keyResults.map((result, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="font-mono"
              >
                <div className="text-2xl sm:text-3xl font-bold text-[#0F5132] dark:text-[#34D399]">
                  {result.stat}
                </div>
                <div className="text-xs font-semibold text-[#1A1A1A] dark:text-white mt-1">
                  {result.label}
                </div>
                <div className="text-[11px] text-[#6E6D6B] dark:text-[#9A9894] mt-0.5 font-sans">
                  {result.context}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3. Main Narrative Sections (Max text width about 680px) with scroll reveal */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section 1: Context */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55 }}
          className="max-w-[680px]"
        >
          <h2 className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1A1A] dark:text-white mb-3">
            Context
          </h2>
          <p className="text-sm sm:text-base text-[#3A3A3A] dark:text-[#D0CECA] leading-relaxed">
            {project.contextText}
          </p>
        </motion.section>

        {/* Section 2: What I did */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55 }}
          className="max-w-[680px]"
        >
          <h2 className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1A1A] dark:text-white mb-3">
            What I did
          </h2>
          <ul className="space-y-3 text-sm text-[#3A3A3A] dark:text-[#D0CECA] leading-relaxed">
            {project.whatIDidText.map((step, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex items-start gap-3"
              >
                <span className="font-mono text-xs text-[#0F5132] dark:text-[#34D399] mt-0.5 font-semibold">
                  0{idx + 1}.
                </span>
                <span>{step}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* Embedded Interactive SVG / Diagram with fade reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
        >
          {project.chartType === 'ai-eval' && <AIEvalBarChart />}
          {project.chartType === 'rubric' && <RubricLevelCards />}
          {project.chartType === 'cx-teardown' && <CXJourneyMap />}
          {project.chartType === 'process-improvement' && <ProcessFlowchart />}
        </motion.div>

        {/* Section 3: What I observed (WITH CALLOUT BOX) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55 }}
          className="space-y-4"
        >
          <div className="max-w-[680px]">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1A1A] dark:text-white mb-2">
              What I observed
            </h2>
            <p className="text-sm text-[#5A5A5A] dark:text-[#A09E9A]">
              Working hands-on through these examples revealed several counter-intuitive patterns that generic scores tend to hide:
            </p>
          </div>

          {/* The required Observations callout box with 3 first-person bullets */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-lg border max-w-[760px] shadow-sm ${
              isDark 
                ? 'bg-[#181A1E] border-emerald-500/30' 
                : 'bg-emerald-50/40 border-emerald-600/20'
            }`}
          >
            <span className="font-mono text-xs text-[#0F5132] dark:text-[#34D399] uppercase tracking-wider block mb-3 font-semibold">
              Observations Callout
            </span>
            <ul className="space-y-3 text-sm text-[#1A1A1A] dark:text-[#E2E1DD] leading-relaxed">
              {project.whatIObservedBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#0F5132] dark:text-[#34D399] font-mono mt-0.5">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.section>

        {/* Section 4: What I'd recommend */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55 }}
          className="max-w-[680px]"
        >
          <h2 className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1A1A] dark:text-white mb-3">
            What I'd recommend
          </h2>
          <ul className="space-y-3 text-sm text-[#3A3A3A] dark:text-[#D0CECA] leading-relaxed">
            {project.whatIRecommendText.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-[#0F5132] dark:text-[#34D399] font-mono mt-0.5">✓</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Section 5: What I'd do differently */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55 }}
          className="max-w-[680px]"
        >
          <h2 className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1A1A] dark:text-white mb-3">
            What I'd do differently next time
          </h2>
          <ul className="space-y-3 text-sm text-[#3A3A3A] dark:text-[#D0CECA] leading-relaxed">
            {project.whatIDoDifferentlyText.map((diff, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-[#6E6D6B] dark:text-[#9A9894] font-mono mt-0.5">→</span>
                <span>{diff}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* 4. Image Gallery (with captions, lazy loading & Lightbox) */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="pt-8 border-t border-black/8 dark:border-white/8"
        >
          <div className="mb-6">
            <span className="font-mono text-xs text-[#0F5132] dark:text-[#34D399] uppercase tracking-wider">
              Project Artifacts
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1A1A] dark:text-white mt-1">
              Image Gallery & Screenshots ({project.galleryImages.length} images)
            </h2>
            <p className="text-xs text-[#6E6D6B] dark:text-[#9A9894] font-mono mt-1">
              Click any image to open the full-screen lightbox with captions and keyboard controls.
            </p>
          </div>

          {/* Grid of gallery images with staggered entrance & LazyImage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.galleryImages.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                onClick={() => openLightboxAt(idx + 1)}
                className={`group cursor-pointer rounded-lg border overflow-hidden p-4 flex flex-col justify-between transition-all shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-[#181A1E] border-white/10 hover:border-white/25'
                    : 'bg-white border-black/8 hover:border-black/20'
                }`}
              >
                {/* Image container */}
                <div className="relative aspect-[16/10] bg-[#EAE8E3] dark:bg-[#202227] rounded-md overflow-hidden flex flex-col items-center justify-center text-center">
                  <LazyImage
                    src={img.imageUrl}
                    alt={img.alt}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 right-2 font-mono text-[10px] text-white/90 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Zoom
                  </div>
                </div>

                {/* Caption */}
                <div className="mt-3 text-xs text-[#4A4A4A] dark:text-[#C5C3BF] leading-relaxed">
                  <p>{img.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Mandatory Project Note */}
        <div className="p-4 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/8 dark:border-white/8 text-xs text-[#6E6D6B] dark:text-[#9A9894] italic font-sans max-w-[680px]">
          Personal project built with public tools and everyday scenarios. Screenshots are my own and credited to their apps.
        </div>

        {/* Previous / Next Project Navigation at bottom */}
        <div className="pt-8 border-t border-black/8 dark:border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <motion.button
            whileHover={{ x: -3 }}
            onClick={() => onSelectProject(prevProject)}
            className="flex items-center gap-2 text-[#5A5A5A] dark:text-[#9A9894] hover:text-[#0F5132] dark:hover:text-[#34D399] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <div className="text-left">
              <span className="text-[10px] block text-[#6E6D6B] dark:text-[#9A9894]">Previous Project</span>
              <span className="font-medium text-[#1A1A1A] dark:text-white">{prevProject.title}</span>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ x: 3 }}
            onClick={() => onSelectProject(nextProject)}
            className="flex items-center gap-2 text-[#5A5A5A] dark:text-[#9A9894] hover:text-[#0F5132] dark:hover:text-[#34D399] transition-colors cursor-pointer group text-right"
          >
            <div className="text-right">
              <span className="text-[10px] block text-[#6E6D6B] dark:text-[#9A9894]">Next Project</span>
              <span className="font-medium text-[#1A1A1A] dark:text-white">{nextProject.title}</span>
            </div>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Lightbox
        images={allImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % allImages.length)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length)}
      />
    </div>
  );
};
