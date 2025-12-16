import { useState } from "react";
import { CircleX } from "lucide-react";
import { Menu } from "lucide-react";
import { Github } from "lucide-react";
import LinktTo from "./LinkTo";

export default function Header() {
  const [itsOpen, setItsOpen] = useState(false);
  const changeItsOpen = () => {
    setItsOpen((prev) => !prev);
  };

  return (
    <header className="bg-primaria text-white flex relative">
      <span className="mr-auto size-25 items-center flex ml-5 font-botoes text-sm md:text-lg">
        SsShare
      </span>

      <ul className="gap-2 hidden md:flex items-center mr-5 ">
        <LinktTo
          Icon={Github}
          link="https://github.com/EduardoSantos2231"
          title="Github"
        />
      </ul>

      <button className="md:hidden mr-5" onClick={changeItsOpen}>
        {itsOpen ? <CircleX size={"1.6rem"} /> : <Menu size={"1.6rem"} />}
      </button>
      {itsOpen && (
        <ul className="flex gap-3 md:hidden flex-col absolute top-full right-0 bg-primaria  p-10 text-lg shadow-sm items-center">
          <LinktTo
            Icon={Github}
            link="https://github.com/EduardoSantos2231"
            title="Github"
          />
        </ul>
      )}
    </header>
  );
}
