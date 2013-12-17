define ([], function () {
  var logLevel = 3;
  var showLine = true;
  function Debug(tag){
    this.logLevel = 3;
    var ln = 10 - tag.length;
    var white = "";
    for (var i = 0; i < ln; i++) {
      white += " ";
    }
    this.tag = tag + white + ": ";
  }
  Debug.prototype.processLog = function () {
    var log = [this.tag];
    for (var i = 0; i < arguments.length; i++) {
        log.push(arguments[i]);
    };
    if (showLine) {
      var stack = new Error().stack;
      log.push (stack.split("\n")[3]);
    }
    return log;
  }

  Debug.prototype.log = function(){
    if (logLevel >= 3) {
      console.log.apply(console, this.processLog.apply(this, arguments));
    }
  }
  Debug.prototype.pLog = function () {
    if (logLevel >= 3) {
      console.log.apply (console, arguments);
    }
  }

  Debug.prototype.warn = function(){
    if (logLevel >= 2) {
      console.warn.apply(console, this.processLog.apply(this, arguments));
    }
  }

  Debug.prototype.error = function(){
    if (logLevel >= 1) {
      console.error.apply(console, this.processLog.apply(this, arguments));
    }
  }
  Debug.prototype.setLogLevel = function (lvl) {
   logLevel = lvl;
  }
  return Debug;
})