import { Building2, Code2, Rocket, Shield } from "lucide-react";

const icons = {
  rocket: Rocket,
  code: Code2,
  shield: Shield,
  building: Building2,
};

export function ActivityIcon({ name }: { name: keyof typeof icons }) {
  const Icon = icons[name];
  return <Icon className="size-4" />;
}
