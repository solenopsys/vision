import { Markdown } from "../markdown.tsx";
import { For } from "@solenopsys/converged-renderer";
import { parse } from "yaml";
import { readFile } from "@fileio";
import "./plan.css"
import { Button } from "../button/button.tsx"

interface PlanFeature {
  features: string[];
}

interface Plan {
  name: string;
  price: number;
  target: string;
  features: string[];
}

interface PlanWrapper{
   plan:Plan
}

export function Plan({ url }: { url: string }) {
  return () => {
    // Синхронно читаем файл как текст
    const text = readFile(url);
    
    // Парсим YAML в объект
    const planData: Plan = parse(text).plan;
    console.log("plan",planData)

    return (
      <div class="plan-card">
        <div class="plan-header">
          <h2>{planData.name}</h2>
          <div>{planData.target}</div>
          <div class="plan-price">{planData.price}</div>
        </div>
        <Button title="Присоединиться" onClick={() => {
          console.log("planData",planData)
        }} />
        <div class="plan-features">
          <For values={planData.features}>
            {(feature: string) => (
              <div class="feature-item">
                <span class="feature-bullet">•</span>
                <span>{feature}</span>
              </div>
            )}
          </For>
        </div>
       
      </div>
    );
  }
}

// Пример использования:
// <MdGroup url="path/to/plan.yaml" />