import fs from "fs";

const AffinityHeaders = ["totem", "color", "file", "black/white", "color"];

export const createAffinityCSV = (totems, colors) => {
  let csvAffiniyContent = AffinityHeaders.join(";") + "\n";
  Object.values(totems).forEach((totem) => {
    if (totem.processed) {
      return;
    }
    colors.forEach((color) => {
      csvAffiniyContent +=
        [
          totem.title,
          `./colors/${color.toLocaleLowerCase()}.png`,
          `./${totem.title.toLocaleLowerCase().replace(' ', '_')}/${totem.title.toLocaleLowerCase().replace(' ', '_')}-${
            color == "Fog" ? "zwart" : "wit"
          }.afpub`,
          `./colors/${color == "Fog" ? "black" : "white"}.png`,
          color.toLocaleLowerCase(),
        ].join(";") + "\n";
    });
  });
  csvAffiniyContent;

  fs.writeFile("../public/totems/totems.csv", csvAffiniyContent, (err) => {
    if (err) {
      console.error(err);
    } else {
    }
  });
};

const PDFSplitHeaders = ["type", "totem", "color"];
export const createPDFSplitCSV = (totems, types, colors) => {
  let csvPDFSplitContent = PDFSplitHeaders.join(";") + "\n";
  Object.values(totems).forEach((totem) => {
    if (totem.processed) {
      return;
    }
    colors.forEach((color) => {
      types.forEach((type) => {
        csvPDFSplitContent +=
          [type.toLocaleLowerCase(), totem.title.toLocaleLowerCase().replace(' ', '_'), color].join(";") + "\n";
      });
    });
  });
  csvPDFSplitContent;

  fs.writeFile("./csv-split.csv", csvPDFSplitContent, (err) => {
    if (err) {
      console.error(err);
    } else {
    }
  });
};
