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
  const getLinks = () => {
    const stored = localStorage.getItem("links");
    return stored ? JSON.parse(stored) : [];
  };
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [redirectLink, setRedirectLink] =
    useState<{ publicId: string; shareUrl: string }[]>(getLinks());

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList === null || fileList.length === 0) return;
    setFile(fileList[0]);
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
        setRedirectLink((prev) => [
          ...prev,
          { publicId: data.publicId, shareUrl: data.shareUrl },
        ]);
        inputRef.current ? (inputRef.current.value = "") : "";
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const parsedData = JSON.stringify(redirectLink);
    localStorage.setItem("links", parsedData);
  }, [redirectLink]);

  const deleteLink = (publicId: string) => {
    setRedirectLink((prev) =>
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
        {redirectLink.length > 0 &&
          redirectLink.map((info, index) => (
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
