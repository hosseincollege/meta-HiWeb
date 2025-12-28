import React, { useMemo, useState } from "react";
import { Billboard, Text } from "@react-three/drei";
import FiberLink from "./FiberLink";

export default function ClassroomHorizontal({ lesson, onTopic }) {
  const color = lesson.color || "#4eaaff";
  const chapters = lesson.chapters || [];
  const radius = 12;

  const [hoveredTopic, setHoveredTopic] = useState(null);

  const chapterPositions = useMemo(() => {
    return chapters.map((_, i) => {
      const angle = (i / chapters.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      return [x, 0, z];
    });
  }, [chapters]);

  return (
    <group>
      {/* مرکز بزرگ درس */}
      <mesh>
        <sphereGeometry args={[0.52, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} />
      </mesh>

      <Billboard position={[0, 2.8, 0]}>
        <Text
          fontSize={1}
          color="white"
          outlineColor="black"
          outlineWidth={0.03}
        >
          {lesson.title}
        </Text>
      </Billboard>

      {chapters.map((ch, i) => {
        const pos = chapterPositions[i];

        return (
          <group key={ch.id}>
            <FiberLink
              start={[0, 0, 0]}
              end={pos}
              color={color}
              height={2.8}
              speed={0.8}
            />

            <group position={pos}>
              {/* گوی فصل — کوچک و بدون واکنش */}
              <mesh>
                <sphereGeometry args={[0.25, 24, 24]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={0.35}
                />
              </mesh>

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
                const ang = (idx / ch.topics.length) * Math.PI * 2;
                const tx = Math.cos(ang) * 3.3;
                const tz = Math.sin(ang) * 3.3;
                const gx = pos[0] + tx;
                const gy = pos[1];
                const gz = pos[2] + tz;

                const isHover = hoveredTopic === t.id;

                return (
                  <group key={t.id}>
                    <FiberLink
                      start={[0, 0, 0]}
                      end={[tx, 0, tz]}
                      color={color}
                      height={0.6}
                      speed={0.5}
                    />

                    <group position={[tx, 0, tz]}>
                      <mesh
                        onPointerOver={() => setHoveredTopic(t.id)}
                        onPointerOut={() => setHoveredTopic(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          onTopic(t, [gx, gy, gz]);
                        }}
                      >
                        <sphereGeometry
                          args={[
                            isHover ? 0.28 : 0.22,
                            20,
                            20
                          ]}
                        />
                        <meshStandardMaterial
                          color={color}
                          emissive={color}
                          emissiveIntensity={isHover ? 0.9 : 0.25}
                        />
                      </mesh>

                      <Billboard position={[0, isHover ? 0.75 : 0.6, 0]}>
                        <Text
                          fontSize={isHover ? 0.36 : 0.30}
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
