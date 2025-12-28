import React, { useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import * as THREE from "three";

import ClassroomHorizontal from "./ClassroomHorizontal";
import ClassroomFloors from "./ClassroomFloors";
import ClassroomRandom from "./ClassroomRandom";

/* ---------------- Camera Smooth Movement ---------------- */
function CameraFlyTo({ targetPosition, isFlying, setIsFlying }) {
  const { camera, controls } = useThree();
  const desiredPos = useMemo(() => new THREE.Vector3(0, 6, 40), []);
  const desiredTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame((_, delta) => {
    if (!isFlying || !controls) return;

    desiredTarget.set(targetPosition[0] + 3, targetPosition[1] - 3, targetPosition[2] + 0);

    if (targetPosition[0] === 0 && targetPosition[1] === 0 && targetPosition[2] === 0) {
      desiredPos.set(0, 8, 40);
    } else {
      desiredPos.set(
        targetPosition[0] + 0,
        targetPosition[1] + 2,
        targetPosition[2] + 14
      );
    }

    const speed = delta * 3;
    camera.position.lerp(desiredPos, speed);
    controls.target.lerp(desiredTarget, speed);

    controls.update();

    if (camera.position.distanceTo(desiredPos) < 0.2) {
      setIsFlying(false);
    }
  });

  return null;
}

/* ---------------- Tooltip Beside Node ---------------- */
function TopicTooltip({ topic, position, onClose }) {
  if (!topic || !position) return null;

  const detectDir = (text) => {
    const persianRegex = /[\u0600-\u06FF]/;
    return persianRegex.test(text) ? "rtl" : "ltr";
  };

  return (
    <Html
      transform={false}
      distanceFactor={4}
      position={[
        position[0] + 0.8,
        position[1] - 0.65,
        position[2] - 0,
      ]}
      style={{
        background: "rgba(15,15,20,0.92)",
        backdropFilter: "blur(14px)",
        padding: "40px",
        borderRadius: "26px",
        width: "1400px",
        color: "white",
        pointerEvents: "auto",
        border: "2px solid rgba(255,255,255,0.28)",
        boxShadow: "0 25px 60px rgba(0,0,0,0.65)",
        fontFamily: "IRANSans, sans-serif",
      }}
    >

      {/* دکمه بستن */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          border: "none",
          color: "white",
          cursor: "pointer",
          fontSize: "40px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ×
      </button>

      {/* عنوان */}
      <h4
        style={{
          margin: "0 0 25px 0",
          color: "#38bdf8",
          fontSize: "4.2rem",
          fontWeight: "900",
          lineHeight: 1.3,
          direction: detectDir(topic.title),
          textAlign: detectDir(topic.title) === "rtl" ? "right" : "left",
        }}
      >
        {topic.title}
      </h4>

      {/* متن اصلی */}
      {topic.content && (
        <p
          style={{
            marginTop: 12,
            fontSize: "3.5rem",
            lineHeight: 2.4,
            color: "#e2e8f0",
            fontWeight: "350",
            direction: detectDir(topic.content),
            textAlign: detectDir(topic.content) === "rtl" ? "right" : "left",
          }}
        >
          {topic.content}
        </p>
      )}

      {/* زیرموضوع‌ها */}
      {topic.subtopics &&
        topic.subtopics.map((s, i) => (
          <div
            key={i}
            style={{
              marginTop: 30,
              padding: "22px 26px",
              borderRadius: 16,
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <strong
              style={{
                color: "#fbbf24",
                fontSize: "4rem",
                display: "block",
                marginBottom: "12px",
                direction: detectDir(s.title),
                textAlign: detectDir(s.title) === "rtl" ? "right" : "left",
              }}
            >
              • {s.title}
            </strong>

            <p
              style={{
                margin: 0,
                fontSize: "4.2rem",
                color: "#cbd5e1",
                lineHeight: 2.1,
                direction: detectDir(s.content),
                textAlign: detectDir(s.content) === "rtl" ? "right" : "left",
              }}
            >
              {s.content}
            </p>
          </div>
        ))}
    </Html>
  );
}

export default function LessonRoom({ lesson, onBack }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [targetPosition, setTargetPosition] = useState([0, 0, 0]);
  const [mode, setMode] = useState("random");
  const [isFlying, setIsFlying] = useState(false);
  
  // state برای فعال/غیرفعال کردن زوم
  const [zoomEnabled, setZoomEnabled] = useState(true);

  const handleTopicClick = (topicData, positionArray) => {
    setSelectedTopic(topicData);
    setTargetPosition(positionArray);
    
    if (zoomEnabled) {
      setIsFlying(true);
    }
  };

  const handleResetView = () => {
    setSelectedTopic(null);
    setTargetPosition([0, 0, 0]);
    setIsFlying(true);
  };

  const handleCloseTooltip = () => {
    setSelectedTopic(null);
  };

  const handleUserInteraction = () => {
    if (isFlying) setIsFlying(false);
  };

  if (!lesson)
    return <div style={{ color: "white", padding: 50 }}>در حال بارگذاری...</div>;

  // استایل مشترک برای دکمه‌های آیکون‌دار
  const iconButtonStyle = (isActive, color = "white") => ({
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: isActive ? color : "#64748b", // اگر فعال نیست خاکستری شود
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "color 0.2s ease",
  });

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: "#000000",
      position: "relative"
    }}>

      {/* UI PANEL */}
      <div
        style={{
          position: "absolute",
          top: 4,
          right: 6,
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          gap: "8px", // کمی فاصله بیشتر برای خوانایی
          background: "rgba(20,20,20,0.65)", // کمی تیره‌تر برای دیده شدن بهتر آیکون‌های سفید
          backdropFilter: "blur(6px)",
          borderRadius: "8px",
          padding: "6px 10px",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "white",
        }}
      >

        {/* دکمه: زوم خودکار (دوربین) */}
        <button
          onClick={() => setZoomEnabled(!zoomEnabled)}
          title={zoomEnabled ? "غیرفعال کردن زوم خودکار" : "فعال کردن زوم خودکار"}
          style={iconButtonStyle(true, zoomEnabled ? "#4ade80" : "#64748b")}
        >
            {/* آیکون دوربین */}
            {zoomEnabled ? (
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                </svg>
            ) : (
                /* آیکون دوربین خط خورده */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                    <path d="M21 21l-2-2m-1.5-1.5a2 2 0 0 1 2.5 -2.5l3 3"></path>
                    <path d="M3 7h2l2-3h6l2 3h1"></path>
                    <path d="M21 7v1h1"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                    <path d="M23 19v-2"></path>
                    <path d="M3 19v-8a2 2 0 0 1 2-2h2"></path>
                </svg>
            )}
        </button>

        {/* دکمه: ریست ویو (رفرش) */}
        <button
          onClick={handleResetView}
          title="نمای کلی (Reset)"
          style={iconButtonStyle(true, "#7dd3fc")}
        >
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
           </svg>
        </button>

        {/* دکمه: خروج (فِلش برگشت) */}
        <button
          onClick={onBack}
          title="خروج"
          style={iconButtonStyle(true, "#f87171")}
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
        </button>

        {/* جداکننده عمودی */}
        <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.2)", margin: "0 4px" }} />

        {/* عنوان درس */}
        <h3
          style={{
            margin: "0 4px",
            fontSize: "1.1rem",
            fontWeight: "700",
            color: "#e2e8f0",
            whiteSpace: "nowrap",
            padding: 0,
          }}
        >
          {lesson.title}
        </h3>

        {/* آیکون‌های انتخاب حالت (مود) */}
        
        <div style={{ display: "flex", gap: "4px", marginLeft: "auto" }}>
          
          {/* مود: پراکنده (آیکون نقاط پخش شده در فضا) */}
          <button
            onClick={() => { setMode("random"); handleResetView(); }}
            title="پراکنده (فضایی)"
            style={iconButtonStyle(mode === "random", "#38bdf8")}
          >
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="5" cy="18" r="2"></circle>
                <circle cx="19" cy="6" r="2"></circle>
                <circle cx="12" cy="12" r="2"></circle>
                <circle cx="16" cy="18" r="1.5"></circle>
                <circle cx="8" cy="7" r="1.5"></circle>
             </svg>
          </button>

          {/* مود: افقی (آیکون نقاط روی یک خط صاف/زمین) */}
          <button
            onClick={() => { setMode("horizontal"); handleResetView(); }}
            title="افقی (سطح زمین)"
            style={iconButtonStyle(mode === "horizontal", "#38bdf8")}
          >
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 20h20"></path> {/* خط زمین */}
                <circle cx="6" cy="15" r="2.5"></circle>
                <circle cx="12" cy="15" r="2.5"></circle>
                <circle cx="18" cy="15" r="2.5"></circle>
             </svg>
          </button>

          {/* مود: طبقاتی (آیکون لایه‌ها - بدون تغییر چون گفتی خوبه) */}
          <button
            onClick={() => { setMode("floors"); handleResetView(); }}
            title="طبقاتی"
            style={iconButtonStyle(mode === "floors", "#38bdf8")}
          >
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
             </svg>
          </button>
        </div>
      </div>

      <Canvas camera={{ position: [0, 6, 40], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          enabled={!isFlying}
          onStart={handleUserInteraction}
        />

        <CameraFlyTo targetPosition={targetPosition} isFlying={isFlying} setIsFlying={setIsFlying} />

        <group>
          {mode === "horizontal" && (
            <ClassroomHorizontal lesson={lesson} onTopic={handleTopicClick} />
          )}
          {mode === "floors" && (
            <ClassroomFloors lesson={lesson} onTopic={handleTopicClick} />
          )}
          {mode === "random" && (
            <ClassroomRandom lesson={lesson} onTopic={handleTopicClick} />
          )}
        </group>

        <TopicTooltip topic={selectedTopic} position={selectedTopic ? targetPosition : null} onClose={handleCloseTooltip} />

      </Canvas>
    </div>
  );
}