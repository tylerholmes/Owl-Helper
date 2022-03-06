const cheerio = require('cheerio');
const axios = require('axios');
const puppeteer = require('puppeteer');
let express = require('express');
let router = express.Router();

router.post('/', async function (req, res) {
    let ratings = [];
    for (let professor of req.body) {
        let rating = await findRating(professor);
        ratings.push(rating);
    }
    res.json(ratings);
});

async function findRating(name) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    let professorName = name.split(' ').join('%20');
    const page = await browser.newPage();
    page.goto(`https://www.ratemyprofessors.com/search/teachers?query=${professorName}&sid=U2Nob29sLTQ4MQ==`);
    await page.waitForSelector('.CardNumRating__CardNumRatingNumber-sc-17t4b9u-2');

    const result = await page.evaluate(() => {
        const elements = document.getElementsByClassName('CardNumRating__CardNumRatingNumber-sc-17t4b9u-2');
        console.log(document);
        return JSON.stringify(elements[0].innerHTML);
    });
    await browser.close();
    return result;
}

//Routes will go here
module.exports = router;