"use client";

import { Suspense, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import ParticleNetwork from "./ParticleNetwork";

interface SceneProps {
  mouseRef: RefObject<{ x: number; y: number }>;
}

export default function Scene({ mouseRef }: SceneProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        frameloop="always"
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
          });
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <ParticleNetwork mouseRef={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
