import React, {
    useState,
    useMemo,
    useCallback,
    useRef,
} from "react";

// ==========================================
// ✅ تابع تولید استایل‌ها بر اساس تم
// ==========================================
const getThemeStyles = (isDark) => ({
    mainContainer: {
        width: "100vw",
        height: "100vh",
        backgroundColor: isDark ? "#080808" : "#f8fafc", // تیره یا روشن
        display: "flex",
        flexDirection: "column",
        color: isDark ? "white" : "#0f172a",
        direction: "rtl",
        fontFamily: "sans-serif",
        position: "relative",
        transition: "background-color 0.3s ease, color 0.3s ease",
    },
    // --- استایل‌های نوار ابزار ---
    topToolbar: {
        position: "absolute",
        top: 4,
        right: 6,
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: isDark ? "rgba(20,20,20,0.85)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(8px)",
        borderRadius: "8px",
        padding: "6px 10px",
        border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.1)",
        color: isDark ? "white" : "#1e293b",
        boxShadow: isDark ? "none" : "0 2px 10px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
    },
    // تابع داخلی برای دکمه‌های آیکونی
    iconButtonStyle: (isActive, activeColor = "white") => {
        const inactiveColor = isDark ? "#64748b" : "#94a3b8"; 
        return {
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: isActive ? activeColor : inactiveColor,
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.2s ease",
        };
    },
    // --- استایل‌های اصلی صفحه ---
    headerSpacer: {
        height: "60px",
        width: "100%",
    },
    topBar: {
        display: "flex",
        alignItems: "center",
        padding: "10px 16px",
        backgroundColor: isDark ? "#171717" : "#ffffff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        borderBottom: isDark ? "1px solid #333" : "1px solid #e2e8f0",
    },
    backButton: {
        background: "#3b82f6",
        color: "white",
        border: "none",
        padding: "8px 14px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
    },
    threeColumnSplit: {
        display: "flex",
        flex: 1,
        overflow: "hidden",
    },
    chapterNavPanel: {
        width: "280px",
        minWidth: "280px",
        backgroundColor: isDark ? "#0f0f0f" : "#ffffff",
        padding: "12px 10px",
        overflowY: "auto",
        borderLeft: isDark ? "1px solid #262626" : "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        transition: "background-color 0.3s ease",

        scrollbarWidth: isDark ? "thin" : "thin",
        scrollbarColor: isDark
            ? "#444 transparent"
            : "#cbd5e1 transparent",
    },
    topicListPanel: {
        width: "260px",
        minWidth: "260px",
        backgroundColor: isDark ? "#131313" : "#f1f5f9",
        padding: "12px 10px",
        overflowY: "auto",
        borderLeft: isDark ? "1px solid #262626" : "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        transition: "background-color 0.3s ease",

        scrollbarWidth: isDark ? "thin" : "thin",
        scrollbarColor: isDark
            ? "#444 transparent"
            : "#cbd5e1 transparent",
    },
    contentPanelArea: {
        flex: 1,
        padding: "14px 18px",
        overflowY: "auto",
        backgroundColor: isDark ? "transparent" : "#ffffff",

        scrollbarWidth: isDark ? "thin" : "thin",
        scrollbarColor: isDark
            ? "#444 transparent"
            : "#cbd5e1 transparent",
    },
    chapterButtonVertical: {
        padding: "8px 10px",
        borderRight: "3px solid",
        background: "transparent",
        color: isDark ? "#9ca3af" : "#64748b",
        cursor: "pointer",
        transition: "0.2s",
        whiteSpace: "nowrap",
        textAlign: "right",
        width: "100%",
        marginBottom: "6px",
        lineHeight: "1.7",
        fontSize: "1.05rem",
    },
    topicList: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    topicHeader: {
        fontSize: "1.3rem",
        margin: "0 0 10px 0",
        paddingBottom: "6px",
        borderBottom: isDark ? "2px solid #334155" : "2px solid #cbd5e1",
    },
    topicItem: {
        padding: "8px 10px",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "0.2s",
        lineHeight: "1.8",
        fontSize: "1.05rem",
        color: isDark ? "white" : "#334155",
    },
    topicTitle: {
        fontSize: "1.05rem",
        display: "block",
        margin: 0,
        padding: 0,
    },
    contentHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: "10px",
        marginBottom: "14px",
        borderBottom: isDark ? "1px dashed #334155" : "1px dashed #cbd5e1",
    },
    subtopicsContainer: {
        marginTop: "18px",
        padding: "12px",
        backgroundColor: isDark ? "#1e1e1e" : "#f8fafc",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        border: isDark ? "none" : "1px solid #e2e8f0",
    },
    subtopicDetailItem: {
        padding: "10px 12px",
        borderRight: isDark ? "3px solid #374151" : "3px solid #cbd5e1",
        backgroundColor: isDark ? "#171717" : "#ffffff",
        borderRadius: "8px",
        border: isDark ? "none" : "1px solid #f1f5f9",
    },
    subtopicTitleStyle: {
        margin: "0 0 8px 0",
        paddingBottom: "6px",
        borderBottom: isDark ? "1px dashed #3f3f46" : "1px dashed #e2e8f0",
        fontSize: "1.15rem",
        fontWeight: "bold",
        color: isDark ? "#d1d5db" : "#475569",
        lineHeight: "1.6",
    },
});

