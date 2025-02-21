import fetch from "node-fetch";

export async function fetchPage(url: string): Promise<string | null> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error. Status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error(`Error fetching URL: ${url}`, (error as Error).message);
        return null;
    }
}