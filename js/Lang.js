var arrLang = {
  "en-gb": {
    "Line1": "What ?",
    "Line2": "This is a Decentralized Application (Dapp).",
    "Line2-1": "You can own countries and display your message on them. The leaderboard shows the wealthiest countries.",
    "Line3": "What's in it for me ?",
    "Line4": "Once you own a country you're now it's king. You message will be displayed on that countries page.",
    "Line4-1": "Each time a country is bought, it's price increases by 20%.If someone buys your country, you get your BCH back + an extra 10%. ",
    "Line5": "Roadmap ?",
    "Line6": "Not yet. Billboard rental function may be introduced in the future. Currently only the message board function.",
    "Line7": "Goal ?",
    "Line8": "Create the farm and pay for comments with counfties tokens.",
    "Line9": " Disclaimer: ",
    "Line10": "for the best experience, use a desktop!",
    "Line11": "Current selected country:",
    "Line12": "Name:",
    "Line13": "Country price (in BCH): ",
    "Line14": "Owner:",
    "Line15": "Country message: ",
    "Line16": " NOTE: ",
    "Line17": "  The address query function is not listed, please remember the city you purchased.",
    "Line18": " Current network:  ",
    "Line19": " Main net ",
    "Line20": "Choose a country:",
    "Line21": " NOTE: ",
    "Line22": " Standard network is Test BCH mainnet.",
    "Line23": " Connect your wallet to change network.",
    "Line24": " Leaderboard:",
    "Line25": " (Prices in $BCH)",
  },
  "zh-tw": {
    "Line1": "這是什麼 ?",
    "Line2": "這是一個去中心化應用程序（Dapp）。",
    "Line2-1": "您可以擁有國家並在其上顯示您的信息。 排行榜顯示最富有的國家.",
    "Line3": "對我有什麼好處？",
    "Line4": "一旦你擁有一個國家，你現在就是國王。您的消息將顯示在該國家/地區頁面上。",
    "Line4-1": "每次購買一個國家，價格上漲20％。如果有人購買您的國家，您將獲得您的BCH + 額外的10％。",
    "Line5": "路線圖？",
    "Line6": "還沒有。 未來可能會推出廣告牌出租功能。 目前只有留言板功能。",
    "Line7": "目標 ？",
    "Line8": "創建農場並使用代幣支付廣告費用。",
    "Line9": "叮嚀：",
    "Line10": "為了獲得最佳體驗，請使用電腦！",
    "Line11": "當前選擇的國家：",
    "Line12": "名字:",
    "Line13": "國家價格 (＄ BCH): ",
    "Line14": "擁有者:",
    "Line15": "國家訊息: ",
    "Line16": " 注意: ",
    "Line17": "地址查詢功能未列出，請記住您購買的城市。",
    "Line18": " 當前網路: ",
    "Line19": " 主網 ",
    "Line20": " 選擇一個國家: ",
    "Line21": " 叮嚀： ",
    "Line22": " 標準網絡是測試 BCH 主網。",
    "Line23": " 連接您的錢包以更改網絡。",
    "Line24": " 排行榜",
    "Line25": " （以 BCH 為單位的價格）",
  }
};

// The default language is English
var lang = "en-gb";
// Check for localStorage support
if('localStorage' in window){
   
   var usrLang = localStorage.getItem('uiLang');
   if(usrLang) {
       lang = usrLang
   }

}


console.log(lang);

        $(document).ready(function() {

          $(".lang").each(function(index, element) {
            $(this).text(arrLang[lang][$(this).attr("key")]);
          });
        });

        // get/set the selected language
        $(".translate").click(function() {
          var lang = $(this).attr("id");

          // update localStorage key
          if('localStorage' in window){
               localStorage.setItem('uiLang', lang);
               console.log( localStorage.getItem('uiLang') );
          }

          $(".lang").each(function(index, element) {
            $(this).text(arrLang[lang][$(this).attr("key")]);
          });

        });


