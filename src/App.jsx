import React, { useState } from "react";
import LessonRoom from "./components/LessonRoom";

// ✅ چهار درس اصلی – اولِ ایمپورت‌ها
import flow from "./lessons/flow";
import telecom from "./lessons/telecom";
import radiolinks from "./lessons/radiolinks";
import modems from "./lessons/modems";
import mobilesite from "./lessons/mobilesite";

// بقیه دروس

import troubleshooting from "./lessons/troubleshooting";
import RRU from "./lessons/RRU";
import power from "./lessons/power";

import safety from "./lessons/safety";
import Rack from "./lessons/Rack";
import fiber from "./lessons/fiber";
import Sector from "./lessons/Sector";
import radio from "./lessons/radio";
import field from "./lessons/field";

function normalizeLesson(raw, name) {
  if (Array.isArray(raw)) {
    return {
      title: name,
      color:
        // ✅ چهار درس اول – اولِ رنگ‌دهی
        name === "جریان داده" ? "#457b9d" :
        name === "تلکام" ? "#e63946" :
        name === "لینک‌های رادیویی" ? "#7b2cbf" :
        name === "مودم‌" ? "#118ab2" :
        name === "سایت موبایل" ? "#ef476f" :

        // بقیه دروس
        name === "عیب‌یابی" ? "#2a9d8f" :
        name === "RRU" ? "#f4a261" :
        name === "برق" ? "#fcca46" :

        name === "ایمنی و HSE" ? "#d90429" :
        name === "Rack" ? "#06d6a0" :
        name === "فیبر نوری" ? "#8338ec" :
        name === "سکتور" ? "#ff9f1c" :
        name === "رادیو" ? "#8d6e63" :
        name === "تجربه میدانی" ? "#4d908e" :
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

const LESSONS = {
  // ✅ چهار درس اول – اولِ لیست
  flow: normalizeLesson(flow, "جریان داده"),
  telecom: normalizeLesson(telecom, "تلکام"),
  radiolinks: normalizeLesson(radiolinks, "لینک‌های رادیویی"),
  modems: normalizeLesson(modems, "مودم‌"),
  mobilesite: normalizeLesson(mobilesite, "سایت موبایل"),

  // بقیه بدون تغییر
  troubleshooting: normalizeLesson(troubleshooting, "عیب‌یابی"),
  RRU: normalizeLesson(RRU, "RRU"),
  power: normalizeLesson(power, "برق"),

  safety: normalizeLesson(safety, "ایمنی و HSE"),
  Rack: normalizeLesson(Rack, "Rack"),
  fiber: normalizeLesson(fiber, "فیبر نوری"),
  Sector: normalizeLesson(Sector, "سکتور"),
  radio: normalizeLesson(radio, "رادیو"),
  field: normalizeLesson(field, "تجربه میدانی"),
};

export default function App() {
  const [activeLesson, setActiveLesson] = useState(null);

  if (activeLesson) {
    return (
      <LessonRoom
        lesson={activeLesson}
        onBack={() => setActiveLesson(null)}
      />
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>دانشگاه مهارتی دکل‌کار</h1>
      <p style={styles.subHeader}>یک مهارت را انتخاب کنید</p>

      <div style={styles.scrollArea}>
        <div style={styles.grid}>
          {Object.keys(LESSONS).map((key) => {
            const lesson = LESSONS[key];
            return (
              <div
                key={key}
                style={{ ...styles.card, borderColor: lesson.color }}
                onClick={() => setActiveLesson(lesson)}
              >
                <div
                  style={{ ...styles.icon, backgroundColor: lesson.color }}
                >
                  {lesson.title.substring(0, 2)}
                </div>
                <h3 style={styles.cardTitle}>{lesson.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
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
    overflowX: "hidden",
    padding: "0 20px 40px 20px",
    boxSizing: "border-box",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "22px",
    justifyItems: "center",
    alignItems: "center",
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
  },

  icon: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },

  cardTitle: {
    marginTop: "10px",
    fontSize: "0.95rem",
  },
};
