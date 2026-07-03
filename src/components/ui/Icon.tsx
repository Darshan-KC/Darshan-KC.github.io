import { ArrowRight, BookOpen, Briefcase, CheckCircle2, Cloud, Code2, Cpu, Database, ExternalLink, GraduationCap, GitBranch, Mail, MapPin, Send, ShieldCheck, Sparkles, Users, Workflow, Zap } from "lucide-react";

const iconMap = {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Cloud,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  GraduationCap,
  GitBranch,
  Mail,
  MapPin,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  Zap,
} as const;

interface IconProps {
  name: keyof typeof iconMap;
  className?: string;
}

export default function Icon({ name, className }: IconProps) {
  const Component = iconMap[name];
  return <Component className={className} />;
}
