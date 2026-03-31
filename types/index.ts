export interface Expert {
  id: string;
  slug: string;
  name: string;
  title: string;
  city: string;
  district: string;
  image: string;
  shortBio: string;
  services: string[];
  sessionFee: string;
  sessionType: ("Yüz Yüze" | "Online")[];
  experience: string;
  phone: string;
  appointmentUrl: string;
  featured: boolean;
}

export interface Service {
  slug: string;
  name: string;
  icon: string;
  shortDescription: string;
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
}
