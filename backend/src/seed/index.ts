import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { config } from "../config.js";
import { closeDb, getDb } from "../db/index.js";

const db = getDb();

function clearAll() {
  db.exec(`
    DELETE FROM testimonials;
    DELETE FROM faqs;
    DELETE FROM blog_posts;
    DELETE FROM menu_items;
    DELETE FROM menu_categories;
    DELETE FROM outlets;
    DELETE FROM leads;
    DELETE FROM admins;
  `);
}

function seedAdmin() {
  const id = uuid();
  const hash = bcrypt.hashSync(config.adminPassword, 10);
  db.prepare(
    "INSERT INTO admins (id, email, password_hash, name) VALUES (?, ?, ?, ?)",
  ).run(id, config.adminEmail, hash, "INKOTEA Admin");
  console.log(`Admin: ${config.adminEmail} / ${config.adminPassword}`);
}

function seedOutlets() {
  const insert = db.prepare(
    `INSERT INTO outlets (id, name, city, area, address, type, image, maps_query, opening_year)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  const outlets = [
    ["hyd-hitech", "INKOTEA Hitech City", "Hyderabad", "Hitech City", "Plot 42, Cyber Towers Rd, Madhapur, Hyderabad 500081", "cafe", "/brand/cafe-storefront-night.jpeg", "Hitech City Hyderabad", 2023],
    ["hyd-kondapur", "INKOTEA Kondapur", "Hyderabad", "Kondapur", "Beside HDFC Bank, Kothaguda Junction, Kondapur, Hyderabad", "kiosk", "/brand/kiosk-daylight.jpeg", "Kondapur Hyderabad", 2022],
    ["hyd-gachibowli", "INKOTEA Gachibowli", "Hyderabad", "Gachibowli", "DLF Cyber City, Gachibowli, Hyderabad 500032", "cafe", "/brand/cafe-interior-busy.jpeg", "Gachibowli Hyderabad", 2024],
    ["hyd-banjara", "INKOTEA Banjara Hills", "Hyderabad", "Banjara Hills", "Road No. 12, Banjara Hills, Hyderabad 500034", "cafe", "/brand/cafe-hero-sitsipsmile.jpeg", "Banjara Hills Hyderabad", 2023],
    ["hyd-ameerpet", "INKOTEA Ameerpet", "Hyderabad", "Ameerpet", "Opp Maitrivanam, Ameerpet, Hyderabad 500038", "kiosk", "/brand/kiosk-foodcourt.jpeg", "Ameerpet Hyderabad", 2022],
    ["hyd-secunderabad", "INKOTEA Secunderabad", "Hyderabad", "Secunderabad", "MG Road, near Clock Tower, Secunderabad 500003", "kiosk", "/brand/kiosk-modern-yellow.jpeg", "Secunderabad", 2021],
    ["wgl-hanamkonda", "INKOTEA Hanamkonda", "Warangal", "Hanamkonda", "Subedari, Hanamkonda, Warangal 506001", "kiosk", "/brand/kiosk-standalone-night.jpeg", "Hanamkonda Warangal", 2023],
    ["wgl-kuc", "INKOTEA Kazipet", "Warangal", "Kazipet", "KU Campus Road, Kazipet, Warangal", "kiosk", "/brand/kiosk-customer-banner.jpeg", "Kazipet Warangal", 2024],
    ["krm-tower", "INKOTEA Tower Circle", "Karimnagar", "Tower Circle", "Tower Circle Main Rd, Karimnagar 505001", "kiosk", "/brand/kiosk-night-crowd.jpeg", "Tower Circle Karimnagar", 2024],
    ["nzb-bus", "INKOTEA Nizamabad Bus Stand", "Nizamabad", "Bus Stand", "Bus Stand Main Rd, Nizamabad 503001", "kiosk", "/brand/kiosk-daylight.jpeg", "Nizamabad bus stand", 2024],
    ["vij-bezwada", "INKOTEA Bezwada", "Vijayawada", "Bezwada", "MG Road, Bezwada, Vijayawada 520001", "cafe", "/brand/cafe-couple-coffee.jpeg", "Bezwada Vijayawada", 2025],
    ["vij-bhavanipuram", "INKOTEA Bhavanipuram", "Vijayawada", "Bhavanipuram", "Bhavanipuram Main Rd, Vijayawada 520012", "kiosk", "/brand/kiosk-foodcourt.jpeg", "Bhavanipuram Vijayawada", 2024],
    ["vsp-mvp", "INKOTEA MVP Colony", "Visakhapatnam", "MVP Colony", "Sector 2, MVP Colony, Visakhapatnam 530017", "cafe", "/brand/cafe-friends-chat.jpeg", "MVP Colony Visakhapatnam", 2025],
    ["vsp-rkbeach", "INKOTEA RK Beach", "Visakhapatnam", "RK Beach", "Beach Road, RK Beach, Visakhapatnam 530002", "cafe", "/brand/cafe-outdoor-seating.jpeg", "RK Beach Visakhapatnam", 2025],
    ["gnt-arundelpet", "INKOTEA Arundelpet", "Guntur", "Arundelpet", "5/1 Arundelpet, Guntur 522002", "kiosk", "/brand/kiosk-modern-yellow.jpeg", "Arundelpet Guntur", 2024],
  ] as const;

  for (const o of outlets) insert.run(...o);
  console.log(`Seeded ${outlets.length} outlets`);
}

function seedMenu() {
  const catInsert = db.prepare(
    `INSERT INTO menu_categories (key, label, short_label, description, price_range) VALUES (?, ?, ?, ?, ?)`,
  );
  const categories = [
    ["signature-tea", "Signature Tea", "Tea", "Hand-pounded ginger, cardamom and slow-brewed leaves — every cup tuned for that one more sip.", "₹20 – ₹50"],
    ["coffee", "Coffee & Health", "Coffee", "Signature brews and wellness drinks — from filter coffee to ragi java and Boost.", "₹40 – ₹180"],
    ["social-beverages", "Social Beverages", "Social", "Milkshakes, mojitos and seasonal coolers built for sharing tables and long chats.", "₹80 – ₹140"],
    ["comfort-bites", "Comfort Bites", "Bites", "Osmania biscuits, Maggi bowls, savoury snacks and light meals — chai's best companions.", "₹60 – ₹220"],
  ] as const;
  for (const c of categories) catInsert.run(...c);

  const itemInsert = db.prepare(
    `INSERT INTO menu_items (id, name, category, description, price_range, image, is_best_seller) VALUES (?, ?, ?, ?, ?, ?, ?)`,
  );
  const items = [
    ["desi-dum", "Desi Dum Chai", "signature-tea", "Slow-cooked over flame with milk reduction, hand-pounded ginger and a pinch of cardamom.", "₹25 – ₹40", "/brand/chai-pour-neon.jpeg", 1],
    ["masala", "Masala Chai", "signature-tea", "Six-spice blend brewed to perfection — clove, cinnamon, fennel, pepper, cardamom & ginger.", "₹20 – ₹35", "/brand/hero-chai-scene.jpeg", 1],
    ["elaichi", "Elaichi Chai", "signature-tea", "Crushed green cardamom infused into rich Assam tea milk.", "₹25 – ₹35", "/brand/chai-pour-neon.jpeg", 0],
    ["kashmiri", "Kashmiri Kahwa", "signature-tea", "Saffron, almond slivers and green tea — a warming Himalayan classic.", "₹40 – ₹50", "/brand/chai-pour-neon.jpeg", 0],
    ["ginger", "Ginger Kadak Chai", "signature-tea", "Maa-ke-haath ki ghar wali kadak — strong, gingery and unforgettable.", "₹25 – ₹35", "/brand/hero-chai-scene.jpeg", 0],
    ["filter-coffee", "South Indian Filter Coffee", "coffee", "Decoction percolated overnight, frothed with hot milk in a stainless tumbler.", "₹40 – ₹60", "/brand/cafe-couple-coffee.jpeg", 1],
    ["cappuccino", "Signature Cappuccino", "coffee", "Double espresso with velvet steamed milk and a dusting of cocoa.", "₹100 – ₹140", "/brand/cafe-couple-coffee.jpeg", 0],
    ["latte", "Cardamom Latte", "coffee", "Espresso with cardamom-infused milk — INKOTEA's signature twist.", "₹120 – ₹160", "/brand/cafe-couple-coffee.jpeg", 0],
    ["oreo-shake", "Oreo Milkshake", "social-beverages", "Crushed Oreo cookies blended with thick vanilla cream.", "₹100 – ₹140", "/brand/cafe-menu-spread.jpeg", 1],
    ["osmania", "Osmania Biscuit", "comfort-bites", "Hyderabad's iconic crumbly tea biscuit — sweet, salty, melt-in-mouth.", "₹15 – ₹30", "/brand/cafe-menu-spread.jpeg", 1],
    ["maggi-bowl", "Cheesy Masala Maggi", "comfort-bites", "2-minute classic with cheese, onions, capsicum and INKOTEA tadka.", "₹80 – ₹120", "/brand/cafe-menu-spread.jpeg", 0],
    ["samosa", "Crispy Samosa Plate", "comfort-bites", "Hand-folded, deep-fried, served hot with mint-tamarind chutney.", "₹40 – ₹60", "/brand/cafe-menu-spread.jpeg", 0],
  ] as const;
  for (const i of items) itemInsert.run(...i);
  console.log(`Seeded ${categories.length} categories, ${items.length} menu items`);
}

function seedBlog() {
  const insert = db.prepare(
    `INSERT INTO blog_posts (slug, title, excerpt, category, author, published_at, reading_minutes, cover, body) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  const posts = [
    ["why-india-is-falling-back-in-love-with-chai", "Why India Is Falling Back In Love With Chai", "From street corners to luxury cafes, Indian chai is having a renaissance — and the data backs it up.", "tea-trends", "INKOTEA Editorial", "2026-04-22", 5, "/brand/chai-pour-neon.jpeg", "India consumes more than **1.1 million tonnes** of tea annually — but the way we drink it is changing."],
    ["kiosk-vs-cafe-which-franchise-model-fits-you", "Kiosk vs Cafe: Which Franchise Model Fits You?", "A practical decision framework for choosing between a high-volume kiosk and an experience-led cafe.", "franchise", "Franchise Desk", "2026-04-10", 7, "/brand/kiosk-modern-yellow.jpeg", "Both INKOTEA franchise formats are profitable. But they reward very different operator profiles."],
    ["the-economics-of-a-3-lakh-tea-business", "The Economics of a ₹3 Lakh Tea Business", "We break down the actual P&L of an INKOTEA kiosk.", "entrepreneurship", "INKOTEA Editorial", "2026-03-28", 8, "/brand/kiosk-customer-banner.jpeg", "Most aspiring entrepreneurs overestimate revenue and underestimate costs."],
    ["designing-a-cafe-people-actually-stay-in", "Designing a Cafe People Actually Stay In", "Five interior principles we apply across every INKOTEA Social Cafe.", "cafe-culture", "Design Studio", "2026-03-15", 6, "/brand/cafe-interior-busy.jpeg", "Dwell time is the single biggest lever in cafe economics."],
    ["from-one-kiosk-to-forty-outlets", "From One Kiosk to Forty Outlets: Our Story", "A founder's-eye view of building INKOTEA.", "brand", "Srinivas P. Mahendra", "2026-02-20", 9, "/brand/kiosk-night-crowd.jpeg", "When we opened our first kiosk in 2021, we had one rule: every cup must taste the same."],
    ["what-investors-look-for-in-an-fnb-franchise", "What Investors Look For In An F&B Franchise", "A frank guide to the metrics that determine franchise success.", "entrepreneurship", "Franchise Desk", "2026-02-05", 6, "/brand/cafe-friends-chat.jpeg", "Investing in an F&B franchise is part diligence, part instinct."],
  ] as const;
  for (const p of posts) insert.run(...p);
  console.log(`Seeded ${posts.length} blog posts`);
}

function seedFaqs() {
  const insert = db.prepare(
    "INSERT INTO faqs (id, question, answer, audience) VALUES (?, ?, ?, ?)",
  );
  const faqs = [
    ["investment", "What is the investment required for an INKOTEA franchise?", "The Kiosk Model starts from ₹2.5 Lakhs total investment. The Social Cafe Model starts from ₹6.5 Lakhs.", "franchise"],
    ["space", "What space is required?", "Kiosks need a minimum of 150 sq ft. Social Cafes are recommended at 300 – 500 sq ft.", "franchise"],
    ["support", "What franchise support does INKOTEA provide?", "End-to-end: setup guidance, training, recipes, branding, raw material supply, and ongoing operations guidance.", "franchise"],
    ["breakeven", "What is the typical break-even period?", "Many kiosk locations target investment recovery in 8 – 10 months. Cafes typically see break-even between 12 – 18 months.", "franchise"],
    ["products", "What products do INKOTEA outlets offer?", "Signature teas, coffee & health drinks, modern beverages, and quick comfort bites.", "customer"],
    ["format", "Are INKOTEA outlets dine-in or takeaway?", "Both. Kiosks are quick-service takeaway. Social Cafes are dine-in social spaces.", "customer"],
    ["consistency", "Is the experience standardized across outlets?", "Yes. Every INKOTEA outlet follows centrally defined recipes and brand guidelines.", "customer"],
    ["name-meaning", "What does \"Inko\" mean?", "Inko means \"One More\" in Telugu. Our motto celebrates the joy of that perfect cup.", "customer"],
  ] as const;
  for (const f of faqs) insert.run(...f);
  console.log(`Seeded ${faqs.length} FAQs`);
}

function seedTestimonials() {
  const insert = db.prepare(
    `INSERT INTO testimonials (id, name, initials, city, quote, image, image_alt, rating, is_video) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  const items = [
    ["priya-hyderabad", "Priya S.", "PS", "Hyderabad", "The masala chai here tastes like home — rich, warm and perfectly spiced.", "/brand/hero-chai-scene.jpeg", "Steaming masala chai at an INKOTEA outlet", 5, 0],
    ["rahul-vijayawada", "Rahul M.", "RM", "Vijayawada", "INKOTEA's social cafe feels premium without the premium price.", "/brand/cafe-couple-coffee.jpeg", "Couple enjoying coffee inside an INKOTEA social cafe", 5, 1],
    ["ananya-warangal", "Ananya K.", "AK", "Warangal", "My friends and I meet here every weekend. The iced tea and samosas are unbeatable.", "/brand/cafe-friends-chat.jpeg", "Friends chatting over beverages at INKOTEA", 5, 0],
    ["karthik-guntur", "Karthik R.", "KR", "Guntur", "I was sceptical about a branded chai kiosk, but one cup changed my mind.", "/brand/kiosk-night-crowd.jpeg", "Busy INKOTEA kiosk with customers at night", 5, 1],
    ["meera-vizag", "Meera D.", "MD", "Visakhapatnam", "The cafe interior is so inviting — warm lighting, clean space and staff who remember your order.", "/brand/cafe-interior-busy.jpeg", "INKOTEA cafe interior", 5, 0],
    ["suresh-karimnagar", "Suresh N.", "SN", "Karimnagar", "Outdoor seating, great chai and snacks that don't break the bank.", "/brand/cafe-outdoor-seating.jpeg", "INKOTEA cafe outdoor seating", 5, 0],
  ] as const;
  for (const t of items) insert.run(...t);
  console.log(`Seeded ${items.length} testimonials`);
}

clearAll();
seedAdmin();
seedOutlets();
seedMenu();
seedBlog();
seedFaqs();
seedTestimonials();
closeDb();
console.log("Database seeded successfully.");
