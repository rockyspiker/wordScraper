const puppeteer = require('puppeteer')
const fs = require('fs')

const baseURL = 'https://www.passwordrandom.com/most-popular-passwords'

async function scrape() {
    const browser = await puppeteer.launch()

    const page = await browser.newPage()
    console.log('Puppeteer Initialized')

    await page.goto(baseURL)

    const tableRows = await page.evaluate(() => document.querySelectorAll("#cntContent_lstMain tr:not(:first-child) td:nth-child(2)"))
    const talkText = []
    for (let row in tableRows)
        talkText.push(tableRows[row].textContent)
    console.log(talkText)

    await browser.close();

    fs.writeFileSync('mcupws.json', JSON.stringify([...talkText]))

}

scrape()