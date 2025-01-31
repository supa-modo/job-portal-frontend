export const jobData = {
  id: "job-123",
  title: "Senior Public Relations Officer",
  department: "Engineering",
  location: "Nairobi, Kenya",
  type: "Full-time",
  salary: "KES 120,000 - KES 160,000",
  experience: "5+ years",
  postedDate: "2023-10-01",
  status: "Active",
  contactPerson: {
    name: "John Doe",
    email: "sarah.j@company.com",
    phone: "(555) 123-4567",
    position: "HR Manager",
  },
  description: "We are seeking a skilled Senior Frontend Developer...",
  requirements: [
    "5+ years of experience with React",
    "Strong understanding of modern JavaScript",
    "Experience with state management solutions",
    "Bachelor's degree in Computer Science or related field",
  ],
  benefits: [
    "Competitive salary",
    "Health insurance",
    "401(k) matching",
    "Flexible work hours",
  ],
  scoreCard: {
    technicalSkills: [
      { skill: "React", weight: 25, requiredScore: 8 },
      { skill: "JavaScript", weight: 20, requiredScore: 8 },
      { skill: "CSS/HTML", weight: 15, requiredScore: 7 },
      { skill: "System Design", weight: 20, requiredScore: 7 },
      { skill: "Testing", weight: 10, requiredScore: 6 },
    ],
    softSkills: [
      { skill: "Communication", weight: 20, requiredScore: 7 },
      { skill: "Team Collaboration", weight: 15, requiredScore: 7 },
      { skill: "Problem Solving", weight: 15, requiredScore: 8 },
    ],
  },
  automations: [
    {
      id: 1,
      name: "Initial Screening",
      type: "Email",
      trigger: "On Application Submit",
      status: "Active",
      actions: ["Send welcome email", "Schedule initial screening"],
    },
    {
      id: 2,
      name: "Technical Assessment",
      type: "Integration",
      trigger: "After Initial Screening",
      status: "Active",
      actions: ["Send coding challenge", "Review submission"],
    },
  ],
  applicationForm: {
    sections: [
      {
        title: "Personal Information",
        fields: [
          { type: "text", label: "Full Name", required: true },
          { type: "email", label: "Email", required: true },
          { type: "phone", label: "Phone Number", required: true },
        ],
      },
      {
        title: "Professional Information",
        fields: [
          { type: "text", label: "Current Company" },
          { type: "number", label: "Years of Experience", required: true },
          { type: "file", label: "Resume", required: true },
        ],
      },
    ],
  },
  activity: [
    {
      id: 1,
      type: "status_change",
      description: "Job posting status changed to Active",
      user: "Sarah Johnson",
      timestamp: "2023-10-01T09:00:00Z",
    },
    {
      id: 2,
      type: "candidate_application",
      description: "New application received from Randy Dibbert",
      user: "System",
      timestamp: "2023-10-02T14:30:00Z",
    },
  ],
  candidates: [
    {
      id: 11,
      name: "Randy Dibbert",
      email: "randy.d@email.com",
      phone: "(555) 234-5678",
      status: "Interview Scheduled",
      stage: "Technical Round",
      appliedDate: "2023-10-02",
      experience: "7 years",
      currentCompany: "Tech Corp",
      avatar: "/api/placeholder/32/32",
    },
    {
      id: 1,
      name: "Randy Dibbert",
      email: "randy.d@email.com",
      phone: "(555) 234-5678",
      status: "Interview Scheduled",
      stage: "Technical Round",
      appliedDate: "2023-10-02",
      experience: "7 years",
      currentCompany: "Tech Corp",
      avatar: "/api/placeholder/32/32",
    },
    {
      id: 12,
      name: "Randy Dibbert",
      email: "randy.d@email.com",
      phone: "(555) 234-5678",
      status: "Interview Scheduled",
      stage: "Technical Round",
      appliedDate: "2023-10-02",
      experience: "7 years",
      currentCompany: "Tech Corp",
      avatar: "/api/placeholder/32/32",
    },
    {
      id: 13,
      name: "Randy Dibbert",
      email: "randy.d@email.com",
      phone: "(555) 234-5678",
      status: "Interview Scheduled",
      stage: "Technical Round",
      appliedDate: "2023-10-02",
      experience: "7 years",
      currentCompany: "Tech Corp",
      avatar: "/api/placeholder/32/32",
    },
  ],
  interviews: [
    {
      id: 1,
      candidate: "Randy Dibbert",
      avatar: "/api/placeholder/32/32",
      type: "Stage 3 Interview - Live design",
      time: "10:00am - 11:30am",
      day: "Monday",
      location: "online",
      color: "bg-blue-100",
    },
    {
      id: 2,
      candidate: "Cameron Dickens",
      avatar: "/api/placeholder/32/32",
      type: "First Stage Interview",
      time: "09:45am - 10:45am",
      day: "Wednesday",
      location: "main-lobby",
      color: "bg-blue-100",
    },
    {
      id: 3,
      candidate: "Kristi Sipes",
      avatar: "/api/placeholder/32/32",
      type: "Technical Assessment",
      time: "08:00am - 09:00am",
      day: "Wednesday",
      location: "main-lobby",
      color: "bg-blue-100",
    },
    {
      id: 4,
      candidate: "Isadora Martinez",
      avatar: "/api/placeholder/32/32",
      type: "First Stage Interview - Psychological testing",
      time: "09:45am - 10:45am",
      day: "Tuesday",
      location: "online",
      color: "bg-yellow-100",
    },
    {
      id: 5,
      candidate: "Brooklyn Simmons",
      avatar: "/api/placeholder/32/32",
      type: "Technical Interview",
      time: "09:45am - 10:45am",
      day: "Thursday",
      location: "online",
      color: "bg-blue-100",
    },
  ],
};
