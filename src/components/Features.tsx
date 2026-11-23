import homeSections from '../../content/home-sections.json';
import { Zap, Shield, Clock, Headphones, Globe, Lock } from "lucide-react";

const featureIcons=[Zap, Shield, Headphones, Lock, Globe, Clock];
const featureColors=['text-yellow-500','text-blue-500','text-purple-500','text-green-500','text-indigo-500','text-red-500'];
const features=homeSections.features.items.map((item,index)=>({...item,icon:featureIcons[index%featureIcons.length],color:featureColors[index%featureColors.length]}));

export function Features() {
  return (
    <section id="features" className="py-20 bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-6">
              <div className="shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800">
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 font-display">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
