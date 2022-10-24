isAdBlockActive = false;

var AdBlocker = (function () {

    function showModal() {
        $('#modal_ad_blocker').modal(); // show a message to the user when ads are blocked
    }
    
    setInterval(function () {
        // Get the first AdSense ad unit on the page
        var ad = document.querySelector("ins.adsbygoogle");
    
        // If the ads.js or the Google ads are not loaded, show modal and track the event
        if (typeof isAdBlockActive === 'undefined'
            || (ad && ad.innerHTML.replace(/\s/g, "").length === 0)) {
    
            showModal();
    
            if (typeof ga !== 'undefined') {
                // Log an event in Universal Analytics
                // but without affecting overall bounce rate
                ga('send', 'event', 'Adblock', 'Yes', {'nonInteraction': 1});
    
            } else if (typeof _gaq !== 'undefined') {
                // Log a non-interactive event in old Google Analytics
                _gaq.push(['_trackEvent', 'Adblock', 'Yes', undefined, undefined, true]);
            }
        }
    }, 5000); // check every 5 seconds

})();
