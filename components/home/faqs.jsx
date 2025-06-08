import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export const FAQs = () => {
  const faqItems = [
    {
      id: "item-1",
      question: "Is Feebo really free to use?",
      answer:
        "Yes, Feebo is completely free to use! You can collect feedback, organize it, and prioritize features without any cost. We believe in making product development more accessible to everyone.",
    },
    {
      id: "item-2",
      question: "How does Feebo help me collect feedback?",
      answer:
        "Feebo provides a simple interface where your users can submit feedback directly. You can create feedback boards, and track the status of each piece of feedback. It's designed to make the feedback collection process smooth and efficient.",
    },
    {
      id: "item-3",
      question: "Can I integrate Feebo with my existing tools?",
      answer:
        "Currently, Feebo works as a standalone platform. However, we're actively working on integrations with popular tools like Slack, Discord, and email to make feedback collection even more seamless. Stay tuned for updates!",
    },
    {
      id: "item-5",
      question: "Is my feedback data secure?",
      answer:
        "Absolutely! We take data security seriously. All feedback is stored securely, and you have full control over your data. We never share your feedback or user information with third parties.",
    },
  ];

  return (
    <section className="py-16 md:py-24" id="faqs">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 text-balance">
            Discover quick and comprehensive answers to common questions about
            our platform and services.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <Accordion
            type="single"
            collapsible
            className="bg-card ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0"
          >
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-dashed"
              >
                <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="text-muted-foreground mt-6 px-8">
            Can't find what you're looking for?{" "}
            <Link
              href="https://x.com/ditinagrawal"
              target="_blank"
              className="text-primary font-medium hover:underline"
            >
              Shoot a DM
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
