# Discord Testflight Programs watcher

Very basic Node.js script that sends webhook data when a testflight link is not full.

This script refreshes the invites every 30 seconds and doesn't require a discord bot account.

This repo is not maintained and the script itself was written in under one hour, feel free to enhance it on your own.

## Requirements

- node.js
- npm
- node-fetch

## Setup

- make sure to have a relatively recent version of node installed (too busy to check for any exact one)
- install the dependencies via `npm init`
- Copy the `settings.json.example` to `settings.json` and modify it to your needs. The ID of the testflight program corresponds to the last part of the invite ( `https://testflight.apple.com/join/XXXXXXXX` ), the URL field corresponds to the webhook URL.

## Usage

Once `settings.json` is changed, just use `node index.js` to execute the script. Something like PM2 is recommended if you want to let it run in the background.

## Beta Programs

If you want other cool beta programs to watch over, this repo lists them <https://github.com/pluwen/awesome-testflight-link>
