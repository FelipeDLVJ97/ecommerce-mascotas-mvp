export type Tutor = {
  id: string
  name: string
  email: string
  phone: string | null
  address: string | null
  created_at: string
}

export type Pet = {
  id: string
  name: string
  species: string
  breed: string | null
  age: number | null
  tutor_id: string
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      tutors: {
        Row: Tutor
        Insert: Omit<Tutor, 'id' | 'created_at'>
        Update: Partial<Omit<Tutor, 'id' | 'created_at'>>
      }
      pets: {
        Row: Pet
        Insert: Omit<Pet, 'id' | 'created_at'>
        Update: Partial<Omit<Pet, 'id' | 'created_at'>>
      }
    }
  }
} 