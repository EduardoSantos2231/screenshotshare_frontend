import { useState } from "react";
import { CircleX } from "lucide-react";
import { Menu } from "lucide-react";

export default function Header() {
  const [itsOpen, setItsOpen] = useState(false);
  const changeItsOpen = () => {
    setItsOpen((prev) => !prev);
  };

  return (
    <header className="bg-green-50 p-10 flex relative">
      <span className="mr-auto">Logo vai aqui</span>

      <ul className="gap-2 hidden md:flex ">
        <li>upload</li>
        <li>criador</li>
      </ul>

      <button className="md:hidden" onClick={changeItsOpen}>
        {itsOpen ? <CircleX size={"1.6rem"} /> : <Menu size={"1.6rem"} />}
      </button>
      {itsOpen && (
        <ul className="flex gap-3 md:hidden flex-col absolute top-full right-0 bg-green-50 p-10 text-lg shadow-sm ">
          <li>upload</li>
          <li>criador</li>
        </ul>
      )}
    </header>
  );
}
