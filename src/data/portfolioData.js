export const PORTFOLIO_DATA = {
  personal: {
    name: "Mohit Chaudhary",
    title: "A full Stack web Developer and an Ai Enthusiast",
    tagline: "Crafting digital experiences with modern web technologies & pixel-perfect precision.",
    location: "New Delhi, India",
    email: "radhechaudhary6398@gmail.com",
    github: "https://github.com/radhechaudhary",
    linkedin: "https://www.linkedin.com/in/radhe-chaudhary-5a0002272/",
    twitter: "https://x.com/radhe_2k4",
    bio: "Hello! I'm Mohit, a full-stack web developer and AI enthusiast. I love building cool web applications and exploring the latest in artificial intelligence. Currently, I'm diving deep into MERN stack, Next.js, and practical AI integrations. I enjoy solving real-world problems with modern technology and continuously learning new things. Let's build something amazing together!",
    welcomeMessage: "Welcome to my interactive macOS portfolio! Explore my work, journey, terminal, and apps just like on a real Mac. Double-click icons or click Dock items to navigate.",
    avatar: "../../assets/image.jpeg",
    status: "Available for new projects & opportunities",
  },

  skills: [
    { name: "LLM Orchestration & OpenAI API", level: 94, category: "AI", icon: "Bot" },
    { name: "LangChain / LlamaIndex / RAG", level: 90, category: "AI", icon: "Cpu" },
    { name: "Vector DBs (Pinecone, ChromaDB)", level: 88, category: "AI", icon: "Database" },
    { name: "Prompt Engineering & Fine-Tuning", level: 92, category: "AI", icon: "Sparkles" },
    { name: "React.js / Next.js", level: 95, category: "Frontend", icon: "Code2" },
    { name: "TypeScript / JavaScript", level: 92, category: "Frontend", icon: "FileCode" },
    { name: "Tailwind CSS / UI Design", level: 96, category: "Frontend", icon: "Palette" },
    { name: "Node.js / Express", level: 88, category: "Backend", icon: "Server" },
    { name: "Python / FastAPI", level: 90, category: "Backend", icon: "Cpu" },
    { name: "PostgreSQL / MongoDB / Redis", level: 86, category: "Backend", icon: "Database" },
    { name: "Docker / Kubernetes / AWS", level: 82, category: "DevOps", icon: "Cloud" },
    { name: "GraphQL & REST APIs", level: 90, category: "Backend", icon: "Network" },
    { name: "Framer Motion & Animations", level: 94, category: "Frontend", icon: "Sparkles" },
    { name: "Git / CI/CD Pipelines", level: 90, category: "DevOps", icon: "GitBranch" },
  ],

  projects: [
    {
      id: "project-1",
      title: "Transcriptor.AI",
      category: "AI & Full-Stack",
      tagline: "A lightwieght & free Chrome extension that transcribe meet content in realtime",
      description: "I developed a lightweight and free Chrome extension designed to transcribe meet content in realtime. With a personalized dashboard with all the meetings insigts, transcription, summary and a chatbot for querying through the meetings.",
      tags: ["React.js", "Node.js", "Tailwind CSS", "Langchain", "OpenRouter", "RAG", "Vector DB", "Redis", "PostgreSQL"],
      image: "../../assets/transcriptor.png",
      featured: true,
      github: "https://github.com/radhechaudhary/Transcriptor.AI",
      demo: "https://transcriptor.mohitch.me/",
      highlights: [
        "Semeantic Search and Chatbot over meetings - Built inhouse RAG pipeline",
        "Streamlit for real-time UI",
        "LangChain for agentic workflows and AI features",
        "OpenRouter for LLM integration"
      ]
    },
    {
      id: "project-2",
      title: "Attendance.AI",
      category: "AI & Full-Stack",
      tagline: "Photo based attendance tracking System for institutes.",
      description: "Smart Teendance System for teacher convenience using computer vision and face models.",
      tags: ["React", "Node.js", "Tailwind CSS", "Dlib", "face_recognition", "Flask", "Docker", "open Cv"],
      image: "../../assets/attendance.png",
      featured: true,
      github: "https://github.com/radhechaudhary/Attendance.AI",
      demo: "https://example.com",
      highlights: [
        "Microservice architecture to enable higly scalable architecture.",
        "Custom computer vision face recognition models for matching faces.",
        "High accuracy and blur check for input images."
      ]
    },
    {
      id: "project-3",
      title: "Postwoman",
      category: "Frontend",
      tagline: "A fast and free cross platform desktop application for API testing.",
      description: "A fast and free cross platform desktop application for API testing.",
      tags: ["Tauri", "React.js", "Tailwind CSS"],
      image: "../../assets/postwoman.png",
      featured: true,
      github: "https://github.com/radhechaudhary/postwoman",
      demo: "https://example.com",
      highlights: [
        "A lighter vresion of postman optimized for speed and ease of use.",
        "Can Send Seamelss Requests with cookies and every thing needed.",
        "Used Tauri for cross platform desktop app development.",
        "Store History and a tab switch feature to make it easy to use"
      ]
    },
    {
      id: "project-4",
      title: "Linker",
      category: "Full Stack",
      tagline: "A URL shortner Application fast and reliable with extra features.",
      description: "A URL shortner Application fast and reliable with extra features.",
      tags: ["React", "Javascript", "Tailwind CSS", "Redis", "Node.js", "PostgreSQL", "Express"],
      image: "../../assets/linker.png",
      featured: true,
      github: "https://github.com/radhechaudhary/URL_SHORTNER",
      demo: "https://linker.mohitch.me/",
      highlights: [
        "Fast and scalable URL shortner with redis for caching and PostgreSQL for storage.",
        "Provides API for other applications to use for shortening urls",
      ]
    },
    {
      id: "project-5",
      title: "LeetHelper",
      category: "AI Tool",
      tagline: "Your AI Powered Leetcode Tutor.",
      description: "This extension help you with leetcode problems and give you hints and also the optimal solution with proper explanation. ",
      tags: ["React", "langchain", "gemini", "open-ai", "openrouter", "dom-manipulation", "chrome-extension"],
      image: "../../assets/leet-helper.png",
      featured: false,
      github: "https://github.com/radhechaudhary/leet_helper_extension",
      demo: "https://leet-helper.mohitch.me/",
      highlights: [
        "A personalized resizable chatbot directly on leetcode",
        "Focus os the extension is to help you learn and not cheating."
      ]
    }
  ],

  journey: [

    {
      period: "birth - Present",
      role: "Student",
      company: "Life",
      location: "Earth",
      description: "Architecting cloud-native AI workspace tools, leading frontend design systems, and mentoring junior engineers.",
      achievements: [
        "Secured 1st Position in Code Avengers",
        "Finalst in HackForDelhi (A prestigious Hackathon by delhi government)",
        "AIR 677 in NIMCET entrance exam"
      ],
      tags: []
    }
  ],

  education: [
    {
      degree: "Master's in Computer Application",
      institution: "University School of Information, Communication and Technology, GGSIPU, New Delhi",
      period: "2025-2027",
      location: "New Delhi, India",
      details: "Currently pursuing Master of Computer Application (MCA) with a strong foundation in core computer science subjects, advanced mathematics, and emerging technologies.",
      activities: [
        "CGPA:9.04",
      ]
    },
    {
      degree: "B.Sc. in Computer Science",
      institution: "DBRAU, Agra",
      period: "2022 - 2025",
      location: "Agra, India",
      details: "Learnt the basics of core subjects in coputer science with advance matheematics and physics.",
      honors: "",
      activities: [
        "CGPA:8.11",
        "Secured 3rd Prize in Table Tennis in sports event of college"
      ]
    },

  ],

  wallpapers: [
    {
      id: "sonoma-gradient",
      name: "macOS Sonoma (Default)",
      gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 70%, #831843 100%)",
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80",
      previewGradient: "from-indigo-600 via-purple-600 to-pink-600"
    },
    {
      id: "ventura-ocean",
      name: "Ventura Dynamic Ocean",
      gradient: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0284c7 100%)",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
      previewGradient: "from-blue-600 via-cyan-600 to-indigo-800"
    },
    {
      id: "aurora-green",
      name: "Northern Aurora",
      gradient: "linear-gradient(135deg, #022c22 0%, #065f46 50%, #312e81 100%)",
      url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1920&q=80",
      previewGradient: "from-emerald-600 via-teal-600 to-indigo-900"
    },
    {
      id: "cyber-neon",
      name: "Cyberpunk Neon",
      gradient: "linear-gradient(135deg, #4a044e 0%, #581c87 50%, #0891b2 100%)",
      url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1920&q=80",
      previewGradient: "from-fuchsia-600 via-purple-700 to-cyan-600"
    },
    {
      id: "sunset-glow",
      name: "Big Sur Sunset",
      gradient: "linear-gradient(135deg, #451a03 0%, #9f1239 50%, #581c87 100%)",
      url: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=1920&q=80",
      previewGradient: "from-amber-500 via-rose-600 to-purple-800"
    },
    {
      id: "midnight-obsidian",
      name: "Midnight Obsidian",
      gradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #020617 100%)",
      url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80",
      previewGradient: "from-slate-800 via-slate-900 to-black"
    }
  ]
};
