export interface GalleryImage {
  id: string;
  filename: string;
  folder: string;
  recommendedSize: string;
  aspectRatio: string;
  alt: string;
  caption: string;
  type: 'chart' | 'screenshot' | 'diagram' | 'rubric';
  imageUrl?: string;
}

export interface ProjectDetailData {
  id: string;
  slug: string;
  number: string;
  title: string;
  oneLineSummary: string;
  tags: string[];
  typeLabel: string;
  toolsUsed: string[];
  timeSpent: string;
  
  // Section texts
  contextText: string;
  whatIDidText: string[];
  whatIObservedBullets: string[];
  whatIRecommendText: string[];
  whatIDoDifferentlyText: string[];
  
  // Key results strip (3 large numbers/placeholders)
  keyResults: {
    stat: string;
    label: string;
    context: string;
  }[];

  // Specific diagrams to render inline
  chartType: 'ai-eval' | 'rubric' | 'cx-teardown' | 'process-improvement';

  // Images for gallery
  coverImage: GalleryImage;
  galleryImages: GalleryImage[];
}

export interface UserProfileData {
  fullName: string;
  location: string;
  positioningLine: string;
  introSentences: string;
  educationLine: string;
  aboutParagraphs: string[];
  email: string;
  linkedin: string;
  github?: string;
  profilePicture?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}
