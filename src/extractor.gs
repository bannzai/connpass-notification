/*
'\
<a href="https://connpass.com/user/hirose_yudai/?utm_campaign=event_participate_to_owner&utm_source=notifications&utm_medium=email&utm_content=user_link" target="_blank" style="color:#000;">\
<strong>hirose_yudai</strong>\
</a>'
*/

function extractUserName(messageHTMLBody) {
  var pattern = '<strong>(.+?)</strong>';
  var regex = new RegExp(pattern);
  return messageHTMLBody.match(regex)[1]
}

function extractUserNameLink(messageHTMLBody) {
  var pattern = 'https://connpass.com/user/.+?/'
  var regex = new RegExp(pattern);
  if (!regex.length) {
    Logger.log('contact: ' + messageHTMLBody);
  }
  return messageHTMLBody.match(regex)[0]
}

/*
  <a href="mailto:example@example.example">example-example &lt;example@example.example&gt;</a></span></td>
*/
function extractContactSourceName(messageHTMLBody) {
  var pattern = '<a href=".+">.+ &lt;(.+?)&gt;</a></span></td>'
  var regex = new RegExp(pattern);
  return messageHTMLBody.match(regex)[1]
}

function extractContactSourceAddress(messageHTMLBody) {
  var pattern = '<a href="mailto:(.+?)">'
  var regex = new RegExp(pattern);
  return messageHTMLBody.match(regex)[1]
}