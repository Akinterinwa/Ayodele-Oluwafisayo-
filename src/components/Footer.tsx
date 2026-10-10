import React from 'react';
import { UserProfileData } from '../types/portfolio';
import { Mail, Linkedin, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  profile: UserProfileData;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      id="contact"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-black/8 dark:border-white/8 pt-16 pb-12 bg-black/[0.01] dark:bg-white/[0.01]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-12 border-b border-black/8 dark:border-white/8">
          {/* Left: Contact prompt */}
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#0F5132] dark:text-[#34D399] uppercase tracking-wider">
              Get in Touch
            </span>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#1A1A1A] dark:text-white"
            >
              Let's connect.
            </motion.h3>
            <p className="text-sm text-[#5A5A5A] dark:text-[#A09E9A] leading-relaxed max-w-md">
              I'm actively seeking career opportunities in AI Training, AI Data Evaluation, Project & Customer Experience, Quality Review, and Operations. If you have an open role or feedback on my work, I'd love to hear from you.
            </p>
          </div>

          {/* Right: Direct links */}
          <div className="flex flex-col justify-center space-y-3 font-mono text-xs">
            <motion.a
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2.5 p-3 rounded-lg border border-black/8 dark:border-white/10 hover:border-[#0F5132] dark:hover:border-[#34D399] transition-colors text-[#1A1A1A] dark:text-white shadow-sm"
            >
              <Mail className="w-4 h-4 text-[#0F5132] dark:text-[#34D399]" />
              <span>{profile.email}</span>
            </motion.a>

            <motion.a
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-3 rounded-lg border border-black/8 dark:border-white/10 hover:border-[#0F5132] dark:hover:border-[#34D399] transition-colors text-[#1A1A1A] dark:text-white shadow-sm"
            >
              <Linkedin className="w-4 h-4 text-[#0F5132] dark:text-[#34D399]" />
              <span>LinkedIn Profile</span>
            </motion.a>
          </div>
        </div>

        {/* Bottom copyright & scroll to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6E6D6B] dark:text-[#9A9894]">
          <div>
            © {new Date().getFullYear()} {profile.fullName}.
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#1A1A1A] dark:hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </motion.footer>
  );
};
