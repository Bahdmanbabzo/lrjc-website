import { mkdir, readdir, rename } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = path.join("public", "lrjc26 executives");
const OUTPUT_DIR = path.join("public", "figures", "executives");
const ARCHIVE_DIR = path.join("assets", "executives");

const portraits = {
  "Abdulgafar Hikmah.jpg": "abdulgafar-hikmah",
  "Abdul-Liadi Faaiz.jpg": "abdul-liadi-faaiz",
  "Amarachi Adeyemi.jpg": "amarachi-adeyemi",
  "Folarin Abisola.jpg": "folarin-abisola",
  "Ogundipe Taiwo.jpg": "ogundipe-taiwo",
  "Barika Abdulmalik.jpg": "barika-abdulmalik",
  "Raji Mosope.jpg": "raji-mosope",
  "Beckley Oserebameh.jpg": "beckley-oserebameh",
  "Adewunmi Hassan.jpg": "adewunmi-hassan",
  "Adedoyin Adeboun.jpg": "adedoyin-adeboun",
};

const groupPhoto = {
  file: "2026 Executives.jpg",
  slug: "executives-2026",
};

await mkdir(OUTPUT_DIR, { recursive: true });
await mkdir(ARCHIVE_DIR, { recursive: true });

for (const [file, slug] of Object.entries(portraits)) {
  const source = path.join(SOURCE_DIR, file);
  const target = path.join(OUTPUT_DIR, `${slug}.webp`);

  await sharp(source)
    .rotate()
    .resize(720, 900, { fit: "cover", position: "top" })
    .webp({ quality: 80 })
    .toFile(target);

  console.log(`portrait  ${slug}.webp`);
}

await sharp(path.join(SOURCE_DIR, groupPhoto.file))
  .rotate()
  .resize(1600, 900, { fit: "cover", position: "centre" })
  .webp({ quality: 80 })
  .toFile(path.join(OUTPUT_DIR, `${groupPhoto.slug}.webp`));

console.log(`group     ${groupPhoto.slug}.webp`);

for (const file of await readdir(SOURCE_DIR)) {
  await rename(path.join(SOURCE_DIR, file), path.join(ARCHIVE_DIR, file));
}

console.log(`archived  originals -> ${ARCHIVE_DIR}`);
