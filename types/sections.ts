export interface Service {
  id: string;
  icon: React.ReactNode;
  titleEn: string;
  titleNe: string;
  descEn: string;
  descNe: string;
  price: number;
  gradient: string;
}

export interface Testimonial {
  nameEn: string;
  nameNe: string;
  textEn: string;
  textNe: string;
  rating: number;
}

export interface LanguageContextType {
  currentLanguage: string;
  t: (key: string) => string;
}

export interface HeroSectionProps {
  currentLanguage: string;
}

export interface ServicesSectionProps {
  currentLanguage: string;
  services: Service[];
}

export interface AboutSectionProps {
  currentLanguage: string;
  t: (key: string) => string;
}

export interface TestimonialsSectionProps {
  currentLanguage: string;
  t: (key: string) => string;
  testimonials: Testimonial[];
}

export interface CTASectionProps {
  currentLanguage: string;
}
