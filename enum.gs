// reference: https://qiita.com/dich1/items/4878ba4b089b3fe7ff30

Enum = function() {
    this._enums = [];
    this._lookups = {};
};

Enum.prototype.all = function() {
    return this._enums;
};

Enum.prototype.addEnum = function(e) {
    this._enums.push(e);
};

function createEnum(definition) {
    var k;
    var e = new Enum();
    for(k in definition) {
        var j = definition[k];
        e[k] = j;
        e.addEnum(j);
    }
    return e;
}
