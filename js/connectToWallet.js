// Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const evmChains = window.evmChains;
//
// Web3modal instance
let web3Modal;
let web3, web3wallet;
let contract;
let hrefBscscan = "https://www.smartscan.cash";
let lastClicked = "empty";
// Chosen wallet provider given by the dialog window
let provider;

// Address of the selected account
let selectedAccount;

let connected = true;

let networkId = 10000;


/**
 * Setup the orchestra
 */

function init() {
    console.log("Initializing example");
    console.log("WalletConnectProvider is", WalletConnectProvider);
    //    console.log("Fortmatic is", Fortmatic);
    console.log("window.ethereum is", window.ethereum);

    // Tell Web3modal what providers we have available.
    // Built-in web browser provider (only one can exist as a time)
    // like MetaMask, Brave or Opera is added automatically by Web3modal
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                rpc: {
                    56: "wss://floral-rough-snow.bsc.quiknode.pro/",
                    // ...
                },
                chainId: 56,
                rpcUrl: "wss://floral-rough-snow.bsc.quiknode.pro/",
            },
        },
    };

    web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions, // required
        disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
    });

    console.log("Web3Modal instance is", web3Modal);
}


async function onConnect() {
    init();
    web3wallet = new Web3(window.ethereum);
    networkId = await web3wallet.eth.net.getId();
    console.log(networkId)
    if (networkId == 10001) {
        document.getElementById("network").innerHTML = "BCH Test net";
    } else if (networkId == 10000) {
        document.getElementById("network").innerHTML = "BCH net";
    }
    connectToContract();

    console.log("Opening a dialog", web3Modal);

    if (connected) {
        try {

            provider = await web3Modal.connect();
            console.log(provider);
            connectBtn.value = "Connected";

            $("#connectBtn").removeClass("glow");
            selectedAccount = await web3wallet.eth.getAccounts()[0];
            contract = new web3wallet.eth.Contract(contractAbi, contractAddress);
        } catch (e) {
            console.log("Could not get a wallet connection", e);
            connectBtn.value = "error";
            return;
        }
        
    }
    $("#buyCountry").removeClass("notAvailable")
    document.getElementById("buyCountry").value = "Add message and buy country";
    hideAll();

}

async function checkingConnections() {


    const checkAccount = await web3wallet.eth.getAccounts();
    if (checkAccount.length > 0) {
        selectedAccount = checkAccount[0];
        ethereum.enable();
        connected = true;
        connectBtn.value = "Connected";
        $("#connectBtn").removeClass("glow");
    }

    return checkAccount;
}


async function connectToContract() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
        resetProgram();
    });

    window.ethereum.on("chainChanged", (chainId) => {
        resetProgram();
    });

    window.ethereum.on("networkChanged", (networkId) => {
        resetProgram();
    });
  }
    showAll();
    if (networkId === 10001) {
        document.getElementById("network").innerHTML = "Test BCH net";
        web3 = new Web3("https://moeing.tech:9545/");
        contractAddress = "0x113825435e90f3B562809d618F8Eb3Ac4fb6C2f9";
        hrefBscscan = "https://www.smartscan.cash"
    } else if (networkId === 10000) {
        document.getElementById("network").innerHTML = "Main BCH net";
        web3 = new Web3("wss://smartbch-wss.greyh.at/");
        //contractAddress = "0xf0bF9d19C0d15e00eD17427CdD91a79797C69D01";
        contractAddress = "0xf6cfBe3bee7c9Fd1Efbf3E150437f2C80889eB5f";
        hrefBscscan = "https://www.smartscan.cash"
        //hrefBscscan=https://bscscan.com
    } else {
        alert("Please change your network provider to the SmartBCH ");
    }

    try {
        contract = new web3.eth.Contract(contractAbi, contractAddress);
    } catch (e) {
        console.log(e);
    }
}

async function getData(id, name) {
    document.getElementById("countryName").innerHTML = name;
    //document.getElementById("countryId").innerHTML = id;
    let price = await contract.methods.getValueOfCountry(id).call();
    if (price == 0) {
        price = 0.01;
    } else {
        price = web3.utils.fromWei(price, "ether");
    }
    
    document.getElementById("countryPrice").innerHTML = parseInt(price*1000)*0.001;
    let owner = await contract.methods.getCountryOwner(id).call();
    document.getElementById("countryOwner").innerHTML = owner;
    document.getElementById("countryOwner").href = hrefBscscan + "/address/" + owner;
    let message = await contract.methods.getMessage(id).call();
    document.getElementById("countryMessage").innerHTML = message;
}

async function refreshCountry() {
    await getLeaderboard();
    let id = document.getElementById("countryId").innerHTML;
    let name = document.getElementById("countryName").innerHTML;
    getData(id, name);
    setTimeout(refreshCountry, 5000);
    hideAll();
}

