import { motion } from 'framer-motion'

export function BentoCard({ 
  title, 
  children, 
  className = "", 
  icon: Icon,
  delay = 0 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-card p-6 relative overflow-hidden group ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        {Icon && <Icon className="w-5 h-5 text-accent/80" />}
        <h3 className="font-heading font-semibold text-lg text-foreground/90">{title}</h3>
      </div>
      
      <div className="relative z-10 w-full h-full">
        {children}
      </div>

      {/* Subtle hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.div>
  )
}
