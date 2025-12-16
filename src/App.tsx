import "./index.css";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import LinkContainer from "./components/LinkContainer";
import UploadInput from "./components/Upload";

function App() {
  const getLinksFromLocalStorage = () => {
    const stored = localStorage.getItem("links");
    return stored ? JSON.parse(stored) : [];
  };

  const [redirectLinks, setRedirectLinks] = useState<
    { publicId: string; shareUrl: string }[]
  >(getLinksFromLocalStorage());

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(redirectLinks));
  }, [redirectLinks]);

  const deleteLink = (publicId: string) => {
    setRedirectLinks((prev) =>
      prev.filter((data) => data.publicId !== publicId),
    );
  };

  return (
    <div className="min-h-dvh bg-radial flex flex-col">
      <Header />

      <main className="mx-10 my-15 flex justify-center">
        <UploadInput
          onUploadSuccess={(data) =>
            setRedirectLinks((prev) => [...prev, data])
          }
        />
      </main>

      <section className="flex justify-center my-10 flex-col gap-2 items-center">
        {redirectLinks.map((info) => (
          <LinkContainer
            key={info.publicId}
            link={info.shareUrl}
            onDelete={() => deleteLink(info.publicId)}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
