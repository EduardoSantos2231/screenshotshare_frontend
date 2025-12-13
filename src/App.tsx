import "./index.css";
import Header from "./components/Header";
function App() {
  return (
    <div className="min-h-dvh bg-radial">
      <Header />
      <main className="mx-10 my-15 justify-center flex">
        <div className="flex flex-col gap-2">
          <h1 className="text-center">Insira uma imagem</h1>
          <input
            type="file"
            name="image"
            className="p-4 border"
            accept=".png, .jpg, .jpeg, .webp"
          ></input>
          <button className="border p-2 cursor-pointer">Enviar</button>
        </div>
      </main>
    </div>
  );
}

export default App;
