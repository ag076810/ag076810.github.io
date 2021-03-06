var arrLang = {
  "en-gb": {
    "Line1": "What ?",
    "Line2": "This is a Decentralized Application (Dapp).",
    "Line2-1": "You can own countries/regions and display your message on them. The leaderboard shows the wealthiest countries/regions.",
    "Line3": "What's in it for me ?",
    "Line4": "Once you own a country/region you're now the king of it. You message will be displayed on that country/region page.",
    "Line4-1": "Every time a country/region is purchased, the price increases 20%. If someone purchases your country/region, you get your BCH back plus extra 10%.",
    "Line5": "Roadmap ?",
    "Line6": "Not yet. Billboard rental function may be introduced in the future. Currently only the message board function.",
    "Line7": "Goal ?",
    "Line8": "Create the farm and pay for comments with counfties tokens.",
    "Line9": " Disclaimer: ",
    "Line10": "for the best experience, use a desktop!",
    "Line11": "Current selected country/region: ",
    "Line12": "Name:",
    "Line13": "Country/Region price: ",
    "Line14": "Owner:",
    "Line15": "Country/Region message: ",
    "Line16": " NOTE : ",
    "Line17": "The address query function is not listed, please remember the country/region you've purchased.",
    "Line18": " Current network: ",
    "Line19": " Main net ",
    "Line20": "  Choose a country/region  ",
    "Line21": " NOTE: ",
    "Line22": " Standard network is smartBCH Mainnet.",
    "Line23": " Connect your wallet to change network.",
    "Line24": "  Leaderboard  ",
    "Line25": " (Prices in $BCH)",
    "Line26": " ★ ",
    "Line27": "BCH will be transfered to your address immediately if someone purchase your Country/Region. However, the transfer record will not show on smartscan.",
    "Line28": " ★ ",
    "Line29": "We have confirmed that SBCH addresss is able to recieve BCH. Please do not purchase if there's any concern. We will fix this issue in the future.",
  },
  "zh_cn": {
    "Line1": "这是什么 ?",
    "Line2": "这是一个去中心化应用程序（Dapp）。",
    "Line2-1": "您可以拥有国家/地区并在其上显示您的信息。排行榜显示最富有的国家/地区.",
    "Line3": "对我有什么好处？",
    "Line4": "一旦你拥有一个国家/地区，你现在就是国王。您的消息将显示在该国家/地区页面上。",
    "Line4-1": "每次购买一个国家/地区，价格上涨20％。如果有人购买您的国家/地区，您将获得您的BCH + 额外的10％。",
    "Line5": "路线图？",
    "Line6": "还没有。未来可能会推出广告牌出租功能。目前只有留言板功能。",
    "Line7": "目标 ？",
    "Line8": "创建农场并使用代币支付广告费用。",
    "Line9": "注意： ",
    "Line10": "为了获得最佳体验，请使用电脑！",
    "Line11": "  当前选择的国家/地区  ",
    "Line12": "名字:",
    "Line13": "国家/地区价格: ",
    "Line14": "拥有者:",
    "Line15": "国家/地区讯息: ",
    "Line16": "注意： ",
    "Line17": "地址查询功能未列出，请记住您购买的/地区。",
    "Line18": " 当前网路: ",
    "Line19": " 主网 ",
    "Line20": " 选择一个国家/地区: ",
    "Line21": " 注意： ",
    "Line22": " 标准网络是BCH主网。",
    "Line23": " 连接您的钱包以更改网络。",
    "Line24": "  排行榜  ",
    "Line25": "（以 BCH 为单位的价格）",
    "Line26": " ★ ",
    "Line27": "如果有人购买您的国家/地区，BCH 将立即转移到您的地址。但是，转移记录不会显示在smartscan上。",
    "Line28": " ★ ",
    "Line29": "我们已经确认SBCH地址能够接收BCH，如果有任何顾虑，请不要购买。我们将在未来解决这个问题。",
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


