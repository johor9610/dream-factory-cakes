import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const WA_LINK = 'https://wa.me/573001234567?text=Hola%2C%20me%20gustar%C3%ADa%20cotizar%20una%20torta'

const headline = ['Si lo imaginas,', 'lo horneamos.']

const wordVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: 'easeOut', delay: 0.6 + i * 0.12 },
  }),
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -top-[10%] -bottom-[10%]"
      >
        <img
          src="/images/professional/jardin-encantado-ia-1.png"
          alt="Torta personalizada Dream Factory Cakes"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Layered gradient overlay — warm, not too dark */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#78350F]/70 via-[#92400E]/50 to-[#1C1917]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/40 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="h-px w-8 bg-[#CA8A04]" />
          <span className="font-sans text-xs font-semibold text-[#FDE68A] tracking-[0.2em] uppercase">
            Diseños Exclusivos · Barranquilla
          </span>
          <span className="h-px w-8 bg-[#CA8A04]" />
        </motion.div>

        {/* Headline */}
        <h1 className="font-serif font-semibold text-[#FAFAF9] leading-[1.1] mb-6"
          style={{ fontSize: 'clamp(2.6rem, 7vw, 5.5rem)' }}
        >
          {headline.map((line, lineIdx) => (
            <span key={lineIdx} className="block overflow-hidden">
              {line.split(' ').map((word, wordIdx) => {
                const globalIdx = headline.slice(0, lineIdx).join(' ').split(' ').filter(Boolean).length + wordIdx
                return (
                  <motion.span
                    key={wordIdx}
                    custom={globalIdx}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block mr-[0.22em]"
                  >
                    {word}
                  </motion.span>
                )
              })}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="font-sans font-light text-[#FDE68A]/90 mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)' }}
        >
          Tortas únicas hechas a mano para celebraciones que merecen lo mejor.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#coleccion"
            className="cursor-pointer font-sans font-semibold text-sm px-8 py-3.5 rounded-xl bg-[#FAFAF9] text-[#78350F] hover:bg-[#FDE68A] transition-colors duration-200 tracking-wide"
          >
            Ver Colección
          </a>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold cursor-pointer font-sans font-semibold text-sm px-8 py-3.5 rounded-xl bg-[#CA8A04] text-white hover:bg-[#78350F] transition-colors duration-200 tracking-wide flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Cotizar por WhatsApp
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById('coleccion')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="font-sans text-[10px] text-[#FDE68A]/70 tracking-[0.2em] uppercase">Descubrir</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <svg className="w-5 h-5 text-[#CA8A04]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
