var tokenizer;

// tokenizerを初期化
kuromoji
  .builder({
    dicPath: "./dict"
  })
  .build((err, builtTokenizer) => {
    tokenizer = builtTokenizer;
  });

const app = new Vue({
  el: "#app",
  data: {
    inputText: "",
    countDone: false,
    results: []
  },
  methods: {
    countAndShow: event => {
      const tokens = tokenizer.tokenize(app.inputText);

      const keywordMap = {};

      tokens
        .filter(
          token =>
            token.pos === "名詞" &&
            ["一般", "固有名詞"].includes(token.pos_detail_1)
        )
        .forEach(token => {
          if (keywordMap[token.surface_form]) {
            keywordMap[token.surface_form].count =
              keywordMap[token.surface_form].count + 1;
          } else {
            keywordMap[token.surface_form] = {
              count: 1,
              inDict: token.word_type === "KNOWN" ? true : false
            };
          }
        });

      results = Object.getOwnPropertyNames(keywordMap)
        .map(keyword =>
          Object.assign({ keyword: keyword }, keywordMap[keyword])
        )
        .sort((a, b) => {
          if (a.count > b.count) {
            return -1;
          } else if (a.count === b.count && a.keyword < b.keyword) {
            return -1;
          } else {
            return 1;
          }
        });

      while (app.results.length > 0) {
        app.results.pop();
      }

      results.forEach(result => {
        app.results.push(result);
      });

      app.countDone = true;
    }
  }
});
