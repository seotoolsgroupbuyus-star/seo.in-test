import labels from '../../content/ui-labels.json';
import cms from '../../content/home-extras.json';
import { motion } from "motion/react";
import { ShieldCheck, MessageCircle } from "lucide-react";
import site from '../../content/site.json';

const toolsStatus = cms.status.tools;

export function SystemStatus() {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              <ShieldCheck className="h-4 w-4" />
              {cms.status.badge}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">{cms.status.heading}</h2>
            <p className="text-xl text-zinc-400">{cms.status.description}</p>
          </div>
          <a href={site.header.signupUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-blue-500/30 bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500 transition-colors">
            Check plans and access
          </a>
        </div>
        <h3 className="text-2xl font-bold font-display mb-8">{cms.status.supportedHeading}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {toolsStatus.map((tool, i) => (
            <motion.div key={tool.name} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="glass-card p-5 rounded-2xl border border-white/10 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold">{tool.name[0]}</span>
              <span className="font-semibold">{tool.name}</span>
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-sm text-zinc-500 flex items-center gap-2">
          <MessageCircle className="h-4 w-4 shrink-0" />
          Service status is not monitored live on this page. Contact support to confirm current access.
        </p>
      </div>
    </section>
  );
}
