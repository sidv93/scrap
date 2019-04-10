import axios from 'axios';
import cheerio from 'cheerio';
import db from './db';
import util from 'util';
import { isObject } from 'util';
import { Socket } from 'net';

async function getHTML(url) {
    const {data: html} = await axios.get(url);
    return html;
}

async function getTwitterFollowers(username='siddhu93') {
    const html = await getHTML(`https://twitter.com/${username}`)
    const $ = cheerio.load(html);
    const span = $('[data-nav="following"] .ProfileNav-value');
    return span.data('count');
}

async function getInstaFollowers(username='sidv93') {
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
    const tLastTwo = db.get('twitter').value().filter((e, i, s) => i >= (s.length - 2));
    if(tLastTwo[1].count > tLastTwo[0].count) {
        socket.emit('twitter', {twitter: tLastTwo[1].count});
    }
    db.get('instagram')
        .push({
            date: Date.now(),
            count: iCount
        }).write();
    const iLastTwo = db.get('instagram').value().filter((e,i, s) => i >= (s.length -2));
    if(iLastTwo[1].count > iLastTwo[0].count) {
        socket.emit('instagram', { instagram: iLastTwo[1].count});
    }
    console.log('Done');
}

export { getTwitterFollowers, getInstaFollowers, runCron };