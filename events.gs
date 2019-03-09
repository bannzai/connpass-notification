var EVENTS = createEnum({
  REGISTER : {
    value : 1,
    suffix : 'に参加申し込みがありました',
    color: "#00FF00",
    emoticon: ":tada:"
  },
  CANCEL : {
    value : 2,
    suffix : 'に参加キャンセルがありました',
    color: "#FF0000",
    emoticon: ":x:"
  },
  CONTACT : {
    value : 3,
    suffix : 'に関するお問い合わせ',
    color: "#0000FF",
    emoticon: ":email:"
  }
});

function matchedEvent(subject) {
  var all = EVENTS.all();
  var e;
  all.forEach(function(event) {
    if (contains(subject, event.suffix)) {
       e = event;
    }
  });
  return e;
}

function expectedEvent(subject) {
  var all = EVENTS.all();
  var result = false;
  all.forEach(function(event) {
    result = result || contains(subject, event.suffix);
  });
  return result;
}

