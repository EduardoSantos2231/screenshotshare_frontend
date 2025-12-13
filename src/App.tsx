import "./index.css";
import Header from "./components/Header";
import { useState, type ChangeEvent } from "react";
import LinkContainer from "./components/LinkContainer";

interface ResponseData {
  publicId: string;
  shareUrl: string;
  expiresIn: string;
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [redirectLink, setRedirectLink] = useState("");
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
        setRedirectLink(data.shareUrl);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="min-h-dvh bg-radial flex flex-col">
      <Header />
      <main className="mx-10 my-15 justify-center flex">
        <div className="flex flex-col gap-2 w-56">
          <input
            type="file"
            name="image"
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
      <section className="flex justify-center my-10">
        {redirectLink && <LinkContainer link={redirectLink} />}
      </section>
    </div>
  );
}

export default App;
