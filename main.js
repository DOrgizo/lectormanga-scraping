const got = require('got')
const cheerio = require('cheerio')
const fs = require('fs')
const json = fs.readFileSync('./Info.json')
const gayInfo = JSON.parse(json)
const length = gayInfo.length
let lastIndex = 0

let arrayInfo = []
let i =  0//parseInt(fs.readFileSync('./lastIndex.txt')) 

class gayMangaInfo {
	constructor(title, description) {
		this.title = title
		this.description = description
	}
}

const request = async (i) => {

	if(i >= length) {
		fs.writeFile('gayDump.json', JSON.stringify(arrayInfo), err => {
		 	if(err) throw err
		 	console.log("Hora de la fiesta")
		 })

		clearInterval(interval)
		return
	}

	try {
		const templateLink = `https://lectormanga.com/library/novel/${gayInfo[i].id}/${gayInfo[i].gayTitle.replace(/ /g, '-')}`

	const html = await got(templateLink)
	const $ = cheerio.load(html.body)

	let title = $('.text-dark').text().replace(/\n/g, ' ')
	title = title.slice(1, title.length)
	const description = $('.col-12').children('p').text()

	arrayInfo.push(new gayMangaInfo(title, description))
	//console.log(arrayInfo[i].title, arrayInfo[i].description, '\n')

	fs.writeFileSync('gayDump.json', JSON.stringify(arrayInfo), err => {
		 	if(err) throw err
		 	console.log("Hora de la fiesta")
		 })

	lastIndex = i

	fs.writeFileSync('lastIndex.txt', lastIndex.toString(), err => {
		 	if(err) throw err
		 	console.log("Hora de la fiesta")
		 })
	}

	catch(err) {}
}

const interval = setInterval(() => {
	request(i)
	i += 1
}, 4300)

