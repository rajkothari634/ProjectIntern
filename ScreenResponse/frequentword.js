const fetchUrl = require("fetch").fetchUrl;

module.exports = (req, res) => {
  var wordNumber = req.query.q;
  fetchUrl("https://gitlab.com/snippets/1824628/raw", (error, meta, body) => {
    if (error) {
      console.log(error);
      res.status(400).json({
        errorData: error,
      });
      return;
    }
    try {
      let resWordArray = body.toString("utf8").toLowerCase().split(" ");
      let resFreqObj = {};
      console.log(wordNumber);
      for (let i = 0; i < resWordArray.length; i++) {
        if (resWordArray[i].length > 0) {
          if (!resFreqObj[resWordArray[i]]) {
            resFreqObj[resWordArray[i]] = 1;
          } else {
            resFreqObj[resWordArray[i]] = resFreqObj[resWordArray[i]] + 1;
          }
        }
      }
      let min = 0;
      let minPos = 0;
      let words = [];
      let freq = [];
      let i = 0;
      for (var key in resFreqObj) {
        i++;
        if (freq.length < wordNumber) {
          freq[freq.length] = resFreqObj[key];
          words[words.length] = key;
          if (resFreqObj[key] < min) {
            min = resFreqObj[key];
            minPos = i;
          }
        } else {
          if (resFreqObj[key] > min) {
            words[minPos - 1] = key;
            freq[minPos - 1] = resFreqObj[key];
            let mindata = findMin(freq);
            min = mindata[0];
            minPos = mindata[1];
          }
        }
      }
      res.status(200).json({
        maxWords: words,
        wordfreq: freq,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        errorData: error,
      });
    }
  });
};
function findMin(freq) {
  let min = freq[0];
  let minPos = 1;
  for (let i = 1; i < freq.length; i++) {
    if (freq[i] < min) {
      min = freq[i];
      minPos = i + 1;
    }
  }
  return [min, minPos];
}
