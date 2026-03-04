"use client";

import { useRef, useMemo, useEffect, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 100;
const CONNECTION_DISTANCE = 2.5;
const MOUSE_INFLUENCE = 3.0;
const SPREAD = 12;
const MAX_LINES = 1500;

interface ParticleNetworkProps {
  mouseRef: RefObject<{ x: number; y: number }>;
}

export default function ParticleNetwork({ mouseRef }: ParticleNetworkProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseTarget = useRef(new THREE.Vector3());
  const mouseCurrent = useRef(new THREE.Vector3());
  const { viewport } = useThree();

  const { positions, velocities, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    const colorPalette = [
      new THREE.Color("#00ff41"),
      new THREE.Color("#00d4ff"),
      new THREE.Color("#bf00ff"),
      new THREE.Color("#00ff41"),
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * SPREAD;
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      velocities[i * 3] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.004;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 3 + 1;
    }

    return { positions, velocities, colors, sizes };
  }, []);

  const linePosAttr = useMemo(() => new THREE.BufferAttribute(new Float32Array(MAX_LINES * 2 * 3), 3), []);
  const lineColAttr = useMemo(() => new THREE.BufferAttribute(new Float32Array(MAX_LINES * 2 * 3), 3), []);

  const pointsMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 customColor;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        void main() {
          vColor = customColor;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float pulse = sin(uTime * 2.0 + position.x * 0.5) * 0.5 + 0.5;
          gl_PointSize = size * (200.0 / -mvPosition.z) * (0.8 + pulse * 0.4);
          vAlpha = 0.6 + pulse * 0.4;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float glow = 1.0 - smoothstep(0.0, 0.5, d);
          glow = pow(glow, 1.5);
          gl_FragColor = vec4(vColor, glow * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useEffect(() => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("customColor", new THREE.BufferAttribute(colors, 3));
    geom.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
  }, [positions, colors, sizes]);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const time = state.clock.elapsedTime;
    (pointsMaterial.uniforms.uTime as { value: number }).value = time;

    const mouse = mouseRef.current;
    if (!mouse) return;
    mouseTarget.current.set(
      mouse.x * viewport.width * 0.5,
      mouse.y * viewport.height * 0.5,
      0
    );
    mouseCurrent.current.lerp(mouseTarget.current, 0.05);

    const posAttr = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute | null;
    if (!posAttr) return;
    const posArr = posAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;

      posArr[ix] += velocities[ix];
      posArr[ix + 1] += velocities[ix + 1];
      posArr[ix + 2] += velocities[ix + 2];

      const dx = posArr[ix] - mouseCurrent.current.x;
      const dy = posArr[ix + 1] - mouseCurrent.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MOUSE_INFLUENCE) {
        const force = (1 - dist / MOUSE_INFLUENCE) * 0.02;
        posArr[ix] += dx * force;
        posArr[ix + 1] += dy * force;
      }

      const halfSpread = SPREAD / 2;
      if (posArr[ix] > halfSpread || posArr[ix] < -halfSpread) velocities[ix] *= -1;
      if (posArr[ix + 1] > halfSpread || posArr[ix + 1] < -halfSpread) velocities[ix + 1] *= -1;
      if (posArr[ix + 2] > 3 || posArr[ix + 2] < -3) velocities[ix + 2] *= -1;
    }

    posAttr.needsUpdate = true;

    let vertIdx = 0;
    const connDist2 = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
    const lpArr = linePosAttr.array as Float32Array;
    const lcArr = lineColAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT && vertIdx < MAX_LINES * 2; i++) {
      const ix = i * 3;
      const px = posArr[ix], py = posArr[ix + 1], pz = posArr[ix + 2];
      for (let j = i + 1; j < PARTICLE_COUNT && vertIdx < MAX_LINES * 2; j++) {
        const jx = j * 3;
        const dx = px - posArr[jx];
        const dy = py - posArr[jx + 1];
        const dz = pz - posArr[jx + 2];
        const dist2 = dx * dx + dy * dy + dz * dz;

        if (dist2 < connDist2) {
          const alpha = 1 - Math.sqrt(dist2) / CONNECTION_DISTANCE;
          const v0 = vertIdx * 3;

          lpArr[v0] = px;
          lpArr[v0 + 1] = py;
          lpArr[v0 + 2] = pz;
          lcArr[v0] = 0;
          lcArr[v0 + 1] = alpha * 0.8;
          lcArr[v0 + 2] = alpha * 0.4;
          vertIdx++;

          const v1 = vertIdx * 3;
          lpArr[v1] = posArr[jx];
          lpArr[v1 + 1] = posArr[jx + 1];
          lpArr[v1 + 2] = posArr[jx + 2];
          lcArr[v1] = 0;
          lcArr[v1 + 1] = alpha * 0.8;
          lcArr[v1 + 2] = alpha * 0.4;
          vertIdx++;
        }
      }
    }

    const lineGeom = linesRef.current.geometry;
    if (!lineGeom.getAttribute("position")) {
      lineGeom.setAttribute("position", linePosAttr);
      lineGeom.setAttribute("color", lineColAttr);
    }
    lineGeom.setDrawRange(0, vertIdx);
    linePosAttr.needsUpdate = true;
    lineColAttr.needsUpdate = true;
  });

  return (
    <group>
      <points ref={pointsRef} material={pointsMaterial}>
        <bufferGeometry />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}
