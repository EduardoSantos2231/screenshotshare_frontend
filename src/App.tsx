import "./index.css";
import Header from "./components/Header";
function App() {
  return (
    <div className="min-h-dvh bg-radial">
      <Header />
      <main className="mx-10 my-15 justify-center flex">
        <div className="flex flex-col gap-2">
          <input
            type="file"
            name="image"
            className="p-4 border"
            accept=".png, .jpg, .jpeg, .webp"
          ></input>
          <button className="p-2 cursor-pointer bg-secundario text-white rounded-sm font-botoes text-lg hover:scale-110 duration-300 transition">
            Enviar
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
