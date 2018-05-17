#!/usr/bin/env node

const curPath = process.cwd()
const shell = require('shelljs')
const colors = require('colors')

let pacakgeJson = require(curPath + '/package.json')
let deps = pacakgeJson.dependencies
let devDeps = pacakgeJson.devDependencies

function update(depObj, depTpe) {
  if (!depObj) return

  let latestVer = false
  for (let pkg in depObj) {
    if (depObj.hasOwnProperty(pkg)) {
      let semver = depObj[pkg]
      if (semver === 'latest') {
        latestVer = true
        console.log(`* Update pacakge ${(' '+pkg+' ').bgGreen} in ${depTpe}.`)
        shell.exec(`npm update ${pkg} --no-save`) 
      }
    }
  }
  !latestVer && console.log(`* There are no packages to update in ${depTpe}.`)
}

console.log(`[1/2] Update packages in dependencies and devDependencies.`)
update(deps,'dependencies')
update(devDeps,'devDependencies')

console.log('[2/2] '+('npm install '+process.argv.slice(2)).green)
shell.exec(`npm install ${process.argv.slice(2)}`) 
