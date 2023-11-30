import fs from "node:fs/promises"
import {fileURLToPath} from "node:url"
import path from "node:path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const template = (await fs.readFile(
	path.resolve(__dirname, "src", "index.tpl.mjs")
)).toString()

const variants = [{
	_name: "sync",

	"`$fs_module`": "node:fs",
	"`$fnName`": "findNearestFileSync",

	"`$async$`function": "function",
	"`$await$`fs.realpath": "fs.realpathSync",
	"`$await$`fs.readdir": "fs.readdirSync",
	"`$await$`fs.lstat": "fs.lstatSync",
	"`$await$`findNearestFile": "findNearestFile"
}, {
	_name: "async",

	"`$fs_module`": "node:fs/promises",
	"`$fnName`": "findNearestFileAsync",

	"`$async$`function": "async function",
	"`$await$`fs.realpath": "await fs.realpath",
	"`$await$`fs.readdir": "await fs.readdir",
	"`$await$`fs.lstat": "await fs.lstat",
	"`$await$`findNearestFile": "await findNearestFile"
}]

for (const variant of variants) {
	variant._code = template

	for (const key in variant) {
		if (key.startsWith("_")) continue

		variant._code = variant._code.split(key).join(variant[key])
	}

	await fs.writeFile(
		path.resolve(__dirname, "auto.src", `${variant._name}.mjs`), variant._code
	)
}

await fs.copyFile(
	path.resolve(__dirname, "src", "export.mjs"),
	path.resolve(__dirname, "auto.src", "index.mjs")
)
