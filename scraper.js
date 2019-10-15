const puppeteer = require('puppeteer')
const fs = require('fs')

const baseURL = 'https://www.passwordrandom.com/most-popular-passwords'
let curURL = ''

async function scrape() {
    const allPasswords = []

    const browser = await puppeteer.launch()

    const page = await browser.newPage()
    console.log('Puppeteer Initialized')

    for (let pageNum = 1; pageNum <= 100; pageNum++) { //Running through every page starting at first up to and including 100
        if (pageNum > 1)
            curURL = 'https://www.passwordrandom.com/most-popular-passwords/page/' + pageNum
        else
            curURL = baseURL

        await page.goto(curURL)

        const pagePasswords = await page.evaluate(() => {
            const elements = [...document.querySelectorAll("#cntContent_lstMain tr:not(:first-child) td:nth-child(2)")] //Only picks the second element of each row except for the first.
            return elements.map(element => element.textContent) //Grabs the text content from the nodes
        })

        for (let pwd in pagePasswords)
            allPasswords.push(pagePasswords[pwd]) //Pushes each password individually onto the allPasswords file

            // console.log('Finished page ', pageNum) //To count which page you are on
    }
    await browser.close();

    fs.writeFileSync('mcupws.json', JSON.stringify([...allPasswords])) //Puts all of the passwords onto a json file

}

scrape()