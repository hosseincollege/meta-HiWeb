import React, { useState, useCallback, useMemo } from "react";
import LessonRoom from "./components/LessonRoom";
import ClassroomSplitTwoD from "./components/ClassroomSplitTwoD";

// ✅ چهار درس اصلی – اولِ ایمپورت‌ها
import flow from "./lessons/flow";
import telecom from "./lessons/telecom";
import rahcom from "./lessons/rahcom";
import modems from "./lessons/modems";
import mobilesite from "./lessons/mobilesite";

// ✅ بقیه دروس
import troubleshooting from "./lessons/troubleshooting";
import RRU from "./lessons/RRU";
import power from "./lessons/power";
import safety from "./lessons/safety";
import Rack from "./lessons/Rack";
import fiber from "./lessons/fiber";
import Sector from "./lessons/Sector";
import radio from "./lessons/radio";
import field from "./lessons/field";

// ===============================
// ✅ تابع نرمال‌سازی درس‌ها
// ===============================
function normalizeLesson(raw, name) {
  if (Array.isArray(raw)) {
    return {
      title: name,
      color:
        name === "flow" ? "#457b9d" :
        name === "telecom" ? "#e63946" :
        name === "rahcom" ? "#7b2cbf" :
        name === "modems" ? "#118ab2" :
        name === "mobilesite" ? "#ef476f" :
        name === "troubleshooting" ? "#2a9d8f" :
        name === "RRU" ? "#f4a261" :
        name === "power" ? "#fcca46" :
        name === "safety" ? "#d90429" :
        name === "Rack" ? "#06d6a0" :
        name === "fiber" ? "#8338ec" :
        name === "Sector" ? "#ff9f1c" :
        name === "radio" ? "#8d6e63" :
        name === "field" ? "#4d908e" :
        "#ffffff",
      chapters: raw.map((c, i) => ({
        id: "ch" + i,
        title: c.section || "بدون عنوان",
        topics: (c.topics || []).map((t, j) => ({
          id: `t_${i}_${j}`,
          title: t.title,
          content: t.content,
          subtopics: t.subtopics || [],
        })),
      })),
    };
  }
  return raw;
}

// ===============================
// ✅ داده نهایی همه درس‌ها
// ===============================
const LESSONS_DATA = {
  flow: normalizeLesson(flow, "flow"),
  telecom: normalizeLesson(telecom, "telecom"),
  rahcom: normalizeLesson(rahcom, "rahcom"),
  modems: normalizeLesson(modems, "modems"),
  mobilesite: normalizeLesson(mobilesite, "mobilesite"),
  troubleshooting: normalizeLesson(troubleshooting, "troubleshooting"),
  RRU: normalizeLesson(RRU, "RRU"),
  power: normalizeLesson(power, "power"),
  safety: normalizeLesson(safety, "safety"),
  Rack: normalizeLesson(Rack, "Rack"),
  fiber: normalizeLesson(fiber, "fiber"),
  Sector: normalizeLesson(Sector, "Sector"),
  radio: normalizeLesson(radio, "radio"),
  field: normalizeLesson(field, "field"),
};

// ===============================
// ✅ استایل‌ها (دارک = بدون تغییر)
// ===============================
function getDarkStyles() {
  return {
    container: {
      width: "100vw",
      height: "100vh",
      backgroundColor: "#0f172a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "20px",
      color: "white",
      direction: "rtl",
      fontFamily: "sans-serif",
      overflow: "hidden",
    },
    header: {
      fontSize: "2.2rem",
      marginBottom: "6px",
      background: "linear-gradient(to right, #4eaaff, #a355ff)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    subHeader: {
      fontSize: "1rem",
      marginBottom: "12px",
      color: "#b6c0d1",
    },
    scrollArea: {
      width: "100%",
      height: "calc(100vh - 120px)",
      overflowY: "auto",
      padding: "0 20px 40px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
      gap: "22px",
      justifyItems: "center",
    },
    card: {
      width: "140px",
      height: "160px",
      background: "rgba(30, 41, 59, 0.9)",
      borderRadius: "14px",
      border: "2px solid #334155",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "0.25s",
      position: "relative",
    },
    icon: {
      width: "46px",
      height: "46px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.1rem",
      fontWeight: "bold",
    },
    cardTitle: {
      marginTop: "10px",
      fontSize: "0.9rem",
      textAlign: "center",
    },
    twoDButton: {
      background: "rgba(30,41,59,0.9)",
      border: "2px solid #4e5d7e",
      padding: "4px 10px",
      borderRadius: "0 0 0 11px",
      fontSize: "0.75rem",
      cursor: "pointer",
      position: "absolute",
      bottom: 0,
      left: 0,
      color: "#fff",
    },
    themeButton: {
      marginBottom: "10px",
      background: "#1e293b",
      color: "#fff",
      border: "1px solid #475569",
      borderRadius: "8px",
      padding: "4px 10px",
      cursor: "pointer",
      fontSize: "0.75rem",
    },
  };
}

