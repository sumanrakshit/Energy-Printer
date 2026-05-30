const fs = require('fs');
const path = require('path');

function createPdfBuffer(title, brand, category, description, specs) {
  const objects = [];
  
  // Object 1: Catalog
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');
  
  // Object 2: Pages
  objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj');
  
  // Object 3: Page (MediaBox [0 0 595 842] represents A4 standard sizing)
  objects.push('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj');
  
  // Object 4: Stream (Page contents)
  let streamText = 'BT\n';
  
  // Title (Helvetica-Bold 24pt)
  streamText += '/F2 24 Tf\n';
  streamText += '50 780 Td\n';
  streamText += `(${title.replace(/[\(\)]/g, '')}) Tj\n`;
  
  // Subheaders (Helvetica 12pt)
  streamText += '/F1 12 Tf\n';
  streamText += '0 -35 Td\n';
  streamText += `(Brand: ${brand.replace(/[\(\)]/g, '')}) Tj\n`;
  streamText += '0 -20 Td\n';
  streamText += `(Category: ${category.replace(/[\(\)]/g, '')}) Tj\n`;
  
  // Overview Header
  streamText += '0 -30 Td\n';
  streamText += '/F2 14 Tf\n';
  streamText += '(Product Overview) Tj\n';
  
  // Overview Content (Wrapped)
  streamText += '/F1 10 Tf\n';
  streamText += '0 -22 Td\n';
  
  const desc = description.replace(/[\(\)]/g, '');
  const descLines = [];
  for (let i = 0; i < desc.length; i += 65) {
    descLines.push(desc.substring(i, i + 65));
  }
  descLines.forEach(line => {
    streamText += `(${line}) Tj\n0 -16 Td\n`;
  });
  
  // Technical Specifications Header
  streamText += '0 -15 Td\n';
  streamText += '/F2 14 Tf\n';
  streamText += '(Technical Specifications) Tj\n';
  streamText += '/F1 10 Tf\n';
  streamText += '0 -22 Td\n';
  
  // Specs Bullets
  specs.forEach(spec => {
    streamText += `(- ${spec.replace(/[\(\)]/g, '')}) Tj\n0 -18 Td\n`;
  });
  
  // Footer / Seal of Quality
  streamText += '0 -40 Td\n';
  streamText += '/F2 10 Tf\n';
  streamText += '(EnergyPrinter Quality Guarantee - Certified Product Specifications) Tj\n';
  streamText += '/F1 9 Tf\n';
  streamText += '0 -15 Td\n';
  streamText += `(Generated on: ${new Date().toLocaleDateString()} | Reference ID: EP-${title.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}) Tj\n`;
  
  streamText += 'ET';
  
  const streamLength = Buffer.byteLength(streamText, 'utf8');
  objects.push(`4 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamText}\nendstream\nendobj`);
  
  // Object 5: Regular Helvetica
  objects.push('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj');
  
  // Object 6: Bold Helvetica
  objects.push('6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj');
  
  // Serialize file and compute correct xref offsets
  let pdf = '%PDF-1.4\n';
  const offsets = [];
  
  for (let i = 0; i < objects.length; i++) {
    offsets.push(Buffer.byteLength(pdf, 'utf8'));
    pdf += objects[i] + '\n';
  }
  
  const xrefOffset = Buffer.byteLength(pdf, 'utf8');
  
  pdf += 'xref\n';
  pdf += `0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  
  for (let i = 0; i < offsets.length; i++) {
    const padded = String(offsets[i]).padStart(10, '0');
    pdf += `${padded} 00000 n \n`;
  }
  
  pdf += 'trailer\n';
  pdf += `<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdf += 'startxref\n';
  pdf += `${xrefOffset}\n`;
  pdf += '%%EOF\n';
  
  return Buffer.from(pdf, 'utf8');
}

const specsDir = path.join(__dirname, 'public', 'specs');

// Create the directory if it doesn't exist
if (!fs.existsSync(specsDir)) {
  fs.mkdirSync(specsDir, { recursive: true });
  console.log('Created directory:', specsDir);
}

