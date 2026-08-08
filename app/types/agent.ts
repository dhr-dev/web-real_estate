export interface Agent {
  id: string;
  name: string;
  role: string;
  agency: string;
  avatar: string;
  phone: string;
  email: string;
  rating: number;
  reviewsCount: number;
  propertiesCount: number;
  bio: string;
  specialization: string[];
  location: string;
  experienceYears: number;
}
