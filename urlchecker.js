function main() 
{
    // Gets the iterator that iterates across all accounts the user has access to.
    var accounts = AccountsApp.accounts().get();
    
    while (accounts.hasNext()){
        var account = accounts.next();
        var activeAccount = AccountsApp.select(account);

        // Loops through the list of accounts.
        var ads = BingAdsApp.ads().get();
        
        while (ads.hasNext()) {
            var ad = ads.next();
            var url = ad.urls().getFinalUrl();
            var checkResult = checkUrl(url);

            Logger.log(`Url ${url} for ad ${ad.getId()} is ${checkResult.isGood ? 'good' : 'bad'}${checkResult.error ? ': ' + checkResult.error : ''} Account Number is ${account.getAccountNumber()}`);
        }  
    }
}

// checkUrl
//
// Fetches URL http response code and checks if the response is in the 200s.
//
// parameters
// url: url parameter to check
//
// returns: ojbect with {isGood: true} or {isGood: false, error: <httpErrorCode>}
function checkUrl(url) {
    var response;
  
    try {
        response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    }
    catch (e) {
        return { isGood: false, error: e };
    }

    var code = response.getResponseCode();
    var content = response.getContentText();

    if (code >= 200 && code <= 299) {
        return { isGood: true };
    }

    return { isGood: false, error: code };
}
