import "./index.css";
import Header from "./components/Header";
import { useState, type ChangeEvent, useEffect, useRef } from "react";
import LinkContainer from "./components/LinkContainer";

interface ResponseData {
  publicId: string;
  shareUrl: string;
  expiresIn: string;
}

function App() {
  const getLinksFromLocalStorage = () => {
    const stored = localStorage.getItem("links");
    return stored ? JSON.parse(stored) : [];
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [redirectLinks, setRedirectLinks] = useState<
    { publicId: string; shareUrl: string }[]
  >(getLinksFromLocalStorage());

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList === null || fileList.length === 0) return;
    setFile(fileList[0]);
  };

  const clearInput = () => {
    inputRef.current ? (inputRef.current.value = "") : "";
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch("http://localhost:3000/uploads", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = (await response.json()) as ResponseData;
        setRedirectLinks((prev) => [
          ...prev,
          { publicId: data.publicId, shareUrl: data.shareUrl },
        ]);
        clearInput();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const parsedData = JSON.stringify(redirectLinks);
    localStorage.setItem("links", parsedData);
  }, [redirectLinks]);

  const deleteLink = (publicId: string) => {
    setRedirectLinks((prev) =>
      prev.filter((data) => data.publicId !== publicId),
    );
  };

  return (
    <div className="min-h-dvh bg-radial flex flex-col">
      <Header />
      <main className="mx-10 my-15 justify-center flex">
        <div className="flex flex-col gap-2 w-56">
          <input
            type="file"
            name="image"
            ref={inputRef}
            className="p-4 border"
            accept=".png, .jpg, .jpeg, .webp"
            onChange={(e) => handleInputChange(e)}
            required
          ></input>
          <button
            onClick={handleUpload}
            className="p-2 cursor-pointer bg-secundario text-white rounded-sm font-botoes text-lg hover:scale-110 duration-300 transition"
          >
            Enviar
          </button>
        </div>
      </main>
      <section className="flex justify-center my-10 flex-col gap-2 items-center">
        {redirectLinks.length > 0 &&
          redirectLinks.map((info, index) => (
            <LinkContainer
              link={info.shareUrl}
              key={index}
              onDelete={() => deleteLink(info.publicId)}
            />
          ))}
      </section>
    </div>
  );
}

export default App;
