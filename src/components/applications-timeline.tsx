import { Timeline } from "@/components/ui/timeline"

export function ApplicationsTimeline() {
  const data = [
    {
      title: "Анонимный серфинг",
      content: (
        <div>
          <p className="text-white text-sm md:text-base font-normal mb-6 leading-relaxed">
            Скрывайте свой IP-адрес и местоположение при просмотре любых сайтов. Ваши данные
            защищены, история не сохраняется — полная приватность в интернете.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Скрытие реального IP-адреса
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Защита от слежки и трекинга
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Без логов и записи истории
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Обход блокировок",
      content: (
        <div>
          <p className="text-white text-sm md:text-base font-normal mb-6 leading-relaxed">
            Получайте доступ к любимым сайтам, стриминговым сервисам и социальным сетям, 
            заблокированным в вашей стране или регионе — легко и быстро.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Доступ к заблокированным сайтам
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Стриминг видео без ограничений
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Работа с любыми социальными сетями
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Безопасность данных",
      content: (
        <div>
          <p className="text-white text-sm md:text-base font-normal mb-6 leading-relaxed">
            Ваш трафик шифруется на всём пути от устройства до сервера. Безопасный интернет
            в кафе, аэропорту и любой публичной Wi-Fi сети.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Шифрование всего трафика
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Защита в публичных Wi-Fi сетях
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Защита паролей и личных данных
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <section id="applications" className="py-12 md:py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-display text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6">Как это помогает вам</h2>
          <p className="text-gray-300 text-base md:text-xl max-w-3xl mx-auto leading-relaxed">
            Прокси-сервер решает три главных задачи — анонимность, свобода в интернете и защита данных.
          </p>
        </div>

        <div className="relative">
          <Timeline data={data} />
        </div>
      </div>
    </section>
  )
}