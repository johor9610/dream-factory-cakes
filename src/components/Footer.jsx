import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const WA_LINK = 'https://wa.me/573001234567?text=Hola%2C%20me%20gustar%C3%ADa%20cotizar%20una%20torta'
const IG_LINK = 'https://www.instagram.com/dreamfactorycakes'
const MAIL_LINK = 'mailto:hola@dreamfactorycakes.co'

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer ref={ref} className="bg-[#1C1917] text-[#FEF3C7] pt-16 pb-8 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto"
      >
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 pb-10 border-b border-[#44403C]">

          {/* Logo + tagline */}
          <div>
            <div className="flex flex-col leading-none mb-3">
              <span className="font-serif text-2xl font-semibold text-[#FEF3C7] tracking-wide">
                Dream Factory
              </span>
              <span className="font-serif text-sm font-normal text-[#CA8A04] tracking-[0.18em] uppercase">
                Cakes
              </span>
            </div>
            <p className="font-serif italic text-[#44403C] text-sm leading-relaxed max-w-xs">
              "Si lo imaginas, lo horneamos."
            </p>
            <p className="font-sans text-xs text-[#44403C] mt-2 tracking-wide">
              Barranquilla, Colombia
            </p>
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-3">
            <span className="font-sans text-[10px] font-semibold text-[#44403C] tracking-[0.2em] uppercase">
              Contáctanos
            </span>
            <div className="flex items-center gap-4">
              <a
                href={IG_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Dream Factory Cakes"
                className="w-10 h-10 rounded-xl border border-[#44403C] flex items-center justify-center text-[#FDE68A] hover:border-[#CA8A04] hover:text-[#CA8A04] transition-colors duration-200 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de Dream Factory Cakes"
                className="w-10 h-10 rounded-xl border border-[#44403C] flex items-center justify-center text-[#FDE68A] hover:border-[#CA8A04] hover:text-[#CA8A04] transition-colors duration-200 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href={MAIL_LINK}
                aria-label="Email de Dream Factory Cakes"
                className="w-10 h-10 rounded-xl border border-[#44403C] flex items-center justify-center text-[#FDE68A] hover:border-[#CA8A04] hover:text-[#CA8A04] transition-colors duration-200 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8">
          <p className="font-sans text-xs text-[#44403C]">
            © 2025 Dream Factory Cakes. Hecho con amor.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#CA8A04]" />
            <span className="font-sans text-xs text-[#44403C] tracking-wide">
              Barranquilla, Colombia
            </span>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
