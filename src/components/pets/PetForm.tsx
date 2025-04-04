import { useState } from 'react'
import type { Pet } from '@/types/database'

interface PetFormProps {
  onSubmit: (data: Partial<Pet>) => void
  initialData?: Partial<Pet>
}

export default function PetForm({ onSubmit, initialData = {} }: PetFormProps) {
  const [formData, setFormData] = useState<Partial<Pet>>(initialData)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre de la mascota
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="species" className="block text-sm font-medium text-gray-700">
          Especie
        </label>
        <select
          id="species"
          name="species"
          required
          value={formData.species || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Selecciona una especie</option>
          <option value="perro">Perro</option>
          <option value="gato">Gato</option>
          <option value="ave">Ave</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div>
        <label htmlFor="breed" className="block text-sm font-medium text-gray-700">
          Raza
        </label>
        <input
          type="text"
          id="breed"
          name="breed"
          value={formData.breed || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
          Edad (años)
        </label>
        <input
          type="number"
          id="age"
          name="age"
          min="0"
          step="0.1"
          value={formData.age || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Atrás
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Siguiente
        </button>
      </div>
    </form>
  )
} 