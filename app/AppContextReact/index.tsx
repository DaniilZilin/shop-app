import React from 'react'

export interface AuthContextInterface {
  user: string | null
}

const AppContextReact = React.createContext<AuthContextInterface | null>(null)
export default AppContextReact

export interface Props {
  children: React.ReactNode
}

export function AppReact({ children }: Props) {
  const [ loading, setLoadingState ] = React.useState<boolean>(false)
  const [ user, setUser ] = React.useState<string>('awd')


  const contextData: AuthContextInterface = {
    user: user
  }

  return (
    <AppContextReact.Provider value={contextData}>
      {loading ? null : children}
    </AppContextReact.Provider>
  )
}