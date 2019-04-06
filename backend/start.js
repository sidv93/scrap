import { getTwitterFollowers, getInstaFollowers } from './index';
import express from 'express';
import db from './db';
import './cron';
const app = express();

app.get('/scrape', async (req, res, next) => {
    console.log('scraping');
    const [iCount, tCount] = await Promise.all([
        getInstaFollowers(), getTwitterFollowers()
    ]);
    res.json({tCount, iCount});
});

app.listen('3100', () => { console.log('Listening on 3100')});

