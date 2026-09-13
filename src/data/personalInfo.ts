export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  bio: string;
  socials: {
    github?: string;
    linkedin?: string;
    behance?: string;
    twitter?: string;
  };
}

export const personalInfo: PersonalInfo = {
  name: "Ibraheem Olawale Oladepo",
  role: "UI/UX Designer & Frontend Builder",
  location: "Ibadan, Nigeria",
  email: "ibraheemolawale10@gmail.com",
  phone: "+2348161329340",
  bio: "UI/UX Designer with over 2 years of experience crafting user-centered digital products, visual brand identities, and production-ready React web applications.",
  socials: {
    github: "https://github.com/Youngee2024",
    linkedin: "https://linkedin.com/in/ibraheem-oladepo-42bb91328/",
    behance: "https://behance.net/mribraheemoladepo",
    twitter: "https://x.com/IbraheemWale15",
  },
};
