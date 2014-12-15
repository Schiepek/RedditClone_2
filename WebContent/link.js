var Rating = require('./rating.js');

module.exports = function Link(id, title, author, url) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.url = url;
    this.createTime = new Date();
    this.createTimeDisplay = this.createTime.getDate() + "." + (this.createTime.getMonth()+1)+"."+this.createTime.getFullYear()+", "+this.createTime.getHours()+":"+this.createTime.getMinutes();
    this.rating = new Rating();
    this.comments = [];
    this.voters = [];
};
