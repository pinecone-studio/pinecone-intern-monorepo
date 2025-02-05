async function scanWeb(){
  try {
    
    const webData = await fetch("https://leetcode.com/");
    const webText = await webData.text();
    const $ = cheerio.load(webText);

    let links = $('a').map((_,el) => {
        const link = $(el).attr('href');
    }); return links;

  } catch (error){
    console.error('Error scanning web:', error);
  }
}