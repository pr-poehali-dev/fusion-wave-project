import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

const apps = [
  { name: "Браузер", icon: "Globe", enabled: true },
  { name: "Торрент-клиент", icon: "Download", enabled: true },
  { name: "Игры", icon: "Gamepad2", enabled: false },
  { name: "Мессенджеры", icon: "MessageCircle", enabled: true },
  { name: "Стриминг", icon: "Play", enabled: true },
  { name: "Работа / VPN", icon: "Briefcase", enabled: false },
]

export function SplitTunnelSection() {
  const [tunnelMode, setTunnelMode] = useState<"include" | "exclude">("include")
  const [appStates, setAppStates] = useState(
    Object.fromEntries(apps.map((a) => [a.name, a.enabled]))
  )

  const toggle = (name: string) =>
    setAppStates((prev) => ({ ...prev, [name]: !prev[name] }))

  const activeCount = Object.values(appStates).filter(Boolean).length

  return (
    <section id="split-tunnel" className="py-24 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 font-orbitron">
            Раздельное туннелирование
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Выберите, какие приложения работают через прокси, а какие — напрямую. Полный контроль над трафиком.
          </p>
        </div>

        <Card className="bg-gray-900 border border-green-500/20">
          <CardHeader className="border-b border-green-500/10 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-white font-orbitron text-lg">Управление трафиком</CardTitle>
              <div className="flex items-center gap-3 bg-black/40 rounded-lg p-1">
                <button
                  onClick={() => setTunnelMode("include")}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    tunnelMode === "include"
                      ? "bg-green-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Через прокси
                </button>
                <button
                  onClick={() => setTunnelMode("exclude")}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    tunnelMode === "exclude"
                      ? "bg-green-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Напрямую
                </button>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-2">
              {tunnelMode === "include"
                ? "Отмеченные приложения используют прокси, остальные — прямое соединение"
                : "Отмеченные приложения идут напрямую, остальные — через прокси"}
            </p>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {apps.map((app) => (
                <div
                  key={app.name}
                  className="flex items-center justify-between px-4 py-3 rounded-lg bg-black/40 border border-white/5 hover:border-green-500/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-green-500/10 flex items-center justify-center">
                      <Icon name={app.icon} size={16} className="text-green-400" />
                    </div>
                    <span className="text-white text-sm font-medium">{app.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {appStates[app.name] && (
                      <Badge className="bg-green-600/20 text-green-400 border-0 text-xs">
                        {tunnelMode === "include" ? "Прокси" : "Прямой"}
                      </Badge>
                    )}
                    <Switch
                      checked={appStates[app.name]}
                      onCheckedChange={() => toggle(app.name)}
                      className="data-[state=checked]:bg-green-600"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between px-4 py-3 rounded-lg bg-green-500/5 border border-green-500/20">
              <div className="flex items-center gap-2">
                <Icon name="Activity" size={16} className="text-green-400" />
                <span className="text-gray-300 text-sm">
                  Активных правил: <span className="text-green-400 font-semibold">{activeCount}</span> из {apps.length}
                </span>
              </div>
              <button
                className="text-xs text-gray-500 hover:text-green-400 transition-colors duration-200"
                onClick={() =>
                  setAppStates(Object.fromEntries(apps.map((a) => [a.name, true])))
                }
              >
                Выбрать все
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
