const path = require('path')
const doneRainbow = require('done-rainbow')
const execSync = require('child_process').execSync
const { version } = require('../../../package.json')

let increaseVersion = () => {
	let prefix = version.slice(0, version.lastIndexOf('.'))
	let suffix = version.slice(version.lastIndexOf('.') + 1)
	return prefix + '.' + (parseInt(suffix) + 1)
}

let doRelease = async () => {
	let version = increaseVersion()

	try {
		execSync(`git add .`, { stdio: 'inherit' })
		execSync(`git commit -am "release: v${version}"`, { stdio: 'inherit' })
		execSync(`git push`, { stdio: 'inherit' })
	} catch (err) {
		console.log('git', err)
		throw err
	}

	try {
		execSync(`npm version ${version} `, { stdio: 'inherit' })
		execSync(`npm publish`, { stdio: 'inherit' })
	} catch (err) {
		console.log('npm', err)
		throw err
	}

	try {
		execSync(`git status`, { stdio: 'inherit' })
		execSync(`git push`, { stdio: 'inherit' })
	} catch (err) {
		console.log('npm', err)
		throw err
	}

	try {
		execSync(`vsce package`, { stdio: 'inherit' })
		execSync(`vsce publish`, { stdio: 'inherit' })
	} catch (err) {
		console.log('vsce package', err)
		throw err
	}

	doneRainbow(`version ${version} published!`)
}

doRelease()
