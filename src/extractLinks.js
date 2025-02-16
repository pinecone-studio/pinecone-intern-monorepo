import * as cheerio from 'cheerio';

async function extractLinks(url) {
  try {
    const webData = await fetch(url);
    const webText = await webData.text();
    const $ = cheerio.load(webText);

    let links = $("a")
      .map((i, el) => {
        const link = $(el).attr("href");
        let newURL = new URL(link, url);
        return newURL;
      })
      .toArray()
      .filter((url) => url && url.protocol.startsWith("http"))
      .map((url) => url.href);
      console.log(links);
    return links;
  } catch (error) {
    console.error("Error scanning web:", error);
  }
}
export { extractLinks };