export default function ClassroomSplitTwoD({ lesson, onBack, onSwitchTo3D, theme = "dark" }) {
    // 1. بررسی تم
    const isDark = theme === "dark";
    
    // 2. تولید استایل‌ها
    const styles = useMemo(() => getThemeStyles(isDark), [isDark]);

    if (!lesson || !lesson.chapters || lesson.chapters.length === 0) {
        return (
            <div style={{ backgroundColor: isDark ? "#080808" : "#fff", color: isDark ? "white" : "black" }}>
                محتوای درس یافت نشد.
            </div>
        );
    }

    const chapters = lesson.chapters;
    const chapterColor = lesson.color || "#38bdf8";
    // در تم روشن، اگر رنگ درس خیلی روشن بود، باید کمی تیره‌تر شود، اما اینجا همان را استفاده می‌کنیم
    const secondaryColor = "#f59e0b"; // زرد/نارنجی
    const topicListRef = useRef(null);
    
    const [activeChapterId, setActiveChapterId] = useState(chapters[0].id);
    const [activeTopic, setActiveTopic] = useState(chapters[0].topics[0]);

    const detectDir = useCallback((text) => {
        const persianRegex = /[\u0600-\u06FF]/;
        return persianRegex.test(text) ? "rtl" : "ltr";
    }, []);

    const activeChapter = useMemo(
        () => chapters.find((ch) => ch.id === activeChapterId),
        [activeChapterId, chapters]
    );

    const handleChapterChange = (id) => {
        const ch = chapters.find((c) => c.id === id);
        setActiveChapterId(id);
        setActiveTopic(ch?.topics?.[0] || null);
        topicListRef.current?.scrollTo(0, 0);
    };

    return (
        <div style={styles.mainContainer}>
            
            {/* --- نوار ابزار شناور --- */}
            <div style={styles.topToolbar}>

                {/* دکمه: رفتن به صفحه 3D */}
                <button
                    onClick={onSwitchTo3D}
                    title="نمای سه بعدی (فضایی)"
                    style={styles.iconButtonStyle(true, "#38bdf8")}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3l10 6v6l-10 6-10-6V9z"></path>
                        <path d="M22 9l-10 6-10-6"></path>
                    </svg>
                </button>

                {/* جداکننده عمودی */}
                <div style={{ width: 1, height: 20, background: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)", margin: "0 4px" }} />

                {/* عنوان درس */}
                <h3
                    style={{
                        margin: "0 4px",
                        fontSize: "1.1rem",
                        fontWeight: "700",
                        color: isDark ? "#e2e8f0" : "#334155",
                        whiteSpace: "nowrap",
                        padding: 0,
                    }}
                >
                    {lesson.title}
                </h3>

                {/* جداکننده عمودی */}
                <div style={{ width: 1, height: 20, background: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)", margin: "0 4px" }} />

                {/* آیکون‌های انتخاب حالت */}
                <div style={{ display: "flex", gap: "4px", marginLeft: "auto" }}>

                    {/* دکمه: خروج */}
                    <button
                        onClick={onBack}
                        title="خروج"
                        style={styles.iconButtonStyle(true, "#f87171")}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                    </button>

                </div>
            </div>

            {/* فضای خالی */}
            <div style={styles.headerSpacer}></div>


            {/* محتوای سه ستونه */}
            <div style={styles.threeColumnSplit}>
                {/* فصل‌ها */}
                <div style={styles.chapterNavPanel}>
                    <h2
                        style={{
                            ...styles.topicHeader,
                            color: chapterColor,
                            borderBottom: isDark 
                                ? `2px solid ${chapterColor}` 
                                : `2px solid ${chapterColor}`, // مشابه
                        }}
                    >
                        فصل‌ها
                    </h2>
                    {chapters.map((ch) => (
                        <button
                            key={ch.id}
                            style={{
                                ...styles.chapterButtonVertical,
                                borderColor:
                                    activeChapterId === ch.id
                                        ? chapterColor
                                        : (isDark ? "#374151" : "#e2e8f0"),
                                backgroundColor:
                                    activeChapterId === ch.id
                                        ? (isDark ? "rgba(55,65,81,0.6)" : "rgba(59, 130, 246, 0.1)")
                                        : "transparent",
                                color:
                                    activeChapterId === ch.id
                                        ? (isDark ? "white" : "#0f172a")
                                        : (isDark ? "#9ca3af" : "#64748b"),
                                fontWeight: activeChapterId === ch.id ? "bold" : "normal",
                            }}
                            onClick={() => handleChapterChange(ch.id)}
                            title={ch.title}
                        >
                            {ch.title.length > 30
                                ? ch.title.substring(0, 30) + "..."
                                : ch.title}
                        </button>
                    ))}
                </div>

                {/* تاپیک‌ها */}
                <div style={styles.topicListPanel} ref={topicListRef}>
                    <h2
                        style={{
                            ...styles.topicHeader,
                            color: chapterColor,
                        }}
                    >
                        {activeChapter.title}
                    </h2>
                    <div style={styles.topicList}>
                        {activeChapter.topics.map((t) => (
                            <div
                                key={t.id}
                                style={{
                                    ...styles.topicItem,
                                    backgroundColor:
                                        activeTopic?.id === t.id
                                            ? (isDark ? "rgba(55,65,81,0.4)" : "rgba(255,255,255,1)")
                                            : "transparent",
                                    border: 
                                        activeTopic?.id === t.id
                                            ? (isDark ? "none" : "1px solid #e2e8f0")
                                            : "1px solid transparent",
                                    borderRight:
                                        activeTopic?.id === t.id
                                            ? `3px solid ${chapterColor}`
                                            : "3px solid transparent",
                                    boxShadow: 
                                        (!isDark && activeTopic?.id === t.id) 
                                        ? "0 1px 3px rgba(0,0,0,0.05)" 
                                        : "none"
                                }}
                                onClick={() => setActiveTopic(t)}
                            >
                                <span style={styles.topicTitle}>
                                    {t.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* محتوا */}
                <div
                    style={{
                        ...styles.contentPanelArea,
                        direction: detectDir(
                            activeTopic?.content || activeTopic?.title || ""
                        ),
                    }}
                >
                    {activeTopic && (
                        <>
                            <div style={styles.contentHeader}>
                                <h3
                                    style={{
                                        margin: 0,
                                        fontSize: "1.35rem",
                                        color: chapterColor,
                                        lineHeight: "1.7",
                                    }}
                                >
                                    {activeTopic.title}
                                </h3>
                            </div>
                            <p
                                style={{
                                    margin: "0 0 16px 0",
                                    fontSize: "1.2rem",
                                    lineHeight: "1.9",
                                    color: isDark ? "#e5e7eb" : "#334155",
                                }}
                            >
                                {activeTopic.content}
                            </p>
                            {activeTopic.subtopics?.length > 0 && (
                                <div style={styles.subtopicsContainer}>
                                    {activeTopic.subtopics.map((sub, i) => (
                                        <div
                                            key={i}
                                            style={styles.subtopicDetailItem}
                                        >
                                            <h5
                                                style={{
                                                    ...styles.subtopicTitleStyle,
                                                    color: secondaryColor, // رنگ ثابت برای عنوان زیرمجموعه
                                                }}
                                            >
                                                {i + 1}. {sub.title}
                                            </h5>
                                            <p
                                                style={{
                                                    margin: 0,
                                                    fontSize: "1.1rem",
                                                    lineHeight: "1.85",
                                                    color: isDark ? "#cbd5e1" : "#475569",
                                                }}
                                            >
                                                {sub.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
