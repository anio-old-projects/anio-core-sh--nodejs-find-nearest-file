import fs from "`$fs_module`"
import path from "node:path"

`$async$`function `$fnName`(config_file_name, dir_path) {
	const absolute_dir_path = `$await$`fs.realpath(dir_path)
	const parent_dir_path = path.dirname(absolute_dir_path)

	let config_path = null

	const entries = `$await$`fs.readdir(absolute_dir_path)

	for (const entry of entries) {
		const absolute_entry_path = path.resolve(absolute_dir_path, entry)
		const stat = `$await$`fs.lstat(absolute_entry_path)

		// ignore directories
		if (stat.isDirectory() || stat.isSymbolicLink()) continue;

		if (stat.isFile() && entry === config_file_name) {
			config_path = absolute_entry_path

			break
		}
	}

	if (config_path) {
		return config_path
	}

	// do not recurse further if we just scanned root directory
	if (absolute_dir_path === "/" && parent_dir_path === "/") {
		return false
	}

	return `$await$``$fnName`(config_file_name, parent_dir_path)
}

export default `$fnName`
