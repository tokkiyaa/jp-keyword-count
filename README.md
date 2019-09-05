# jp-keyword-count

日本語の文書からキーワードを抽出し、出現頻度順に表示するだけのページ。低精度。

## メモ

### 辞書

[kuromoji.js](https://api.github.com/repos/takuyaa/kuromoji.js/contents) をそのままコピーした。

```
curl https://api.github.com/repos/takuyaa/kuromoji.js/contents/dict -s | jq -r .[].download_url | xargs -J % wget %
```
