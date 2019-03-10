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