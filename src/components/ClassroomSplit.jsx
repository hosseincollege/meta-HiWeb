import React, { useState, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

export default function ClassroomSplit({ lesson, onTopic }) {
  // 0: Section, 1: Topic, 2: Content View
  const [activeLevel, setActiveLevel] = useState(0);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);

  if (!lesson || !lesson.sections || lesson.sections.length === 0) {
    return null;
  }

  const currentSection = lesson.sections[selectedSectionIndex];
  const currentTopic = currentSection?.topics[selectedTopicIndex];

  const POSITIONS = useMemo(() => ({
    NAV_SECTION: [0, 15, 0],
    NAV_TOPIC: [0, 5, 0],
    MAIN_CONTENT: [0, -5, 0],
  }), []);

  const handleSectionSelect = (sectionIdx) => {
    setSelectedSectionIndex(sectionIdx);
    setSelectedTopicIndex(0);
    setActiveLevel(1);
    onTopic(null, POSITIONS.NAV_TOPIC);
  };

  const handleTopicSelect = (topicIdx) => {
    setSelectedTopicIndex(topicIdx);
    setActiveLevel(2);
    onTopic(currentTopic, POSITIONS.MAIN_CONTENT);
  };

  const handleContentClick = () => {
    setActiveLevel(1);
    onTopic(null, POSITIONS.NAV_TOPIC);
  };

  // --- رندر بخش‌ها ---

  const renderSectionNav = () => (
    <group position={POSITIONS.NAV_SECTION}>
      {lesson.sections.map((section, i) => (
        <Html
          key={`sec-${i}`}
          position={[i * 10 - (lesson.sections.length - 1) * 5, 0, 0]}
          transform
          distanceFactor={3}
          style={{ pointerEvents: 'auto' }}
        >
          <button
            onClick={() => handleSectionSelect(i)}
            style={{
              padding: '10px 20px',
              fontSize: '3.5rem',
              fontFamily: 'IRANSans, sans-serif',
              background: i === selectedSectionIndex ? '#38bdf8' : '#1f2937',
              color: 'white',
              border: `2px solid ${i === selectedSectionIndex ? '#fff' : '#4b5563'}`,
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          >
            {section.section}
          </button>
        </Html>
      ))}
    </group>
  );

  const renderTopicNav = () => {
    if (!currentSection) return null;
    return (
      <group position={POSITIONS.NAV_TOPIC}>
        {currentSection.topics.map((topic, i) => (
          <Html
            key={`top-${i}`}
            position={[i * 12 - (currentSection.topics.length - 1) * 6, 0, 0]}
            transform
            distanceFactor={3}
            style={{ pointerEvents: 'auto' }}
          >
            <button
              onClick={() => handleTopicSelect(i)}
              style={{
                padding: '8px 15px',
                fontSize: '3.2rem',
                fontFamily: 'IRANSans, sans-serif',
                background: i === selectedTopicIndex && activeLevel === 2 ? '#22c55e' : '#374151',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: i === selectedTopicIndex && activeLevel === 2 ? '0 0 15px rgba(34, 197, 94, 0.8)' : 'none',
              }}
            >
              {topic.title}
            </button>
          </Html>
        ))}
      </group>
    );
  };

  const renderMainContent = () => {
    if (!currentTopic) return null;

    const detectDir = (text) => (/[\\u0600-\\u06FF]/.test(text) ? "rtl" : "ltr");

    return (
      <group position={POSITIONS.MAIN_CONTENT}>
        <Html
          transform={false}
          distanceFactor={4}
          style={{
            background: "rgba(15,15,20,0.98)",
            backdropFilter: "blur(18px)",
            padding: "60px",
            borderRadius: "30px",
            width: "1600px",
            height: "900px",
            color: "white",
            border: "3px solid #38bdf8",
            boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
            fontFamily: "IRANSans, sans-serif",
            overflowY: 'auto',
            pointerEvents: 'auto',
          }}
        >
          <div style={{ direction: detectDir(currentTopic.title) === "rtl" ? "rtl" : "ltr", textAlign: detectDir(currentTopic.title) === "rtl" ? "right" : "left" }}>
            <button
              onClick={handleContentClick}
              style={{
                position: "absolute",
                top: "20px",
                left: detectDir(currentTopic.title) === "rtl" ? "20px" : "auto",
                right: detectDir(currentTopic.title) === "ltr" ? "20px" : "auto",
                background: "rgba(56, 189, 248, 0.2)",
                color: "#38bdf8",
                border: "1px solid #38bdf8",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "3rem",
              }}
            >
              {detectDir(currentTopic.title) === "rtl" ? "بازگشت به عناوین" : "Back to Topics"}
            </button>

            <h1 style={{ marginTop: "70px", color: "#38bdf8", fontSize: "5rem", fontWeight: "900" }}>
              {currentTopic.title}
            </h1>

            {currentTopic.content && (
              <p style={{ fontSize: "4rem", lineHeight: 1.8, color: "#e2e8f0", borderBottom: "1px solid #333", paddingBottom: "30px" }}>
                {currentTopic.content}
              </p>
            )}

            {currentTopic.subtopics && currentTopic.subtopics.length > 0 && (
              <div style={{ marginTop: "40px" }}>
                <h2 style={{ color: "#fbbf24", fontSize: "4.5rem", marginBottom: "20px" }}>زیرموضوع‌ها:</h2>
                {currentTopic.subtopics.map((sub, idx) => (
                  <div key={idx} style={{ marginBottom: "35px", padding: "25px", background: "rgba(255, 255, 255, 0.05)", borderRadius: "15px" }}>
                    <strong style={{ color: "#93c5fd", fontSize: "4rem", display: 'block', marginBottom: '10px' }}>
                      • {sub.title}
                    </strong>
                    <p style={{ margin: 0, fontSize: "3.8rem", lineHeight: 1.8, color: "#cbd5e1" }}>
                      {sub.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Html>
      </group>
    );
  };

  return (
    <group>
      {renderSectionNav()}
      {renderTopicNav()}
      {activeLevel === 2 && renderMainContent()}
    </group>
  );
}
