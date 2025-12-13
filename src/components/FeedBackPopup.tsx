import { useState } from "react";

export default function FeedbackPopup() {
  const [display, setDisplay] = useState("absolute");
  setTimeout(() => {
    setDisplay("hidden");
  }, 2000);
  return (
    <div
      className={`${display} bg-green-400 text-center bottom-0 p-8 right-0 left-0 transition-all duration-400 ease-in-out`}
    >
      <p className="text-lg">Link copiado com sucesso</p>
    </div>
  );
}
