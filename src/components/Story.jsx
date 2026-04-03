import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const pills = ['Diseño Exclusivo', 'Ingredientes Premium', 'Creatividad sin límites']

export default function Story() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="historia"
      ref={ref}
      className="py-24 px-6 bg-[#FAFAF9] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Text — slides from left */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-[#CA8A04]" />
            <span className="font-sans text-xs font-semibold text-[#CA8A04] tracking-[0.2em] uppercase">
              Nuestra Historia
            </span>
          </div>

          <h2
            className="font-serif font-medium text-[#1C1917] leading-tight mb-6"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
          >
            Cada torta es<br />
            <em className="not-italic text-[#78350F]">una obra de arte</em>
          </h2>

          <div className="space-y-4 mb-8">
            <p className="font-sans text-sm text-[#44403C] leading-[1.8]">
              En Dream Factory Cakes creemos que cada celebración merece algo único.
              No usamos moldes genéricos ni decoraciones de catálogo — cada diseño
              nace de una conversación contigo y toma vida en nuestro taller creativo
              en Barranquilla.
            </p>
            <p className="font-sans text-sm text-[#44403C] leading-[1.8]">
              Desde los primeros bocetos hasta el último detalle en azúcar, cada pieza
              es creada con materiales premium y el cuidado de quien entiende que una
              torta no es solo comida — es el centro de un recuerdo que dura para siempre.
            </p>
          </div>

          {/* Pills */}
          <div className="flex flex-wrap gap-3">
            {pills.map((pill, i) => (
              <motion.span
                key={pill}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                className="font-sans text-xs font-semibold text-[#78350F] bg-[#FEF3C7] border border-[#FDE68A] px-4 py-2 rounded-full tracking-wide"
              >
                {pill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Image — slides from right */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, ease: 'easeOut', delay: 0.15 }}
          className="relative"
        >
          {/* Gold accent frame */}
          <div
            className="absolute -top-4 -right-4 w-full h-full rounded-3xl border-2 border-[#FDE68A]"
            style={{ zIndex: 0 }}
          />
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5]" style={{ zIndex: 1 }}>
            <img
              src="/images/professional/alice-pro-ia-2.jpg"
              alt="Creación de torta personalizada en Dream Factory Cakes"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            {/* Warm tint */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#78350F]/10 to-transparent" />
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="absolute -bottom-5 -left-5 bg-[#78350F] text-[#FEF3C7] rounded-2xl px-5 py-4 shadow-[0_8px_32px_rgba(120,53,15,0.3)]"
            style={{ zIndex: 2 }}
          >
            <p className="font-serif text-3xl font-semibold text-[#FDE68A] leading-none">+200</p>
            <p className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase mt-0.5">
              Familias felices
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
