# connpass-notification

## Required

connpass-notification を開発した時の諸々のバージョンです。

| Environment | Command | Result |
| --- | --- | --- |
| node | node --version | v8.12.0 |
| tsc | tsc -v | Version 3.3.3333 |
| clasp | clasp --version | 2.0.1 |


## Deploy

[clasp](https://github.com/google/clasp) + typescriptを使って開発をしています。
もし`.ts` ファイルを変更する場合は `package.json` に `tsc` は含んでいないので注意が必要です。
このまま使用する場合は [./src/settings.ts](./src/settings.ts)を変更することになりますが、おそらくtypescriptの準備までは必要ないです。
詳しくは[Configureセクション](https://github.com/bannzai/connpass-notification#Configure) を見てください。

[Configureセクション](https://github.com/bannzai/connpass-notification#Configure)の設定が終わったら[clasp](https://github.com/google/clasp#deploy)を使用して `deploy` を行います。


## Configure

下記の項目を変更すれば使えるようになります。
### [./src/settings.ts](./src/settings.ts)
```js
function settings(): _Settings {
  return {
    'appName': 'Gmail',
    'searchWord': 'from: no-reply@connpass.com',
    'registerWebHookURL': 'https://hooks.slack.com/services/XXXXXXXXX/YYYYYYYYY/ZZZZZZZZZZZZZZZZZZZZZZZZ',
    'registerNotificationChannel': '#registerOrCancel-channel',
    'cancelWebHookURL': 'https://hooks.slack.com/services/XXXXXXXXX/YYYYYYYYY/ZZZZZZZZZZZZZZZZZZZZZZZZ',
    'cancelNotificationChannel': '#registerOrCancel-channel',
    'contactWebHookURL': 'https://hooks.slack.com/services/XXXXXXXXX/YYYYYYYYY/ZZZZZZZZZZZZZZZZZZZZZZZZ',
    'contactNotificationChannel': '#contact-channel'
  }
```

- `appName` にはSlackで通知される時に表示されてほしいユーザー名を入れてください。
- `searchWords` には実際にGmailで検索をかけるキーワードを入れてください。
- `xxxxWebHookURL` にはSlackのIncoming-WebHooksで作成したURLを入れてください。
- `xxxxNotificationChannel` にはSlackのIncoming-WebHooksで設定した channel を入れてください。 `#` から始める必要があります。

### .clasp.json
`clasp` の設定ファイルです。
Deployするときのルートディレクトリの設定が必要です。
`rootDir` に `./src` と設定してあげます。

```js
{
  "scriptId":"scriptId",
  "rootDir": "./src"
}
```

## LICENSE
**connpass-notification** is available under the MIT license. See the [LICENSE](./LICENSE) file for more info.


