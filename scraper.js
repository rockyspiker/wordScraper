const puppeteer = require('puppeteer')
const fs = require('fs')

const baseURL = 'https://www.passwordrandom.com/most-popular-passwords'
let curURL = ''

async function scrape() {
    const allPasswords = []

    const browser = await puppeteer.launch()

    const page = await browser.newPage()
    console.log('Puppeteer Initialized')

    for (let pageNum = 1; pageNum <= 100; pageNum++) {
        if (pageNum > 1)
            curURL = 'https://www.passwordrandom.com/most-popular-passwords/page/' + pageNum
        else
            curURL = baseURL

        await page.goto(curURL)

        const pagePasswords = await page.evaluate(() => {
            const elements = [...document.querySelectorAll("#cntContent_lstMain tr:not(:first-child) td:nth-child(2)")]
            return elements.map(element => element.textContent)
        })

        for (let pwd in pagePasswords)
            allPasswords.push(pagePasswords[pwd])

            console.log('Finished page ', pageNum)
    }
    await browser.close();

    fs.writeFileSync('mcupws.json', JSON.stringify([...allPasswords]))

}

scrape()