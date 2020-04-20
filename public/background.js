chrome.runtime.onInstalled.addListener(function() {
  console.log('oninstalled');
  chrome.storage.local.get('notes', function(result) {
    console.log('notes', result.notes);
  });
  chrome.tabs.query({active: true, currentWindow:true},
    function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id,
        {"message": "clicked_browser_action"}
      );
    });
});
