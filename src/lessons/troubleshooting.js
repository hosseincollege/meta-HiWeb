export default [

  // ================== فصل 1 : عیب‌یابی ==================
  {
    section: "1-عیب‌یابی",
    topics: [
      {
        title: "1-تعریف",
        content: "عیب‌یابی فرآیند شناسایی، تحلیل و رفع مشکل در تجهیزات و سایت مخابراتی است.",
        subtopics: [
          {
            title: "هدف",
            content: "بازگرداندن سریع سایت به وضعیت نرمال."
          }
        ]
      },
      {
        title: "2-اولویت",
        content: "عیب‌یابی از ساده‌ترین بخش شروع می‌شود.",
        subtopics: [
          {
            title: "اصل",
            content: "Everything is physical until proven otherwise."
          }
        ]
      },
      {
        title: "3-مسیر",
        content: "عیب‌یابی باید طبق یک مسیر مشخص انجام شود.",
        subtopics: [
          {
            title: "ترتیب",
            content: "برق، لینک، تجهیزات، تنظیمات."
          }
        ]
      }
    ]
  },

  // ================== فصل 2 : برق ==================
  {
    section: "2-برق",
    topics: [
      {
        title: "1-ورودی",
        content: "اولین مرحله بررسی برق ورودی سایت است.",
        subtopics: [
          {
            title: "کنترل",
            content: "وجود AC، سلامت فیوز و MCB."
          }
        ]
      },
      {
        title: "2-DC",
        content: "برق DC تجهیزات باید بررسی شود.",
        subtopics: [
          {
            title: "مقدار",
            content: "-48V پایدار بدون نوسان."
          }
        ]
      },
      {
        title: "3-باتری",
        content: "باتری معیوب باعث خاموشی ناگهانی می‌شود.",
        subtopics: [
          {
            title: "بررسی",
            content: "ولتاژ، اتصال، سولفاته."
          }
        ]
      },
      {
        title: "4-ارت",
        content: "ارت نامناسب باعث آلارم و ریست تجهیزات می‌شود.",
        subtopics: [
          {
            title: "نشانه",
            content: "آلارم نامشخص، ناپایداری لینک."
          }
        ]
      }
    ]
  },

  // ================== فصل 3 : لینک ==================
  {
    section: "3-لینک",
    topics: [
      {
        title: "1-رادیو",
        content: "قطع لینک رادیویی یکی از شایع‌ترین مشکلات سایت است.",
        subtopics: [
          {
            title: "بررسی",
            content: "RSL، LOS، آلارم ODU."
          }
        ]
      },
      {
        title: "2-فیبر",
        content: "در سایت‌های فیبر، لینک نوری بررسی می‌شود.",
        subtopics: [
          {
            title: "کنترل",
            content: "TX/RX Power، تمیزی کانکتور."
          }
        ]
      },
      {
        title: "3-کابل",
        content: "قطع یا آسیب کابل باعث Down شدن لینک می‌شود.",
        subtopics: [
          {
            title: "نشانه",
            content: "Link Flap، Packet Loss."
          }
        ]
      }
    ]
  },

  // ================== فصل 4 : تجهیزات ==================
  {
    section: "4-تجهیزات",
    topics: [
      {
        title: "1-ریست",
        content: "ریست نرم‌افزاری اولین اقدام روی تجهیزات است.",
        subtopics: [
          {
            title: "نوع",
            content: "Soft Reset قبل از Hard Reset."
          }
        ]
      },
      {
        title: "2-آلارم",
        content: "آلارم‌ها اطلاعات دقیق از مشکل می‌دهند.",
        subtopics: [
          {
            title: "تحلیل",
            content: "Critical، Major، Minor."
          }
        ]
      },
      {
        title: "3-دما",
        content: "افزایش دما باعث خاموشی یا افت عملکرد می‌شود.",
        subtopics: [
          {
            title: "بررسی",
            content: "فن‌ها، تهویه، کولر."
          }
        ]
      },
      {
        title: "4-تعویض",
        content: "در صورت خرابی سخت‌افزاری، تعویض انجام می‌شود.",
        subtopics: [
          {
            title: "اقدام",
            content: "ODU، PSU، Board."
          }
        ]
      }
    ]
  },

  // ================== فصل 5 : تنظیمات ==================
  {
    section: "5-تنظیمات",
    topics: [
      {
        title: "1-IP",
        content: "تنظیمات IP اشتباه باعث قطع ارتباط می‌شود.",
        subtopics: [
          {
            title: "کنترل",
            content: "IP، Gateway، Subnet."
          }
        ]
      },
      {
        title: "2-VLAN",
        content: "عدم تطابق VLAN باعث Down شدن ترافیک می‌شود.",
        subtopics: [
          {
            title: "بررسی",
            content: "Tagging و Untagging."
          }
        ]
      },
      {
        title: "3-سنک",
        content: "از دست رفتن Sync باعث اختلال شدید می‌شود.",
        subtopics: [
          {
            title: "منبع",
            content: "GPS، Sync over Radio."
          }
        ]
      }
    ]
  },

  // ================== فصل 6 : سایت ==================
  {
    section: "6-سایت",
    topics: [
      {
        title: "1-محیط",
        content: "شرایط محیطی روی عملکرد سایت تأثیر می‌گذارد.",
        subtopics: [
          {
            title: "عوامل",
            content: "رطوبت، گردوغبار، گرما."
          }
        ]
      },
      {
        title: "2-سرقت",
        content: "سرقت کابل یا تجهیزات باعث Down کامل سایت می‌شود.",
        subtopics: [
          {
            title: "نشانه",
            content: "قطع ناگهانی بدون آلارم قبلی."
          }
        ]
      },
      {
        title: "3-دسترسی",
        content: "عدم دسترسی فیزیکی، عیب‌یابی را متوقف می‌کند.",
        subtopics: [
          {
            title: "هماهنگی",
            content: "مالک سایت، حراست."
          }
        ]
      }
    ]
  },

  // ================== فصل 7 : تست ==================
  {
    section: "7-تست",
    topics: [
      {
        title: "1-پینگ",
        content: "پینگ ساده‌ترین تست ارتباط است.",
        subtopics: [
          {
            title: "نتیجه",
            content: "Latency پایدار و Packet Loss صفر."
          }
        ]
      },
      {
        title: "2-ترافیک",
        content: "تست ترافیک برای بررسی ظرفیت لینک انجام می‌شود.",
        subtopics: [
          {
            title: "ابزار",
            content: "iPerf، Throughput Test."
          }
        ]
      },
      {
        title: "3-مانیتور",
        content: "مانیتورینگ برای اطمینان از پایداری لازم است.",
        subtopics: [
          {
            title: "زمان",
            content: "حداقل 30 دقیقه."
          }
        ]
      }
    ]
  },

  // ================== فصل 8 : گزارش ==================
  {
    section: "8-گزارش",
    topics: [
      {
        title: "1-ثبت",
        content: "تمام مراحل عیب‌یابی باید ثبت شود.",
        subtopics: [
          {
            title: "موارد",
            content: "علت، اقدام، نتیجه."
          }
        ]
      },
      {
        title: "2-ارسال",
        content: "گزارش به NOC یا تیم فنی ارسال می‌شود.",
        subtopics: [
          {
            title: "هدف",
            content: "اطلاع و مستندسازی."
          }
        ]
      },
      {
        title: "3-پیشگیری",
        content: "پس از رفع مشکل، اقدام پیشگیرانه تعریف می‌شود.",
        subtopics: [
          {
            title: "اقدام",
            content: "بهبود نصب، تنظیم یا نگهداری."
          }
        ]
      }
    ]
  }

];
