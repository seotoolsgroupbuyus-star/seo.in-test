import labels from '../../content/ui-labels.json';
import cms from '../../content/home-extras.json';
import { motion } from "motion/react";
import { CheckCircle2, AlertCircle, Activity, Server, Cpu, Database } from "lucide-react";

const toolsStatus=cms.status.tools;

export function SystemStatus() {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              {cms.status.badge}
            </div>
            <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">
              {cms.status.heading}
            </h2>
            <p className="text-xl text-zinc-400">
              {cms.status.description}
            </p>
          </div>
          <div className="flex gap-4">
            <div className="glass-card p-4 rounded-2xl text-center min-w-[120px]">
              <p className="text-2xl font-bold font-display">{cms.status.averageUptime}</p>
              <p className="text-xs text-zinc-500 uppercase">{labels.status.uptimeLabel}</p>
            </div>
            <div className="glass-card p-4 rounded-2xl text-center min-w-[120px]">
              <p className="text-2xl font-bold font-display">{cms.status.averageLatency}</p>
              <p className="text-xs text-zinc-500 uppercase">{labels.status.latencyLabel}</p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold font-display mb-8">
          {cms.status.supportedHeading}
        </h3>

        <ul className="mb-10 flex flex-wrap gap-3">
          {toolsStatus.map((t) => (
            <li
              key={t.name}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90"
            >
              {t.name}
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolsStatus.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-3xl group hover:border-blue-500/30 transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {tool.name[0]}
                  </div>
                  <span className="font-bold text-lg">{tool.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-green-500">
                  <CheckCircle2 className="h-4 w-4" />
                  {tool.status}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">{labels.status.responseLabel}</span>
                  <span className="font-mono text-blue-400">{tool.latency}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">{labels.status.uptime30Label}</span>
                  <span className="font-mono text-zinc-300">{tool.uptime}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs uppercase tracking-widest text-zinc-600">
                    <span>{labels.status.loadLabel}</span>
                    <span>{tool.load}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tool.load}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full rounded-full ${tool.load > 80 ? 'bg-red-500' : tool.load > 50 ? 'bg-yellow-500' : 'bg-blue-500'}`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0">
              <Server className="text-blue-500 h-6 w-6" />
            </div>
            <div>
              <p className="font-bold mb-2">{labels.status.cards[0].heading}</p>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {labels.status.cards[0].description}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0">
              <Database className="text-purple-500 h-6 w-6" />
            </div>
            <div>
              <p className="font-bold mb-2">{labels.status.cards[1].heading}</p>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {labels.status.cards[1].description}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center shrink-0">
              <Activity className="text-green-500 h-6 w-6" />
            </div>
            <div>
              <p className="font-bold mb-2">{labels.status.cards[2].heading}</p>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {labels.status.cards[2].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
