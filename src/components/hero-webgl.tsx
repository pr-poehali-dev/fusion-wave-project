import { Canvas, extend, useFrame } from "@react-three/fiber"
import { useAspect, useTexture } from "@react-three/drei"
import { useMemo, useRef, useState, useEffect } from "react"
import * as THREE from "three"

const LEAF_IMG = "https://cdn.poehali.dev/projects/7b9f1394-775e-4493-8cc4-e8beb90a3ef4/files/d523d943-f40d-4285-81f9-7e52b3947ad4.jpg"

const servers = [
  { country: "🇳🇱 Нидерланды", city: "Амстердам", ping: 28 },
  { country: "🇩🇪 Германия",   city: "Франкфурт", ping: 35 },
  { country: "🇫🇮 Финляндия",  city: "Хельсинки", ping: 42 },
  { country: "🇺🇸 США",        city: "Нью-Йорк",  ping: 110 },
  { country: "🇸🇬 Сингапур",   city: "Сингапур",  ping: 165 },
]

const TEXTUREMAP = { src: "https://i.postimg.cc/XYwvXN8D/img-4.png" }
const DEPTHMAP = { src: "https://i.postimg.cc/2SHKQh2q/raw-4.webp" }

extend(THREE as unknown as Record<string, unknown>)

const WIDTH = 300
const HEIGHT = 300

