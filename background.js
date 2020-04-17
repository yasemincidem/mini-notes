chrome.runtime.onInstalled.addListener(function() {
  console.log('oninstalled');
  chrome.storage.local.get('notes', function(result) {
    console.log('notes', result.notes);
  });
});
