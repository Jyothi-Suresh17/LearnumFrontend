import React, { Children, createContext, useState } from 'react'

export const editResponseContext = createContext({})

function DataShare({children}) {

  const [editResponse,setEditResponse] = useState({})

  return (
   <>
<editResponseContext.Provider value={{editResponse,setEditResponse}}>

{children}
</editResponseContext.Provider>

   
   </>
  )
}

export default DataShare