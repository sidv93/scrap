import cron from 'node-cron';
import { runCron } from './index';

cron.schedule('* * * * *', () => {
    console.log('RUNNING THE CRON at ' + Date.now());
    runCron();
})