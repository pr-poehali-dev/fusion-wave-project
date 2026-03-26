import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const LeafLogo = () => (
  <img
    src="https://cdn.poehali.dev/projects/7b9f1394-775e-4493-8cc4-e8beb90a3ef4/files/b6ffe8e8-e823-4422-bc93-c9f286e9ef4f.jpg"
    alt="Подорожник"
    className="w-8 h-8 rounded-md object-cover"
  />
)

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-black/95 backdrop-blur-md border-b border-green-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <LeafLogo />
            <h1 className="font-orbitron text-xl font-bold text-white">
              Подо<span className="text-green-400">рожник</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#applications"
                className="font-geist text-white hover:text-green-400 transition-colors duration-200"
              >
                Возможности
              </a>
              <a href="#split-tunnel" className="font-geist text-white hover:text-green-400 transition-colors duration-200">
                Туннелирование
              </a>
              <a href="#conf-upload" className="font-geist text-white hover:text-green-400 transition-colors duration-200">
                Свой прокси
              </a>
              <a href="#faq" className="font-geist text-white hover:text-green-400 transition-colors duration-200">
                Вопросы
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-green-600 hover:bg-green-700 text-white font-geist border-0">Попробовать бесплатно</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-green-400 transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/98 border-t border-green-500/20">
              <a
                href="#applications"
                className="block px-3 py-2 font-geist text-white hover:text-green-400 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Возможности
              </a>
              <a
                href="#split-tunnel"
                className="block px-3 py-2 font-geist text-white hover:text-green-400 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Туннелирование
              </a>
              <a
                href="#conf-upload"
                className="block px-3 py-2 font-geist text-white hover:text-green-400 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Свой прокси
              </a>
              <a
                href="#faq"
                className="block px-3 py-2 font-geist text-white hover:text-green-400 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Вопросы
              </a>
              <div className="px-3 py-2">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-geist border-0">
                  Попробовать бесплатно
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
