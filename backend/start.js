import { getTwitterFollowers, getInstaFollowers } from './index';
import express from 'express';
import util from 'util';
import db from './db';
import './cron';
const app = express();

app.get('/scrape', async (req, res, next) => {
    console.log('scraping');
    console.log(`query- ${util.inspect(req.query)}`);
    if(req.query.username) {
        const [iCount, tCount] = await Promise.all([
            getInstaFollowers(), getTwitterFollowers()
        ]);
        res.json({tCount, iCount});
    }
    if(req.query.instagram) {
        const iCount = await getInstaFollowers(req.query.instagram);
        res.json({iCount});
    }
    if(req.query.twitter) {
        const tCount = await getTwitterFollowers(req.query.twitter);
        res.json({tCount});
    }
});

app.get('/chart', (req, res, next) => {
    console.log('in chart');
    console.log(`query- ${util.inspect(req.query)}`);
    if(req.query.type === 'instagram') {
        const instagram = db.get('instagram').value();
        return res.json({instagram});
    }
    if(req.query.type === 'twitter') {
        const twitter = db.get('twitter').value();
        console.log(JSON.stringify(twitter));
        return res.json({twitter});
    }
    const twitter = db.get('twitter').value();
    const instagram = db.get('instagram').value();
    res.json({twitter, instagram});
})

app.listen('3100', () => { console.log('Listening on 3100')});

