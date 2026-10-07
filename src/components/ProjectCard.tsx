import React from 'react';
import { ProjectDetailData } from '../types/portfolio';
import { ArrowUpRight, Image as ImageIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';
import { LazyImage } from './LazyImage';

interface ProjectCardProps {
  project: ProjectDetailData;
  onSelect: (project: ProjectDetailData) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const { isDark } = useTheme();

  return (
    <motion.article
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View case study: ${project.title}`}
      className={`group cursor-pointer rounded-xl border transition-all duration-300 flex flex-col justify-between overflow-hidden focus-visible:outline-2 focus-visible:outline-[#0F5132] shadow-sm hover:shadow-md ${
        isDark
          ? 'bg-[#181A1E] border-white/10 hover:border-white/25'
          : 'bg-white border-black/8 hover:border-black/20'
      }`}
    >
      <div>
        {/* Cover Image container (16:10) with Lazy Loading & Animation */}
        <div className="relative w-full aspect-[16/10] bg-[#EAE8E3] dark:bg-[#202227] overflow-hidden border-b border-black/5 dark:border-white/5">
          <LazyImage
            src={project.coverImage.imageUrl}
            alt={project.coverImage.alt}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </div>

        {/* Content details */}
        <div className="p-6">
          {/* Top metadata line */}
          <div className="flex items-center justify-between text-xs font-mono text-[#6E6D6B] dark:text-[#9A9894] mb-2.5">
            <span className="font-semibold text-[#0F5132] dark:text-[#34D399]">
              Project {project.number}
            </span>
            <span>{project.typeLabel}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1A1A] dark:text-white group-hover:text-[#0F5132] dark:group-hover:text-[#34D399] transition-colors leading-snug">
            {project.title}
          </h3>

          {/* One-line summary */}
          <p className="mt-2 text-sm text-[#5A5A5A] dark:text-[#A09E9A] leading-relaxed">
            {project.oneLineSummary}
          </p>

          {/* 3 small tags */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-[#5A5A5A] dark:text-[#A09E9A]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer "View case study" link */}
      <div className="px-6 py-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-mono">
        <span className="text-[#6E6D6B] dark:text-[#9A9894]">
          {project.timeSpent}
        </span>
        <span className="font-medium text-[#0F5132] dark:text-[#34D399] flex items-center gap-1 group-hover:underline">
          <span>View case study</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </motion.article>
  );
};
