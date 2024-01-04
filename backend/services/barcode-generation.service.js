const fs = require("fs");
const PDFDocument = require("pdfkit");
const { ObjectId } = require("mongodb");
const bwipjs = require("bwip-js");

// Generate a specified number of ObjectIds
function generateObjectIds(numberOfItems) {
  const objectIds = [];
  for (let i = 0; i < numberOfItems; i++) {
    objectIds.push(new ObjectId().toString());
  }
  return objectIds;
}

const barcodeService = async numberOfItems => {
  const generatedIds = generateObjectIds(numberOfItems);
  const outputFilename = "barcodes1.pdf";

  const itemsPerRow = 2;
  const rowsPerPage = 8;

  const doc = new PDFDocument({ autoFirstPage: false });
  doc.pipe(fs.createWriteStream(outputFilename));

  let currentPage = 1;
  let currentRow = 1;
  let currentItem = 1;

  // Add the first page to the document
  doc.addPage();

  // Get the page dimensions after adding the first page
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const itemWidth = pageWidth / itemsPerRow;
  const itemHeight = 100;
  const margin = 18;

  const addNewPage = () => {
    doc.addPage({ size: [pageWidth, pageHeight] });
    currentRow = 1;
  };

  // Function to generate barcode image for an ObjectId
  const generateBarcodeImage = async objectId => {
    console.log(objectId);

    return await bwipjs.toBuffer({
      bcid: "code128", // You can choose a different barcode format here
      text: objectId.toString(),
      scale: 4, // Adjust the scale as needed
      width: itemWidth - 2 * margin,
      height: itemHeight - 2 * margin,
      includetext: true,
      textxalign: "center",
      textfont: "Helvetica",
      textsize: 18,
      textyoffset: 4
    });
  };

  const generateBarcodePdf = async objectId => {
    const x = (currentItem - 1) * itemWidth;
    const y = (currentRow - 1) * itemHeight;

    try {
      const barcodeImage = await generateBarcodeImage(objectId);

      doc.image(barcodeImage, x + margin, y + margin, {
        width: itemWidth - 2 * margin
      });x

      currentItem += 1;
    } catch (error) {
      console.error("Error generating barcode:", error);
    }
  };

  for (const id of generatedIds) {
    if (currentItem > itemsPerRow) {
      currentItem = 1;
      currentRow += 1;
    }

    if (currentRow > rowsPerPage) {
      currentRow = 1;
      currentPage += 1;
      addNewPage();
    }

    await generateBarcodePdf(id);
  }

  doc.end();
  console.log(`PDF saved as ${outputFilename}`);
};

module.exports = barcodeService;

barcodeService(17)
  .then(() => console.log("completed..."))
  .catch(err => console.log("err: ", err));
