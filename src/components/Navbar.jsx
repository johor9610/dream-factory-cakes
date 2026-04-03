import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import useScrolled from '../hooks/useScrolled'

const WA_LINK = 'https://wa.me/573001234567?text=Hola%2C%20me%20gustar%C3%ADa%20cotizar%20una%20torta'

export default function Navbar() {
  const scrolled = useScrolled(60)
  const [open, setOpen] = useState(false)

  const navLinks = [
    { label: 'Colección', href: '#coleccion' },
    { label: 'Historia', href: '#historia' },
    { label: 'Pedidos', href: '#pedidos' },
  ]

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      className="fixed top-4 left-4 right-4 z-50"
    >
      <nav
        className={`
          mx-auto max-w-6xl rounded-2xl px-6 py-3 flex items-center justify-between
          transition-all duration-300
          ${scrolled
            ? 'bg-[#FEF3C7]/80 backdrop-blur-md border border-[#FDE68A] shadow-[0_4px_24px_rgba(120,53,15,0.12)]'
            : 'bg-transparent border border-transparent'
          }
        `}
      >
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none cursor-pointer">
          <span className="font-serif text-xl font-semibold text-[#78350F] tracking-wide">
            Dream Factory
          </span>
          <span className="font-serif text-sm font-normal text-[#CA8A04] tracking-[0.18em] uppercase">
            Cakes
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-sm font-medium text-[#44403C] hover:text-[#78350F] transition-colors duration-200 tracking-wide cursor-pointer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 btn-gold bg-[#CA8A04] hover:bg-[#78350F] text-white font-sans text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-200 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Pedir Ahora
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 cursor-pointer p-1"
          aria-label="Abrir menú"
        >
          <span className={`block w-6 h-0.5 bg-[#78350F] transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#78350F] transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#78350F] transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-2 mx-auto max-w-6xl rounded-2xl bg-[#FEF3C7]/95 backdrop-blur-md border border-[#FDE68A] shadow-[0_8px_32px_rgba(120,53,15,0.14)] px-6 py-5 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-sans text-base font-medium text-[#44403C] hover:text-[#78350F] transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold bg-[#CA8A04] hover:bg-[#78350F] text-white font-sans text-sm font-semibold px-5 py-3 rounded-xl text-center transition-colors duration-200 cursor-pointer"
            >
              Pedir Ahora
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
