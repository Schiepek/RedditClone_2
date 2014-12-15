var Rating = require('./rating.js');

module.exports = function Comment(id, text, author) {
    this.id = id;
    this.text = text;
    this.author = author;
    this.createTime = new Date();
    //this.createTimeDisplay = this.createTime.toLocaleDateString() + " : " + this.createTime.toLocaleTimeString();
    this.createTimeDisplay = this.createTime.getDate() + "." + (this.createTime.getMonth()+1)+"."+this.createTime.getFullYear()+", "+this.createTime.getHours()+":"+this.createTime.getMinutes();
    this.rating = new Rating();
    this.comments = [];
};

