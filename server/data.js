// Mock Data for Job Portal

const categories = [
  {
    id: 1,
    name: "Technology",
    description: "IT, Software Development, and Tech roles",
    icon: "💻"
  },
  {
    id: 2,
    name: "Design",
    description: "UI/UX, Graphic Design, and Creative roles",
    icon: "🎨"
  },
  {
    id: 3,
    name: "Marketing",
    description: "Digital Marketing, SEO, and Advertising",
    icon: "📊"
  },
  {
    id: 4,
    name: "Sales",
    description: "Sales, Business Development, and Account Management",
    icon: "💼"
  },
  {
    id: 5,
    name: "Finance",
    description: "Accounting, Finance, and Investment roles",
    icon: "💰"
  },
  {
    id: 6,
    name: "Healthcare",
    description: "Medical, Nursing, and Healthcare roles",
    icon: "🏥"
  }
];

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    category: 1,
    location: "San Francisco, CA",
    salary: "$120,000 - $150,000",
    type: "Full-time",
    experience: "5+ years",
    description: "We are looking for an experienced Frontend Developer to join our growing team. You will work on modern web applications using React and TypeScript.",
    requirements: [
      "5+ years of experience with React",
      "Strong knowledge of TypeScript",
      "Experience with REST APIs",
      "Excellent communication skills"
    ],
    postedDate: "2025-12-15",
    deadline: "2026-01-15",
    applicants: 24,
    userId: 1
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "Creative Studios",
    category: 2,
    location: "New York, NY",
    salary: "$80,000 - $110,000",
    type: "Full-time",
    experience: "3+ years",
    description: "Join our design team to create beautiful and intuitive user interfaces for web and mobile applications.",
    requirements: [
      "3+ years of UX/UI design experience",
      "Proficiency in Figma or Adobe XD",
      "Strong portfolio with case studies",
      "Understanding of design principles and accessibility"
    ],
    postedDate: "2025-12-14",
    deadline: "2026-01-10",
    applicants: 18,
    userId: 2
  },
  {
    id: 3,
    title: "Digital Marketing Manager",
    company: "MarketingPro",
    category: 3,
    location: "Chicago, IL",
    salary: "$70,000 - $95,000",
    type: "Full-time",
    experience: "4+ years",
    description: "Lead our digital marketing strategy and manage campaigns across multiple channels. We're looking for a strategic thinker with proven results.",
    requirements: [
      "4+ years of digital marketing experience",
      "Expertise in SEO and SEM",
      "Strong analytical skills",
      "Experience with marketing automation tools"
    ],
    postedDate: "2025-12-13",
    deadline: "2026-01-05",
    applicants: 31,
    userId: 3
  },
  {
    id: 4,
    title: "Sales Executive",
    company: "Global Sales Ltd.",
    category: 4,
    location: "Remote",
    salary: "$60,000 - $90,000 + Commission",
    type: "Full-time",
    experience: "2+ years",
    description: "Drive revenue growth by selling our innovative software solutions to enterprise clients.",
    requirements: [
      "2+ years of B2B sales experience",
      "Strong negotiation skills",
      "CRM software proficiency",
      "Track record of exceeding targets"
    ],
    postedDate: "2025-12-12",
    deadline: "2025-12-30",
    applicants: 42,
    userId: 4
  },
  {
    id: 5,
    title: "Financial Analyst",
    company: "Finance Solutions Inc.",
    category: 5,
    location: "Boston, MA",
    salary: "$85,000 - $115,000",
    type: "Full-time",
    experience: "3+ years",
    description: "Analyze financial data, prepare reports, and provide insights to support business decisions.",
    requirements: [
      "3+ years of financial analysis experience",
      "Proficiency in Excel and SQL",
      "Knowledge of financial modeling",
      "CFA or relevant certification preferred"
    ],
    postedDate: "2025-12-10",
    deadline: "2026-01-02",
    applicants: 15,
    userId: 2
  },
  {
    id: 6,
    title: "Registered Nurse",
    company: "City Medical Center",
    category: 6,
    location: "Los Angeles, CA",
    salary: "$65,000 - $85,000",
    type: "Full-time",
    experience: "1+ years",
    description: "Join our patient care team in a dynamic hospital environment. We offer competitive benefits and professional development opportunities.",
    requirements: [
      "Active RN license",
      "1+ years of nursing experience",
      "BLS/CPR certification",
      "Strong patient care skills"
    ],
    postedDate: "2025-12-11",
    deadline: "2026-01-20",
    applicants: 8,
    userId: 5
  },
  {
    id: 7,
    title: "Backend Engineer",
    company: "TechCorp Inc.",
    category: 1,
    location: "San Francisco, CA",
    salary: "$130,000 - $160,000",
    type: "Full-time",
    experience: "6+ years",
    description: "Build scalable backend systems and APIs. Work with microservices, cloud technologies, and distributed systems.",
    requirements: [
      "6+ years of backend development experience",
      "Proficiency in Node.js or Python",
      "Experience with AWS or GCP",
      "Strong database design knowledge"
    ],
    postedDate: "2025-12-09",
    deadline: "2026-01-08",
    applicants: 19,
    userId: 1
  },
  {
    id: 8,
    title: "Graphic Designer",
    company: "Design Agency Pro",
    category: 2,
    location: "Austin, TX",
    salary: "$55,000 - $75,000",
    type: "Full-time",
    experience: "2+ years",
    description: "Create stunning visual content for print and digital media. Collaborate with clients and creative teams.",
    requirements: [
      "2+ years of graphic design experience",
      "Expertise in Adobe Creative Suite",
      "Strong portfolio",
      "Attention to detail"
    ],
    postedDate: "2025-12-08",
    deadline: "2026-01-05",
    applicants: 27,
    userId: 2
  }
];

