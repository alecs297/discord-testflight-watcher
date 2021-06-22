const settings = require('./settings.json');
const fetch = require('node-fetch');
const cache = {};

const default_headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "en-US,en;q=0.9",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
}

function isFull(t) {
    return (t.includes("This beta is full.") || t.includes("This beta isn't accepting any new testers right now."));
}

function getName(t) {
    return (t.includes("<title>Join the ") ? t.split("<title>Join the ")[1].split(" - TestFlight - Apple</title>")[0] : "App");
}

async function do_request(a, h, m = "GET", d = null) {
    let r = await fetch(a, {
        headers: Object.assign(h),
        method: m,
        redirect: "manual",
        body: m == 'POST' ? JSON.stringify(d) : null
    });
    return (await r.text());
}

(async() => {
    console.log(`Watching over ${settings.programs.length} programs`);

    setInterval(() => {
        console.log("Refreshing now.")
        settings.programs.forEach(async p => {
            let r = await do_request("https://testflight.apple.com/join/" + p.id, default_headers);
            if (!isFull(r)) {
                if (!cache[p.id]) {
                    let message = getName(r) + " is available at https://testflight.apple.com/join/" + p.id;
                    if (p.url) {
                        await do_request(
                            p.url,
                            Object.assign(default_headers, { "Content-Type": "application/json" }),
                            "POST", {
                                "content": message
                            }
                        )
                    }
                    console.log(message);
                }
                cache[p.id] = true;
            } else {
                delete cache[p.id];
                console.log(getName(r) + " is still full.")
            }
        });
    }, 30000)

})();