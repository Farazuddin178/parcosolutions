"use client";

// Interactive 3D "data core" for the hero (Three.js via React Three Fiber).
// Drag to spin it (mouse/trackpad), it leans toward the pointer, and the core
// pulses on hover. Rendering pauses when the canvas is off-screen.

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const GREEN = "#39ff88";
const MINT = "#b8ffd3";
const LIME = "#c6ff3d";

/** Evenly spread points on a sphere. */
function fibonacciSphere(count: number, radius: number) {
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius));
  }
  return pts;
}

function Satellite({ radius, speed, tilt, offset }: { radius: number; speed: number; tilt: number; offset: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + offset;
    ref.current?.position.set(Math.cos(t) * radius, Math.sin(t) * radius * Math.sin(tilt), Math.sin(t) * radius * Math.cos(tilt));
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 12, 12]} />
      <meshBasicMaterial color={LIME} />
    </mesh>
  );
}

function Network() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const { points, lines } = useMemo(() => {
    const pts = fibonacciSphere(240, 1.65);
    const seg: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < 0.44) seg.push(...pts[i].toArray(), ...pts[j].toArray());
      }
    }
    return {
      points: new Float32Array(pts.flatMap((p) => p.toArray())),
      lines: new Float32Array(seg),
    };
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.14;
    // lean toward the pointer
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.35, 0.05);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -state.pointer.x * 0.2, 0.05);

    const t = state.clock.elapsedTime;
    const pulse = 1 + Math.sin(t * (hovered ? 6 : 2)) * (hovered ? 0.12 : 0.05);
    core.current?.scale.setScalar(pulse * (hovered ? 1.15 : 1));
    if (shell.current) shell.current.rotation.x -= delta * 0.3;
  });

  return (
    <group ref={group}>
      {/* network nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={GREEN}
          size={0.04}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {/* links between nearby nodes */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={GREEN} transparent opacity={0.16} depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>
      {/* inner shell */}
      <mesh ref={shell}>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshBasicMaterial color={GREEN} wireframe transparent opacity={0.3} />
      </mesh>
      {/* core */}
      <mesh
        ref={core}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "";
        }}
      >
        <icosahedronGeometry args={[0.42, 0]} />
        <meshBasicMaterial color={hovered ? LIME : MINT} wireframe />
      </mesh>
      {/* orbit rings */}
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.15, 0.005, 8, 180]} />
        <meshBasicMaterial color={LIME} transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[Math.PI / 1.7, 0.6, 0]}>
        <torusGeometry args={[2.45, 0.004, 8, 180]} />
        <meshBasicMaterial color={GREEN} transparent opacity={0.3} />
      </mesh>
      <Satellite radius={2.15} speed={0.6} tilt={Math.PI / 2.4} offset={0} />
      <Satellite radius={2.15} speed={0.6} tilt={Math.PI / 2.4} offset={Math.PI} />
      <Satellite radius={2.45} speed={-0.4} tilt={Math.PI / 1.7} offset={1.2} />
    </group>
  );
}

export default function DataCore() {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [finePointer, setFinePointer] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setFinePointer(window.matchMedia("(pointer: fine)").matches);
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5.6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={active && !reduce ? "always" : "demand"}
        aria-label="Interactive 3D network sphere"
        role="img"
      >
        <Network />
        {/* Drag-to-rotate only with a mouse, so touch users can still scroll the page. */}
        {finePointer && <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.7} />}
      </Canvas>
    </div>
  );
}
