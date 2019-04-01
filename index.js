import axios from 'axios';
import cheerio from 'cheerio';

async function getHTML(url) {
    const {data: html} = await axios.get(url);
    return html;
}

async function getTwitterFollowers(html) {
    const $ = cheerio.load(html);
    const span = $('[data-nav="followers"] .ProfileNav-value');
    return span.data('count');
}

async function getInstaFollowers(html) {
    const $ = cheerio.load(html);
    const dataString = $('script[type="application/ld+json"]').html();
    const userJson = JSON.parse(dataString);
    const instaFollowers = parseInt(userJson.mainEntityofPage.interactionStatistic.userInteractionCount);
    return instaFollowers;
}

export { getHTML, getTwitterFollowers, getInstaFollowers };