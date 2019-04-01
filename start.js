import { getHTML, getTwitterFollowers, getInstaFollowers } from './index';

async function go() {
    const iPromise = getHTML('https://www.instagram.com/sidv93/');
    const tPromise = getHTML('https://twitter.com/siddhu93');
    const [instaHTML, twitterHTML] = await Promise.all([iPromise, tPromise]);
    const twitterCount = await getTwitterFollowers(twitterHTML);
    const instaFollowers = await getInstaFollowers(instaHTML);
    console.log(`You have ${twitterCount} Twitter followers!`);
    console.log(`You have ${instaFollowers} Instagram followers!`);
}

go();