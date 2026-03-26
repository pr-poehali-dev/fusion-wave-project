import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    title: "Высокая скорость",
    description: "Серверы по всему миру обеспечивают минимальную задержку и стабильное соединение в любой точке.",
    icon: "zap",
    badge: "Быстро",
  },
  {
    title: "Полная анонимность",
    description: "Ваш реальный IP-адрес скрыт. Никто не узнает, где вы находитесь и что делаете в сети.",
    icon: "lock",
    badge: "Приватно",
  },
  {
    title: "Простое подключение",
    description: "Подключитесь в один клик — без сложных настроек и технических знаний. Работает сразу.",
    icon: "globe",
    badge: "Просто",
  },
  {
    title: "Стабильная работа",
    description: "Гарантированный аптайм 99,9%. Прокси работает круглосуточно без обрывов и перебоев.",
    icon: "target",
    badge: "Надёжно",
  },
  {
    title: "Обход блокировок",
    description: "Получите доступ к любым сайтам и сервисам, заблокированным в вашем регионе.",
    icon: "link",
    badge: "Свобода",
  },
  {
    title: "Поддержка 24/7",
    description: "Живая поддержка всегда на связи. Поможем с настройкой и ответим на любой вопрос.",
    icon: "brain",
    badge: "Помощь",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">Всё что нужно для работы в сети</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Простой, быстрый и безопасный прокси-сервер для обычных пользователей
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glow-border hover:shadow-lg transition-all duration-300 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">
                    {feature.icon === "brain" && "&#129504;"}
                    {feature.icon === "lock" && "&#128274;"}
                    {feature.icon === "globe" && "&#127760;"}
                    {feature.icon === "zap" && "&#9889;"}
                    {feature.icon === "link" && "&#128279;"}
                    {feature.icon === "target" && "&#127919;"}
                  </span>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}