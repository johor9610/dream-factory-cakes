import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const testimonials = [
  {
    quote: 'La torta de Alicia superó todas las expectativas. Mi hija lloró de emoción cuando la vio.',
    name: 'Laura M.',
    role: 'Mamá de Valentina',
    initial: 'L',
  },
  {
    quote: 'Increíble detalle y sabor. Todo Barranquilla preguntó dónde la compramos.',
    name: 'Carlos R.',
    role: 'Papá de Mateo',
    initial: 'C',
  },
  {
    quote: 'El diseño del jardín encantado fue exactamente lo que soñé. Arte puro.',
    name: 'Andrea P.',
    role: 'Mamá de Luciana',
    initial: 'A',
  },
]

const galleryImages = [
  { src: '/images/portfolio/alicia-2.jpg', alt: 'Torta Alicia detalle', tilt: 'tilt-left' },
  { src: '/images/portfolio/gnomo-2.jpg', alt: 'Torta Gnomo', tilt: 'tilt-right' },
  { src: '/images/portfolio/jardin-encantado-2.jpg', alt: 'Torta Jardín Encantado', tilt: 'tilt-none' },
  { src: '/images/portfolio/pinocho-1.jpg', alt: 'Torta Pinocho', tilt: 'tilt-left2' },
  { src: '/images/portfolio/safari-2.jpg', alt: 'Torta Safari', tilt: 'tilt-right2' },
]

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#CA8A04]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
}

export default function SocialProof() {
  const ref = useRef(null)
  const galleryRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const galleryInView = useInView(galleryRef, { once: true, margin: '-60px' })

  return (
    <section className="py-24 bg-[#FEF3C7] overflow-hidden">
      <div className="px-6 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-[#CA8A04]" />
            <span className="font-sans text-xs font-semibold text-[#CA8A04] tracking-[0.2em] uppercase">
              Testimonios
            </span>
            <span className="h-px w-8 bg-[#CA8A04]" />
          </div>
          <h2
            className="font-serif font-medium text-[#1C1917] leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Lo que dicen nuestras familias
          </h2>
        </motion.div>

        {/* Testimonial cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariant}
              className="bg-[#FAFAF9] rounded-2xl p-7 border border-[#FDE68A]/60"
              style={{ boxShadow: '0 4px 24px rgba(120,53,15,0.07)' }}
            >
              <StarRating />
              <blockquote className="font-serif italic text-[#1C1917] mt-4 mb-6 leading-relaxed"
                style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)' }}
              >
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#78350F] flex items-center justify-center flex-shrink-0">
                  <span className="font-serif font-semibold text-[#FDE68A] text-sm">{t.initial}</span>
                </div>
                <div>
                  <p className="font-sans text-sm font-semibold text-[#1C1917]">{t.name}</p>
                  <p className="font-sans text-xs text-[#44403C]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Gallery strip — full width */}
      <motion.div
        ref={galleryRef}
        initial={{ opacity: 0, x: 80 }}
        animate={galleryInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="px-6"
      >
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {galleryImages.map((img, i) => (
            <div
              key={img.src}
              className={`flex-shrink-0 w-52 h-64 rounded-xl overflow-hidden ${img.tilt} cursor-pointer`}
              style={{
                boxShadow: '0 8px 32px rgba(120,53,15,0.18)',
                transition: 'transform 300ms ease, box-shadow 300ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotate(0deg) scale(1.03)'
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(120,53,15,0.28)'
              }}
              onMouseLeave={(e) => {
                const tilts = {
                  'tilt-left': 'rotate(-2deg)',
                  'tilt-right': 'rotate(2deg)',
                  'tilt-none': 'rotate(0deg)',
                  'tilt-left2': 'rotate(-1deg)',
                  'tilt-right2': 'rotate(1.5deg)',
                }
                e.currentTarget.style.transform = tilts[img.tilt] || 'rotate(0deg)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(120,53,15,0.18)'
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Gallery label */}
        <div className="flex items-center gap-2 mt-5 px-0 max-w-6xl mx-auto">
          <svg className="w-4 h-4 text-[#CA8A04]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <path strokeLinecap="round" d="M8.5 12.5l2.5 2.5 4.5-5" />
          </svg>
          <span className="font-sans text-xs font-medium text-[#44403C] tracking-[0.12em] uppercase">
            Galería · Trabajos reales
          </span>
        </div>
      </motion.div>
    </section>
  )
}