const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@techcorp.com",
    role: "employer",
    company: "TechCorp Inc.",
    phone: "+1 (555) 123-4567",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    bio: "Hiring manager at TechCorp, passionate about building great teams.",
    joinDate: "2025-06-15",
    jobsPosted: 2,
    isVerified: true
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@creativestudios.com",
    role: "employer",
    company: "Creative Studios",
    phone: "+1 (555) 234-5678",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "Creative director and talent recruiter at Creative Studios.",
    joinDate: "2025-07-20",
    jobsPosted: 2,
    isVerified: true
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.chen@marketingpro.com",
    role: "employer",
    company: "MarketingPro",
    phone: "+1 (555) 345-6789",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    bio: "Head of recruitment at MarketingPro.",
    joinDate: "2025-08-10",
    jobsPosted: 1,
    isVerified: true
  },
  {
    id: 4,
    name: "David Williams",
    email: "david.williams@globalsales.com",
    role: "employer",
    company: "Global Sales Ltd.",
    phone: "+1 (555) 456-7890",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    bio: "Sales director and team lead.",
    joinDate: "2025-05-03",
    jobsPosted: 1,
    isVerified: true
  },
  {
    id: 5,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@medicalcenter.com",
    role: "employer",
    company: "City Medical Center",
    phone: "+1 (555) 567-8901",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    bio: "HR Manager at City Medical Center.",
    joinDate: "2025-09-12",
    jobsPosted: 1,
    isVerified: true
  },
  {
    id: 6,
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    role: "job_seeker",
    phone: "+1 (555) 678-9012",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    bio: "Experienced frontend developer looking for new opportunities.",
    joinDate: "2025-10-05",
    skills: ["React", "TypeScript", "JavaScript", "CSS", "REST APIs"],
    experience: "5 years",
    location: "San Francisco, CA",
    isVerified: false
  },
  {
    id: 7,
    name: "Jessica Davis",
    email: "jessica.davis@email.com",
    role: "job_seeker",
    phone: "+1 (555) 789-0123",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    bio: "UX/UI Designer with a passion for creating user-centered experiences.",
    joinDate: "2025-11-01",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Wireframing"],
    experience: "3 years",
    location: "New York, NY",
    isVerified: false
  },
  {
    id: 8,
    name: "Robert Martinez",
    email: "robert.martinez@email.com",
    role: "job_seeker",
    phone: "+1 (555) 890-1234",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    bio: "Backend engineer specializing in Node.js and cloud technologies.",
    joinDate: "2025-11-15",
    skills: ["Node.js", "Python", "AWS", "Docker", "Microservices", "SQL"],
    experience: "6 years",
    location: "Seattle, WA",
    isVerified: true
  }
];

// Export the mock data
module.exports = {
  categories,
  jobs,
  users
};
