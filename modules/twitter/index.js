const axios = require('axios');
const cheerio = require('cheerio');

module.exports = class Twitter {

    static process(searchType, parameters) {
        return new Promise((rs, rj) => {
            switch (searchType) {
                case 'users':
                    this.processUsername(parameters.username).then(rs).catch(rj);
                    break;
                case 'tweets':
                    this.processTweet(parameters.keyword).then(rs).catch(rj);
                    break;
                default:
                    rj('Invalid search type');
            }
        });
    }

    static processUsername(username) {
        return new Promise((rs, rj) => {
            axios.get(`https://nitter.net/search?f=users&q=` + username).then(response => {
                let $ = cheerio.load(response.data);
                let users = [];

                $('.timeline-item').each((i, el) => {
                    let name = $(el).find('.fullname').text();
                    let username = $(el).find('.username').text();
                    let bio = $(el).find('.tweet-content.media-body').text();
                    let verified = $(el).find('.icon-ok.verified-icon');
                    let link = "https://twitter.com/" + username.slice(1);
                    let profilepic = $(el).find('.avatar.round').attr('src').replace('/pic/', 'https://').replace(/%2F/g, '/');

                    users.push({
                        name: name,
                        username: username,
                        bio: bio,
                        verified: verified.length > 0,
                        link: link,
                        profilepic: profilepic
                    });
                });

                rs(users);
            });
        });
    }

    static processTweet(keyword) {
        return new Promise((rs, rj) => {
            axios.get(`https://nitter.net/search?f=tweets&q=` + keyword).then(response => {
                let $ = cheerio.load(response.data);
                let users = [];

                $('.timeline-item').each((i, el) => {
                    let name = $(el).find('.fullname').text();
                    let username = $(el).find('.username').text();
                    let profilepic = $(el).find('.avatar.round').attr('src').replace('/pic/', 'https://').replace(/%2F/g, '/');
                    let verified = $(el).find('.icon-ok.verified-icon');
                    let profile_link = "https://twitter.com/" + username.slice(1);

                    let content = $(el).find('.tweet-content.media-body').text();
                    let date = $(el).find('.tweet-date > a').attr('title');
                    let link = "https://twitter.com" + $(el).find('a.tweet-link').attr('href');

                    users.push({
                        name: name,
                        username: username,
                        verified: verified.length > 0,
                        profile_link: profile_link,
                        profilepic: profilepic,
                        content: content,
                        date: date,
                        link: link
                    });
                });

                rs(users);
            });
        });
    }

}