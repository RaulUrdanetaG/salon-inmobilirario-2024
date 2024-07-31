/* eslint-disable react/prop-types */
import { useState } from "react";
import { uploadToDb } from "../lib/utils";

export default function Form({ resetFlow, prize }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  const [error, setError] = useState(false);

  function handleChange(type, value) {
    if (type === "name") {
      setName(value);
    }

    if (type === "email") {
      setEmail(value);
    }

    if (type === "id") {
      setId(value);
    }
  }

  async function handleSubmit() {
    if (name === "" || email === "" || id === "") {
      setError(true);
      return;
    } else {
      setError(false);
      await uploadToDb(name, email, id, prize);
      resetFlow();
    }
  }

  return (
    <form className="w-1/3 flex flex-col text-white gap-2">
      <div className="flex flex-col">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          type="text"
          value={name}
          autoComplete="off"
          className="rounded-md text-black px-3 py-1"
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>
      <div className="flex flex-col text-white">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          autoComplete="off"
          className="rounded-md text-black px-3 py-1"
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>
      <div className="flex flex-col text-white">
        <label htmlFor="id">Cedula</label>
        <input
          id="id"
          type="number"
          value={id}
          autoComplete="off"
          className="rounded-md text-black px-3 py-1"
          onChange={(e) => handleChange("id", e.target.value)}
        />
      </div>
      {error && (
        <div className="text-white">Por favor rellene todos los campos</div>
      )}
      <button
        type="button"
        className="px-5 py-2 bg-red-500 rounded-lg"
        onClick={handleSubmit}
      >
        Enviar
      </button>
    </form>
  );
}
