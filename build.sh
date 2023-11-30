#!/bin/bash -euf

rm -f auto.src/async.mjs
rm -f auto.src/sync.mjs
rm -f auto.src/index.mjs

node createVariantsFromTemplate.mjs

./node_modules/.bin/rollup --config rollup.config.mjs

cp auto.src/async.mjs dist/
cp auto.src/sync.mjs dist/
cp auto.src/index.mjs dist/
