import homeSections from '../../content/home-sections.json';
import { motion } from "motion/react";
import { UserPlus, CreditCard, LayoutDashboard, Rocket } from "lucide-react";

const processIcons=[UserPlus,CreditCard,LayoutDashboard,Rocket];
const steps=homeSections.process.steps.map((item,index)=>({...item,desc:item.description,icon:processIcons[index%processIcons.length]}));

export function Process() {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">
            {homeSections.process.heading}
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            {homeSections.process.description}
          </p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-8 inline-block">
                  <div className={`h-24 w-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:scale-110 group-hover:border-blue-500/30 group-hover:bg-blue-600/10`}>
                    <step.icon className={`h-10 w-10 text-blue-500`} />
                  </div>
                  <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-lg">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-bold font-display mb-4">{step.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
