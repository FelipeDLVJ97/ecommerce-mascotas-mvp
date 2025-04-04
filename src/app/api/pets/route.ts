import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: pets, error } = await supabase
      .from('pets')
      .select(`
        *,
        tutors (
          name,
          email,
          phone
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: 'Error al obtener las mascotas' },
        { status: 500 }
      )
    }

    return NextResponse.json(pets)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 