async function buyCountry() {
    showAll();
    connectBtn.value = "wait onConnected";
    await onConnect();

    if (document.getElementById("countryId").innerHTML == "") {
        return;
    }
    connectBtn.value = "id1";
    checkingConnections();
    connectBtn.value = "id2";
    let id = document.getElementById("countryId").innerHTML;
    let price = await contract.methods.getValueOfCountry(id).call();
    if (price == 0) {
        price = "10000000000000000";
    }
    await contract.methods.buyCountry(id, document.getElementById("newCountryMessage").value).send({
        from: selectedAccount,
        value: price
    });
    hideAll();
}

function blink() {
    $("#connectBtn").addClass("blink");
}

async function getFirstCountry() {
    let prices = await contract.methods.getTopCountriesPrices().call();
    if (prices[10][1] != "N/A") {
        highlightCountry(prices[10][1], countryListAlpha3[prices[10][1]]);
    }
    refreshCountry();
}

async function getLeaderboard() {
    let prices = await contract.methods.getTopCountriesPrices().call();
    console.log(prices[10][0]);
    //document.getElementById("firstPlace").innerHTML = web3.utils.fromWei(prices[4][0], "ether") + " - " + prices[4][1] + " - " + (countryListAlpha3[prices[4][1]] == null ? "" : countryListAlpha3[prices[4][1]]);
    
    
    document.getElementById("firstPlace").innerHTML = " 🏆 " + parseInt(web3.utils.fromWei(prices[10][0], "ether")*1000)*0.001 + " - "  + (countryListAlpha3[prices[10][1]] == null ? "N/A" : countryListAlpha3[prices[10][1]])+ " <br/> "+ await contract.methods.getMessage(prices[10][1] ).call();
    document.getElementById("firstPlace").onclick = function() {
        if (prices[10][1] != "N/A") {
            $("html, body").animate({
                scrollTop: $(document).height()
            }, "slow");
            highlightCountry(prices[10][1], countryListAlpha3[prices[10][1]]);
        }
    };
    document.getElementById("secondPlace").innerHTML =" 🥈 " + parseInt(web3.utils.fromWei(prices[9][0], "ether") *1000)*0.001 + " - "  + (countryListAlpha3[prices[9][1]] == null ? "N/A" : countryListAlpha3[prices[9][1]])+ " <br/> "+ await contract.methods.getMessage(prices[9][1] ).call();;
    document.getElementById("secondPlace").onclick = function() {
        if (prices[9][1] != "N/A") {
            $("html, body").animate({
                scrollTop: $(document).height()
            }, "slow");

            highlightCountry(prices[9][1], countryListAlpha3[prices[9][1]]);
        }
    };
    document.getElementById("thirdPlace").innerHTML =" 🥉 " + parseInt( web3.utils.fromWei(prices[8][0], "ether")*1000)*0.001 + " - " + (countryListAlpha3[prices[8][1]] == null ? "N/A" :countryListAlpha3[prices[8][1]])+ " <br/> "+ await contract.methods.getMessage(prices[8][1] ).call();;
    document.getElementById("thirdPlace").onclick = function() {
        if (prices[8][1] != "N/A") {
            $("html, body").animate({
                scrollTop: $(document).height()
            }, "slow");

            highlightCountry(prices[8][1], countryListAlpha3[prices[8][1]]);
        }
    };
    document.getElementById("fourthPlace").innerHTML =  parseInt(web3.utils.fromWei(prices[7][0], "ether")*1000)*0.001+ " - " + (countryListAlpha3[prices[7][1]] == null ? "N/A" :countryListAlpha3[prices[7][1]])+ " <br/> "+ await contract.methods.getMessage(prices[7][1] ).call();
    document.getElementById("fourthPlace").onclick = function() {
        if (prices[7][1] != "N/A") {
            $("html, body").animate({
                scrollTop: $(document).height()
            }, "slow");

            highlightCountry(prices[7][1], countryListAlpha3[prices[7][1]]);
        }
    };
    
    document.getElementById("fifthPlace").innerHTML = parseInt(web3.utils.fromWei(prices[6][0], "ether")*1000)*0.001  + " - "  + (countryListAlpha3[prices[6][1]] == null ? "N/A" : countryListAlpha3[prices[6][1]])+ " <br/> "+ await contract.methods.getMessage(prices[6][1] ).call();
    document.getElementById("fifthPlace").onclick = function() {
        if (prices[6][1] != "N/A") {
            $("html, body").animate({
                scrollTop: $(document).height()
            }, "slow");
            highlightCountry(prices[6][1], countryListAlpha3[prices[6][1]]);
        }
    };
    document.getElementById("sixPlace").innerHTML = parseInt(web3.utils.fromWei(prices[5][0], "ether")*1000)*0.001  + " - "  + (countryListAlpha3[prices[5][1]] == null ? "N/A" : countryListAlpha3[prices[5][1]])+ " <br/> "+ await contract.methods.getMessage(prices[5][1] ).call();;
    document.getElementById("sixPlace").onclick = function() {
        if (prices[5][1] != "N/A") {
            $("html, body").animate({
                scrollTop: $(document).height()
            }, "slow");

            highlightCountry(prices[5][1], countryListAlpha3[prices[5][1]]);
        }
    };
    document.getElementById("sevenPlace").innerHTML =  parseInt(web3.utils.fromWei(prices[4][0], "ether")*1000)*0.001  + " - " + (countryListAlpha3[prices[4][1]] == null ? "N/A" :countryListAlpha3[prices[4][1]])+ " <br/> "+ await contract.methods.getMessage(prices[4][1] ).call();;
    document.getElementById("sevenPlace").onclick = function() {
        if (prices[4][1] != "N/A") {
            $("html, body").animate({
                scrollTop: $(document).height()
            }, "slow");

            highlightCountry(prices[4][1], countryListAlpha3[prices[4][1]]);
        }
    };
    
    document.getElementById("eightPlace").innerHTML = parseInt(web3.utils.fromWei(prices[3][0], "ether")*1000)*0.001  + " - "  + (countryListAlpha3[prices[3][1]] == null ? "N/A" : countryListAlpha3[prices[3][1]])+ " <br/> "+ await contract.methods.getMessage(prices[3][1] ).call();
    document.getElementById("eightPlace").onclick = function() {
        if (prices[3][1] != "N/A") {
            $("html, body").animate({
                scrollTop: $(document).height()
            }, "slow");
            highlightCountry(prices[3][1], countryListAlpha3[prices[3][1]]);
        }
    };
    document.getElementById("ninePlace").innerHTML = parseInt(web3.utils.fromWei(prices[2][0], "ether")*1000)*0.001  + " - "  + (countryListAlpha3[prices[2][1]] == null ? "N/A" : countryListAlpha3[prices[2][1]])+ " <br/> "+ await contract.methods.getMessage(prices[2][1] ).call();;
    document.getElementById("ninePlace").onclick = function() {
        if (prices[2][1] != "N/A") {
            $("html, body").animate({
                scrollTop: $(document).height()
            }, "slow");

            highlightCountry(prices[2][1], countryListAlpha3[prices[2][1]]);
        }
    };
    document.getElementById("tenPlace").innerHTML =  parseInt(web3.utils.fromWei(prices[1][0], "ether")*1000)*0.001  + " - " + (countryListAlpha3[prices[1][1]] == null ? "N/A" :countryListAlpha3[prices[1][1]])+ " <br/> "+ await contract.methods.getMessage(prices[1][1] ).call();;
    document.getElementById("tenPlace").onclick = function() {
        if (prices[1][1] != "N/A") {
            $("html, body").animate({
                scrollTop: $(document).height()
            }, "slow");

            highlightCountry(prices[1][1], countryListAlpha3[prices[1][1]]);
        }
    };
    hideAll();
}