// ✅ استایل لایت (جدید)
function getLightStyles() {
  return {
    ...getDarkStyles(),
    container: {
      ...getDarkStyles().container,
      backgroundColor: "#f8fafc",
      color: "#0f172a",
    },
    subHeader: {
      ...getDarkStyles().subHeader,
      color: "#475569",
    },
    card: {
      ...getDarkStyles().card,
      background: "#ffffff",
      border: "2px solid #e2e8f0",
    },
    twoDButton: {
      ...getDarkStyles().twoDButton,
      background: "#e2e8f0",
      color: "#0f172a",
    },
    themeButton: {
      ...getDarkStyles().themeButton,
      background: "#e2e8f0",
      color: "#0f172a",
      border: "1px solid #cbd5f5",
    },
  };
}

// ===============================
// ✅ کارت درس
// ===============================
const LessonCard = ({ lesson, onSelect3D, onSelect2D, styles }) => {
  return (
    <div
      style={{ ...styles.card, borderColor: lesson.color }}
      onClick={() => onSelect3D(lesson)}
    >
      <div style={{ ...styles.icon, backgroundColor: lesson.color }}>
        {lesson.title.substring(0, 2).toUpperCase()}
      </div>
      <h3 style={styles.cardTitle}>{lesson.title}</h3>

      <button
        style={styles.twoDButton}
        onClick={(e) => {
          e.stopPropagation();
          onSelect2D(lesson);
        }}
      >
        2D
      </button>
    </div>
  );
};

// ===============================
// ✅ App
// ===============================
export default function App() {
  const [activeLesson, setActiveLesson] = useState(null);
  const [viewMode, setViewMode] = useState(null);
  const [themeMode, setThemeMode] = useState("system"); // system | dark | light

  const systemIsDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const effectiveTheme =
    themeMode === "system" ? (systemIsDark ? "dark" : "light") : themeMode;

  const styles = useMemo(
    () => (effectiveTheme === "dark" ? getDarkStyles() : getLightStyles()),
    [effectiveTheme]
  );

  const toggleTheme = () => {
    setThemeMode((prev) =>
      prev === "system" ? "dark" : prev === "dark" ? "light" : "system"
    );
  };

  const handleBack = useCallback(() => {
    setActiveLesson(null);
    setViewMode(null);
  }, []);

  const handleSelect3D = useCallback((lesson) => {
    setActiveLesson(lesson);
    setViewMode("3D");
  }, []);

  const handleSelect2D = useCallback((lesson) => {
    setActiveLesson(lesson);
    setViewMode("2D");
  }, []);

  if (activeLesson && viewMode === "3D") {
    return (
      <LessonRoom
        lesson={activeLesson}
        onBack={handleBack}
        on2D={() => handleSelect2D(activeLesson)}
        theme={effectiveTheme}
      />
    );
  }

  if (activeLesson && viewMode === "2D") {
    return (
      <ClassroomSplitTwoD
        lesson={activeLesson}
        onBack={handleBack}
        onSwitchTo3D={() => handleSelect3D(activeLesson)}
        theme={effectiveTheme}
      />
    );
  }

  return (
    <div style={styles.container}>
      <button style={styles.themeButton} onClick={toggleTheme}>
        Theme: {themeMode}
      </button>

      <h1 style={styles.header}>دانشگاه متاورس</h1>
      <p style={styles.subHeader}>
        روی کارت کلیک کنید (۳بعدی) یا دکمه 2D را بزنید
      </p>

      <div style={styles.scrollArea}>
        <div style={styles.grid}>
          {Object.values(LESSONS_DATA).map((lesson, i) => (
            <LessonCard
              key={i}
              lesson={lesson}
              onSelect3D={handleSelect3D}
              onSelect2D={handleSelect2D}
              styles={styles}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
