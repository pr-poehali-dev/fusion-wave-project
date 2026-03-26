import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Елена М.",
    role: "Фрилансер, удалённая работа",
    avatar: "/professional-woman-scientist.png",
    content:
      "Наконец-то нашла прокси, который работает без заморочек. Подключила за две минуты и всё заработало. Скорость отличная!",
  },
  {
    name: "Дмитрий К.",
    role: "Владелец малого бизнеса",
    avatar: "/cybersecurity-expert-man.jpg",
    content:
      "Использую для доступа к зарубежным сервисам. Стабильно работает уже полгода, ни разу не подвёл. Техподдержка отвечает быстро.",
  },
  {
    name: "Анна Л.",
    role: "Студентка, блогер",
    avatar: "/asian-woman-tech-developer.jpg",
    content:
      "Раньше боялась настраивать такие вещи, но тут всё интуитивно понятно. Одна кнопка — и ты анонимен. Советую всем!",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-card-foreground mb-3 md:mb-4 font-sans">Что говорят пользователи</h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Тысячи людей уже используют наш прокси каждый день
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glow-border slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <CardContent className="p-4 md:p-6">
                <p className="text-card-foreground mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}