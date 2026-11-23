import cms from '../../content/home-extras.json';
import { motion } from "motion/react";
import { BadgeDollarSign, ListChecks, LayoutGrid, Headphones } from "lucide-react";

const icons=[BadgeDollarSign,ListChecks,LayoutGrid,Headphones];
const items=cms.whyChoose.items.map((item,index)=>({...item,desc:item.description,icon:icons[index%icons.length]}));

export function WhyChoose() {
  return (
    <section id="features" className="scroll-mt-24 py-24 bg-black relative overflow-hidden">
      <div className="blue-glow -top-40 -right-40 w-[600px] h-[600px] opacity-10" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold font-display mb-6"
          >
            {cms.whyChoose.heading}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-[2.5rem] hover:border-blue-500/30 transition-all"
            >
              <div className="h-12 w-12 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-6">
                <item.icon className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold font-display mb-3">{item.title}</h3>
              <p className="text-zinc-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

