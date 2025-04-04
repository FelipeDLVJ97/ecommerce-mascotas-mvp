"use client";

import React from "react";

export default function PetEcommerceMVP() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 px-4 py-6 sm:px-6 lg:px-8 font-sans text-gray-800">
      <section className="mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Bienvenido a <span className="text-pink-500">PetLovers+</span>
        </h1>
        <p className="mb-6 text-base sm:text-lg max-w-md mx-auto">
          Suscripciones inteligentes para el bienestar de tu mascota. Alimentos,
          juegos y salud en un solo lugar.
        </p>
        <button className="rounded-2xl px-6 py-2 bg-pink-500 text-white">
          Empieza ahora
        </button>
      </section>
    </div>
  );
}
