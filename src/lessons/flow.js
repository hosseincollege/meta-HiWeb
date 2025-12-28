export default [

  /* ============================================================
     فصل ۱ — User Equipment تا هوا
  ============================================================ */
  {
    section: "فصل ۱: UE و ارسال روی هوا",
    topics: [
      {
        title: "1- تولید ترافیک (Traffic Generation)",
        content: "کاربر تماس صوتی یا دیتای اینترنتی ایجاد می‌کند.",
        subtopics: [
          {
            title: "Voice / Data",
            content: "Voice توسط Codecهایی مانند AMR/EVS فشرده می‌شود و Data به Packetهای IP تبدیل می‌گردد."
          },
          {
            title: "Protocol Stack",
            content: "Voice: SIP برای signaling و RTP برای media | Data: TCP/UDP روی IP"
          }
        ]
      },
      {
        title: "2- پردازش رادیویی (RF Processing)",
        content: "آماده‌سازی داده دیجیتال برای ارسال روی هوا",
        subtopics: [
          {
            title: "Channel Coding",
            content: "FEC برای تصحیح خطا و Ciphering برای رمزنگاری داده"
          },
          {
            title: "Modulation",
            content: "نگاشت بیت‌ها به موج رادیویی با QPSK، 16QAM، 64QAM یا 256QAM"
          }
        ]
      }
    ]
  },

  /* ============================================================
     فصل ۲ — تجهیزات بالای دکل (Tower Top)
  ============================================================ */
  {
    section: "فصل ۲: تجهیزات بالای دکل",
    topics: [
      {
        title: "1- Sector Antenna",
        content: "ارسال و دریافت امواج RF بین سایت و UE",
        subtopics: [
          {
            title: "Sectorization",
            content: "تقسیم سایت به 3 یا 6 قطاع برای افزایش ظرفیت و کاهش تداخل"
          },
          {
            title: "RET (Remote Electrical Tilt)",
            content: "تنظیم زاویه آنتن از راه دور برای کنترل پوشش"
          }
        ]
      },
      {
        title: "2- Radio Unit (RRU / RRH / AAU)",
        content: "واحد رادیویی فعال متصل به آنتن",
        subtopics: [
          {
            title: "RF to IQ",
            content: "تبدیل سیگنال RF آنالوگ به داده دیجیتال IQ"
          },
          {
            title: "Amplifier (LNA / PA)",
            content: "تقویت سیگنال دریافتی (UL) و ارسالی (DL)"
          }
        ]
      }
    ]
  },

  /* ============================================================
     فصل ۳ — تجهیزات داخل رک سایت (Shelter / Cabinet)
  ============================================================ */
  {
    section: "فصل ۳: تجهیزات داخل رک سایت",
    topics: [
      {
        title: "1- Baseband Unit (BBU / DU)",
        content: "پردازش تمام لایه‌های رادیویی و مدیریت کاربران",
        subtopics: [
          {
            title: "RAN Protocol Stack",
            content: "PHY / MAC / RLC / PDCP"
          },
          {
            title: "Bearer Management",
            content: "ایجاد Bearer مجزا برای Voice و Data با QoS متفاوت"
          }
        ]
      },
      {
        title: "2- Sync & Timing",
        content: "همزمان‌سازی کل سایت با شبکه",
        subtopics: [
          {
            title: "GPS / IEEE 1588v2 (PTP)",
            content: "تأمین فرکانس، فریم تایم و فاز شبکه"
          }
        ]
      }
    ]
  },

  /* ============================================================
     فصل ۴ — خروجی سایت و انتقال (Transmission)
  ============================================================ */
  {
    section: "فصل ۴: خروجی سایت (Transmission)",
    topics: [
      {
        title: "1- Site Router / Switch",
        content: "تجمیع و دسته‌بندی ترافیک سایت",
        subtopics: [
          {
            title: "VLAN / QoS",
            content: "اولویت‌دهی به Voice نسبت به Data"
          }
        ]
      },
      {
        title: "2- Backhaul",
        content: "انتقال ترافیک از سایت به Core",
        subtopics: [
          {
            title: "Fiber Optic",
            content: "ظرفیت بالا، تأخیر کم، مسیر اصلی انتقال"
          },
          {
            title: "Microwave Radio Link",
            content: "انتقال بی‌سیم نقطه به نقطه به‌عنوان مسیر جایگزین"
          }
        ]
      }
    ]
  },

  /* ============================================================
     فصل ۵ — تفاوت تماس صوتی و اینترنت در سایت
  ============================================================ */
  {
    section: "فصل ۵: تماس و اینترنت",
    topics: [
      {
        title: "1- Voice Call in Site",
        content: "تماس مبتنی بر VoLTE",
        subtopics: [
          {
            title: "VoLTE Bearer (GBR)",
            content: "Bearer تضمین‌شده با تأخیر کم"
          },
          {
            title: "RTP Media Flow",
            content: "عبور شفاف جریان صوتی از سایت به Core"
          }
        ]
      },
      {
        title: "2- Data Session in Site",
        content: "اینترنت موبایل کاربر",
        subtopics: [
          {
            title: "Best Effort Traffic",
            content: "ترافیک بدون تضمین تأخیر"
          },
          {
            title: "IP Packet Flow",
            content: "ارسال Packetها به UPF در Core Network"
          }
        ]
      }
    ]
  }

];
