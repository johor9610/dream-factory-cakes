import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const products = [
  {
    title: 'Alicia en el País de las Tortas',
    subtitle: 'Una historia hecha azúcar',
    image: '/images/portfolio/alicia-1.jpg',
    tag: 'Temático',
    description: 'Diseño personalizado inspirado en el cuento clásico, con detalles únicos y acabados de alta calidad en cada capa.',
  },
  {
    title: 'El Jardín Encantado',
    subtitle: 'Flores que se pueden comer',
    image: '/images/professional/jardin-encantado-ia-1.png',
    tag: 'Floral',
    description: 'Decoración botánica elaborada a mano con flores comestibles y colores vibrantes.',
  },
  {
    title: 'Safari de Sueños',
    subtitle: 'Aventura en cada capa',
    image: '/images/portfolio/safari-1.jpg',
    tag: 'Aventura',
    description: 'Animales y paisajes africanos modelados en azúcar para una fiesta inolvidable.',
  },
  {
    title: 'El Gnomo Mágico',
    subtitle: 'Magia en miniatura',
    image: '/images/professional/gnomo-pro-1.jpg',
    tag: 'Fantasía',
    description: 'Personajes fantásticos con acabados creativos y un nivel de detalle que sorprende en cada pieza.',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      variants={cardVariant}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-[#FAFAF9] rounded-2xl overflow-hidden cursor-pointer"
      style={{
        boxShadow: hovered ? '0 12px 40px rgba(120,53,15,0.18)' : '0 4px 24px rgba(120,53,15,0.10)',
        transition: 'box-shadow 300ms ease, transform 300ms ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        border: hovered ? '1px solid #FDE68A' : '1px solid transparent',
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />
        {/* Tag */}
        <span className="absolute top-4 left-4 font-sans text-[10px] font-semibold text-[#78350F] bg-[#FEF3C7]/90 backdrop-blur-sm px-3 py-1 rounded-full tracking-[0.12em] uppercase">
          {product.tag}
        </span>
        {/* Hover overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#78350F]/60 to-transparent flex items-end p-5 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <p className="font-sans text-xs text-[#FDE68A] leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Text */}
      <div className="p-5">
        <h3
          className="font-serif font-semibold text-[#1C1917] mb-1 leading-tight"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}
        >
          {product.title}
        </h3>
        <p className="font-sans text-xs text-[#44403C] mb-4 tracking-wide">
          {product.subtitle}
        </p>
        <div className="flex items-center gap-1.5 text-[#CA8A04]">
          <span className="font-sans text-xs font-semibold tracking-[0.12em] uppercase">
            Ver detalles
          </span>
          <svg
            className="w-3.5 h-3.5 transition-transform duration-200"
            style={{ transform: hovered ? 'translateX(4px)' : 'translateX(0)' }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.article>
  )
}

export default function Products() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="coleccion" className="py-24 px-6 bg-[#FEF3C7]">
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
              Diseños Únicos
            </span>
            <span className="h-px w-8 bg-[#CA8A04]" />
          </div>
          <h2
            className="font-serif font-medium text-[#1C1917] leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Colección Insignia
          </h2>
          <p className="font-sans text-sm text-[#44403C] mt-3 max-w-md mx-auto leading-relaxed">
            Cada pieza nace de una conversación. Cada diseño es irrepetible.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {products.map((product, i) => (
            <ProductCard key={product.title} product={product} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
