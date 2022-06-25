let apiKey = "18b95aea2ae0abf68c4bacbf7ace52a83be5992e6a6855bd9301fb5b7f8e2efb";
export const ccStreamer = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey);
ccStreamer.onopen = function onStreamOpen() {
    console.log('open')
}

