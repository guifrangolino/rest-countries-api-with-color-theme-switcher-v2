
import { Outlet } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { Header } from "./components/Header"
import { ThemeProvider } from "./components/theme-provider"

const queryClient = new QueryClient()

function App() {
  console.log('render')

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Header />
        <Outlet />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
