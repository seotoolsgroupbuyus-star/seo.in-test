import cms from '../../content/home-extras.json';
import { motion } from "motion/react";
import { TrendingDown, Check, X, ArrowRight } from "lucide-react";
import {SHOP_SIGNUP_URL} from '../data/shopLinks';

const comparisonData=cms.priceComparison.tools;

export function PriceComparison() {
  const totalOriginal = comparisonData.reduce((acc, item) => acc + item.original, 0);

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-display mb-6"
          >
            {cms.priceComparison.heading}
          </motion.h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            {cms.priceComparison.description}
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            <div className="glass-card rounded-[2.5rem] p-8 border-white/5">
              <h3 className="text-2xl font-bold font-display mb-3">{cms.priceComparison.cards[0].heading}</h3>
              <p className="text-zinc-500 leading-relaxed">
                {cms.priceComparison.cards[0].description}
              </p>
            </div>
            <div className="glass-card rounded-[2.5rem] p-8 border-white/5">
              <h3 className="text-2xl font-bold font-display mb-3">{cms.priceComparison.cards[1].heading}</h3>
              <p className="text-zinc-500 leading-relaxed">
                {cms.priceComparison.cards[1].description}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-[3rem] border-white/10 overflow-hidden shadow-2xl">
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-3 gap-4 mb-8 text-xs font-bold uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-6">
                <span>Premium Tool</span>
                <span className="text-center">Individual Price</span>
                <span className="text-right text-blue-500">Our Price</span>
              </div>

              <div className="space-y-6">
                {comparisonData.map((item, i) => (
                  <motion.div 
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="grid grid-cols-3 gap-4 items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center p-1.5">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${item.name.toLowerCase().split(' ')[0]}.com&sz=64`}
                          alt={item.name}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="font-bold text-sm md:text-base">{item.name}</span>
                    </div>
                    <div className="text-center text-zinc-500 font-mono text-sm line-through decoration-red-500/50">
                      ${item.original}/mo
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-500/20">
                        <Check className="h-3 w-3" /> {item.our}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 pt-12 border-t border-white/5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-center md:text-left">
                    <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold mb-2">Total Monthly Value</p>
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-bold font-display line-through text-zinc-700">${totalOriginal}</span>
                      <ArrowRight className="text-zinc-700" />
                      <span className="text-5xl font-bold font-display text-blue-500">$25</span>
                    </div>
                  </div>
                  <div className="bg-blue-600/10 border border-blue-500/20 rounded-3xl p-6 text-center">
                    <p className="text-blue-400 font-bold text-2xl mb-1">Save 98%</p>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Every Single Month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <a
              href={SHOP_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-16 items-center justify-center gap-2 rounded-full bg-blue-600 px-12 text-lg font-bold text-white shadow-2xl shadow-blue-600/20 transition-colors hover:bg-blue-700"
            >
              Start Saving Now <TrendingDown className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
