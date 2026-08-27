import type { LucideIcon } from "lucide-react";
import {
  Home,
  FolderKanban,
  Briefcase,
  Sparkles,
  Bot,
  FlaskConical,
  Images,
  Music,
  User,
  FileText,
  Mail,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  mobilePrimary?: boolean;
};

export const primaryNav: NavItem[] = [
  { href: "/", label: "Home", icon: Home, mobilePrimary: true },
  { href: "/projects", label: "Projects", icon: FolderKanban, mobilePrimary: true },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/skills", label: "Skills", icon: Sparkles },
  { href: "/assistant", label: "AI Assistant", icon: Bot, mobilePrimary: true },
  { href: "/lab", label: "Lab", icon: FlaskConical },
  { href: "/gallery", label: "Gallery", icon: Images },
  { href: "/music", label: "Music", icon: Music },
  { href: "/about", label: "About", icon: User },
];

export const secondaryNav: NavItem[] = [
  { href: "/resume", label: "Résumé", icon: FileText, mobilePrimary: true },
  { href: "/contact", label: "Contact", icon: Mail, mobilePrimary: true },
];

export const allNav = [...primaryNav, ...secondaryNav];

export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
