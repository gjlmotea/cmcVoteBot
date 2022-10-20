const interval = 3000; // no less than 3000 ms
const count = 10000; // number of votes
const coinCode = 22253; // $MEWC code

const axios = require('axios');
const url = 'https://api.coinmarketcap.com/data-api/v3/cryptocurrency/vote';

const getVotedId = async function () {
    return await axios.get(url + '?id=' + coinCode)
        .then((response) => {
            return response.data['data']['unregisteredId'];
        })
        .catch(reason => {
            // console.warn(reason['response']['data']);
        });
};

const vote = async function (votedId) {
    console.log('(do vote...)')
    return await axios.post(url, JSON.stringify({
        'cryptoId': coinCode,
        'voted': 1, // 1: good, 2: bad
        'votedId': votedId,
    }), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            console.log(votedId, ':', response.data['status']['error_message']);
        })
        .catch(reason => {
            console.warn(reason['response']['data']);
        })
};

(async () => {
    for (let i = 0; i < count; i++) {
        console.log('==========')

        const votedId = await getVotedId();
        await new Promise(resolve => setTimeout(resolve, interval / 2));
        if (votedId) {
            await vote(votedId);
        } else {
            console.warn('(too freq...)')
        }
        await new Promise(resolve => setTimeout(resolve, interval / 2));
    }
})();

