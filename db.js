import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adaptor = new FileSync('./db.json');
const db = low(adaptor);
db.defaults({twitter: [], instagram: []}).write();

export default db;