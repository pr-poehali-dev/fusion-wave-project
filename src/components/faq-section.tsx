import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "Что такое прокси-сервер и зачем он нужен?",
      answer:
        "Прокси-сервер — это посредник между вами и интернетом. Он скрывает ваш реальный IP-адрес, защищает данные и позволяет открывать сайты, заблокированные в вашей стране.",
    },
    {
      question: "Сложно ли подключиться?",
      answer:
        "Нет, совсем не сложно! После регистрации вы получите готовые настройки. Подключение занимает буквально 1-2 минуты, инструкция прилагается.",
    },
    {
      question: "Замедлит ли прокси мой интернет?",
      answer:
        "Наши серверы настроены для максимальной скорости. В большинстве случаев вы не почувствуете разницы, а иногда сайты даже открываются быстрее.",
    },
    {
      question: "Мои данные в безопасности?",
      answer:
        "Да. Весь трафик шифруется, мы не храним логи и не передаём данные третьим лицам. Ваша приватность — наш приоритет.",
    },
    {
      question: "На каких устройствах работает прокси?",
      answer:
        "На всех популярных устройствах: Windows, macOS, Android, iOS. Также подходит для браузерных расширений — всё зависит от выбранного тарифа.",
    },
    {
      question: "Что если что-то не работает?",
      answer:
        "Наша поддержка доступна 24/7 в чате и по email. Мы поможем разобраться с любой проблемой быстро и без технического жаргона.",
    },
  ]

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron">Частые вопросы</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-space-mono">
            Простые ответы на самые популярные вопросы о нашем прокси-сервисе.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-red-500/20 mb-4">
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-red-400 font-orbitron px-6 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed px-6 pb-4 font-space-mono">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}