export default [

  /* =====================================================
     فصل 1 : BBU / DU (مغز سایت)
  ===================================================== */
  {
    section: "1-BBU / DU",
    topics: [
      {
        title: "BBU یا DU چیست",
        content: "BBU (Baseband Unit) یا DU (Distributed Unit) تجهیزی است که پردازش سیگنال دیجیتال شبکه موبایل را انجام می‌دهد.",
        subtopics: [
          {
            title: "وظیفه اصلی",
            content: "تبدیل دیتا بین شبکه Core و RRU، مدیریت Call، Data Session، Scheduling و MIMO."
          },
          {
            title: "ارتباط با بالا",
            content: "از طریق فیبر نوری (CPRI/eCPRI) به RRU روی دکل متصل است."
          }
        ]
      },
      {
        title: "ورودی و خروجی",
        content: "",
        subtopics: [
          {
            title: "ورودی",
            content: "دیتای IP از Router / Switch یا MW-IDU."
          },
          {
            title: "خروجی",
            content: "سیگنال Baseband به RRU از طریق فیبر."
          }
        ]
      }
    ]
  },

  /* =====================================================
     فصل 2 : تجهیزات انتقال دیتا (Backhaul)
  ===================================================== */
  {
    section: "2-Transmission Equipment",
    topics: [
      {
        title: "Switch / Router",
        content: "سوئیچ یا روتر، دیتا را بین BBU و شبکه اپراتور منتقل می‌کند.",
        subtopics: [
          {
            title: "وظیفه",
            content: "VLAN، IP Routing، QoS و مدیریت ترافیک صوت و دیتا."
          },
          {
            title: "ارتباط با بالا",
            content: "هیچ اتصال مستقیم به دکل ندارد؛ فقط Backhaul سایت را تأمین می‌کند."
          }
        ]
      },
      {
        title: "MW IDU",
        content: "Indoor Unit مایکروویو که لینک رادیویی بین دو سایت را برقرار می‌کند.",
        subtopics: [
          {
            title: "ارتباط با بالا",
            content: "از طریق IF Cable یا Waveguide به ODU و دیش روی دکل متصل است."
          },
          {
            title: "نقش",
            content: "انتقال دیتا بین سایت و سایت دیگر وقتی فیبر نیست."
          }
        ]
      }
    ]
  },

  /* =====================================================
     فصل 3 : سیستم برق DC سایت
  ===================================================== */
  {
    section: "3-Power System",
    topics: [
      {
        title: "Rectifier System",
        content: "رکتیفایر برق AC را به DC (48V-) تبدیل می‌کند.",
        subtopics: [
          {
            title: "تجهیزاتی که تغذیه می‌کند",
            content: "BBU، RRU، Switch، MW-IDU."
          },
          {
            title: "ارتباط با بالا",
            content: "برق RRU از پایین توسط کابل DC به دکل ارسال می‌شود."
          }
        ]
      },
      {
        title: "DC Distribution Unit",
        content: "برق DC را بین تجهیزات مختلف تقسیم می‌کند.",
        subtopics: [
          {
            title: "ایمنی",
            content: "هر مسیر دارای فیوز مجزا است."
          }
        ]
      }
    ]
  },

  /* =====================================================
     فصل 4 : باتری سایت
  ===================================================== */
  {
    section: "4-Battery Bank",
    topics: [
      {
        title: "باتری 48 ولت",
        content: "باتری‌ها در زمان قطع برق شهری سایت را روشن نگه می‌دارند.",
        subtopics: [
          {
            title: "ارتباط با بالا",
            content: "به‌طور غیرمستقیم RRU را تغذیه می‌کنند."
          },
          {
            title: "نکته عملی",
            content: "ضعف باتری = سایت First Outage."
          }
        ]
      }
    ]
  },

  /* =====================================================
     فصل 5 : فیبر نوری و ارتباط با RRU
  ===================================================== */
  {
    section: "5-Fiber & ODF",
    topics: [
      {
        title: "ODF",
        content: "پچ پنل فیبر برای مدیریت فیبرهای ورودی و خروجی رک.",
        subtopics: [
          {
            title: "مسیر فیبر",
            content: "BBU → ODF → فیبر رایزر → RRU"
          }
        ]
      },
      {
        title: "فیبر CPRI / eCPRI",
        content: "فیبر مخصوص ارتباط فرانت‌هاول بین BBU و RRU.",
        subtopics: [
          {
            title: "کاربرد",
            content: "انتقال دیتا با تأخیر بسیار کم."
          }
        ]
      }
    ]
  },

  /* =====================================================
     فصل 6 : تجهیزات کنترلی و مانیتورینگ
  ===================================================== */
  {
    section: "6-Control & Monitoring",
    topics: [
      {
        title: "Site Controller",
        content: "کنترل ارتباط تجهیزات با مرکز مانیتورینگ.",
        subtopics: [
          {
            title: "ارسال",
            content: "آلارم برق، دما، لینک، فانکشن سایت."
          }
        ]
      },
      {
        title: "Temperature Sensors & Fan",
        content: "کنترل دمای رک و تجهیزات.",
        subtopics: [
          {
            title: "خطر",
            content: "افزایش دما باعث Down شدن BBU یا RRU می‌شود."
          }
        ]
      }
    ]
  },

  /* =====================================================
     فصل 7 : ارتباط مستقیم رک با تجهیزات بالای دکل
  ===================================================== */
  {
    section: "7-Connection To Tower",
    topics: [
      {
        title: "ارتباط با RRU",
        content: "RRU سیگنال RF را نزدیک آنتن تولید/دریافت می‌کند.",
        subtopics: [
          {
            title: "چیزی که از رک می‌رود بالا",
            content: "فیبر نوری (دیتا) + کابل DC (برق)."
          }
        ]
      },
      {
        title: "ارتباط با دیش MW",
        content: "در سایت‌های مایکروویوی، دیتا از طریق IDU به ODU و دیش می‌رود.",
        subtopics: [
          {
            title: "مسیر",
            content: "BBU → Switch → IDU → ODU → Dish"
          }
        ]
      }
    ]
  }

];
