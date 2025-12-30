/* ============================================================
   درس تجهیزات رادیویی سایت مخابراتی — RRU (Remote Radio Unit)
   نسخه فوق‌جامع فنی و عملیاتی (نصب، RF، کانفیگ، برندها)
============================================================ */

export default [

  /* ============================================================
     فصل ۱ — RRU چیست و نقش دقیق آن در سایت
  ============================================================ */
  {
    section: "فصل ۱: تعریف، جایگاه و وظیفه RRU در شبکه",
    topics: [
      {
        title: "1- تعریف فنی RRU",
        content: "RRU یا Remote Radio Unit واحد پردازش رادیویی (RF) سایت سلولی است که سیگنال Baseband دیجیتال را از BBU/DU دریافت کرده، آن را روی فرکانس مشخص مدوله، تقویت و از طریق آنتن ارسال می‌کند.",
        subtopics: [
          {
            title: "Downlink",
            content: "دریافت داده دیجیتال، مدولاسیون (QPSK/16QAM/64QAM/256QAM)، Up-Conversion و تقویت توان."
          },
          {
            title: "Uplink",
            content: "دریافت سیگنال RF ضعیف موبایل، تقویت کم‌نویز (LNA)، فیلتر و تبدیل به دیتای دیجیتال."
          }
        ]
      },
      {
        title: "2- جایگاه RRU در معماری RAN",
        content: "RRU مرز بین دنیای دیجیتال شبکه و محیط فیزیکی RF است.",
        subtopics: [
          {
            title: "ارتباط با DU/BBU",
            content: "از طریق فیبر نوری و پروتکل CPRI یا eCPRI با تأخیر بسیار کم."
          },
          {
            title: "ارتباط با آنتن",
            content: "از طریق RF Jumper کوتاه یا اتصال مستقیم به آنتن Active."
          }
        ]
      }
    ]
  },

  /* ============================================================
     فصل ۲ — انواع RRU (تکنولوژی و باند)
  ============================================================ */
  {
    section: "فصل ۲: انواع RRU بر اساس تکنولوژی و باند فرکانسی",
    topics: [
      {
        title: "1- انواع RRU بر اساس نسل شبکه",
        content: "طراحی RRU بسته به تکنولوژی شبکه متفاوت است.",
        subtopics: [
          {
            title: "2G / GSM",
            content: "باند 900/1800 MHz، ساختار ساده، بدون MIMO."
          },
          {
            title: "3G / UMTS",
            content: "پشتیبانی WCDMA، حساس به هم‌زمانی."
          },
          {
            title: "4G / LTE",
            content: "پشتیبانی MIMO، CA، توان‌های بالاتر."
          },
          {
            title: "5G / NR",
            content: "Massive MIMO، Beamforming، Sub-6 و mmWave."
          }
        ]
      },
      {
        title: "2- دسته‌بندی بر اساس باند فرکانسی",
        content: "RRU تنها در باند طراحی‌شده خود کار می‌کند.",
        subtopics: [
          {
            title: "Low Band",
            content: "700/800/900 MHz — پوشش زیاد."
          },
          {
            title: "Mid Band",
            content: "1800/2100/2300/2600 MHz — تعادل پوشش و ظرفیت."
          },
          {
            title: "High Band / 5G",
            content: "3500 MHz و mmWave — ظرفیت بالا، برد کوتاه."
          }
        ]
      }
    ]
  },

  /* ============================================================
     فصل ۳ — فرکانس و نحوه تولید RF
  ============================================================ */
  {
    section: "فصل ۳: فرایند تولید و ارسال فرکانس رادیویی",
    topics: [
      {
        title: "1- تولید سیگنال RF",
        content: "فرایند RF شامل چند مرحله پشت‌سرهم است.",
        subtopics: [
          {
            title: "Modulation",
            content: "نگاشت داده روی Carrier با QAM/QPSK."
          },
          {
            title: "Up-Conversion",
            content: "انتقال سیگنال به فرکانس حامل مشخص."
          },
          {
            title: "Power Amplifier",
            content: "افزایش توان خروجی (مثلاً 40W، 60W)."
          }
        ]
      },
      {
        title: "2- MIMO و Beamforming",
        content: "در LTE و 5G چند مسیر RF هم‌زمان استفاده می‌شود.",
        subtopics: [
          {
            title: "MIMO",
            content: "چند آنتن برای افزایش Throughput و Reliability."
          },
          {
            title: "Beamforming",
            content: "هدایت هوشمند پرتو سیگنال به سمت کاربر."
          }
        ]
      }
    ]
  },

  /* ============================================================
     فصل ۴ — کابل‌ها و اتصالات روی دکل
  ============================================================ */
  {
    section: "فصل ۴: کابل‌کشی، کانکتورها و ارت",
    topics: [
      {
        title: "1- کابل‌های اصلی RRU",
        content: "کابل‌کشی صحیح نقش حیاتی در پایداری سایت دارد.",
        subtopics: [
          {
            title: "Fiber Optic",
            content: "Single Mode، حساس به Dirt و Bend؛ لینک CPRI/eCPRI."
          },
          {
            title: "Power -48V DC",
            content: "تغذیه از Rectifier؛ رعایت پلاریته الزامی."
          },
          {
            title: "RF Jumper",
            content: "کابل کوتاه Low Loss به آنتن."
          }
        ]
      },
      {
        title: "2- Grounding و حفاظت",
        content: "ایمنی تجهیزات حیاتی است.",
        subtopics: [
          {
            title: "ارت",
            content: "اتصال بدنه RRU به ارت دکل."
          },
          {
            title: "Lightning Protection",
            content: "محافظت در برابر صاعقه و Surge."
          }
        ]
      }
    ]
  },

  /* ============================================================
     فصل ۵ — کانفیگ نرم‌افزاری و Commissioning
  ============================================================ */
  {
    section: "فصل ۵: کانفیگ نرم‌افزاری RRU",
    topics: [
      {
        title: "1- نرم‌افزارهای Vendor",
        content: "هر سازنده ابزار اختصاصی دارد.",
        subtopics: [
          {
            title: "Huawei",
            content: "LMT / U2000 برای تعریف Carrier، فرکانس و Alarm."
          },
          {
            title: "Ericsson",
            content: "ENM / Moshell برای RF Config و Cell Setup."
          },
          {
            title: "Nokia",
            content: "NetAct و Local Craft Tool."
          }
        ]
      },
      {
        title: "2- پارامترهای اصلی کانفیگ",
        content: "تنظیمات اشتباه باعث تداخل یا افت کیفیت می‌شود.",
        subtopics: [
          {
            title: "Frequency & Bandwidth",
            content: "تنظیم DL/UL و پهنای باند."
          },
          {
            title: "TX Power",
            content: "کنترل توان خروجی برای پوشش و Interference."
          }
        ]
      }
    ]
  },

  /* ============================================================
     فصل ۶ — نصب عملی، تست و عیب‌یابی
  ============================================================ */
  {
    section: "فصل ۶: نصب، تست و Troubleshooting",
    topics: [
      {
        title: "1- مراحل نصب روی دکل",
        content: "نصب صحیح پایه کیفیت شبکه است.",
        subtopics: [
          {
            title: "نصب مکانیکی",
            content: "بستن روی براکت، رعایت تهویه."
          },
          {
            title: "Labeling",
            content: "برچسب‌گذاری کابل‌ها و پورت‌ها."
          }
        ]
      },
      {
        title: "2- خطاهای رایج",
        content: "اکثر مشکلات در Commissioning این موارد هستند.",
        subtopics: [
          {
            title: "LOS",
            content: "آلودگی یا قطعی فیبر."
          },
          {
            title: "VSWR High",
            content: "مشکل کابل RF یا آنتن."
          },
          {
            title: "Overheat",
            content: "انسداد هوا یا گرمای محیط."
          }
        ]
      }
    ]
  }

];
