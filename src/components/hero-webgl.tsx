import { Canvas, extend, useFrame } from "@react-three/fiber"
import { useAspect, useTexture } from "@react-three/drei"
import { useMemo, useRef, useState, useEffect } from "react"
import * as THREE from "three"

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
  const subtitle = "Быстрый и надёжный прокси-сервер. Анонимность в интернете без лишних сложностей."
  const [visibleWords, setVisibleWords] = useState(0)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [delays, setDelays] = useState<number[]>([])
  const [subtitleDelay, setSubtitleDelay] = useState(0)
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)

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

  const handleConnect = () => {
    if (connected) {
      setConnected(false)
      return
    }
    setConnecting(true)
    setTimeout(() => {
      setConnecting(false)
      setConnected(true)
    }, 1800)
  }

  return (
    <div className="h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />
      </div>

      <div className="h-screen items-center w-full absolute z-[60] px-4 md:px-10 flex justify-center flex-col gap-6 md:gap-8">
        {/* Title */}
        <div className="text-2xl sm:text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold font-orbitron uppercase pointer-events-none">
          <div className="flex space-x-2 lg:space-x-6 overflow-hidden text-white">
            {titleWords.map((word, index) => (
              <div
                key={index}
                className={index < visibleWords ? "fade-in" : ""}
                style={{
                  animationDelay: `${index * 0.13 + (delays[index] || 0)}s`,
                  opacity: index < visibleWords ? undefined : 0,
                }}
              >
                {word}
              </div>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <div className="text-sm md:text-xl xl:text-2xl 2xl:text-3xl overflow-hidden text-white/70 font-medium max-w-xl mx-auto text-center px-2 leading-relaxed pointer-events-none">
          <div
            className={subtitleVisible ? "fade-in-subtitle" : ""}
            style={{
              animationDelay: `${titleWords.length * 0.13 + 0.2 + subtitleDelay}s`,
              opacity: subtitleVisible ? undefined : 0,
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Connect Button */}
        <div className="flex flex-col items-center gap-3 mt-2">
          <button
            onClick={handleConnect}
            className="relative group focus:outline-none"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {/* Pulse rings */}
            {connected && (
              <>
                <span className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" style={{ animationDuration: "2s" }} />
                <span className="absolute inset-[-8px] rounded-full bg-green-500/10 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.3s" }} />
              </>
            )}
            {connecting && (
              <span className="absolute inset-0 rounded-full border-4 border-green-400/40 border-t-green-400 animate-spin" />
            )}
            {/* Circle */}
            <div
              className={`
                w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center
                border-4 transition-all duration-500 shadow-2xl
                ${connected
                  ? "bg-green-600 border-green-400 shadow-green-500/40"
                  : connecting
                  ? "bg-gray-900 border-green-500/60 shadow-green-500/20"
                  : "bg-gray-900 border-white/20 hover:border-green-500/60 hover:shadow-green-500/20 group-active:scale-95"
                }
              `}
            >
              <div className={`flex flex-col items-center gap-1 transition-all duration-300 ${connecting ? "opacity-40" : "opacity-100"}`}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className={`${connected ? "text-white" : "text-white/70"}`}>
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" opacity="0.3"/>
                  <path d="M12 6v6l4 2"/>
                  {connected
                    ? <><path d="M5 12a7 7 0 0 1 14 0"/><path d="M12 2v2"/><path d="M12 20v2"/></>
                    : <><circle cx="12" cy="12" r="3"/><path d="M12 5v2M12 17v2M5 12H3M21 12h-2"/></>
                  }
                </svg>
                <span className={`text-xs font-bold font-orbitron tracking-widest uppercase ${connected ? "text-white" : "text-white/50"}`}>
                  {connecting ? "..." : connected ? "ON" : "OFF"}
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