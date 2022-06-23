import React, { useState } from "react"


export const MordOSContext = React.createContext<any>(null)


type StoreProviderProps = {
    children?: React.ReactNode
}

export default function StoreProvider({ children }: StoreProviderProps): React.ReactElement {
    const [authenticatedUser, setAuthenticatedUser] = useState(null) 

    return (
        <MordOSContext.Provider value={{
            authenticatedUser,
            setAuthenticatedUser
        }}>
            {children}
        </MordOSContext.Provider>
    )
}