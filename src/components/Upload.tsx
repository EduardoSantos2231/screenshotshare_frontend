import { useRef, useState, type ChangeEvent } from "react";
import { Upload, Loader2 } from "lucide-react";

interface ResponseData {
  publicId: string;
  shareUrl: string;
  expiresIn: string;
}

interface UploadInputProps {
  onUploadSuccess: (data: { publicId: string; shareUrl: string }) => void;
}

export default function UploadInput({ onUploadSuccess }: UploadInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
  };

  const handleUpload = async () => {
    const file = inputRef.current?.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3000/uploads", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) return;

      const data = (await response.json()) as ResponseData;

      onUploadSuccess({
        publicId: data.publicId,
        shareUrl: data.shareUrl,
      });

      setFileName(null);
      if (inputRef.current) inputRef.current.value = "";
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-72">
      <label
        className="
          flex flex-col items-center justify-center gap-2
          h-40
          border-2 border-dashed border-zinc-400
          rounded-xl
          cursor-pointer
          text-zinc-600
          hover:border-zinc-600
          hover:bg-zinc-50
          transition
          focus-within:ring-2 focus-within:ring-zinc-400
        "
      >
        <Upload className="w-8 h-8" />

        <span className="text-sm font-medium text-center px-2">
          {fileName ?? "Clique ou arraste um arquivo"}
        </span>

        <span className="text-xs text-zinc-500">PNG, JPG, JPEG ou WEBP</span>

        <input
          ref={inputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.webp"
          className="hidden"
          onChange={handleChange}
        />
      </label>

      <button
        onClick={handleUpload}
        disabled={!fileName || loading}
        className="
    group
    relative
    inline-flex items-center justify-center gap-2
    h-11
    rounded-lg
    border border-zinc-300
    bg-white
    px-4
    text-sm font-medium text-zinc-700
    transition
    hover:border-zinc-400
    hover:bg-zinc-50
    focus:outline-none
    focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-zinc-600" />
            Enviando
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 text-zinc-600" />
            Enviar arquivo
          </>
        )}
      </button>
    </div>
  );
}
