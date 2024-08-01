/* eslint-disable react/prop-types */
import { useState } from "react";
import { uploadToDb } from "../lib/utils";

export default function Form({ resetFlow, prize }) {
  const [data, setData] = useState({ name: "", email: "", id: "", phone: "" });

  const [error, setError] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit() {
    if (
      data.name === "" ||
      data.email === "" ||
      data.id === "" ||
      data.phone === ""
    ) {
      setError(true);
      return;
    } else {
      setError(false);
      await uploadToDb(data.name, data.email, data.id, data.phone, prize);
      resetFlow();
    }
  }

  return (
    <form className="w-1/3 flex flex-col text-white gap-2">
      <div className="flex flex-col">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          value={data.name}
          autoComplete="off"
          className="rounded-md text-black px-3 py-1"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col text-white">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={data.email}
          autoComplete="off"
          className="rounded-md text-black px-3 py-1"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col text-white">
        <label htmlFor="id">Cedula</label>
        <input
          id="id"
          name="id"
          type="number"
          value={data.id}
          autoComplete="off"
          className="rounded-md text-black px-3 py-1"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col text-white">
        <label htmlFor="phone">Celular</label>
        <input
          id="phone"
          name="phone"
          type="number"
          value={data.phone}
          autoComplete="off"
          className="rounded-md text-black px-3 py-1"
          onChange={handleChange}
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
