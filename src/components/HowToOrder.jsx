import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const WA_LINK = 'https://wa.me/573001234567?text=Hola%2C%20me%20gustar%C3%ADa%20cotizar%20una%20torta'

const steps = [
  {
    number: '01',
    title: 'Cuéntanos',
    description: 'Escríbenos por WhatsApp con tu idea, fecha y número de personas. Cuantos más detalles, mejor.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Diseñamos',
    description: 'Te enviamos un boceto personalizado y confirmamos todos los detalles — colores, capas y sabores.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Celebras',
    description: 'Retira tu torta en nuestro taller o solicitamos entrega a domicilio en Barranquilla.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
      </svg>
    ),
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16 } },
}

const stepVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function HowToOrder() {
  const ref = useRef(null)
  const ctaRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' })

  return (
    <section id="pedidos" className="py-24 px-6 bg-[#FAFAF9]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          ref={ref}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-[#CA8A04]" />
            <span className="font-sans text-xs font-semibold text-[#CA8A04] tracking-[0.2em] uppercase">
              Proceso
            </span>
            <span className="h-px w-8 bg-[#CA8A04]" />
          </div>
          <h2
            className="font-serif font-medium text-[#1C1917] leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Así de fácil es pedir tu torta
          </h2>
          <p className="font-sans text-sm text-[#44403C] mt-3 max-w-sm mx-auto leading-relaxed">
            Tres pasos, cero complicaciones. Tu torta perfecta está a un mensaje de distancia.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Connecting line (desktop only) */}
          <div className="absolute top-[3.25rem] left-[calc(16.66%+1.5rem)] right-[calc(16.66%+1.5rem)] h-px step-line hidden md:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={stepVariant}
              className="relative flex flex-col items-center text-center"
            >
              {/* Number + icon circle */}
              <div className="relative mb-6">
                {/* Outer ring */}
                <div className="w-[104px] h-[104px] rounded-full border-2 border-[#FDE68A] flex items-center justify-center bg-[#FEF3C7]">
                  {/* Inner circle */}
                  <div className="w-16 h-16 rounded-full bg-[#78350F] flex items-center justify-center text-[#FDE68A]">
                    {step.icon}
                  </div>
                </div>
                {/* Step number */}
                <span
                  className="absolute -top-2 -right-2 font-serif font-semibold text-[#CA8A04] leading-none"
                  style={{ fontSize: '2rem' }}
                >
                  {step.number}
                </span>
              </div>

              <h3 className="font-serif font-semibold text-[#1C1917] text-xl mb-3">
                {step.title}
              </h3>
              <p className="font-sans text-sm text-[#44403C] leading-[1.75] max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-3 bg-[#78350F] hover:bg-[#92400E] text-[#FEF3C7] font-sans font-semibold text-sm px-10 py-4 rounded-2xl transition-colors duration-200 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Empezar Mi Pedido
          </a>
          <p className="font-sans text-xs text-[#44403C] mt-4 tracking-wide">
            Respuesta en menos de 24 horas · Barranquilla, Colombia
          </p>
        </motion.div>

      </div>
    </section>
  )
}
