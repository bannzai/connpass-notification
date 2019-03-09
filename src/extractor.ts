/*
'\
<a href="https://connpass.com/user/hirose_yudai/?utm_campaign=event_participate_to_owner&utm_source=notifications&utm_medium=email&utm_content=user_link" target="_blank" style="color:#000;">\
<strong>hirose_yudai</strong>\
</a>'
*/

function extractUserName(messageHTMLBody: string) {
  let pattern = '<strong>(.+?)</strong>';
  let regex = new RegExp(pattern);
  return messageHTMLBody.match(regex)[1]
}

function extractUserNameLink(messageHTMLBody: string) {
  let pattern = 'https://connpass.com/user/.+?/'
  let regex = new RegExp(pattern);
  return messageHTMLBody.match(regex)[0]
}

/*
  <a href="mailto:example@example.example">example-example &lt;example@example.example&gt;</a></span></td>
*/
function extractContactSourceName(messageHTMLBody: string) {
  let pattern = '<a href=".+">.+ &lt;(.+?)&gt;</a></span></td>'
  let regex = new RegExp(pattern);
  return messageHTMLBody.match(regex)[1]
}

function extractContactSourceAddress(messageHTMLBody: string) {
  let pattern = '<a href="mailto:(.+?)">'
  let regex = new RegExp(pattern);
  return messageHTMLBody.match(regex)[1]
}