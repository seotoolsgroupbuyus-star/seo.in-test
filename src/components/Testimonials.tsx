import homeSections from '../../content/home-sections.json';
import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const testimonials = homeSections.testimonials.items;

export function Testimonials() {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="purple-glow -top-40 -right-40 w-[600px] h-[600px] opacity-10" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">
            {homeSections.testimonials.heading}
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            {homeSections.testimonials.description}
          </p>
        </div>

        <h3 className="text-2xl font-bold font-display mb-8 text-center">
          {homeSections.testimonials.subheading}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card relative group hover:border-blue-500/30 transition-all p-6 rounded-[2rem]"
            >
              <Quote className="absolute top-5 right-5 h-10 w-10 text-blue-500/10 group-hover:text-blue-500/20 transition-colors" />
              
              <div className="flex items-center gap-1 text-yellow-500 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>

              <p className="text-sm text-zinc-300 mb-5 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <div
                  className="h-11 w-11 rounded-2xl border border-white/10 bg-white/5 grid place-items-center text-white font-bold text-sm"
                  aria-hidden="true"
                >
                  {testimonial.name
                    .split(" ")
                    .slice(0, 2)
                    .map((p) => p[0])
                    .join("")
                    .toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-xs text-zinc-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Real Brand Logos (Simulated with text for reliability) */}
          {["FORBES", "TECHCRUNCH", "WIRED", "THE VERGE", "ENTREPRENEUR"].map(brand => (
            <span key={brand} className="text-2xl font-black tracking-tighter font-display">{brand}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
