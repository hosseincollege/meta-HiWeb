import React, { useMemo, useState } from "react";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
import FiberLink from "./FiberLink";

export default function ClassroomFloors({ lesson, onTopic }) {
  const color = lesson.color || "#4eaaff";
  const chapters = lesson.chapters || [];

  // فاصله بیشتر بین فصل‌ها
  const gapY = 6;

  const [hoveredTopic, setHoveredTopic] = useState(null);
  const [clickedTopic, setClickedTopic] = useState(null);

  const chapterPositions = useMemo(() => {
    return chapters.map((_, i) => {
      const y = i * gapY;
      const jitterX = (Math.random() - 0.5) * 1.3;
      const jitterZ = (Math.random() - 0.5) * 1.3;
      return new THREE.Vector3(jitterX, y, jitterZ);
    });
  }, [chapters]);

  return (
    <group>
      {chapters.map((ch, i) => {
        const pos = chapterPositions[i];
        const nextPos = chapterPositions[i + 1];

        return (
          <group key={ch.id}>
            {nextPos && (
              <FiberLink
                start={[pos.x, pos.y, pos.z]}
                end={[nextPos.x, nextPos.y, nextPos.z]}
                color={color}
                height={0.25}
                speed={1}
              />
            )}

            {/* CHAPTER NODE (گوی خیلی کوچک و بدون تغییر رنگ) */}
            <group position={pos}>
              <mesh>
                <sphereGeometry args={[0.25, 24, 24]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={0.3}
                />
              </mesh>

              {/* عنوان فصل - فاصله 2 برابر بالاتر */}
              <Billboard position={[0, 2.6, 0]}>
                <Text
                  fontSize={0.52}
                  color="white"
                  outlineColor="black"
                  outlineWidth={0.018}
                >
                  {ch.title}
                </Text>
              </Billboard>

              {/* TOPICS */}
              {ch.topics.map((t, idx) => {
                const angle = (idx / ch.topics.length) * Math.PI * 2;
                const r = 3.2;
                const tx = Math.cos(angle) * r;
                const tz = Math.sin(angle) * r;

                const gx = pos.x + tx;
                const gy = pos.y;
                const gz = pos.z + tz;

                const isHover = hoveredTopic === t.id;
                const isClicked = clickedTopic === t.id;

                return (
                  <group key={t.id}>
                    <FiberLink
                      start={[0, 0, 0]}
                      end={[tx, 0, tz]}
                      color={color}
                      height={0.35}
                      speed={0.5}
                    />

                    <group position={[tx, 0, tz]}>
                      <mesh
                        onPointerOver={() => setHoveredTopic(t.id)}
                        onPointerOut={() => setHoveredTopic(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setClickedTopic(t.id);
                          onTopic(t, [gx, gy, gz]);
                        }}
                      >
                        {/* توپیک‌ها کوچک‌تر */}
                        <sphereGeometry
                          args={[
                            isHover || isClicked ? 0.28 : 0.22,
                            20,
                            20
                          ]}
                        />
                        <meshStandardMaterial
                          color={color}
                          emissive={color}
                          emissiveIntensity={isHover || isClicked ? 0.9 : 0.25}
                        />
                      </mesh>

                      <Billboard position={[0, isHover || isClicked ? 0.75 : 0.6, 0]}>
                        <Text
                          fontSize={isHover || isClicked ? 0.36 : 0.30}
                          color="white"
                          outlineColor="black"
                          outlineWidth={0.018}
                        >
                          {t.title}
                        </Text>
                      </Billboard>
                    </group>
                  </group>
                );
              })}
            </group>
          </group>
        );
      })}
    </group>
  );
}
