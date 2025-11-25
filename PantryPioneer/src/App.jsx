import "./assets/css/index.css"
import { RouterProvider } from "react-router-dom"
import { router } from "./router.jsx"
import { AuthProvider } from "./context/AuthContext.jsx"
import { PantryProvider } from "./context/PantryContext.jsx"
import { SearchProvider } from "./context/SearchContext.jsx"

function App() {


  return (
    <>
      <h1>App</h1>
      <AuthProvider>
        <PantryProvider>
          <SearchProvider>
            <RouterProvider router={router} />
          </SearchProvider>
        </PantryProvider>
      </AuthProvider>
    </>
  )
}

export default App
