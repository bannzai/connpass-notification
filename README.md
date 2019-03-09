# connpass-notification
[connpass](https://connpass.com)を使用したイベント主催者向けのツールです。  
**connpass** で自分が立てたイベントに対して参加・キャンセル・お問い合わせについてGmailが来た時にSlackに通知するツールです。  

## Deploy
**connpass-notification** でSlackに通知するためのステップは下記のとおりです。

#### First
[clasp](https://github.com/google/clasp) + typescriptを使って開発をしています。  
[clasp](https://github.com/google/clasp)のインストールは必須です。[login](https://github.com/google/clasp#login)まで終わらせましょう

#### Second
自分の都合の良いディレクトリで下記のコマンドを実行していきます。

```shell
$ git clone git@github.com:bannzai/connpass-notification.git 
$ cd connpass-notification
$ clasp create --type standalone --rootDir ./src
$ vim ./src/settigs.ts # See: #Configure https://github.com/bannzai/connpass-notification#Configure
$ clasp push # Deploy to your Google Apps Script Editor
```

## Environment

connpass-notification を開発した時の諸々のバージョンです。

| Environment | Command | Result | Require | 
| --- | --- | --- | --- |
| node | node --version | v8.12.0 | yes |
| clasp | clasp --version | 2.0.1 | yes |
| tsc | tsc -v | Version 3.3.3333 | no |

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

## Tips
このツールのentrypointは [main.ts](./src/main.ts)の `main` という関数です。  
Googleが提供しているGoogle Apps Script(GAS) の開発環境から動作を確認ができます。  
`clasp` の open というコマンドで開発環境を開くことができます。  

```shell
$ clasp open
```

ここから `main.ts` を選び `main` 関数を実行することで確認ができます。  

<img width="100%" src="https://user-images.githubusercontent.com/10897361/54073779-7da25e80-42ce-11e9-9cd6-03fbeab4df80.png" />  

仕組みとして未読のものを探して既読のメールにたどり着いたら関数が終わるようになっています。  
もし未読のメールが多い場合は `dryRun` 関数を実行することができます。初期値として `1` が代入されており、この場合は最大1件の通知がされるようになります。

```js
var max: number = null;
function dryRun() {
  max = 1;
  main();
```


GASには定期実行の設定もあり、Slackに流したい場合は設定することをおすすめします。  

## LICENSE
**connpass-notification** is available under the MIT license. See the [LICENSE](./LICENSE) file for more info.

