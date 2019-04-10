import { getTwitterFollowers, getInstaFollowers } from './index';
import express from 'express';
import http from 'http';
import util from 'util';
import socketio from 'socket.io';
import db from './db';
import './cron';

const app = express();
const server = http.Server(app);

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
        return res.json({twitter});
    }
    const twitter = db.get('twitter').value();
    const instagram = db.get('instagram').value();
    res.json({twitter, instagram});
})

server.listen('3100', () => { console.log('Listening on 3100')});

global.io = socketio(server, {origins: "http://localhost:* http://127.0.0.1:*"});

io.on('connection', (socket) => {
    global.socket = socket;
});

// DO A ALERT FROM BOTTOM LEFT WHEN A NEW FOLLOWER IS MADE