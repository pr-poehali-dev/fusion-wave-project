import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="slide-up">
          <h2 className="text-2xl md:text-5xl font-bold text-foreground mb-4 md:mb-6 font-sans text-balance">Начните пользоваться прямо сейчас</h2>
          <p className="text-base md:text-xl text-muted-foreground mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto">
            Подключитесь за пару минут и получите полную анонимность, доступ к любым сайтам
            и защиту ваших данных. Всё просто.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 pulse-button text-base md:text-lg px-6 md:px-8"
            >
              Попробовать бесплатно
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base md:text-lg px-6 md:px-8 bg-transparent"
            >
              Посмотреть тарифы
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}