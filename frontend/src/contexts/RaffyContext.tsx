import { createContext, useContext, useState, ReactNode } from 'react'

interface RaffyContextType {
  isOpen: boolean
  openRaffy: () => void
  closeRaffy: () => void
  toggleRaffy: () => void
}

const RaffyContext = createContext<RaffyContextType | undefined>(undefined)

export function RaffyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openRaffy = () => setIsOpen(true)
  const closeRaffy = () => setIsOpen(false)
  const toggleRaffy = () => setIsOpen(prev => !prev)

  return (
    <RaffyContext.Provider value={{ isOpen, openRaffy, closeRaffy, toggleRaffy }}>
      {children}
    </RaffyContext.Provider>
  )
}

export function useRaffy() {
  const context = useContext(RaffyContext)
  if (!context) {
    throw new Error('useRaffy must be used within RaffyProvider')
  }
  return context
}
