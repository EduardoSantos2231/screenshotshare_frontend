import type { LucideIcon } from "lucide-react";

interface LinkProps {
  link: string;
  title: string;
  Icon: LucideIcon;
}

export default function LinktTo({ Icon, link, title }: LinkProps) {
  return (
    <li>
      <a href={link} className="flex gap-2 items-center">
        <Icon size={"1rem"} />
        {title}
      </a>
    </li>
  );
}
