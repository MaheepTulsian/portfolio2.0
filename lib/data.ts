import { PortfolioData } from "./types";
import info from "@/data/info.json";

export function getData(): PortfolioData {
  return info as unknown as PortfolioData;
}
