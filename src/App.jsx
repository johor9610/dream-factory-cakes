import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import Story from './components/Story'
import SocialProof from './components/SocialProof'
import HowToOrder from './components/HowToOrder'
import Footer from './components/Footer'

export default function App() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Products />
      <Story />
      <SocialProof />
      <HowToOrder />
      <Footer />
    </main>
  )
}
