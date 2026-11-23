import labels from '../../content/ui-labels.json';
import {
  BarChart3,
  BookOpen,
  Bot,
  Briefcase,
  CheckCircle2,
  Compass,
  FileText,
  Globe,
  Headphones,
  Layers,
  LineChart,
  Palette,
  PenLine,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Video,
  Zap,
  Crown,
  Shield,
  Images,
} from "lucide-react";
import type { ElementType } from "react";
import { motion } from "motion/react";
import { shopCartUrl } from "../data/shopLinks";
import cmsPricing from "../../content/plans.json";

type PlanFeature = {
  label: string;
  icon: ElementType;
};

const originalPlans = [
  {
    name: "Lite Essentials",
    price: "10",
    buyNowHref: shopCartUrl(207),
    description: "Best for beginners who want cheap SEO tools group buy access to get started fast.",
    features: [
      { label: "Keyword research essentials", icon: Search },
      { label: "Basic site audit checks", icon: ShieldCheck },
      { label: "Simple design tools", icon: Palette },
      { label: "Learning resources", icon: BookOpen },
      { label: "Email support", icon: Headphones },
    ] satisfies PlanFeature[],
    popular: false,
    icon: Globe,
    color: "blue"
  },
  {
    name: "Growth Starter",
    price: "15",
    buyNowHref: shopCartUrl(4),
    description: "Most balanced SEO group buy plan for daily work on client sites and content.",
    features: [
      { label: "Full SEO toolkit access", icon: Layers },
      { label: "Keyword research + tracking", icon: LineChart },
      { label: "AI writing support", icon: Bot },
      { label: "Design & graphics tools", icon: Images },
      { label: "Priority help", icon: Headphones },
    ] satisfies PlanFeature[],
    popular: true,
    icon: Zap,
    color: "blue"
  },
  {
    name: "Ahrefs\u00A0Power\u00A0Bundle",
    price: "25",
    buyNowHref: shopCartUrl(13),
    description: "For heavy research days when you need Ahrefs group buy style depth plus more.",
    features: [
      { label: "Backlink research workflows", icon: Compass },
      { label: "Competitor analysis", icon: BarChart3 },
      { label: "Advanced audits & reports", icon: FileText },
      { label: "Content planning tools", icon: Sparkles },
      { label: "Faster support response", icon: Headphones },
    ] satisfies PlanFeature[],
    popular: false,
    icon: Shield,
    color: "purple"
  }
  ,
  {
    name: "Writer Toolkit",
    price: "15",
    buyNowHref: shopCartUrl(11),
    description: "Made for writers who want SEO content tools, checks, and fast drafts in one place.",
    features: [
      { label: "AI writing suite", icon: Bot },
      { label: "Grammar and tone checks", icon: CheckCircle2 },
      { label: "Plagiarism style checks", icon: ShieldCheck },
      { label: "Content research tools", icon: Search },
      { label: "Ready to publish templates", icon: FileText },
    ] satisfies PlanFeature[],
    popular: false,
    icon: PenLine,
    color: "blue"
  },
  {
    name: "Designer Pack",
    price: "10",
    buyNowHref: shopCartUrl(12),
    description: "For creatives who need quick designs, thumbnails, and social posts without extra cost.",
    features: [
      { label: "Design software access", icon: Palette },
      { label: "Premium templates", icon: Layers },
      { label: "Stock images and icons", icon: Images },
      { label: "Video tools for reels", icon: Video },
      { label: "Brand kit basics", icon: Briefcase },
    ] satisfies PlanFeature[],
    popular: false,
    icon: Palette,
    color: "purple"
  },
  {
    name: "Mega All-Access",
    price: "50",
    buyNowHref: shopCartUrl(97),
    description: "All access bundle for teams that need everything from SEO to e‑commerce research.",
    features: [
      { label: "All premium tools unlocked", icon: Crown },
      { label: "SEO + content + design stack", icon: Layers },
      { label: "E‑commerce research suite", icon: ShoppingBag },
      { label: "Learning platform access", icon: BookOpen },
      { label: "Best support priority", icon: Headphones },
    ] satisfies PlanFeature[],
    popular: false,
    icon: Crown,
    color: "blue"
  },
];
const plans=cmsPricing.plans.map((edited,index)=>{
  const original=originalPlans[index]||originalPlans[0];
  const iconPool=original.features;
  return {...original,
    name:edited.name||original.name,
    price:edited.price||original.price,
    description:edited.description||original.description,
    buyNowHref:edited.buyNowHref||original.buyNowHref,
    popular:typeof edited.popular==='boolean'?edited.popular:original.popular,
    color:edited.color||original.color,
    features:(edited.features||[]).map((label,i)=>({label,icon:iconPool[i%iconPool.length]?.icon||Search}))
  };
});

export function Pricing({showIntro = true}: {showIntro?: boolean}) {
  return (
    <section id="pricing" className="scroll-mt-24 py-24 relative overflow-hidden bg-black">
      <div className="blue-glow -bottom-20 -right-20 w-[600px] h-[600px] opacity-10" />
      
      <div className="container mx-auto px-4">
        {showIntro ? (
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">{labels.pricing.heading}</h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                {labels.pricing.description}
              </p>
            </motion.div>
          </div>
        ) : (
          <h2 className="sr-only">{labels.pricing.available}</h2>
        )}

        <div className={`grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto ${showIntro ? '' : 'mt-4'}`}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative glass-card p-10 rounded-[3rem] flex flex-col transition-all hover:scale-[1.02] ${plan.popular ? 'border-blue-500/50 ring-1 ring-blue-500/20 shadow-[0_0_40px_-12px_rgba(59,130,246,0.3)]' : 'border-white/5'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <div className={`h-12 w-12 rounded-2xl bg-${plan.color}-500/10 flex items-center justify-center mb-6`}>
                  <plan.icon className={`h-6 w-6 text-${plan.color}-500`} />
                </div>
                <h3 className="text-2xl font-bold font-display mb-2">{plan.name}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-bold font-display tracking-tighter">${plan.price}</span>
                  <span className="text-zinc-500 font-medium">{labels.pricing.perMonth}</span>
                </div>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature) => (
                  <div key={feature.label} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                      <feature.icon className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="text-zinc-300 text-sm">{feature.label}</span>
                  </div>
                ))}
              </div>

              <a
                href={plan.buyNowHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-16 w-full items-center justify-center rounded-2xl text-lg font-bold transition-all ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 text-white' : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'}`}
              >
                Buy Now
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
