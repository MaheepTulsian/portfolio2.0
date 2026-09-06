export interface TechItem {
  name: string;
  slug: string;
  color?: string;
  localIcon?: string; // Path to local SVG file in /public/icons
  link?: string; // Official website or documentation URL
}

export const techStack: TechItem[] = [
  // Languages
  { name: "JavaScript", slug: "javascript", color: "#F7DF1E", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "TypeScript", slug: "typescript", color: "#3178C6", link: "https://www.typescriptlang.org/" },
  { name: "Python", slug: "python", color: "#3776AB", link: "https://www.python.org/" },
  { name: "C", slug: "c", color: "#A8B9CC", link: "https://en.cppreference.com/w/c" },
  { name: "C++", slug: "cplusplus", color: "#00599C", link: "https://cplusplus.com/" },
  { name: "Java", slug: "openjdk", color: "#437291", localIcon: "/icons/java.svg", link: "https://www.java.com/" },
  { name: "Go", slug: "go", color: "#00ADD8", link: "https://go.dev/" },
  { name: "Ruby", slug: "ruby", color: "#CC342D", link: "https://www.ruby-lang.org/" },
  { name: "Dart", slug: "dart", color: "#0175C2", link: "https://dart.dev/" },
  { name: "Solidity", slug: "solidity", color: "#363636", link: "https://soliditylang.org/" },
  { name: "Shell", slug: "gnubash", color: "#4EAA25", link: "https://www.gnu.org/software/bash/" },

  // Frontend
  { name: "React", slug: "react", color: "#61DAFB", link: "https://react.dev/" },
  { name: "Next.js", slug: "nextdotjs", color: "#000000", link: "https://nextjs.org/" },
  { name: "Flutter", slug: "flutter", color: "#02569B", link: "https://flutter.dev/" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "#06B6D4", link: "https://tailwindcss.com/" },
  { name: "Material UI", slug: "mui", color: "#007FFF", link: "https://mui.com/" },
  { name: "Zustand", slug: "zustand", color: "#000000", localIcon: "/icons/zustand.svg", link: "https://zustand-demo.pmnd.rs/" },
  { name: "Redux", slug: "redux", color: "#764ABC", link: "https://redux.js.org/" },
  { name: "shadcn/ui", slug: "shadcnui", color: "#000000", link: "https://ui.shadcn.com/" },

  // Backend
  { name: "Node.js", slug: "nodedotjs", color: "#5FA04E", link: "https://nodejs.org/" },
  { name: "Express.js", slug: "express", color: "#000000", link: "https://expressjs.com/" },
  { name: "FastAPI", slug: "fastapi", color: "#009688", link: "https://fastapi.tiangolo.com/" },
  { name: "Firebase", slug: "firebase", color: "#DD2C00", link: "https://firebase.google.com/" },

  // Databases
  { name: "MongoDB", slug: "mongodb", color: "#47A248", link: "https://www.mongodb.com/" },
  { name: "PostgreSQL", slug: "postgresql", color: "#4169E1", link: "https://www.postgresql.org/" },
  { name: "MySQL", slug: "mysql", color: "#4479A1", link: "https://www.mysql.com/" },
  { name: "Redis", slug: "redis", color: "#DC382D", link: "https://redis.io/" },

  // AI/ML
  { name: "LangChain", slug: "langchain", color: "#1C3C3C", link: "https://www.langchain.com/" },
  { name: "Hugging Face", slug: "huggingface", color: "#FFD21E", link: "https://huggingface.co/" },
  { name: "OpenAI", slug: "openai", color: "#412991", localIcon: "/icons/openai.svg", link: "https://openai.com/" },
  { name: "Groq", slug: "groq", color: "#000000", localIcon: "/icons/groq.svg", link: "https://groq.com/" },

  // Blockchain
  { name: "Web3.js", slug: "web3dotjs", color: "#F16822", link: "https://web3js.readthedocs.io/" },
  { name: "Ethers.js", slug: "ethers", color: "#2535A0", link: "https://docs.ethers.org/" },
  { name: "Ethereum", slug: "ethereum", color: "#3C3C3D", link: "https://ethereum.org/" },

  // DevOps/Cloud
  { name: "Docker", slug: "docker", color: "#2496ED", link: "https://www.docker.com/" },
  { name: "Git", slug: "git", color: "#F05032", link: "https://git-scm.com/" },
  { name: "GitHub Actions", slug: "githubactions", color: "#2088FF", link: "https://github.com/features/actions" },
  { name: "AWS", slug: "amazonwebservices", color: "#FF9900", localIcon: "/icons/aws.svg", link: "https://aws.amazon.com/" },
  { name: "Azure", slug: "microsoftazure", color: "#0078D4", localIcon: "/icons/azure.svg", link: "https://azure.microsoft.com/" },
  { name: "NGINX", slug: "nginx", color: "#009639", link: "https://nginx.org/" },
  { name: "Cloudflare", slug: "cloudflare", color: "#F38020", link: "https://www.cloudflare.com/" },

  // Tools
  { name: "GitHub", slug: "github", color: "#181717", link: "https://github.com/" },
  { name: "VS Code", slug: "visualstudiocode", color: "#007ACC", link: "https://code.visualstudio.com/" },
  { name: "Figma", slug: "figma", color: "#F24E1E", link: "https://www.figma.com/" },
  { name: "Postman", slug: "postman", color: "#FF6C37", link: "https://www.postman.com/" },
  { name: "Slack", slug: "slack", color: "#4A154B", link: "https://slack.com/" },
  { name: "Linear", slug: "linear", color: "#5E6AD2", link: "https://linear.app/" },
  { name: "Notion", slug: "notion", color: "#000000", link: "https://www.notion.so/" },
  { name: "Prisma", slug: "prisma", color: "#2D3748", link: "https://www.prisma.io/" },
  { name: "Swagger", slug: "swagger", color: "#85EA2D", link: "https://swagger.io/" },
];
