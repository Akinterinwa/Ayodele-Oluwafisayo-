/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { profileContent, projectsData, skillsData } from './data/portfolioContent';
import { UserProfileData, ProjectDetailData } from './types/portfolio';
import { Navigation } from './components/Navigation';
import { HomeHero, HomeAbout, HomeWork, HomeSkills } from './components/HomeSections';
import { ProjectDetail } from './components/ProjectDetail';
import { Footer } from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';

interface AppContentProps {
  profile: UserProfileData;
  activeProjectSlug: string | null;
  activeProject: ProjectDetailData | null | undefined;
  handleBackToWork: () => void;
  handleSelectProject: (p: ProjectDetailData) => void;
  scrollToWork: () => void;
  scrollToContact: () => void;
}

const AppContent: React.FC<AppContentProps> = ({
  profile,
  activeProjectSlug,
  activeProject,
  handleBackToWork,
  handleSelectProject,
  scrollToWork,
  scrollToContact,
}) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        isDark ? 'dark bg-[#121316] text-[#EDEDEC]' : 'bg-[#FAF8F5] text-[#1A1A1A]'
      } transition-colors duration-250 flex flex-col font-sans selection:bg-[#0F5132]/20 selection:text-[#0F5132] dark:selection:bg-[#34D399]/20 dark:selection:text-[#34D399]`}
    >
      {/* Navigation */}
      <Navigation
        siteName={profile.fullName}
        isProjectPage={Boolean(activeProject)}
        onBackToWork={handleBackToWork}
      />

      {/* Main Body with Page Fade Transition */}
      <AnimatePresence mode="wait">
        <motion.main
          key={activeProjectSlug || 'home'}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1"
        >
          {activeProject ? (
            <ProjectDetail
              project={activeProject}
              allProjects={projectsData}
              onBackToWork={handleBackToWork}
              onSelectProject={handleSelectProject}
            />
          ) : (
            <>
              <HomeHero
                profile={profile}
                onSeeWork={scrollToWork}
                onContact={scrollToContact}
              />
              <HomeAbout profile={profile} />
              <HomeWork
                projects={projectsData}
                onSelectProject={handleSelectProject}
              />
              <HomeSkills skills={skillsData} />
            </>
          )}
        </motion.main>
      </AnimatePresence>

      {/* Footer */}
      <Footer profile={profile} />
    </div>
  );
};

export default function App() {
  const [profile] = useState<UserProfileData>(profileContent);

  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(() => {
    try {
      const path = window.location.pathname;
      const hash = window.location.hash;
      
      // Match /projects/:slug or #/projects/:slug
      const pathMatch = path.match(/\/projects\/([a-z0-9-]+)/);
      if (pathMatch) return pathMatch[1];

      const hashMatch = hash.match(/#\/projects\/([a-z0-9-]+)/);
      if (hashMatch) return hashMatch[1];
    } catch {
      // ignore
    }
    return null;
  });

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const pathMatch = path.match(/\/projects\/([a-z0-9-]+)/);
      const hashMatch = hash.match(/#\/projects\/([a-z0-9-]+)/);

      if (pathMatch) {
        setActiveProjectSlug(pathMatch[1]);
      } else if (hashMatch) {
        setActiveProjectSlug(hashMatch[1]);
      } else {
        setActiveProjectSlug(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document title dynamically based on active page
  useEffect(() => {
    if (activeProjectSlug) {
      const project = projectsData.find((p) => p.slug === activeProjectSlug);
      if (project) {
        document.title = `${project.title} | ${profile.fullName}`;
        window.scrollTo(0, 0);
        return;
      }
    }
    document.title = `${profile.fullName} | AI Evaluation, CX & Operations Portfolio`;
  }, [activeProjectSlug, profile.fullName]);

  const handleSelectProject = (project: ProjectDetailData) => {
    setActiveProjectSlug(project.slug);
    try {
      window.history.pushState(null, '', `/projects/${project.slug}`);
    } catch {
      window.location.hash = `/projects/${project.slug}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToWork = () => {
    setActiveProjectSlug(null);
    try {
      window.history.pushState(null, '', '/');
    } catch {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToWork = () => {
    if (activeProjectSlug) {
      handleBackToWork();
      setTimeout(() => {
        const el = document.getElementById('work');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const activeProject = activeProjectSlug
    ? projectsData.find((p) => p.slug === activeProjectSlug)
    : null;

  return (
    <ThemeProvider>
      <AppContent
        profile={profile}
        activeProjectSlug={activeProjectSlug}
        activeProject={activeProject}
        handleBackToWork={handleBackToWork}
        handleSelectProject={handleSelectProject}
        scrollToWork={scrollToWork}
        scrollToContact={scrollToContact}
      />
    </ThemeProvider>
  );
}