const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src])
  const meshRef = useRef<THREE.Mesh>(null)

  const material = useMemo(() => {
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform sampler2D uDepthMap;
      uniform vec2 uPointer;
      uniform float uProgress;
      uniform float uTime;
      varying vec2 vUv;

      // Simple noise function
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main() {
        vec2 uv = vUv;

        // Depth-based displacement
        float depth = texture2D(uDepthMap, uv).r;
        vec2 displacement = depth * uPointer * 0.01;
        vec2 distortedUv = uv + displacement;

        // Base texture
        vec4 baseColor = texture2D(uTexture, distortedUv);

        // Create scanning effect
        float aspect = ${WIDTH}.0 / ${HEIGHT}.0;
        vec2 tUv = vec2(uv.x * aspect, uv.y);
        vec2 tiling = vec2(120.0);
        vec2 tiledUv = mod(tUv * tiling, 2.0) - 1.0;

        float brightness = noise(tUv * tiling * 0.5);
        float dist = length(tiledUv);
        float dot = smoothstep(0.5, 0.49, dist) * brightness;

        // Flow effect based on progress
        float flow = 1.0 - smoothstep(0.0, 0.02, abs(depth - uProgress));

        // Red scanning overlay
        vec3 mask = vec3(dot * flow * 10.0, 0.0, 0.0);

        // Combine effects
        vec3 final = baseColor.rgb + mask;

        gl_FragColor = vec4(final, 1.0);
      }
    `

    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: rawMap },
        uDepthMap: { value: depthMap },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uProgress: { value: 0 },
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    })
  }, [rawMap, depthMap])

  const [w, h] = useAspect(WIDTH, HEIGHT)

  useFrame(({ clock, pointer }) => {
    if (material.uniforms) {
      material.uniforms.uProgress.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5
      material.uniforms.uPointer.value = pointer
      material.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  const scaleFactor = 0.3
  return (
    <mesh ref={meshRef} scale={[w * scaleFactor, h * scaleFactor, 1]} material={material}>
      <planeGeometry />
    </mesh>
  )
}

export const Hero3DWebGL = () => {
  const titleWords = "Подорожник".split(" ")
  const [visibleWords, setVisibleWords] = useState(0)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [delays, setDelays] = useState<number[]>([])
  const [subtitleDelay, setSubtitleDelay] = useState(0)
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [selectedServer, setSelectedServer] = useState(0)
  const [showServers, setShowServers] = useState(false)
  const [ping, setPing] = useState<number | null>(null)
  const [speed, setSpeed] = useState<number | null>(null)

  useEffect(() => {
    setDelays(titleWords.map(() => Math.random() * 0.07))
    setSubtitleDelay(Math.random() * 0.1)
  }, [titleWords.length])

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => setVisibleWords(visibleWords + 1), 600)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => setSubtitleVisible(true), 800)
      return () => clearTimeout(timeout)
    }
  }, [visibleWords, titleWords.length])

  useEffect(() => {
    if (!connected) { setPing(null); setSpeed(null); return }
    const base = servers[selectedServer].ping
    setPing(base + Math.floor(Math.random() * 6))
    setSpeed(Math.floor(80 + Math.random() * 120))
    const interval = setInterval(() => {
      setPing(base + Math.floor(Math.random() * 8))
      setSpeed(Math.floor(80 + Math.random() * 120))
    }, 3000)
    return () => clearInterval(interval)
  }, [connected, selectedServer])

  const handleConnect = () => {
    if (connected) { setConnected(false); return }
    setConnecting(true)
    setTimeout(() => { setConnecting(false); setConnected(true) }, 1800)
  }

  const selectServer = (i: number) => {
    setSelectedServer(i)
    setShowServers(false)
    if (connected) { setConnected(false); setConnecting(true); setTimeout(() => { setConnecting(false); setConnected(true) }, 1200) }
  }

  const pingColor = ping === null ? "text-white/30" : ping < 50 ? "text-green-400" : ping < 100 ? "text-yellow-400" : "text-red-400"

  return (
    <div className="h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />
      </div>

      <div className="h-screen items-center w-full absolute z-[60] px-4 md:px-10 flex justify-center flex-col gap-4 md:gap-6">

        {/* Title */}
        <div className="text-2xl sm:text-3xl md:text-5xl xl:text-6xl font-extrabold font-orbitron uppercase pointer-events-none">
          <div className="flex space-x-2 lg:space-x-6 overflow-hidden text-white">
            {titleWords.map((word, index) => (
              <div key={index} className={index < visibleWords ? "fade-in" : ""}
                style={{ animationDelay: `${index * 0.13 + (delays[index] || 0)}s`, opacity: index < visibleWords ? undefined : 0 }}>
                {word}
              </div>
            ))}
          </div>
        </div>

        {/* Server selector */}
        <div className="relative">
          <button
            onClick={() => setShowServers(v => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-green-500/40 transition-all duration-200 text-sm text-white/70 hover:text-white"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <span>{servers[selectedServer].country}</span>
            <span className="text-white/30">·</span>
            <span className="text-white/50 text-xs">{servers[selectedServer].city}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 ${showServers ? "rotate-180" : ""}`}>
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>

          {showServers && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-56 bg-gray-950 border border-green-500/20 rounded-xl overflow-hidden shadow-2xl z-50">
              {servers.map((s, i) => (
                <button key={i} onClick={() => selectServer(i)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-green-500/10 ${i === selectedServer ? "text-green-400 bg-green-500/5" : "text-white/70"}`}
                >
                  <span>{s.country}</span>
                  <span className={`text-xs font-mono ${s.ping < 50 ? "text-green-400" : s.ping < 100 ? "text-yellow-400" : "text-red-400"}`}>{s.ping} мс</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Leaf button */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleConnect}
            className="relative group focus:outline-none"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {connected && (
              <>
                <span className="absolute inset-[-4px] rounded-full bg-green-500/15 animate-ping" style={{ animationDuration: "2.2s" }} />
                <span className="absolute inset-[-16px] rounded-full bg-green-500/08 animate-ping" style={{ animationDuration: "3s", animationDelay: "0.4s" }} />
              </>
            )}
            {connecting && (
              <span className="absolute inset-[-4px] rounded-full border-4 border-green-400/30 border-t-green-400 animate-spin" />
            )}

            <div className={`
              relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden transition-all duration-500
              border-4 shadow-2xl group-active:scale-95
              ${connected ? "border-green-400 shadow-green-500/50" : connecting ? "border-green-500/50 shadow-green-500/20" : "border-white/10 hover:border-green-500/40 shadow-black"}
            `}>
              <img
                src={LEAF_IMG}
                alt="Подорожник"
                className={`w-full h-full object-cover transition-all duration-500 ${connected ? "brightness-110 saturate-150" : "brightness-60 saturate-50 hover:brightness-90"} ${connecting ? "brightness-50 saturate-0 animate-pulse" : ""}`}
              />
              <div className={`absolute inset-0 flex flex-col items-center justify-end pb-3 transition-all duration-300`}>
                <span className={`text-xs font-extrabold font-orbitron tracking-widest drop-shadow-lg ${connected ? "text-green-300" : "text-white/60"}`}>
                  {connecting ? "..." : connected ? "ВКЛ" : "ВЫКЛ"}
                </span>
              </div>
            </div>
          </button>

          <p className={`text-xs font-medium tracking-widest uppercase transition-colors duration-500 ${
            connected ? "text-green-400" : connecting ? "text-green-500/60" : "text-white/30"
          }`}>
            {connecting ? "Подключение..." : connected ? "Подключено" : "Нажмите для подключения"}
          </p>
        </div>

        {/* Stats */}
        <div className={`flex items-center gap-6 transition-all duration-700 ${connected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
          <div className="flex flex-col items-center gap-0.5">
            <span className={`text-xl md:text-2xl font-bold font-orbitron tabular-nums transition-colors duration-300 ${pingColor}`}>
              {ping !== null ? `${ping}` : "—"}
            </span>
            <span className="text-white/30 text-xs uppercase tracking-widest">мс · пинг</span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-xl md:text-2xl font-bold font-orbitron tabular-nums text-green-400">
              {speed !== null ? `${speed}` : "—"}
            </span>
            <span className="text-white/30 text-xs uppercase tracking-widest">Мб/с · скорость</span>
          </div>
        </div>

      </div>

      <Canvas
        flat
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 1] }}
        style={{ background: "#000000" }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

export default Hero3DWebGL