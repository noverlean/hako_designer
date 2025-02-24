let d = {
    apiKey: 'CR92TRMYKUJ2K1F7',
    userProfileId: "76561199095238169",
    gameId: 730,
}

function generateUrl(userProfileId = d.userProfileId)
{
    return `https://www.steamwebapi.com/steam/api/profile?id=${userProfileId}&key=${d.apiKey}`; 
}
// https://cors-anywhere.herokuapp.com/
async function getUserProfile()
{
    // let url = generateUrl();
    // const response = await fetch(url, {
    //     method: "GET", // *GET, POST, PUT, DELETE, etc.
    //     mode: "cors", // no-cors, *cors, same-origin
    //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //     headers: {
    //         "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    //         "Content-Type": "application/json",
    //         // "Access-Control-Allow-Origin": "http://127.0.0.1",
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     // referrerPolicy: "strict-origin-when-cross-origin", // no-referrer, *client
    //     // body: JSON.stringify(data), // body data type must match "Content-Type" header
    // });

    // return await response.json();
    let str = `{"steamid":"76561199095238169","personaname":"-HAKO","accountname":"ha_ko","profileurl":"ha_ko","profilesteamurl":"https://steamcommunity.com/id/ha_ko","avatarhash":"ea5ddb514a41d18fd6076e4b37f22639e8cb36bd","avatar":"https://avatars.fastly.steamstatic.com/ea5ddb514a41d18fd6076e4b37f22639e8cb36bd.jpg","avatarmedium":"https://avatars.fastly.steamstatic.com/ea5ddb514a41d18fd6076e4b37f22639e8cb36bd_medium.jpg","avatarfull":"https://avatars.fastly.steamstatic.com/ea5ddb514a41d18fd6076e4b37f22639e8cb36bd_full.jpg","realname":null,"communityvisibilitymessage":"public","communityvisibilitystate":3,"profilestate":1,"onlinestate":"offline","ingameinfo":[],"timecreated":1601510400,"timecreatedat":"2020-10-01T00:00:00+00:00","location":null,"loccountrycode":null,"summary":"Эстрада такова, что кто-то берет в ротик, дальше в зад.","vac":0,"islimited":0,"mostplayedgamestotalplaytime":2312,"mostplayedgames2weeksplaytime":45.4,"mostplayedgamesappids":[730],"mostplayedgames":[{"gamename":"Counter-Strike 2","gamelink":"https://steamcommunity.com/app/730","appid":730,"gameicon":"https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/730/8dbc71957312bbd3baea65848b545be9eae2a355.jpg","gamelogo":"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/capsule_184x69.jpg?t=1729703045","gamelogosmall":"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/capsule_184x69.jpg?t=1729703045","playtimelast2weeks":45.4,"hoursonrecord":2312,"statsname":"CSGO"}],"mostplayedgamestimes":[{"appid":730,"playtimelast2weeks":45.4,"hoursonrecord":2312}]}`;
    return JSON.parse(str);
}

async function getPlayTime()
{
    return {"response":{"game_count":5,"games":[{"appid":365670,"playtime_forever":715,"playtime_windows_forever":715,"playtime_mac_forever":0,"playtime_linux_forever":0,"playtime_deck_forever":0,"rtime_last_played":1732963260,"playtime_disconnected":0},{"appid":863550,"playtime_forever":31,"playtime_windows_forever":31,"playtime_mac_forever":0,"playtime_linux_forever":1,"playtime_deck_forever":0,"rtime_last_played":1674424927,"playtime_disconnected":0},{"appid":730,"playtime_2weeks":2652,"playtime_forever":138016,"playtime_windows_forever":131600,"playtime_mac_forever":0,"playtime_linux_forever":6413,"playtime_deck_forever":0,"rtime_last_played":1739476558,"playtime_disconnected":893},{"appid":2923300,"playtime_forever":358,"playtime_windows_forever":358,"playtime_mac_forever":0,"playtime_linux_forever":0,"playtime_deck_forever":0,"rtime_last_played":1732788416,"playtime_disconnected":1},{"appid":2977660,"playtime_forever":13,"playtime_windows_forever":13,"playtime_mac_forever":0,"playtime_linux_forever":0,"playtime_deck_forever":0,"rtime_last_played":1719416789,"playtime_disconnected":0}]}};
}

async function getFaceitData()
{
    return {
        "activated_at": "2019-08-24T14:15:22Z",
        "avatar": "string",
        "country": "string",
        "cover_featured_image": "string",
        "cover_image": "string",
        "faceit_url": "https://www.faceit.com/ru/players/-Hako/stats/cs2",
        "friends_ids": [
          "string"
        ],
        "games": {
          "cs2": {
            "faceit_elo": 1126,
            "game_player_id": "string",
            "game_player_name": "string",
            "game_profile_id": "string",
            "region": "string",
            "regions": null,
            "skill_level": 5,
            "skill_level_label": "string"
          },
          "property2": {
            "faceit_elo": 0,
            "game_player_id": "string",
            "game_player_name": "string",
            "game_profile_id": "string",
            "region": "string",
            "regions": null,
            "skill_level": 0,
            "skill_level_label": "string"
          }
        },
        "infractions": null,
        "membership_type": "string",
        "memberships": [
          "string"
        ],
        "new_steam_id": "string",
        "nickname": "string",
        "platforms": {
          "property1": "string",
          "property2": "string"
        },
        "player_id": "string",
        "settings": {
          "language": "string"
        },
        "steam_id_64": "string",
        "steam_nickname": "string",
        "verified": true
      }
}

async function getTikTokData(videoId)
{
    let url = `https://cors-anywhere.herokuapp.com/https://www.tiktok.com/oembed?url=https://www.tiktok.com/@scout2015/video/${videoId}`;
    const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "http://127.0.0.1",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    });

    return await response.json();
}