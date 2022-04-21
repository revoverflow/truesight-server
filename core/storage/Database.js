const sqlite3 = require('sqlite3').verbose();

module.exports = class Database {

    static instance = null;

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }

    constructor() {
        this.db = new sqlite3.Database('./storage.sqlite');

        this.db.serialize(() => {
            this.db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)");
            this.db.run("CREATE TABLE IF NOT EXISTS apikeys (id INTEGER PRIMARY KEY AUTOINCREMENT, apikey TEXT NOT NULL)");
            
            this.db.get("SELECT * FROM users", [], (err, row) => {
                if(!row) {
                    this.db.run("INSERT INTO users (username, password) VALUES (?, ?)", ["admin", "admin"]);
                }
            });
        });
    }

    close() {
        this.db.close();
    }

    getUserById(id) {
        return new Promise((resolve, reject) => {
            this.db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }
    
    getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            this.db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    getUsers() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM users", (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    addUser(username, password) {
        return new Promise((resolve, reject) => {
            this.db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    deleteUser(id) {
        return new Promise((resolve, reject) => {
            this.db.run("DELETE FROM users WHERE id = ?", [id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    updateUser(id, username, password) {
        return new Promise((resolve, reject) => {
            this.db.run("UPDATE users SET username = ?, password = ? WHERE id = ?", [username, password, id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    getUserByUsernameAndPassword(username, password) {
        return new Promise((resolve, reject) => {
            this.db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }
    
}