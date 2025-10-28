// Categories configuration
export const categories = [
  { label: "ACCESSORIES", value: "accessories" },
  { label: "GREENHOUSE", value: "greenhouse" },
  { label: "INDOOR", value: "indoor" },
  { label: "OUTDOOR", value: "outdoor" },
  { label: "INDOORTRIM", value: "indoortrim" },
];

// Products mockup data
// Structure: id, slug, category, name, realPrice, fullPrice (optional), discount (optional), image, images (optional), description, specs
// Note: 'image' is used for backward compatibility and as fallback. 'images' array is optional for multiple images in gallery.
export const products = [
  // ACCESSORIES
  {
    id: "chair-1",
    slug: "chair-1",
    category: "accessories",
    name: "สตูลทรงกระบอกผ้ากำมะหยี่ สีเทาเข้ม",
    realPrice: 1928.5,
    fullPrice: 2755,
    discount: 30,
    image: "https://gg.lnwfile.com/_webp_resize_images/600/800/g2/b1/o4.webp",
    images: [
      "https://gg.lnwfile.com/_webp_resize_images/600/800/g2/b1/o4.webp",
      "https://gg.lnwfile.com/_webp_max_images/600/600/9a/22/71.webp",
      "https://gg.lnwfile.com/_webp_max_images/600/600/v7/i9/a5.webp",
      "https://gg.lnwfile.com/_webp_max_images/600/600/o5/1y/3h.webp",
    ],
    description: "สตูลทรงกระบอกผ้ากำมะหยี่คุณภาพสูง นุ่มสบาย ดีไซน์โมเดิร์น เหมาะสำหรับทุกห้อง",
    specs: [
      "วัสดุ: ผ้ากำมะหยี่",
      "สี: เทาเข้ม",
      "ขนาด: สูง 45 ซม. เส้นผ่านศูนย์กลาง 35 ซม.",
      "น้ำหนัก: 3 กก.",
    ],
  },
  {
    id: "chair-2",
    slug: "chair-2",
    category: "accessories",
    name: "เก้าอี้สไตล์มินิมอล ขาไม้ สีขาว",
    realPrice: 479.2,
    fullPrice: 599,
    discount: 20,
    image: "https://gg.lnwfile.com/_webp_resize_images/600/800/g2/b1/o4.webp",
    description: "เก้าอี้สไตล์มินิมอลสีขาวสะอาดตา ขาไม้แข็งแรง เหมาะกับห้องทำงานหรือมุมพักผ่อน",
    specs: [
      "วัสดุ: พลาสติก PP + ขาไม้",
      "สี: ขาว",
      "ขนาด: กว้าง 45 ซม. ลึก 50 ซม. สูง 80 ซม.",
      "น้ำหนัก: 4.5 กก.",
    ],
  },
  {
    id: "chair-3",
    slug: "chair-3",
    category: "accessories",
    name: "เก้าอี้รับประทานอาหาร เบาะเทาเข้ม",
    realPrice: 3590,
    image: "https://gg.lnwfile.com/_webp_resize_images/600/800/g2/b1/o4.webp",
    description: "เก้าอี้รับประทานอาหารเบาะนุ่มสบาย โครงไม้แข็งแรง ดีไซน์หรูหรา",
    specs: [
      "วัสดุ: ผ้าบุเบาะ + โครงไม้",
      "สี: เทาเข้ม",
      "ขนาด: กว้าง 50 ซม. ลึก 55 ซม. สูง 85 ซม.",
      "น้ำหนัก: 6 กก.",
    ],
  },
  {
    id: "chair-4",
    slug: "chair-4",
    category: "accessories",
    name: "เก้าอี้โยก สีเทาเข้ม เบาะผ้านุ่ม",
    realPrice: 4900,
    fullPrice: 5000,
    discount: 2,
    image: "https://gg.lnwfile.com/_webp_resize_images/600/800/g2/b1/o4.webp",
    description: "เก้าอี้โยกพักผ่อน เบาะผ้านุ่มสบาย เหมาะสำหรับมุมพักผ่อนหรือห้องนอน",
    specs: [
      "วัสดุ: ผ้าบุเบาะ + โครงไม้",
      "สี: เทาเข้ม",
      "ขนาด: กว้าง 70 ซม. ลึก 90 ซม. สูง 100 ซม.",
      "น้ำหนัก: 12 กก.",
    ],
  },

  // GREENHOUSE
  {
    id: "sofa-1",
    slug: "sofa-1",
    category: "greenhouse",
    name: "โซฟาสามที่นั่ง ผ้าลินิน สีโอวัลติน",
    realPrice: 18900,
    fullPrice: 21500,
    discount: 12,
    image: "https://gg.lnwfile.com/_webp_resize_images/600/800/xi/rp/2r.webp",
    description: "โซฟาสามที่นั่งผ้าลินินคุณภาพพรีเมียม นุ่มสบาย ดีไซน์หรูหรา เหมาะกับห้องรับแขก",
    specs: [
      "วัสดุ: ผ้าลินิน + โครงไม้",
      "สี: โอวัลติน",
      "ขนาด: กว้าง 200 ซม. ลึก 90 ซม. สูง 85 ซม.",
      "น้ำหนัก: 45 กก.",
    ],
  },
  {
    id: "sofa-2",
    slug: "sofa-2",
    category: "greenhouse",
    name: "โซฟาหนังวินเทจ สีแทน",
    realPrice: 25900,
    image: "https://gg.lnwfile.com/_webp_resize_images/600/800/xi/rp/2r.webp",
    description: "โซฟาหนังวินเทจสไตล์คลาสสิก หนังแท้คุณภาพสูง ทนทานและหรูหรา",
    specs: [
      "วัสดุ: หนังแท้ + โครงไม้",
      "สี: แทน",
      "ขนาด: กว้าง 220 ซม. ลึก 95 ซม. สูง 90 ซม.",
      "น้ำหนัก: 55 กก.",
    ],
  },
  {
    id: "sofa-3",
    slug: "sofa-3",
    category: "greenhouse",
    name: "โซฟาเข้ามุม สีเทาอ่อน",
    realPrice: 27900,
    fullPrice: 29900,
    discount: 7,
    image: "https://gg.lnwfile.com/_webp_resize_images/600/800/xi/rp/2r.webp",
    description: "โซฟาเข้ามุมใหญ่สบาย เหมาะกับห้องรับแขกขนาดใหญ่ ผ้านุ่มสบาย",
    specs: [
      "วัสดุ: ผ้าบุเบาะ + โครงไม้",
      "สี: เทาอ่อน",
      "ขนาด: กว้าง 280 ซม. ลึก 180 ซม. สูง 85 ซม.",
      "น้ำหนัก: 70 กก.",
    ],
  },
  {
    id: "sofa-4",
    slug: "sofa-4",
    category: "greenhouse",
    name: "โซฟาสองที่นั่ง ผ้าเทา",
    realPrice: 27900,
    fullPrice: 29900,
    discount: 7,
    image: "https://gg.lnwfile.com/_webp_resize_images/600/800/xi/rp/2r.webp",
    description: "โซฟาสองที่นั่งขนาดกะทัดรัด เหมาะกับพื้นที่จำกัด ผ้านุ่มสบาย",
    specs: [
      "วัสดุ: ผ้าบุเบาะ + โครงไม้",
      "สี: เทา",
      "ขนาด: กว้าง 160 ซม. ลึก 85 ซม. สูง 85 ซม.",
      "น้ำหนัก: 35 กก.",
    ],
  },

  // INDOOR
  {
    id: "light-1",
    slug: "light-1",
    category: "indoor",
    name: "โคมไฟยืน ทรงโดม สีครีม",
    realPrice: 3290,
    fullPrice: 3890,
    discount: 15,
    image: "https://gg.lnwfile.com/_webp_resize_images/600/800/v1/kk/4a.webp",
    description: "โคมไฟยืนทรงโดมสไตล์โมเดิร์น ให้แสงนุ่มนวล เหมาะกับมุมอ่านหนังสือ",
    specs: [
      "วัสดุ: โลหะ + ผ้า",
      "สี: ครีม",
      "ขนาด: สูง 160 ซม. เส้นผ่านศูนย์กลาง 40 ซม.",
      "หลอดไฟ: E27 สูงสุด 60W",
    ],
  },
  {
    id: "light-2",
    slug: "light-2",
    category: "indoor",
    name: "โคมไฟตั้งโต๊ะ ฐานไม้",
    realPrice: 1490,
    image: "https://gg.lnwfile.com/_webp_resize_images/600/800/v1/kk/4a.webp",
    description: "โคมไฟตั้งโต๊ะฐานไม้ธรรมชาติ ดีไซน์เรียบง่าย เหมาะกับโต๊ะทำงาน",
    specs: [
      "วัสดุ: ไม้ + ผ้า",
      "สี: ไม้ธรรมชาติ",
      "ขนาด: สูง 45 ซม. เส้นผ่านศูนย์กลาง 25 ซม.",
      "หลอดไฟ: E27 สูงสุด 40W",
    ],
  },
  {
    id: "light-3",
    slug: "light-3",
    category: "indoor",
    name: "โคมไฟเพดาน ทรงกระบอก",
    realPrice: 2290,
    fullPrice: 2590,
    discount: 12,
    image: "https://gg.lnwfile.com/_webp_resize_images/600/800/v1/kk/4a.webp",
    description: "โคมไฟเพดานทรงกระบอกสไตล์มินิมอล ให้แสงกระจายสม่ำเสมอ",
    specs: [
      "วัสดุ: โลหะ + แก้ว",
      "สี: ดำด้าน",
      "ขนาด: สูง 30 ซม. เส้นผ่านศูนย์กลาง 20 ซม.",
      "หลอดไฟ: E27 สูงสุด 60W",
    ],
  },
  {
    id: "light-4",
    slug: "light-4",
    category: "indoor",
    name: "โคมไฟแขวน ทรงกลม",
    realPrice: 2290,
    fullPrice: 2590,
    discount: 12,
    image: "https://gg.lnwfile.com/_webp_resize_images/600/800/v1/kk/4a.webp",
    description: "โคมไฟแขวนทรงกลมแก้วใส สไตล์โมเดิร์น ดูทันสมัย",
    specs: [
      "วัสดุ: แก้วใส + โลหะ",
      "สี: ทอง",
      "ขนาด: สูง 25 ซม. เส้นผ่านศูนย์กลาง 25 ซม.",
      "หลอดไฟ: E27 สูงสุด 40W",
    ],
  },

  // OUTDOOR
  {
    id: "vase-1",
    slug: "vase-1",
    category: "outdoor",
    name: "แจกันเซรามิกสีครีม",
    realPrice: 890,
    image: "https://gg.lnwfile.com/_webp_resize_images/600/800/jr/58/j8.webp",
    description: "แจกันเซรามิกสีครีมดีไซน์เรียบง่าย เหมาะกับการตกแต่งทุกสไตล์",
    specs: [
      "วัสดุ: เซรามิก",
      "สี: ครีม",
      "ขนาด: สูง 25 ซม. เส้นผ่านศูนย์กลาง 15 ซม.",
      "น้ำหนัก: 1.2 กก.",
    ],
  },
  {
    id: "vase-2",
    slug: "vase-2",
    category: "outdoor",
    name: "แจกันแก้วใส ฐานไม้",
    realPrice: 1250,
    image: "https://gg.lnwfile.com/_webp_resize_images/600/800/jr/58/j8.webp",
    description: "แจกันแก้วใสฐานไม้ ดีไซน์ธรรมชาติ เหมาะกับดอกไม้สด",
    specs: [
      "วัสดุ: แก้ว + ไม้",
      "สี: ใส/ไม้ธรรมชาติ",
      "ขนาด: สูง 30 ซม. เส้นผ่านศูนย์กลาง 12 ซม.",
      "น้ำหนัก: 0.8 กก.",
    ],
  },
  {
    id: "vase-3",
    slug: "vase-3",
    category: "outdoor",
    name: "แจกันทรงสูง เคลือบด้าน",
    realPrice: 1590,
    fullPrice: 1890,
    discount: 16,
    image: "https://gg.lnwfile.com/_webp_resize_images/600/800/jr/58/j8.webp",
    description: "แจกันทรงสูงเคลือบด้าน ดีไซน์โมเดิร์น เหมาะกับดอกไม้แห้ง",
    specs: [
      "วัสดุ: เซรามิก",
      "สี: เทาด้าน",
      "ขนาด: สูง 40 ซม. เส้นผ่านศูนย์กลาง 10 ซม.",
      "น้ำหนัก: 1.5 กก.",
    ],
  },
  {
    id: "vase-4",
    slug: "vase-4",
    category: "outdoor",
    name: "แจกันเซรามิกลายหินอ่อน",
    realPrice: 1590,
    fullPrice: 1890,
    discount: 16,
    image: "https://gg.lnwfile.com/_webp_resize_images/600/800/jr/58/j8.webp",
    description: "แจกันเซรามิกลายหินอ่อนหรูหรา เพิ่มความสวยงามให้ห้อง",
    specs: [
      "วัสดุ: เซรามิก",
      "สี: ลายหินอ่อน",
      "ขนาด: สูง 35 ซม. เส้นผ่านศูนย์กลาง 15 ซม.",
      "น้ำหนัก: 1.8 กก.",
    ],
  },

  // INDOORTRIM
  {
    id: "plant-1",
    slug: "plant-1",
    category: "indoortrim",
    name: "ต้นไม้ประดิษฐ์ในกระถาง",
    realPrice: 890,
    image: "https://gg.lnwfile.com/_webp_resize_images/600/800/jr/58/j8.webp",
    description: "ต้นไม้ประดิษฐ์ดูสมจริง ไม่ต้องรดน้ำ เหมาะกับการตกแต่งภายใน",
    specs: [
      "วัสดุ: พลาสติก + กระถางเซรามิก",
      "สี: เขียว",
      "ขนาด: สูง 45 ซม.",
      "น้ำหนัก: 1.5 กก.",
    ],
  },
  {
    id: "plant-2",
    slug: "plant-2",
    category: "indoortrim",
    name: "ต้นไม้จำลองในแจกันแก้ว",
    realPrice: 1250,
    image: "https://gg.lnwfile.com/_webp_resize_images/600/800/jr/58/j8.webp",
    description: "ต้นไม้จำลองในแจกันแก้วสวยงาม เหมาะตกแต่งโต๊ะทำงาน",
    specs: [
      "วัสดุ: พลาสติก + แจกันแก้ว",
      "สี: เขียว",
      "ขนาด: สูง 35 ซม.",
      "น้ำหนัก: 0.8 กก.",
    ],
  },
  {
    id: "decor-1",
    slug: "decor-1",
    category: "indoortrim",
    name: "ของตกแต่งทรงเรขาคณิต",
    realPrice: 1590,
    fullPrice: 1890,
    discount: 16,
    image: "https://gg.lnwfile.com/_webp_resize_images/600/800/jr/58/j8.webp",
    description: "ของตกแต่งทรงเรขาคณิตสไตล์โมเดิร์น เพิ่มความทันสมัยให้ห้อง",
    specs: [
      "วัสดุ: โลหะ",
      "สี: ทอง",
      "ขนาด: สูง 20 ซม. กว้าง 15 ซม.",
      "น้ำหนัก: 0.5 กก.",
    ],
  },
  {
    id: "decor-2",
    slug: "decor-2",
    category: "indoortrim",
    name: "กรอบรูปไม้ธรรมชาติ",
    realPrice: 1590,
    fullPrice: 1890,
    discount: 16,
    image: "https://gg.lnwfile.com/_webp_resize_images/600/800/jr/58/j8.webp",
    description: "กรอบรูปไม้ธรรมชาติ ดีไซน์เรียบง่าย เหมาะกับรูปถ่ายทุกขนาด",
    specs: [
      "วัสดุ: ไม้",
      "สี: ไม้ธรรมชาติ",
      "ขนาด: กว้าง 20 ซม. สูง 25 ซม.",
      "น้ำหนัก: 0.4 กก.",
    ],
  },
];

// Helper functions
export const getProductsByCategory = (category) => {
  return products.filter((product) => product.category === category);
};

export const getProductBySlug = (slug) => {
  return products.find((product) => product.slug === slug);
};

export const getProductById = (id) => {
  return products.find((product) => product.id === id);
};

export const getRelatedProducts = (currentProductId, category, limit = 4) => {
  return products
    .filter((product) => product.category === category && product.id !== currentProductId)
    .slice(0, limit);
};
