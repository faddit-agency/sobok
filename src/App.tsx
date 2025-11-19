import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { ScrollToTop } from "./components/ScrollToTop"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Inquiry } from "./pages/Inquiry"
import { Works } from "./pages/Works"
import { FAQ } from "./pages/FAQ"
import { Privacy } from "./pages/Privacy"

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/works" element={<Works />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
