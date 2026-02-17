export interface Brand {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  logo: string;
  social: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
}
