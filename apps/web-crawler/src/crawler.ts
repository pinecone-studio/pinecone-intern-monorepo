import { fetchPage } from "./fetcher.js";
import { extractLinks } from "./parser.js";
import { enqueueUrl, dequeueUrl, isVisited, markVisited } from "./redisTaskManager.js";
import { config } from "./config.js";
import { URL } from "url";
import os from "os";

async function crawl() {
    const workerId = os.hostname();
    const baseDomain = new URL(config.baseUrl).hostname;
    await enqueueUrl(config.baseUrl);
    let pagesCrawled = 0;

    while (pagesCrawled < config.maxPages) {
        const url = await dequeueUrl();
        if (!url) {
            console.log(`Worker ${workerId}: Queue empty, exiting.`)
            break;
        }
        if (await isVisited(url)) continue;

        console.log(`Worker ${workerId} crawling (${pagesCrawled}): ${url}`);
        const html = await fetchPage(url);
        if (!html) continue;

        await markVisited(url);
        pagesCrawled++;

        const links = extractLinks(html, url, baseDomain);
        for (const link of links) {
            await enqueueUrl(link);
        }
    }
    console.log(`Worker ${workerId}: Crawling complete.`);
}

crawl().catch(console.error);

export { crawl };