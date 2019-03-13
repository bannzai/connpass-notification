/*
'\
<a href="https://connpass.com/user/hirose_yudai/?utm_campaign=event_participate_to_owner&utm_source=notifications&utm_medium=email&utm_content=user_link" target="_blank" style="color:#000;">\
<strong>hirose_yudai</strong>\
</a>'
*/

export function extractUserName(messageHTMLBody: string) {
  const pattern = '<strong>(.+?)</strong>';
  const regex = new RegExp(pattern);
  return messageHTMLBody.match(regex)[1]
}

export function extractUserNameLink(messageHTMLBody: string) {
  const pattern = 'https://connpass.com/user/.+?/'
  const regex = new RegExp(pattern);
  return messageHTMLBody.match(regex)[0]
}

/*
  <a href="mailto:example@example.example">example-example &lt;example@example.example&gt;</a></span></td>
*/
export function extractContactSourceName(messageHTMLBody: string) {
  const pattern = '<a href=".+">.+ &lt;(.+?)&gt;</a></span></td>'
  const regex = new RegExp(pattern);
  return messageHTMLBody.match(regex)[1]
}

export function extractContactSourceAddress(messageHTMLBody: string) {
  const pattern = '<a href="mailto:(.+?)">'
  const regex = new RegExp(pattern);
  return messageHTMLBody.match(regex)[1]
}

/*
  <a href="https://engineers-x-designers.connpass.com/event/120545/?utm_campaign=event_participate_to_owner&utm_source=notifications&utm_medium=email&utm_content=title_link" target="_blank" style="color:#000;"><strong>【増枠】DXEL.3 エンジニアとデザイナーが「いい関係」を築くために</strong></a>に参加登録しました。
*/
export function extractEventLink(messageHTMLBody: string) {
  const pattern = "https://engineers-x-designers.connpass.com/event/[0-9]+/"
  const regex = new RegExp(pattern);
  return messageHTMLBody.match(regex)[0]
}

export function extractEventName(messageHTMLBody: string) {
  const pattern = '<a href="https://engineers-x-designers.connpass.com/event/.+" target="_blank" style="color:#000;"><strong>(.+)</strong></a>に参加登録しました。'
  const regex = new RegExp(pattern);
  return messageHTMLBody.match(regex)[1]
}