const products = [
  {
    filename: 'canon-pixma-ts8320.pdf',
    title: 'Canon PIXMA TS8320 Specification Sheet',
    brand: 'Canon',
    category: 'All-in-One',
    description: 'Perfect for photo enthusiasts and creative professionals looking for premium quality prints. Delivering stunning borderless photographs and versatile document printing.',
    specs: [
      'Print Speed: 15.0 ipm Black, 10.0 ipm Color',
      'Print Resolution: Up to 4800 x 1200 dpi',
      'Ink System: 6 Individual Inks (including Photo Blue for rich tones)',
      'Connectivity: Dual-band Wi-Fi (2.4/5GHz), Bluetooth 4.0 LE, USB 2.0, SD Card Slot',
      'Display: 4.3-inch LCD Touch Screen with tilt adjustment',
      'Paper Capacity: 100-sheet cassette front & 100-sheet rear paper tray',
      'Features: Auto Duplex Printing, CD/DVD printing, Creative Park app support'
    ]
  },
  {
    filename: 'epson-ecotank-et-4760.pdf',
    title: 'Epson EcoTank ET-4760 Specification Sheet',
    brand: 'Epson',
    category: 'Inkjet Printers',
    description: 'Revolutionary cartridge-free printing with easy-to-fill supersized ink tanks. Includes up to 2 years of ink in the box, giving you peace of mind and massive cost savings.',
    specs: [
      'Print Speed: 15.0 ppm Black, 8.0 ppm Color',
      'Ink Yield: Up to 7,500 pages black / 6,000 pages color per replacement bottle set',
      'Connectivity: High-Speed USB 2.0, Wi-Fi 4 (802.11 b/g/n), Ethernet, Wi-Fi Direct',
      'Key Features: 30-sheet Automatic Document Feeder (ADF), Auto Duplexing',
      'Paper Tray: 250-sheet front loading paper cassette',
      'Display: 2.4-inch Color Touchscreen',
      'Scanner: Flatbed color scanner with CIS sensor, 1200 x 2400 dpi optical resolution'
    ]
  },
  {
    filename: 'hp-officejet-pro-9015e.pdf',
    title: 'HP OfficeJet Pro 9015e Specification Sheet',
    brand: 'HP',
    category: 'All-in-One',
    description: 'A revolutionary smart all-in-one printer that works the way you need. Designed to help save time with Smart Tasks shortcuts, automatic double-sided scanning, and top-tier security.',
    specs: [
      'Print Speed: Up to 22 ppm Black, 18 ppm Color',
      'Duty Cycle: Monthly, letter size up to 25,000 pages',
      'Connectivity: 1 Ethernet port, 1 Wireless 802.11a/b/g/n, RJ-11 modem port, USB 2.0',
      'Display: 2.7-inch Color Touchscreen with customizable shortcuts',
      'Feeder capacity: 35-sheet automatic document feeder (ADF) with two-sided scanning',
      'Paper Capacity: 250-sheet input tray, 60-sheet output tray',
      'Special Features: Self-healing Wi-Fi, HP+ smart printing system with cloud connectivity'
    ]
  },
  {
    filename: 'brother-hl-l2350dw.pdf',
    title: 'Brother HL-L2350DW Specification Sheet',
    brand: 'Brother',
    category: 'Laser Printers',
    description: 'A compact and reliable wireless monochrome laser printer for home or busy small office use. Provides high-speed printing, auto double-sided sheets, and outstanding print quality.',
    specs: [
      'Print Speed: Up to 32 pages per minute (Monochrome Laser)',
      'Duplex: Automatic two-sided printing (Duplex) standard',
      'Resolution: Up to 2400 x 600 dpi',
      'Connectivity: Wireless 802.11b/g/n, Wi-Fi Direct, Hi-Speed USB 2.0',
      'Paper capacity: 250-sheet capacity paper tray adjusted for Letter or Legal size',
      'Mobile Integration: AirPrint, Google Cloud Print, Brother iPrint&Scan',
      'Design: Compact footprint fitting perfectly on small desks'
    ]
  },
  {
    filename: 'hp-laserjet-pro-m404n.pdf',
    title: 'HP LaserJet Pro M404n Specification Sheet',
    brand: 'HP',
    category: 'Laser Printers',
    description: 'Designed to let you focus your time where it is most effective: helping to grow your business. Ideal for workteams printing 750 to 4,000 pages per month, seeking speed and security.',
    specs: [
      'Print Speed: Up to 40 ppm Black (Letter-size laser)',
      'First Page Out: As fast as 6.1 seconds from sleep mode',
      'Print Resolution: HP FastRes 1200 dpi (up to 4800 x 600 enhanced dpi)',
      'Connectivity: 1 High-speed USB 2.0, 1 Host USB, 1 Gigabit Ethernet network',
      'Processor / Memory: 1200 MHz / 256 MB DRAM',
      'Control Panel: 2-line backlit LCD graphical display',
      'Security: Secure Boot, firmware integrity validation, secure storage'
    ]
  },
  {
    filename: 'epson-expression-xp-7100.pdf',
    title: 'Epson Expression Premium XP-7100 Specification Sheet',
    brand: 'Epson',
    category: 'Refurbished',
    description: 'Certified refurbished all-in-one printer featuring exceptional borderless photo quality. Combines creative versatility with a 30-page automatic document feeder for high efficiency.',
    specs: [
      'Print Speed: 15.8 ISO ppm Black, 11.0 ISO ppm Color',
      'Resolution: 5760 x 1440 optimized dpi',
      'Photo Speed: Borderless 4" x 6" photos in as fast as 12 seconds',
      'Display: Interactive 4.3-inch Touchscreen with easy gesture navigation',
      'Trays: Dedicated photo tray, auto-extendable output tray, CD/DVD tray',
      'Connectivity: Wireless, Wi-Fi Direct, Ethernet, USB, SD Card slot',
      'Condition: Certified Refurbished with rigorous multi-point quality testing'
    ]
  },
  {
    filename: 'hp-laserjet-pro-m15w.pdf',
    title: 'HP LaserJet Pro M15w Specification Sheet',
    brand: 'HP',
    category: 'Refurbished',
    description: 'Certified refurbished compact monochrome laser printer. The world\'s smallest laser printer in its class, perfect for space-constrained home offices and students.',
    specs: [
      'Print Speed: Up to 19 pages per minute Black (Laser)',
      'Dimensions: Only 13.6" x 7.5" x 6.3" (W x D x H) - ultra-compact footprint',
      'Connectivity: Built-in Wi-Fi 802.11b/g/n, Wi-Fi Direct, High-Speed USB 2.0',
      'Paper Trays: 150-sheet input tray, 100-sheet output bin',
      'Energy Management: HP Auto-On/Auto-Off Technology saves up to 45% power',
      'Mobile App: Simple setup and direct mobile printing with HP Smart App',
      'Condition: Certified Refurbished with full quality inspection'
    ]
  },
  {
    filename: 'generic-printer-spec.pdf',
    title: 'EnergyPrinter Universal Printer Specification Sheet',
    brand: 'EnergyPrinter',
    category: 'All-in-One',
    description: 'Comprehensive specifications sheet for the EnergyPrinter hardware series, outlining high-performance capabilities, ecological certifications, and long-term service agreements.',
    specs: [
      'Eco-Friendly: EnergyStar and EPEAT Gold certified hardware engineering',
      'Service Guarantee: Includes 1 year of free replacement parts and onsite labor',
      'Print Support: High-speed duplex document rendering and active cooling',
      'Connectivity: Universal Wi-Fi, modern cloud printing protocols',
      'Firmware: Secure encrypted automatic over-the-air firmware updates'
    ]
  }
];

products.forEach(p => {
  const buffer = createPdfBuffer(p.title, p.brand, p.category, p.description, p.specs);
  const destPath = path.join(specsDir, p.filename);
  fs.writeFileSync(destPath, buffer);
  console.log(`Successfully generated: ${p.filename} (${buffer.byteLength} bytes)`);
});

console.log('All PDF specification sheets created successfully!');
