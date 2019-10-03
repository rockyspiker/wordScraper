const puppeteer = require('puppeteer')
const fs = require('fs')

const baseURL = 'https://www.passwordrandom.com/most-popular-passwords'
const allPasswords = []

async function scrape() {
    const browser = await puppeteer.launch()

    const page = await browser.newPage()
    console.log('Puppeteer Initialized')

    await page.goto(baseURL)

    const tableRows = await page.evaluate(() => document.querySelectorAll(".table > tbody > tr"))
    const talkText = []
    for (let row in tableRows) {
        talkText.push(tableRows[row].textContent)
    }
    console.log(talkText)

    // const talkText = await page.evaluate(() => document.querySelector('tr').textContent)
    // const talkURLs = await page.evaluate(() => [...document.getElementsByClassName('pagination bootpag')].map(link => link.href))
    // console.log(talkURLs)

    await browser.close();
}

scrape()