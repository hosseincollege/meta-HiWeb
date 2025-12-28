import React, { useMemo, useRef } from "react";
import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FiberLink({ start, end, color = "#4eaaff", height = 2, speed = 1 }) {
  // 1. ساخت مسیر منحنی
  const curve = useMemo(() => {
    const p1 = new THREE.Vector3(...start);
    const p2 = new THREE.Vector3(...end);
    
    // محاسبه نقطه میانی برای ایجاد خمیدگی (شکم دادن به خط)
    const mid = p1.clone().add(p2).multiplyScalar(0.5);
    mid.y += height; // میزان ارتفاع قوس

    return new THREE.QuadraticBezierCurve3(p1, mid, p2);
  }, [start, end, height]);

  // 2. نقاط ثابت برای رسم خط (سیم)
  const points = useMemo(() => curve.getPoints(40), [curve]);

  // 3. رفرنس برای نقطه نورانی متحرک
  const dotRef = useRef();

  // 4. انیمیشن حرکت نقطه
  useFrame((state) => {
    if (dotRef.current) {
      // محاسبه موقعیت بین 0 تا 1 بر اساس زمان
      const t = (state.clock.getElapsedTime() * speed * 0.3) % 1;
      // آپدیت مکان نقطه روی منحنی
      curve.getPoint(t, dotRef.current.position);
    }
  });

  return (
    <group>
      {/* الف) خط ثابت (کابل فیزیکی) */}
      <Line
        points={points}
        color={color}
        transparent
        opacity={0.55}   // از 0.3 → 0.55
        lineWidth={1.6}  // از 1 → 1.6
      />


      {/* ب) نقطه نورانی متحرک (پالس نوری) */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0, 8, 8]} />
        <meshBasicMaterial color="white" toneMapped={false} />
      </mesh>
    </group>
  );
}
