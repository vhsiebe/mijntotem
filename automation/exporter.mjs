import { readFileSync, writeFileSync } from "fs";
import { createAffinityCSV, createPDFSplitCSV } from "./affinity.js";
import { createProducts } from "./medusa.js";


const loadJSON = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url)));


const colors = ["Bordeaux", "Asphalt", "Forest", "Navy"];
const variants = ["Tshirt", "Hoodie", "Sweater"];
const totems = loadJSON('../data/totems.json');

/* ----------------- */
/* AFFINITY */

createAffinityCSV(totems, colors);
createPDFSplitCSV(totems, variants, colors);
createProducts(totems, colors, variants);

/* ----------------- */
/* SET PROCESSED */

const newTotems = { ...totems };

Object.values(newTotems).forEach((totem) => {
  totem.processed = true;
});

writeFileSync("../data/totems.json", JSON.stringify(newTotems, null, 2));
