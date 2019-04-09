import axios from 'axios';
import cheerio from 'cheerio';
import db from './db';

async function getHTML(url) {
    const {data: html} = await axios.get(url);
    return html;
}

async function getTwitterFollowers(username='') {
    const html = await getHTML(`https://twitter.com/${username}`)
    const $ = cheerio.load(html);
    const span = $('[data-nav="followers"] .ProfileNav-value');
    return span.data('count');
}

async function getInstaFollowers(username='') {
    const html = await getHTML(`https://www.instagram.com/${username}`)
    const $ = cheerio.load(html);
    const dataString = $('script[type="application/ld+json"]').html();
    const userJson = JSON.parse(dataString);
    const instaFollowers = parseInt(userJson.mainEntityofPage.interactionStatistic.userInteractionCount);
    return instaFollowers;
}

async function runCron() {
    const [iCount, tCount] = await Promise.all([
        getInstaFollowers(), getTwitterFollowers()
    ]);
    db.get('twitter')
        .push({
            date: Date.now(),
            count: tCount
        }).write();
    db.get('instagram')
        .push({
            date: Date.now(),
            count: iCount
        }).write();
    console.log('Done');
}
export { getTwitterFollowers, getInstaFollowers, runCron };