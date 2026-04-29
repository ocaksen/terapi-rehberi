export interface Education {
  degree: string;
  school: string;
  year?: string;
}

export interface Expert {
  id: string;
  slug: string;
  name: string;
  title: string;
  profession?: string;
  city: string;
  district: string;
  image: string;
  shortBio: string;
  longBio?: string[];
  services: string[];
  sessionFee: string | null;
  sessionType: ("Yüz Yüze" | "Online")[];
  experience: string | null;
  phone: string | null;
  appointmentUrl: string | null;
  featured: boolean;
  education?: Education[];
  certifications?: string[];
  languages?: string[];
  officeAddress?: string;
  approaches?: string[];
  videoUrl?: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  name: string;
  icon: string;
  shortDescription: string;
  longDescription?: string;
  faqs?: ServiceFaq[];
}

export interface City {
  slug: string;
  name: string;
  region: string;
  active: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  image?: string;
  author?: string;
}

export interface TestOption {
  text: string;
  value: number;
}

export interface TestQuestion {
  id: number;
  text: string;
  reverse?: boolean;
}

export interface ScoreRange {
  min: number;
  max: number;
  level: string;
  color: string;
  description: string;
}

export interface SoruCevap {
  id: string;
  category: "psikolog" | "cocuk" | "ergen" | "aile";
  soru: string;
  cevap: string;
  uzman: string;
  tarih: string;
  begeni: number;
}

export interface PsychTest {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon?: string;
  scale?: string;
  category?: string;
  color: string;
  bg: string;
  questionCount: number;
  estimatedMinutes: number;
  instruction: string;
  options: TestOption[];
  questions: TestQuestion[];
  scoring: ScoreRange[];
}
