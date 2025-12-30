/* ============================================================
   Sector Configuration & Radio Coverage
   آموزش کامل و تخصصی سکتور در شبکه رادیویی موبایل
============================================================ */

export default [

  /* ============================================================
     فصل 1 : مفهوم Sector
  ============================================================ */
  {
    section: "1-مفهوم Sector",
    topics: [
      {
        title: "Sector چیست",
        content: "Sector به بخشی از پوشش رادیویی سایت گفته می‌شود که توسط یک آنتن جهت‌دار مستقل سرویس‌دهی می‌شود.",
        subtopics: [
          {
            title: "هدف",
            content: "افزایش ظرفیت، کاهش تداخل و کنترل بهتر پوشش."
          }
        ]
      },
      {
        title: "Sector در سایت موبایل",
        content: "",
        subtopics: [
          {
            title: "ساختار معمول",
            content: "اکثر سایت‌ها دارای 3 سکتور با پوشش 120 درجه هستند."
          },
          {
            title: "Site Types",
            content: "Macro Site، Rooftop، IBS."
          }
        ]
      }
    ]
  },

  /* ============================================================
     فصل 2 : اجزای هر Sector
  ============================================================ */
  {
    section: "2-اجزای Sector",
    topics: [
      {
        title: "آنتن (Antenna)",
        content: "هر سکتور حداقل یک آنتن جهت‌دار مجزا دارد.",
        subtopics: [
          {
            title: "مشخصات",
            content: "Gain، Beamwidth، Polarization."
          }
        ]
      },
      {
        title: "رادیو (RRU)",
        content: "RRU سیگنال را برای همان سکتور تولید و تقویت می‌کند.",
        subtopics: [
          {
            title: "ارتباط",
            content: "BBU ↔ RRU از طریق فیبر."
          }
        ]
      }
    ]
  },

  /* ============================================================
     فصل 3 : Azimuth (جهت سکتور)
  ============================================================ */
  {
    section: "3-Azimuth",
    topics: [
      {
        title: "Azimuth چیست",
        content: "Azimuth زاویه جهت افقی آنتن نسبت به شمال جغرافیایی است.",
        subtopics: [
          {
            title: "مثال",
            content: "0° = شمال، 90° = شرق، 180° = جنوب."
          }
        ]
      },
      {
        title: "اهمیت Azimuth",
        content: "",
        subtopics: [
          {
            title: "تنظیم اشتباه",
            content: "پوشش نادرست، تداخل با سایت همسایه."
          }
        ]
      }
    ]
  },

  /* ============================================================
     فصل 4 : Tilt (شیب آنتن)
  ============================================================ */
  {
    section: "4-Tilt",
    topics: [
      {
        title: "Tilt چیست",
        content: "Tilt زاویه شیب عمودی آنتن برای کنترل فاصله پوشش است.",
        subtopics: [
          {
            title: "انواع",
            content: "Mechanical Tilt، Electrical Tilt."
          }
        ]
      },
      {
        title: "تأثیر Tilt",
        content: "",
        subtopics: [
          {
            title: "Tilt زیاد",
            content: "کاهش Overshooting، پوشش کوتاه‌تر."
          },
          {
            title: "Tilt کم",
            content: "پوشش دورتر، افزایش تداخل."
          }
        ]
      }
    ]
  },

  /* ============================================================
     فصل 5 : Beamwidth و الگوی تشعشع
  ============================================================ */
  {
    section: "5-Beamwidth & Pattern",
    topics: [
      {
        title: "Beamwidth",
        content: "زاویه پخش افقی و عمودی سیگنال آنتن.",
        subtopics: [
          {
            title: "Horizontal Beamwidth",
            content: "معمولاً 65° یا 90°."
          }
        ]
      },
      {
        title: "Radiation Pattern",
        content: "نقشه تشعشع آنتن در فضا.",
        subtopics: [
          {
            title: "کاربرد",
            content: "اصلی‌ترین مرجع طراحی پوشش."
          }
        ]
      }
    ]
  },

  /* ============================================================
     فصل 6 : Sectorization و ظرفیت
  ============================================================ */
  {
    section: "6-Sectorization",
    topics: [
      {
        title: "Sectorization چیست",
        content: "افزایش تعداد Sector برای بالا بردن ظرفیت سایت.",
        subtopics: [
          {
            title: "مثال",
            content: "تبدیل 3 Sector به 6 Sector."
          }
        ]
      },
      {
        title: "مزایا و معایب",
        content: "",
        subtopics: [
          {
            title: "مزایا",
            content: "ظرفیت بیشتر، کنترل بهتر ترافیک."
          },
          {
            title: "معایب",
            content: "پیچیدگی RF، افزایش تداخل در صورت طراحی غلط."
          }
        ]
      }
    ]
  },

  /* ============================================================
     فصل 7 : تداخل بین سکتورها
  ============================================================ */
  {
    section: "7-Inter-Sector Interference",
    topics: [
      {
        title: "تداخل سکتوری",
        content: "تداخل بین سکتورهای یک سایت یا سایت‌های مجاور.",
        subtopics: [
          {
            title: "دلایل",
            content: "Azimuth اشتباه، Tilt نامناسب، Overlap بیش از حد."
          }
        ]
      },
      {
        title: "اثر روی کیفیت",
        content: "",
        subtopics: [
          {
            title: "نتیجه",
            content: "کاهش SINR، افت Throughput."
          }
        ]
      }
    ]
  },

  /* ============================================================
     فصل 8 : Sector ID و Cell Identity
  ============================================================ */
  {
    section: "8-Sector ID",
    topics: [
      {
        title: "Cell / Sector ID",
        content: "هر سکتور یک شناسه یکتا در شبکه دارد.",
        subtopics: [
          {
            title: "کاربرد",
            content: "Handover، مانیتورینگ، KPI."
          }
        ]
      }
    ]
  },

  /* ============================================================
     فصل 9 : نقش Sector در Handover
  ============================================================ */
  {
    section: "9-Sector & Handover",
    topics: [
      {
        title: "Handover داخلی",
        content: "جابجایی کاربر بین سکتورهای یک سایت.",
        subtopics: [
          {
            title: "شرط",
            content: "کیفیت سیگنال و Load."
          }
        ]
      }
    ]
  },

  /* ============================================================
     فصل 10 : مسیر کامل داده در Sector
  ============================================================ */
  {
    section: "10-End-to-End Sector Flow",
    topics: [
      {
        title: "Downlink",
        content: "",
        subtopics: [
          {
            title: "Flow",
            content: "Core → BBU → RRU → Sector Antenna → UE"
          }
        ]
      },
      {
        title: "Uplink",
        content: "",
        subtopics: [
          {
            title: "Flow",
            content: "UE → Sector Antenna → RRU → BBU → Core"
          }
        ]
      }
    ]
  }

];
