import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'

export default function useAuth() {
  const context = useContext(AuthContext)

  if(!context){
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')

  }

  return context
}