function moveToCountry(country) {
    for (i = 0; i < worldData.features.length; i++) {
        if (worldData.features[i].id == country) {
            let targetItem = worldData.features[i].geometry.coordinates[0][worldData.features[i].geometry.coordinates[0].length - 1];
            if (targetItem.length > 2) {
                targetItem = targetItem[targetItem.length - 1];
            }
            projection.origin([targetItem[0], targetItem[1]])
            console.log(targetItem)
            circle.origin(projection.origin());
            refresh();
            break;
        }
    }
}

function highlightCountry(country, name) {
    // Move cam to the country @moveToCountry();
    console.log(country)
    document.getElementById(lastClicked).style.fill = getComputedStyle(document.documentElement).getPropertyValue('--country');
    document.getElementById(country).style.fill = getComputedStyle(document.documentElement).getPropertyValue('--countrySelect');
    getData(country, name);
    lastClicked = country;
}

function getOptions() {
    return {
        fadeDuration: 1,
        hideOnClick: true,
        hideOnESC: true,
        findOnResize: true
    };
}

async function resetProgram() {
    showAll();
    await onConnect();
    await connectToContract();
    let id = document.getElementById("countryId").innerHTML;
    let name = document.getElementById("countryName").innerHTML;
    await getData(id, name);
    await getLeaderboard();
}

$(document).ready(async function() {
    projection.scale(document.getElementById("worldGlobe").getBoundingClientRect().width / 2).translate([document.getElementById("worldGlobe").getBoundingClientRect().width / 2, document.getElementById("worldGlobe").getBoundingClientRect().width / 2]);
    refresh();
    connectToContract();
    getFirstCountry();
    hideAll();
});
