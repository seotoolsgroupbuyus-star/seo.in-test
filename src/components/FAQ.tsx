import cms from '../../content/home-extras.json';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";

import faqContent from '../../content/faqs.json';
const faqs = faqContent.faqs;


export function FAQ({showIntro = true}: {showIntro?: boolean}) {
  return (
    <section id="faq" className="scroll-mt-24 py-24 bg-black relative overflow-hidden">
      <div className="blue-glow -top-40 -left-40 w-[600px] h-[600px] opacity-10" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {showIntro ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">{cms.faqIntro.heading}</h2>
              <p className="text-xl text-zinc-400">
                {cms.faqIntro.description}
              </p>
            </motion.div>
          ) : (
            <h2 className="sr-only">Common questions</h2>
          )}

          <Accordion type="single" collapsible className={`space-y-4 ${showIntro ? '' : 'mt-8'}`}>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem value={`item-${i}`} className="border border-white/5 bg-white/5 rounded-3xl px-8 overflow-hidden">
                  <AccordionTrigger className="text-left text-lg font-bold py-6 hover:no-underline hover:text-blue-500 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-400 text-base leading-relaxed pb-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
