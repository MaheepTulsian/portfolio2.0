"use client";

import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { FocusBadge } from "@/components/card/focus-bage";
import * as SimpleIcons from "simple-icons";

interface TechItem {
  name: string;
  slug: string;
  color?: string;
  icon: React.ReactNode | null;
  link?: string;
}

interface TechSection {
  title: string;
  items: TechItem[];
}

export default function TestIcons() {
  // Helper function to create tech items with icons
  const createTechItem = (name: string, slug: string, color?: string, localIcon?: string, link?: string): TechItem => {
    // Prefer local icon if available
    if (localIcon) {
      return {
        name,
        slug,
        color,
        link,
        icon: (
          <img
            src={localIcon}
            alt={name}
            className="h-4 w-4 object-contain"
          />
        ),
      };
    }

    // Fall back to Simple Icons
    const icon = SimpleIcons[`si${slug.charAt(0).toUpperCase() + slug.slice(1)}` as keyof typeof SimpleIcons];

    return {
      name,
      slug,
      color,
      link,
      icon: icon ? (
        <svg
          role="img"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="currentColor"
          style={{ color: color || "currentColor" }}
        >
          <path d={icon.path} />
        </svg>
      ) : null,
    };
  };

  // Organize tech stack by sections
  const sections: TechSection[] = [
    {
      title: "Languages",
      items: [
        createTechItem("JavaScript", "javascript", "#F7DF1E", undefined, "https://developer.mozilla.org/en-US/docs/Web/JavaScript"),
        createTechItem("TypeScript", "typescript", "#3178C6", undefined, "https://www.typescriptlang.org/"),
        createTechItem("Python", "python", "#3776AB", undefined, "https://www.python.org/"),
        createTechItem("C", "c", "#A8B9CC", undefined, "https://en.cppreference.com/w/c"),
        createTechItem("C++", "cplusplus", "#00599C", undefined, "https://cplusplus.com/"),
        createTechItem("Java", "openjdk", "#437291", "/icons/java.svg", "https://www.java.com/"),
        createTechItem("Go", "go", "#00ADD8", undefined, "https://go.dev/"),
        createTechItem("Ruby", "ruby", "#CC342D", undefined, "https://www.ruby-lang.org/"),
        createTechItem("Dart", "dart", "#0175C2", undefined, "https://dart.dev/"),
        createTechItem("Solidity", "solidity", "#363636", undefined, "https://soliditylang.org/"),
        createTechItem("Shell", "gnubash", "#4EAA25", undefined, "https://www.gnu.org/software/bash/"),
      ],
    },
    {
      title: "Frontend",
      items: [
        createTechItem("React", "react", "#61DAFB", undefined, "https://react.dev/"),
        createTechItem("Next.js", "nextdotjs", "#000000", undefined, "https://nextjs.org/"),
        createTechItem("Flutter", "flutter", "#02569B", undefined, "https://flutter.dev/"),
        createTechItem("Tailwind CSS", "tailwindcss", "#06B6D4", undefined, "https://tailwindcss.com/"),
        createTechItem("Material UI", "mui", "#007FFF", undefined, "https://mui.com/"),
        createTechItem("Zustand", "zustand", "#000000", "/icons/zustand.svg", "https://zustand-demo.pmnd.rs/"),
        createTechItem("Redux", "redux", "#764ABC", undefined, "https://redux.js.org/"),
        createTechItem("shadcn/ui", "shadcnui", "#000000", undefined, "https://ui.shadcn.com/"),
      ],
    },
    {
      title: "Backend",
      items: [
        createTechItem("Node.js", "nodedotjs", "#5FA04E", undefined, "https://nodejs.org/"),
        createTechItem("Express.js", "express", "#000000", undefined, "https://expressjs.com/"),
        createTechItem("FastAPI", "fastapi", "#009688", undefined, "https://fastapi.tiangolo.com/"),
        createTechItem("Firebase", "firebase", "#DD2C00", undefined, "https://firebase.google.com/"),
      ],
    },
    {
      title: "Databases",
      items: [
        createTechItem("MongoDB", "mongodb", "#47A248", undefined, "https://www.mongodb.com/"),
        createTechItem("PostgreSQL", "postgresql", "#4169E1", undefined, "https://www.postgresql.org/"),
        createTechItem("MySQL", "mysql", "#4479A1", undefined, "https://www.mysql.com/"),
        createTechItem("Redis", "redis", "#DC382D", undefined, "https://redis.io/"),
        createTechItem("Firestore", "firebase", "#DD2C00", undefined, "https://firebase.google.com/"),
      ],
    },
    {
      title: "AI/ML",
      items: [
        createTechItem("LangChain", "langchain", "#1C3C3C", undefined, "https://www.langchain.com/"),
        createTechItem("LangGraph", "langchain", "#1C3C3C", undefined, "https://www.langchain.com/"),
        createTechItem("Hugging Face", "huggingface", "#FFD21E", undefined, "https://huggingface.co/"),
        createTechItem("Ollama", "ollama", "#000000", undefined, "https://ollama.com/"),
        createTechItem("OpenAI", "openai", "#412991", "/icons/openai.svg", "https://openai.com/"),
        createTechItem("Groq", "groq", "#000000", "/icons/groq.svg", "https://groq.com/"),
        createTechItem("Gemini", "googlegemini", "#4285F4", undefined, "https://gemini.google.com/"),
      ],
    },
    {
      title: "Blockchain",
      items: [
        createTechItem("Solidity", "solidity", "#363636", undefined, "https://soliditylang.org/"),
        createTechItem("Web3.js", "web3dotjs", "#F16822", undefined, "https://web3js.readthedocs.io/"),
        createTechItem("Ethers.js", "ethers", "#2535A0", undefined, "https://docs.ethers.org/"),
        createTechItem("Ethereum", "ethereum", "#3C3C3D", undefined, "https://ethereum.org/"),
        createTechItem("Thirdweb", "thirdweb", "#000000", undefined, "https://thirdweb.com/"),
      ],
    },
    {
      title: "DevOps/Cloud",
      items: [
        createTechItem("Docker", "docker", "#2496ED", undefined, "https://www.docker.com/"),
        createTechItem("Git", "git", "#F05032", undefined, "https://git-scm.com/"),
        createTechItem("GitHub Actions", "githubactions", "#2088FF", undefined, "https://github.com/features/actions"),
        createTechItem("AWS", "amazonwebservices", "#FF9900", "/icons/aws.svg", "https://aws.amazon.com/"),
        createTechItem("Azure", "microsoftazure", "#0078D4", "/icons/azure.svg", "https://azure.microsoft.com/"),
        createTechItem("NGINX", "nginx", "#009639", undefined, "https://nginx.org/"),
        createTechItem("Cloudflare", "cloudflare", "#F38020", undefined, "https://www.cloudflare.com/"),
      ],
    },
    {
      title: "Tools",
      items: [
        createTechItem("Postman", "postman", "#FF6C37", undefined, "https://www.postman.com/"),
        createTechItem("Prisma", "prisma", "#2D3748", undefined, "https://www.prisma.io/"),
        createTechItem("JWT", "jsonwebtokens", "#000000", undefined, "https://jwt.io/"),
        createTechItem("Swagger", "swagger", "#85EA2D", undefined, "https://swagger.io/"),
        createTechItem("Figma", "figma", "#F24E1E", undefined, "https://www.figma.com/"),
      ],
    },
  ];

  const allItems = sections.flatMap((section) => section.items);
  const totalIcons = allItems.length;
  const availableIcons = allItems.filter((item) => item.icon).length;
  const missingIcons = allItems.filter((item) => !item.icon);

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tech Stack Icons Test</h1>
        <p className="text-muted-foreground">
          Displaying all {totalIcons} tech stack icons organized by category
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-2xl font-bold">{totalIcons}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Icons</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-2xl font-bold">{availableIcons}</p>
            <p className="text-xs text-muted-foreground mt-1">Available</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-2xl font-bold">{missingIcons.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Missing</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-2xl font-bold">
              {Math.round((availableIcons / totalIcons) * 100)}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">Coverage</p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-12">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-border">
              {section.title}
              <span className="text-sm text-muted-foreground ml-2">
                ({section.items.length} items)
              </span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {section.items.map((tech) => (
                <div
                  key={tech.slug + tech.name}
                  className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  {tech.icon ? (
                    tech.link ? (
                      <Link
                        href={tech.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer"
                      >
                        <FocusBadge
                          text={tech.name}
                          icon={{ type: "node", value: tech.icon }}
                        />
                      </Link>
                    ) : (
                      <FocusBadge
                        text={tech.name}
                        icon={{ type: "node", value: tech.icon }}
                      />
                    )
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-full bg-muted text-xs">
                      <span>{tech.name}</span>
                    </div>
                  )}
                  <div className="text-center mt-2">
                    <p className="text-xs text-muted-foreground font-mono">
                      {tech.slug}
                    </p>
                    {tech.color && (
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <div
                          className="w-3 h-3 rounded-full border border-border"
                          style={{ backgroundColor: tech.color }}
                        />
                        <p className="text-xs text-muted-foreground font-mono">
                          {tech.color}
                        </p>
                      </div>
                    )}
                    {tech.link && (
                      <Link
                        href={tech.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline mt-1 block truncate max-w-full"
                        title={tech.link}
                      >
                        Visit →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Missing icons section */}
      {missingIcons.length > 0 && (
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-xl font-semibold mb-4 text-red-500">
            Missing Icons ({missingIcons.length})
          </h2>
          <div className="flex flex-wrap gap-2">
            {missingIcons.map((tech) => (
              <div
                key={tech.slug + tech.name}
                className="px-3 py-1.5 border border-red-500/50 rounded-full bg-red-500/10 text-xs"
              >
                {tech.name} ({tech.slug})
              </div>
            ))}
          </div>
        </div>
      )}

      {missingIcons.length === 0 && (
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-lg text-green-500 font-semibold">
            All icons are available! 🎉
          </p>
        </div>
      )}
    </PageContainer>
  );
}
