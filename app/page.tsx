"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { getData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { HeatmapCalendar } from "@/components/ui/contribution-heatmap";
import { TechStackCarousel } from "@/components/card/tech-stack-carousel";

import { FocusBadge } from "@/components/card/focus-bage";
import Unfold from "@/public/icons/unfold.png";
import Coinbase from "@/public/icons/coinbase-logo-icon.webp";

// Generate sample contribution data for demo
function generateContributionData() {
  const data = [];
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Random contribution pattern with some clusters
    const random = Math.random();
    let value = 0;

    if (random > 0.3) {
      // More activity on weekdays
      const day = date.getDay();
      const isWeekday = day >= 1 && day <= 5;

      if (isWeekday) {
        value = Math.floor(Math.random() * 15);
      } else {
        value = Math.floor(Math.random() * 8);
      }
    }

    data.push({
      date: date.toISOString().split('T')[0],
      value,
    });
  }

  return data;
}

export default function Home() {
  const [cellSize, setCellSize] = useState<number>();
  const [cellGap, setCellGap] = useState<number>();
  const [mounted, setMounted] = useState(false);
  const [contributionData, setContributionData] = useState<Array<{ date: string; value: number }>>([]);

  const data = getData();
  const { personal, interests } = data;

  useEffect(() => {
    const updateCellSize = () => {
      const availableWidth = Math.min(window.innerWidth - 48, 648);

      if (availableWidth < 380) {
        setCellSize(6);
        setCellGap(1);
      } else if (availableWidth < 480) {
        setCellSize(8);
        setCellGap(1);
      } else if (availableWidth < 600) {
        setCellSize(9);
        setCellGap(1);
      } else {
        setCellSize(10);
        setCellGap(1);
      }
    };

    updateCellSize();
    setContributionData(generateContributionData());
    setMounted(true);
    window.addEventListener("resize", updateCellSize);
    return () => window.removeEventListener("resize", updateCellSize);
  }, []);

  return (
    <PageContainer>
      {/* Intro */}
      <section className="mb-10">
        <h2 className="text-xl md:text-2xl font-medium leading-relaxed mb-4">
          Hey, I&apos;m {personal.name.split(" ")[0]}! I&apos;m a{" "}
          <span className="font-semibold italic underline">{personal.title}</span> based in{" "}
          <span className="font-semibold">
            {personal.location.city}, {personal.location.country}
          </span>
          , and a passionate learner who tries to solve problems through code.
        </h2>

        <TechStackCarousel />

        {/* <p className="text-muted-foreground leading-relaxed">
          I work mainly in Web Development and AI/ML, and I&apos;m always open
          to learning new things as and when required with a core focus on
          building systems.
        </p> */}
      </section>

      {/* Current */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold mb-3">Current</h3>
        <p className="text-muted-foreground leading-relaxed">
          Student at{" "}
          <Link
            href="#"
            className="text-foreground underline hover:no-underline"
          >
            {personal.location.institution}
          </Link>
          , learning new things everyday and building projects.
        </p>
      </section>

      {/* Contribution Heatmap */}
      <section className="mb-10 py-6">
        <div className="mb-4 pb-4 border-b border-border">
          <p className="text-sm text-muted-foreground">
            {contributionData.filter(d => d.value > 0).length} contributions in the last year
          </p>
        </div>
        {mounted && cellSize !== undefined && cellGap !== undefined ? (
          <div className="w-full overflow-x-auto scrollbar-hide">
            <HeatmapCalendar
              data={contributionData}
              rangeDays={365}
              cellSize={cellSize}
              cellGap={cellGap}
              palette={[
                "var(--contribution-0)",
                "var(--contribution-1)",
                "var(--contribution-2)",
                "var(--contribution-3)",
                "var(--contribution-4)",
              ]}
              axisLabels={{
                showWeekdays: false,
                monthFormat: "short",
                minWeekSpacing: 2,
              }}
              legend={{
                placement: "bottom",
                lessText: "Less",
                moreText: "More",
                showText: true,
              }}
            />
          </div>
        ) : null}
      </section>

      {/* Highlights */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold mb-3">Highlights</h3>
        <ul className="space-y-2">
          <li className="text-muted-foreground flex items-center gap-2">
            <span className="text-foreground">-</span>
            Winner of 
            <FocusBadge text="Unfold 2024" icon={{ type: "image", value: Unfold }} href="https://unfold2024.devfolio.co/overview"/>
            in the
            <FocusBadge text="Coinbase" icon={{ type: "image", value: Coinbase }} href="https://unfold2024.devfolio.co/overview"/>
          </li>

          <li className="text-muted-foreground flex items-start gap-2">
            <span className="text-foreground">-</span>
            Generated ₹28,000 in affiliate revenue with EveryDukan
          </li>

          <li className="text-muted-foreground flex items-start gap-2">
            <span className="text-foreground">-</span>
            Published an npm package with 45+ weekly downloads
          </li>

          <li className="text-muted-foreground flex items-start gap-2">
            <span className="text-foreground">-</span>
          </li>

          <li className="text-muted-foreground flex items-start gap-2">
            <span className="text-foreground">-</span>
            Reduced admin lookup time from 3–5 minutes to 10–30 seconds
          </li>

          <li className="text-muted-foreground flex items-start gap-2">
            <span className="text-foreground">-</span>
            Built high-throughput systems handling 1,000+ requests/sec with sub-50ms latency
          </li>
        </ul>
      </section>

      {/* Interests */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold mb-3">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <Badge key={index} variant="secondary" className="font-normal">
              {interest}
            </Badge>
          ))}
        </div>
      </section>

      {/* Social Links */}
      <section>
        <div className="flex items-center gap-2 text-sm flex-wrap">
          <Link
            href={`https://github.com/${personal.contact.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            Github
          </Link>
          <span className="text-muted-foreground">-</span>
          <Link
            href={`https://linkedin.com/in/${personal.contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            LinkedIn
          </Link>
          <span className="text-muted-foreground">-</span>
          <Link
            href={`mailto:${personal.contact.email}`}
            className="underline hover:no-underline"
          >
            Email
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
