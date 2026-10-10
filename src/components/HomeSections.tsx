import React, { useState, useRef } from 'react';
import { UserProfileData, ProjectDetailData, SkillCategory } from '../types/portfolio';
import { ProjectCard } from './ProjectCard';
import { ArrowDown, Download, Mail, MapPin, GraduationCap, Camera, RotateCcw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';
import { LazyImage } from './LazyImage';

/* ==========================================================================
   1. HOME HERO SECTION
   ========================================================================== */
interface HomeHeroProps {
  profile: UserProfileData;
  onSeeWork: () => void;
  onContact: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ profile, onSeeWork, onContact }) => {
  const { isDark } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Local override if user uploads their own photo
  const [customPhoto, setCustomPhoto] = useState<string | null>(() => {
    try {
      return localStorage.getItem('ayodele_custom_profile_photo');
    } catch {
      return null;
    }
  });

  const activePhoto = customPhoto || profile.profilePicture;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCustomPhoto(result);
        try {
          localStorage.setItem('ayodele_custom_profile_photo', result);
        } catch (err) {
          console.warn('LocalStorage quota exceeded or unavailable', err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomPhoto(null);
    try {
      localStorage.removeItem('ayodele_custom_profile_photo');
    } catch {
      // ignore
    }
  };

  return (
    <motion.section
      id="top"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-12 pb-16 md:pt-20 md:pb-24 border-b border-black/8 dark:border-white/8 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Meta row: Name & location */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#6E6D6B] dark:text-[#9A9894]"
            >
              <span className="font-semibold text-[#0F5132] dark:text-[#34D399] uppercase tracking-wider">
                {profile.fullName}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#6E6D6B] dark:text-[#9A9894]" />
                {profile.location}
              </span>
            </motion.div>

            {/* Positioning line Header */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1A1A1A] dark:text-white leading-[1.18] max-w-[620px]"
            >
              {profile.positioningLine}
            </motion.h1>

            {/* 2-sentence intro */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base text-[#4A4A4A] dark:text-[#B0AEA9] leading-relaxed max-w-[580px]"
            >
              {profile.introSentences}
            </motion.p>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="pt-2 flex flex-wrap items-center gap-4 font-mono text-xs"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSeeWork}
                className="flex items-center gap-2 px-5 py-2.5 rounded bg-[#0F5132] hover:bg-[#0A3622] dark:bg-[#34D399] dark:hover:bg-[#2DD4BF] text-white dark:text-[#121316] font-medium transition-colors cursor-pointer shadow-sm"
              >
                <span>See my work</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onContact}
                className="flex items-center gap-2 px-5 py-2.5 rounded border border-black/15 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30 text-[#1A1A1A] dark:text-white transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[#0F5132] dark:text-[#34D399]" />
                <span>Contact me</span>
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="/cv.pdf"
                download="Oluwafisayo-Ayodele-CV.pdf"
                className="flex items-center gap-2 px-5 py-2.5 rounded border border-black/15 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30 text-[#1A1A1A] dark:text-white transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#0F5132] dark:text-[#34D399]" />
                <span>Download CV</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: Ayodele's Professional Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[340px]">
              {/* Portrait image frame */}
              <div className="group relative aspect-square rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xl bg-black/5 dark:bg-white/5">
                <LazyImage
                  src={activePhoto}
                  alt={`${profile.fullName} professional portrait`}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={true}
                />

                {/* Subtle gradient scrim at the bottom */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />

                {/* Status indicator badge on portrait */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white pointer-events-auto">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Open to roles</span>
                  </div>

                  <span className="text-[10px] text-white/80 uppercase tracking-wider font-medium">
                    {profile.location}
                  </span>
                </div>

                {/* Overlay upload / swap photo trigger */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    aria-label="Upload custom profile photo"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    title="Upload or change profile picture"
                    className="p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs border border-white/20 transition-transform hover:scale-105 cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                  {customPhoto && (
                    <button
                      onClick={handleResetPhoto}
                      title="Reset to default picture"
                      className="p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs border border-white/20 transition-transform hover:scale-105 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Caption beneath portrait */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-2.5 flex items-center justify-between font-mono text-[11px] text-[#6E6D6B] dark:text-[#9A9894] px-1"
              >
                <span>{profile.fullName}</span>
                <span className="text-[10px] text-[#0F5132] dark:text-[#34D399] font-medium">AI Trainer</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

/* ==========================================================================
   2. ABOUT SECTION (3 short paragraphs, max text width ~680px)
   ========================================================================== */
interface HomeAboutProps {
  profile: UserProfileData;
}

export const HomeAbout: React.FC<HomeAboutProps> = ({ profile }) => {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-16 md:py-24 border-b border-black/8 dark:border-white/8"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="max-w-[680px]">
          <span className="font-mono text-xs text-[#0F5132] dark:text-[#34D399] uppercase tracking-wider block mb-2">
            About Me
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#1A1A1A] dark:text-white mb-6"
          >
            How I approach evaluation and quality.
          </motion.h2>

          <div className="space-y-4 text-sm sm:text-base text-[#3A3A3A] dark:text-[#D0CECA] leading-relaxed">
            {profile.aboutParagraphs.map((p, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + idx * 0.1 }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-8 pt-4 border-t border-black/8 dark:border-white/8 flex items-center gap-2 text-xs font-mono text-[#6E6D6B] dark:text-[#9A9894]"
          >
            <GraduationCap className="w-4 h-4 text-[#0F5132] dark:text-[#34D399]" />
            <span>{profile.educationLine}</span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

/* ==========================================================================
   3. WORK SECTION (2x2 Grid of large project cards with staggered animation)
   ========================================================================== */
interface HomeWorkProps {
  projects: ProjectDetailData[];
  onSelectProject: (p: ProjectDetailData) => void;
}

export const HomeWork: React.FC<HomeWorkProps> = ({ projects, onSelectProject }) => {
  const [projectFilter, setProjectFilter] = useState<'all' | 'ai' | 'operations'>('all');
  const aiProjects = projects.filter((project) => project.chartType === 'ai-eval' || project.chartType === 'rubric');
  const operationsProjects = projects.filter((project) => project.chartType === 'cx-teardown' || project.chartType === 'process-improvement');
  const visibleProjects = projectFilter === 'ai'
    ? aiProjects
    : projectFilter === 'operations'
      ? operationsProjects
      : projects;

  return (
    <motion.section
      id="work"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-16 md:py-24 border-b border-black/8 dark:border-white/8"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="max-w-[680px] mb-12">
          <span className="font-mono text-xs text-[#0F5132] dark:text-[#34D399] uppercase tracking-wider block mb-2">
            Selected Work
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#1A1A1A] dark:text-white"
          >
            Four self-directed case studies.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-2 text-sm text-[#5A5A5A] dark:text-[#A09E9A] leading-relaxed"
          >
            I designed and executed each of these projects independently using publicly accessible tools, realistic prompt benchmarks, and hands-on UX teardowns.
          </motion.p>
        </div>

        <div className="mb-6">
          <div
            className="inline-flex flex-wrap items-center gap-1 rounded border border-black/10 dark:border-white/10 p-1"
            role="group"
            aria-label="Filter projects"
          >
            {[
              { id: 'all', label: 'All', count: projects.length },
              { id: 'ai', label: 'AI projects', count: aiProjects.length },
              { id: 'operations', label: 'Operations', count: operationsProjects.length },
            ].map((filter) => (
              <button
                key={filter.id}
                type="button"
                aria-pressed={projectFilter === filter.id}
                onClick={() => setProjectFilter(filter.id as 'all' | 'ai' | 'operations')}
                className={`flex items-center gap-2 rounded px-3 py-2 font-mono text-xs transition-colors ${
                  projectFilter === filter.id
                    ? 'bg-[#0F5132] text-white dark:bg-[#34D399] dark:text-[#121316]'
                    : 'text-[#5A5A5A] hover:bg-black/5 dark:text-[#B0AEA9] dark:hover:bg-white/5'
                }`}
              >
                <span>{filter.label}</span>
                <span className="opacity-70">{filter.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Project cards filtered by category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {visibleProjects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={proj} onSelect={onSelectProject} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

/* ==========================================================================
   4. SKILLS SECTION (Grouped categories with sequential stagger)
   ========================================================================== */
interface HomeSkillsProps {
  skills: SkillCategory[];
}

export const HomeSkills: React.FC<HomeSkillsProps> = ({ skills }) => {
  const { isDark } = useTheme();

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-16 md:py-24 border-b border-black/8 dark:border-white/8"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="max-w-[680px] mb-12">
          <span className="font-mono text-xs text-[#0F5132] dark:text-[#34D399] uppercase tracking-wider block mb-2">
            Capabilities
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#1A1A1A] dark:text-white"
          >
            Skills & Working Tools
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-2 text-sm text-[#5A5A5A] dark:text-[#A09E9A] leading-relaxed"
          >
            The methodologies, frameworks, and instruments I rely on to test systems, design rubrics, and map user processes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`p-5 rounded-lg border transition-colors ${
                isDark ? 'bg-[#181A1E] border-white/8 hover:border-white/20' : 'bg-white border-black/8 hover:border-black/20'
              }`}
            >
              <h3 className="font-mono text-xs font-semibold text-[#0F5132] dark:text-[#34D399] uppercase tracking-wider mb-4 pb-2 border-b border-black/5 dark:border-white/5">
                {category.title}
              </h3>
              <ul className="space-y-2.5 text-xs text-[#3A3A3A] dark:text-[#D0CECA] leading-relaxed">
                {category.skills.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#6E6D6B] dark:text-[#9A9894] font-mono mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
