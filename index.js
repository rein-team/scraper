const axios = require('axios')
const cheerio = require('cheerio')

const fetchGames = async () => {
    try {
        const response = await axios.get('https://www.amazon.com/s?k=games&crid=H62SC0VF7Y8M&sprefix=game%2Caps%2C143&ref=nb_sb_noss_2')
        const html = response.data
        const $ = cheerio.load(html)
        const games = []
        $('div.a-section.a-spacing-none.a-spacing-top-small.s-title-instructions-style').each((index, el) => {
            const game = $(el)
            const title = game.find('span.a-size-base-plus.a-color-base.a-text-normal').text()
            games.push(title)
        })
        return games
    } catch (err) {
        console.error(err)
    }
}
fetchGames().then(games => console.log(games))