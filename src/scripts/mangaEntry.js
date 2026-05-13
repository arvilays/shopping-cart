import { writeFile } from 'fs/promises';
import readline from 'readline';
import process from 'process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function askArray(promptText, delimiter = ",") {
  const input = await ask(promptText);
  return input.split(delimiter).map(s => s.trim()).filter(Boolean);
}

async function askMultiline(promptText = "Description", endCommand = "END") {
  const lines = [];
  let count = 1;
  while (true) {
    const line = await ask(`${promptText} Line ${count} (type "${endCommand}" to finish): `);
    if (line.trim().toUpperCase() === endCommand) break;
    lines.push(line.trim());
    count++;
  }
  return lines;
}

function createMangaEntry(id, title, credits, series, volume, genre, description, price, coverImage) {
  return {
    id,
    title,
    credits,
    series,
    volume,
    genre,
    description,
    price,
    coverImage
  };
}

async function main() {
  const result = [];

  const mangaID = await ask("ID: ");
  const mangaTitle = await ask("Title: "); 
  const mangaSeries = await ask("Series: "); 
  const mangaCredits = await askArray("Credits (comma-separated): "); 
  const mangaGenres = await askArray("Genres (comma-separated): "); 
  const mangaPrice = parseFloat(await ask("Price: ")); 

  const input = await ask("Volume Range (e.g. 1,5): "); 
  const parts = input.split(",").map(v => parseInt(v.trim(), 10));
  const [startVol, endVol] = parts.length === 1 ? [1, parts[0]] : parts;

  // The subtitle will show at the end of the title. For example:
  // Land of the Lustrous, Vol. 1: [SUBTITLE]
  const hasSubtitle = (await ask("Subtitle? [y/n]: ")).trim().toLowerCase() === "y"; 

  for (let i = startVol; i <= endVol; i++) {
    console.log(`\n--- Volume ${i} ---`);

    const volumeID = `${mangaID}-V${i}`;
    const volumeSubtitle = hasSubtitle ? await ask("Subtitle: ") : ""; 
    const volumeTitle = hasSubtitle
      ? `${mangaTitle}, Vol. ${i}: ${volumeSubtitle}`
      : `${mangaTitle}, Vol. ${i}`;

    const volumeDescription = await askMultiline("Description");

    const mangaEntry = createMangaEntry(
      volumeID,
      volumeTitle,
      mangaCredits,
      mangaSeries,
      i,
      mangaGenres,
      volumeDescription,
      mangaPrice,
      `/covers/${volumeID}.jpg`
    );

    result.push(mangaEntry);
  }

  const output = JSON.stringify(result, null, 2);
  console.log("\n📄 Final JSON Preview:\n", output);

  try {
    await writeFile(`./src/scripts/output/${mangaID}.json`, output);
    console.log(`✅ JSON saved to ${mangaID}.json`);
  } catch (err) {
    console.error('❌ Error writing file:', err);
  }

  rl.close();
}

main();
