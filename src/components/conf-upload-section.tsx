import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

type ConfEntry = {
  key: string
  value: string
}

function parseConf(text: string): ConfEntry[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const idx = line.indexOf("=")
      return {
        key: line.slice(0, idx).trim(),
        value: line.slice(idx + 1).trim(),
      }
    })
}

export function ConfUploadSection() {
  const [fileName, setFileName] = useState<string | null>(null)
  const [entries, setEntries] = useState<ConfEntry[]>([])
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    setError(null)
    if (!file.name.endsWith(".conf") && !file.name.endsWith(".ovpn") && !file.name.endsWith(".ini")) {
      setError("Поддерживаются файлы .conf, .ovpn, .ini")
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const parsed = parseConf(text)
      if (parsed.length === 0) {
        setError("Файл пустой или не содержит настроек в формате key=value")
        return
      }
      setFileName(file.name)
      setEntries(parsed)
    }
    reader.readAsText(file)
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const reset = () => {
    setFileName(null)
    setEntries([])
    setError(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <section id="conf-upload" className="py-24 px-6 bg-gray-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 font-orbitron">
            Свой прокси-конфиг
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Загрузите готовый .conf файл от вашего провайдера — Подорожник применит настройки автоматически.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload zone */}
          <Card className="bg-gray-900 border border-green-500/20">
            <CardHeader>
              <CardTitle className="text-white font-orbitron text-lg flex items-center gap-2">
                <Icon name="Upload" size={20} className="text-green-400" />
                Загрузить конфигурацию
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 cursor-pointer ${
                  dragging
                    ? "border-green-400 bg-green-500/10"
                    : "border-green-500/30 hover:border-green-500/60 hover:bg-green-500/5"
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept=".conf,.ovpn,.ini"
                  className="hidden"
                  onChange={onInputChange}
                />
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Icon name="FileText" size={28} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Перетащите файл сюда</p>
                    <p className="text-gray-500 text-sm mt-1">или нажмите для выбора</p>
                  </div>
                  <div className="flex gap-2 flex-wrap justify-center mt-1">
                    {[".conf", ".ovpn", ".ini"].map((ext) => (
                      <span key={ext} className="text-xs bg-black/40 text-green-400 border border-green-500/20 rounded px-2 py-0.5">
                        {ext}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {error && (
                <div className="mt-4 flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                  <Icon name="AlertCircle" size={16} />
                  {error}
                </div>
              )}

              {fileName && (
                <div className="mt-4 flex items-center justify-between bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Icon name="CheckCircle" size={16} className="text-green-400" />
                    <span className="text-green-400 text-sm font-medium">{fileName}</span>
                  </div>
                  <button onClick={reset} className="text-gray-500 hover:text-white transition-colors">
                    <Icon name="X" size={16} />
                  </button>
                </div>
              )}

              {fileName && entries.length > 0 && (
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white border-0">
                  <Icon name="Zap" size={16} className="mr-2" />
                  Применить настройки
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="bg-gray-900 border border-green-500/20">
            <CardHeader>
              <CardTitle className="text-white font-orbitron text-lg flex items-center gap-2">
                <Icon name="Eye" size={20} className="text-green-400" />
                Предпросмотр настроек
              </CardTitle>
            </CardHeader>
            <CardContent>
              {entries.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-gray-600 gap-3">
                  <Icon name="FileSearch" size={40} fallback="File" />
                  <p className="text-sm text-center">Загрузите .conf файл,<br />чтобы увидеть настройки</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {entries.map((entry, i) => (
                    <div key={i} className="flex items-start gap-3 px-3 py-2 rounded-lg bg-black/40 border border-white/5">
                      <span className="text-green-400 font-mono text-xs min-w-0 shrink-0 max-w-[45%] truncate">
                        {entry.key}
                      </span>
                      <span className="text-gray-500 text-xs">=</span>
                      <span className="text-gray-300 font-mono text-xs truncate">{entry.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "Shield", title: "Безопасно", text: "Файл обрабатывается локально, не отправляется на сервер" },
            { icon: "Zap", title: "Мгновенно", text: "Настройки применяются сразу после загрузки файла" },
            { icon: "RefreshCw", title: "Легко сменить", text: "Загрузите новый файл в любой момент без перезапуска" },
          ].map((tip) => (
            <div key={tip.title} className="flex gap-3 px-4 py-3 rounded-lg bg-black/30 border border-white/5">
              <Icon name={tip.icon} size={18} className="text-green-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-sm font-medium">{tip.title}</p>
                <p className="text-gray-500 text-xs mt-0.5">{tip.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
