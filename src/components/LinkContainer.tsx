import { Copy } from "lucide-react";
import { useState } from "react";
import FeedbackPopup from "./FeedBackPopup";
import { Trash } from "lucide-react";

interface Link {
  link: string;
  onDelete: () => void;
}

export default function ({ link, onDelete }: Link) {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied((prev: boolean) => !prev);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex gap-3 p-3 bg-slate-100 rounded-sm w-fit flex-row">
      <Copy onClick={copyToClipboard} />
      <a href={link}>{link}</a>
      <Trash onClick={onDelete} />
      {copied && <FeedbackPopup />}
    </div>
  );
}
