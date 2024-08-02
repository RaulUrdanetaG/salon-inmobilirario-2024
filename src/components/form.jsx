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
        <label htmlFor="name" className="text-xl">
          Nombre:
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={data.name}
          autoComplete="off"
          className="rounded-md text-xl text-white px-3 py-2 border-[1.5px] border-[#fef39e] bg-[#e30613] shadow-lg"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col text-white">
        <label htmlFor="email" className="text-xl">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={data.email}
          autoComplete="off"
          className="rounded-md text-xl text-white px-3 py-2 border-[1.5px] border-[#fef39e] bg-[#e30613] shadow-lg"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col text-white">
        <label htmlFor="id" className="text-xl">Cedula:</label>
        <input
          id="id"
          name="id"
          type="number"
          value={data.id}
          autoComplete="off"
          className="rounded-md text-xl text-white px-3 py-2 border-[1.5px] border-[#fef39e] bg-[#e30613] shadow-lg"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col text-white">
        <label htmlFor="phone" className="text-xl">Telefono:</label>
        <input
          id="phone"
          name="phone"
          type="number"
          value={data.phone}
          autoComplete="off"
          className="rounded-md text-xl text-white px-3 py-2 border-[1.5px] border-[#fef39e] bg-[#e30613] shadow-lg"
          onChange={handleChange}
        />
      </div>
      {error && (
        <div className="text-white">Por favor rellene todos los campos</div>
      )}
      <button
        type="button"
        className="px-5 py-2 text-xl bg-red-500 rounded-lg border-[1.5px] border-[#fef39e]"
        onClick={handleSubmit}
      >
        Enviar
      </button>
    </form>
  );
}
