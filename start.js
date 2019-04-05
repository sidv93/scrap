import { getTwitterFollowers, getInstaFollowers } from './index';
import express from 'express';

const app = express();

app.get('/scrape', async (req, res, next) => {
    console.log('scraping');
    const [iCount, tCount] = await Promise.all([
        getInstaFollowers(), getTwitterFollowers()
    ]);
    console.log(iCount, tCount);
    // res.json({iCount, tCount});
    console.log(`You have ${tCount} Twitter followers!`);
    console.log(`You have ${iCount} Instagram followers!`);
    // res.json({twitterCount, instaFollowers});
});

app.listen('3100', () => { console.log('Listening on 3000')});
// async function go() {
    
// }

