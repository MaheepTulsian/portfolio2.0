import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { getData } from "@/lib/data";
import {
  Mail,
  Github,
  Twitter,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";

export default function Contact() {
  const data = getData();
  const { personal } = data;

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: personal.contact.email,
      href: `mailto:${personal.contact.email}`,
      external: false,
    },
    {
      icon: Github,
      label: "GitHub",
      value: `github.com/${personal.contact.github}`,
      href: `https://github.com/${personal.contact.github}`,
      external: true,
    },
    {
      icon: Twitter,
      label: "Twitter",
      value: `twitter.com/${personal.contact.twitter}`,
      href: `https://twitter.com/${personal.contact.twitter}`,
      external: true,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: `linkedin.com/in/${personal.contact.linkedin}`,
      href: `https://linkedin.com/in/${personal.contact.linkedin}`,
      external: true,
    },
  ];

  return (
    <PageContainer>
      {/* Header */}
      <header className="mb-20 max-w-xl">
        <h1 className="text-2xl font-semibold tracking-tight mb-4">
          Let’s connect
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Open to opportunities, collaborations, and thoughtful conversations
          around technology and product.
        </p>
      </header>

      {/* Contact Grid */}
      <div className="max-w-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
          {contactMethods.map((method) => {
            const Icon = method.icon;

            return (
              <Link
                key={method.label}
                href={method.href}
                target={method.external ? "_blank" : undefined}
                rel={method.external ? "noopener noreferrer" : undefined}
                className="group flex items-start justify-between gap-4 pb-4 border-b border-border hover:border-foreground/30 transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <Icon className="h-4 w-4 mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors" />

                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">
                      {method.label}
                    </p>
                    <p className="text-sm truncate text-foreground">
                      {method.value}
                    </p>
                  </div>
                </div>

                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <p className="mt-20 text-sm text-muted-foreground max-w-xl">
        Prefer async communication. Email usually gets the fastest response.
      </p>
    </PageContainer>
  );
}
