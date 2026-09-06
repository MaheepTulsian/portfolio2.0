export interface Location {
  institution: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface Contact {
  phone: string;
  email: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export interface Personal {
  name: string;
  title: string;
  location: Location;
  contact: Contact;
}

export interface Duration {
  start: string;
  end: string;
}

export interface Education {
  degree: string;
  specialization: string;
  university: string;
  location: string;
  duration: Duration;
  cgpa: number;
  sgpa_6th_sem: number;
  achievements: string[];
}

export interface WorkExperience {
  title: string;
  company: string;
  duration: Duration;
  technologies: string[];
  responsibilities: string[];
  impact?: Record<string, string>;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  github?: string;
  link?: string;
  features: string[];
  impact?: Record<string, string>;
  awards?: string[];
  category: string;
  performance?: Record<string, string>;
}

export interface Skills {
  programming_languages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  devops_cloud: string[];
  ai_ml: string[];
  blockchain: string[];
  tools: string[];
}

export interface VolunteeringRole {
  role: string;
  organization: string;
  responsibilities?: string[];
  focus?: string;
}

export interface Achievement {
  title: string;
  project?: string;
  description?: string;
  events?: string[];
}

export interface PortfolioData {
  personal: Personal;
  education: Education;
  work_experience: WorkExperience[];
  projects: Project[];
  skills: Skills;
  volunteering_leadership: VolunteeringRole[];
  achievements: Achievement[];
  interests: string[];
  project_categories: Record<string, string[]>;
  technical_highlights: string[];
}

export interface NavItem {
  name: string;
  href: string;
}

export const navigation: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
];
