import {
  send,
  shield,
  star,
} from "../public";

export const navLinks = [
  {
    id: "/contact",
    title: "تماس با ما",
  },
  {
    id: "برنامه",
    title: "برنامه",
  },
  {
    id: "/",
    title: "صفحه نخست",
  },
];

export const navLinksPopup = [
  {
    id: "/",
    title: "صفحه نخست",
  },
  {
    id: "برنامه",
    title: "برنامه",
  },
  {
    id: "/contact",
    title: "تماس با ما",
  },
];

export const HeroTextFa = {
  text1: "برنامه نویسی",
  text2: "کد نویسی",
  text3: "آینده سازی",
};
export const HeroTextEn = {
  text1: "Programming",
  text2: "Coding",
  text3: "Makig future",
};

export const features = [
  {
    id: "feature-1",
    icon: "./star.svg",
    title: "افزایش بهره‌وری",
    content:
      "برنامه‌نویسی به شما کمک می‌کند تا در بسیاری از زمینه‌های کاری خود بهره‌وری بیشتری داشته باشید. با نوشتن یک برنامه، شما می‌توانید فرآیندهای خودکاری را تدوین کنید",
  },
  {
    id: "feature-2",
    icon: "./shield.svg",
    title: "بهبود کیفیت و امن",
    content:
      "با نوشتن یک برنامه، شما می‌توانید کیفیت خدمات خود را بهبود بخشید. برای مثال، اگر شما یک برنامه برای تجزیه و تحلیل داده‌های خود بنویسید، می‌توانید با استفاده از الگوریتم‌های پیشرفته و دقیق‌تر، نتایج بهتری را در کمترین زمان ممکن به دست بیاورید",
  },
  {
    id: "feature-3",
    icon: "./send.svg",
    title: "ایجاد فرصت‌های کسب و کار",
    content:
      "نوشتن برنامه می‌تواند فرصت‌های جدیدی برای کسب و کار شما ایجاد کند. با نوشتن یک برنامه، شما می‌توانید خدمات جدیدی را به مشتریان خود ارائه دهید و در نتیجه درآمد خود را افزایش دهید. ",
  },
];

export const feedback = [
  {
    id: "feedback-1",
    content:
      "Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.",
    name: "Herman Jensen",
    title: "Founder & Leader",
    // img: people01,
  },
  {
    id: "feedback-2",
    content:
      "Money makes your life easier. If you're lucky to have it, you're lucky.",
    name: "Steve Mark",
    title: "Founder & Leader",
    // img: people02,
  },
  {
    id: "feedback-3",
    content:
      "It is usually people in the money business, finance, and international trade that are really rich.",
    name: "Kenn Gallagher",
    title: "Founder & Leader",
    // img: people03,
  },
];

export const stats = [
  {
    id: "stats-1",
    title: "کاربر فعال",
    value: "+۲۸۰۰",
  },
  {
    id: "stats-2",
    title: "شرکت در حال استفاده",
    value: "+۹۰",
  },
  {
    id: "stats-3",
    title: "دانلود",
    value: "+۲۰۰M",
  },
];
export const statsEn = [
  {
    id: "stats-1",
    title: "User",
    value: "+2800",
  },
  {
    id: "stats-2",
    title: "Company",
    value: "+90",
  },
  {
    id: "stats-3",
    title: "Downloads",
    value: "+200M",
  },
];

export const footerLinks = [
  {
    title: "لینک های مورد نیاز",
    links: [
      {
        name: "محتویات",
        link: "https://www.hoobank.com/content/",
      },
      {
        name: "چگونه کار می کند؟",
        link: "https://www.hoobank.com/how-it-works/",
      },
      {
        name: "ساخت",
        link: "https://www.hoobank.com/create/",
      },
      {
        name: "جست و جو",
        link: "https://www.hoobank.com/explore/",
      },
      {
        name: "قوانین و مقررات",
        link: "https://www.hoobank.com/terms-and-services/",
      },
    ],
  },
  {
    title: "گروه ها",
    links: [
      {
        name: "پشتیبانی",
        link: "https://www.hoobank.com/help-center/",
      },
      {
        name: "شریک ها",
        link: "https://www.hoobank.com/partners/",
      },
      {
        name: "پیشنهاد ها",
        link: "https://www.hoobank.com/suggestions/",
      },
      {
        name: "بلاگ",
        link: "https://www.hoobank.com/blog/",
      },
      {
        name: "خبرنامه",
        link: "https://www.hoobank.com/newsletters/",
      },
    ],
  },
  {
    title: "شریک ها",
    links: [
      {
        name: "شریک های ما",
        link: "https://www.hoobank.com/our-partner/",
      },
      {
        name: "شریک شوید",
        link: "https://www.hoobank.com/become-a-partner/",
      },
    ],
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    // icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    // icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    // icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    // icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];

export const clients = [
  {
    id: "client-1",
    // logo: airbnb,
  },
  {
    id: "client-2",
    // logo: binance,
  },
  {
    id: "client-3",
    // logo: coinbase,
  },
  {
    id: "client-4",
    // logo: dropbox,
  },
];

export const contact = [
  {
    title: "آدرس : ",
    detail: "تهران - بلوار مژدی - شییشه کاوه",
  },
  {
    title: "تلفن : ",
    detail: "00599555444",
  },
  {
    title: "ایمیل : ",
    detail: "kavehglass@gmail.com",
  },
];
