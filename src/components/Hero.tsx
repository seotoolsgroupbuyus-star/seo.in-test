import labels from '../../content/ui-labels.json';
import { motion } from "motion/react";
import { ArrowRight, Zap, TrendingUp, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import {SHOP_SIGNUP_URL} from "../data/shopLinks";
import homepage from "../../content/homepage.json";

const SIGNUP_URL = SHOP_SIGNUP_URL;

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="blue-glow pointer-events-none -top-20 -left-20 w-[600px] h-[600px] opacity-30" />
      <div className="purple-glow pointer-events-none bottom-0 right-0 w-[500px] h-[500px] opacity-20" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 -z-20 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-sm font-medium text-blue-400 mb-8">
              <ShieldCheck className="h-4 w-4" />
              {homepage.badge}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-display mb-8 leading-[1.1]">
              {homepage.heading} <br />
              <span className="gradient-text">{homepage.headingAccent}</span>
            </h1>
            
            <p className="text-xl text-zinc-400 mb-10 leading-relaxed max-w-xl">
              {homepage.description}
            </p>

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={homepage.primaryUrl || SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-blue-600 px-10 text-lg font-bold text-white transition-colors hover:bg-blue-700"
              >
                {homepage.primaryButton} <ArrowRight className="h-5 w-5" />
              </a>
              <Link
                to={homepage.secondaryUrl || "/all-tools"}
                className="inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-full border border-white/10 px-10 text-lg font-bold text-white transition-colors hover:bg-white/5"
              >
                {homepage.secondaryButton}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            {/* High Fidelity Member Portal Preview */}
            <div className="glass-card rounded-[2.5rem] p-1 overflow-hidden shadow-2xl border-white/10">
              <div className="bg-zinc-950 rounded-[2.3rem] overflow-hidden aspect-square md:aspect-video relative p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white">S</div>
                    <span className="font-bold text-sm tracking-tight">{labels.hero.portalTitle}</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{labels.hero.liveStatus}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {labels.hero.tools.map((tool, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center group hover:bg-white/10 transition-colors">
                      <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center p-2 mb-3 shadow-lg">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=128`}
                          alt={tool.name}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <p className="text-xs font-bold mb-3">{tool.name}</p>
                      <button className="w-full py-1.5 bg-blue-600/20 text-blue-400 text-[10px] font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                        {labels.hero.accessLabel}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -top-10 -right-10 glass-card p-6 rounded-3xl z-20 shadow-2xl border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">{labels.hero.savingsLabel}</p>
                  <p className="text-2xl font-bold font-display text-green-500">{labels.hero.savingsValue}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="pointer-events-none absolute -bottom-10 -left-10 glass-card p-6 rounded-3xl z-20 shadow-2xl border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">{labels.hero.uptimeLabel}</p>
                  <p className="text-2xl font-bold font-display text-blue-500">{labels.hero.uptimeValue}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
