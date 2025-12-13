import { Copy } from "lucide-react";
import { useState } from "react";
import FeedbackPopup from "./FeedBackPopup";
interface Link {
  link: string;
}

export default function ({ link }: Link) {
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
    <div className="flex gap-3 p-3 bg-slate-100 rounded-sm flex-col">
      <div className="flex gap-2">
        <Copy onClick={copyToClipboard} />
        <a href={link}>{link}</a>
        {copied && <FeedbackPopup />}
      </div>
    </div>
  );
}
