const coinCode = 22253;
const interval = 7000; // no less than 5000 ms
const count = 10000; // number of votes
const axios = require('axios');
const url = 'https://api.coinmarketcap.com/data-api/v3/cryptocurrency/vote';

let vote = function () {
    axios.get(url + '?id=' + coinCode)
        .then((response) => {
            let votedId = response.data['data']['unregisteredId']

            axios.post(url, JSON.stringify({
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
        })
        .catch(reason => {
            console.warn(reason['response']['data']);
        })

};


(async () => {
    for (let i = 0; i < count; i++) {
        vote();
        await new Promise(resolve => setTimeout(resolve, interval));
        console.log('==========')
    }
})();

