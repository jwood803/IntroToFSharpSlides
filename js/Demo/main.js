// This is a dummy app used to demonstrate the use of the Chrome Developer
// Tools to identify memory leaks and memory problems.

MESSAGE_CACHE_SIZE = 5;     // Number of message to cache for quick display.
LAST_MESSAGE_INDEX = 20;   // Total number of messages in inbox

currentlyDisplayedMessage = null;
currentIndex = 0;       // Index of message currently displayed
cachedItems = 0;        // Current number of cached messages
numClicks = 0;

messageCache = new Array(MESSAGE_CACHE_SIZE);  // Array of messages
cacheMap = {};          // Map from messageId to index in messageCache
savedMessages = [];

function MessageAuxData() {
  this.headers = [];
}

MessageAuxData.prototype = {
  addHeader: function(str) {
    this.headers.push(str);
  }
}

// Simulate the loading of any auxiliary data associated with a displayed
// message.
loadAuxiliaryMessageData = function(message) {
  var div = document.createElement("div");
  div.id = "MessageData";
  div.data = new MessageAuxData();
  var numHeaders = 100000; // or Math.floor((Math.random() * 100) + 1) * 100;
  for (var i = 0; i < numHeaders; ++i) {
    div.data.addHeader(i.toString());
  }
  message.appendChild(div);
}

// Hide the message currently being displayed and display the next
// requested message
displayMessage = function(message) {
  if (currentlyDisplayedMessage != null) {
    currentlyDisplayedMessage.style.display = "none";
  }
  message.style.display = "block";
  currentlyDisplayedMessage = message;
}

// Load the previous message in the inbox.
loadPrevMessage = function() {
  numClicks++;
  if (currentIndex > 1) {
    loadMessage(--currentIndex);
  }
}

// Load the next message in the inbox.
loadNextMessage = function() {
  numClicks++;
  if (currentIndex < LAST_MESSAGE_INDEX) {
    loadMessage(++currentIndex);
  }
}

// Cache a message.  If the cache is full, evict a message from the cache.
// Uses a braindead eviction strategy that does not take into account the last
// time the message was displayed.
cacheMessage = function(msgId, message) {
  var foo = document.getElementById("foo");
  var cachedIndex;
  if (cachedItems == MESSAGE_CACHE_SIZE) {
    // Evict a message
    for (id in cacheMap) {
      cachedIndex = cacheMap[id];
      foo.removeChild(messageCache[cachedIndex]);
      delete cacheMap[id];
      break;
    }
  } else {
    cachedIndex = cachedItems++;
  }
  // Add message to cache
  foo.appendChild(message);
  messageCache[cachedIndex] = message;
  cacheMap[msgId] = cachedIndex;

  // Save a JS reference to every 3rd message.  Ultimately this reference
  // will prevent the message from being GCed even if it falls out of the
  // cache. This is a totally contrived example, but one might imagine a bug
  // in something like applying a label to the message that might result in
  // an entire message hanging around inadvertently.
  if (numClicks % 3 == 0) {
    savedMessages.push(message);
  }
}

// Loads the contents of a message if not already cached and displays it.
loadMessage = function(index) {
  if (index in cacheMap) {
    // Message is cached, simply display it.
    displayMessage(messageCache[cacheMap[index]]);
    return;
  }

  // Message is not cached.  Load contents, cache it, and display it.
  var contents = document.createElement("div");
  contents.id =  "MessageBody" + index.toString();
  contents.innerHTML =
      "<h3>Hello, Developers!<p>This is message #" +
      index.toString() + ".</h3>";
  contents.style.display = "none";
  loadAuxiliaryMessageData(contents);
  cacheMessage(index, contents);
  displayMessage(contents);
}

main = function() {
  var nextMessage = document.getElementById("readNextButton");
  nextMessage.addEventListener("click", loadNextMessage, false);

  var prevMessage = document.getElementById("readPrevButton");
  prevMessage.addEventListener("click", loadPrevMessage, false);
}

document.addEventListener('DOMContentLoaded', main, false);
