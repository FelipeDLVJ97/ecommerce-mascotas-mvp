'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Pet, Tutor } from '@/types/database'
import SuccessModal from '@/components/ui/SuccessModal'

import TutorForm from './TutorForm'
import PetForm from './PetForm'
import ConfirmationStep from './ConfirmationStep'


type WizardStep = 'tutor' | 'pet-details' | 'confirmation'

export default function PetWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<WizardStep>('tutor')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [formData, setFormData] = useState<{
    tutor: Partial<Tutor>
    pet: Partial<Pet>
  }>({
    tutor: {},
    pet: {}
  })

  const handleTutorSubmit = async (tutorData: Partial<Tutor>) => {
    setFormData(prev => ({ ...prev, tutor: tutorData }))
    setCurrentStep('pet-details')
  }

  const handlePetSubmit = async (petData: Partial<Pet>) => {
    setFormData(prev => ({ ...prev, pet: petData }))
    setCurrentStep('confirmation')
  }

  const handleFinalSubmit = async () => {
    try {
      // Primero insertamos el tutor
      const { data: tutorData, error: tutorError } = await supabase
        .from('tutors')
        .insert([formData.tutor])
        .select()
        .single()

      if (tutorError) throw tutorError

      // Luego insertamos la mascota con el ID del tutor
      const { error: petError } = await supabase
        .from('pets')
        .insert([{
          ...formData.pet,
          tutor_id: tutorData.id
        }])

      if (petError) throw petError

      setShowSuccessModal(true)
      setTimeout(() => {
        router.push('/pets')
      }, 2000)
    } catch (error) {
      console.error('Error al guardar:', error)
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Registrar Nueva Mascota</h1>
        <div className="flex justify-between mb-4">
          <div className={`step ${currentStep === 'tutor' ? 'active' : ''}`}>
            1. Datos del Tutor
          </div>
          <div className={`step ${currentStep === 'pet-details' ? 'active' : ''}`}>
            2. Datos de la Mascota
          </div>
          <div className={`step ${currentStep === 'confirmation' ? 'active' : ''}`}>
            3. Confirmación
          </div>
        </div>
      </div>

      {currentStep === 'tutor' && (
        <TutorForm onSubmit={handleTutorSubmit} initialData={formData.tutor} />
      )}
      
      {currentStep === 'pet-details' && (
        <PetForm onSubmit={handlePetSubmit} initialData={formData.pet} />
      )}
      
      {currentStep === 'confirmation' && (
        <ConfirmationStep
          tutorData={formData.tutor}
          petData={formData.pet}
          onSubmit={handleFinalSubmit}
        />
      )}

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message="La mascota ha sido registrada exitosamente. Serás redirigido a la lista de mascotas."
      />
    </div>
  )
} 