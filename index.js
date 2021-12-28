let checkedCoins = [];
let cryptoCoins = [];
const searchCoins = document.getElementById("searchCoin");
const selectedCoinsText = document.createElement("p");
let myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"), {});
let selectedCoin = {}


// First request & Append Cards to Home Page
    $.get('https://api.coingecko.com/api/v3/coins')
    .then(function getCrypto(data) {
    const mainDiv = document.querySelector(".cryptocards");
    console.log(data)
    for (let i = 0; i < 100; i++) {
        const element = data[i];
        $(mainDiv).append(`
    <div class="card cryptocard" style="width: 15rem;">
        <div class="card-body">
        <img src=${element.image.small} class="coinimgs">
        <h5 class="card-title">${element.name}</h5>
        <p class="card-text"></p>
            <div class="switch form-check form-switch"><input class="form-check-input" type="checkbox" id=${element.id} role="switch" data-id=${element.id}></div>
                <button class="moreInfo btn btn-primary" type="button" data-id=${i}>More Info</button>
                    <div class="moreinfobox hide">
                        <img src=${element.image.small} class="coinimgs moreinfoimg">
                        <p class="moreinfotxt">ILS: ${element.market_data.current_price.ils.toLocaleString("en-IL")}₪</p>
                        <p class="moreinfotxt">USD: ${element.market_data.current_price.usd.toLocaleString("en-IL")}$</p>
                        <p class="moreinfotxt">EUR: ${element.market_data.current_price.eur.toLocaleString("en-IL")}€</p>
                    </div>
            </div>
    </div>
    `)
    }
})
const moreInfo = document.querySelectorAll('.moreinfo')
const switchPop = document.querySelectorAll('.form-check-input')

     $(switchPop).change(function () {
        let PopModel = true;
        let switchAttribute = switchPop.getAttribute("data-id");
         if (switchPop.checked) {
             selectedCoin = {
                 id: switchAttribute,
                 image: element.image.small,
                 name: element.name
             }
             console.log('checkedCoins', checkedCoins.length);
             if (checkedCoins.length < 5) {
                 checkedCoins.push(selectedCoin);
                 PopModel = false;
             }
         }
         else {
             currIdEdit = switchAttribute;
             let itemIndex = checkedCoins.findIndex(
                 (element) => element.id == currIdEdit
             );
             checkedCoins.splice(itemIndex, 1);
             console.log("Not checked " + currIdEdit);
             PopModel = false;
         }
         if (checkedCoins.length) {
            $(alert).attr("class", "alert alert-primary");

        } else {
            $(alert).attr("class", "alert alert-primary hide");

        }

        const allCoins = checkedCoins.map((coin) => coin.name).join(", ");

        if (alert.children.length) {
            $(alert.children[0]).text(allCoins);
        } else {
            const element = document.createElement("p");
            $(element).text(allCoins);
            $(alert).append(element);
        }


        if (PopModel == true) {
            switchInput.checked = false;
            console.log("test")
            currIdEdit = switchAttribute;
            let itemIndex = checkedCoins.findIndex(
                (element) => element.id == currIdEdit
            );
            // checkedCoins.splice(itemIndex, 1);
            console.log("Not checked " + currIdEdit);
            myModal.show()
            const modalBody = document.getElementById("modalBody")
            $(modalBody).html('');
            for (const coins of checkedCoins) {
                const popUpDiv = document.createElement("div");
                const popUpSwitchDiv = document.createElement("div");
                const switchPopUp = document.createElement("input");
                $(popUpSwitchDiv).addClass("form-check form-switch popupswitch");
                $(switchPopUp).addClass("form-check-input popupswitch");
                $(switchPopUp).attr("type", "checkbox");
                $(switchPopUp).attr("role", "switch");
                $(switchPopUp).attr("checked", "checked");
                $(switchPopUp).attr("data-id", coins.id);
                $(modalBody).append('<h6>' + coins.name + '</h6>')
                $(popUpSwitchDiv).append(switchPopUp)
                $(modalBody).append(popUpSwitchDiv)
                $(modalBody).append('<hr>')

                $(switchPopUp).change(function () {
                    let index = switchPopUp.getAttribute("id");

                    if (!switchPopUp.checked) {
                        console.log(index)
                        console.log(checkedCoins)
                        if (checkedCoins.length > 0) {
                            let itemIndex = checkedCoins.findIndex(
                                (element) => element.id == currIdEdit
                            );
                            checkedCoins.splice(itemIndex, 1);
                            myModal.hide()
                            $('#' + coins.id).prop('checked', false)
                            checkedCoins.push(selectedCoin);
                            $('#' + selectedCoin.id).prop('checked', true)



                        }
                    }



                });



            }


        }


    });
    // switchInput.addEventListener("change", function switchButton() {
    // });
    $(moreInfo).click(function () {
        if (!$(cardDiv).hasClass("card cryptocardshow")) {
            $(cardDiv).attr("class", "card cryptocardshow");
            $(moreInfobox).attr("class", "moreinfobox");
        } else {
            $(cardDiv).attr("class", "card cryptocardhide");
            $(moreInfobox).attr("class", "moreinfobox hide");
        }

    });




const homeDiv = document.getElementById("coins");
const aboutDiv = document.getElementById("about");
const liveReportDiv = document.getElementById("livereport");

function loadmenuitem(i) {
    $(homeDiv).attr("class", "coins hide")
    $(aboutDiv).attr("class", "about hide")
    $(liveReportDiv).attr("class", "livereport hide");

    if (i == 1) {
        $(homeDiv).attr("class", "coins");

    }
    if (i == 2) {
        $(aboutDiv).attr("class", "about");
    }
    if (i == 3) {
        $(liveReportDiv).attr("class", "livereport");
    }

}

function filterCoin() {
    const filteredCoins = cryptoCoins.filter((coin) =>
        coin.name.toLowerCase().includes(searchCoins.value.toLowerCase())
    );
    const filteredSym = cryptoCoins.filter((sym) =>
        sym.symbol.toLowerCase().includes(searchCoins.value.toLowerCase())
    );

    if (!filteredCoins.length) {
        console.log("no Coins");
        // mainDiv.innerHTML = ``
    }

    mainDiv.innerHTML = ``;
    for (const coin of filteredCoins) {
        $(mainDiv).append(`
        <div class="card cryptocard" style="width: 15rem;">
        <div class="card-body">
        <img src=${coin.image.small} class="coinimgs">
        <h5 class="card-title">${coin.name}</h5>
        <p class="card-text"></p>
        <div class="switch form-check form-switch">
        <input class="form-check-input" type="checkbox" data-id=${coin.id} id="flexSwitchCheckChecked">
        </div>
        <button class="moreInfo btn btn-primary" type="button" data-id="0">More Info</button>
        </div>
        </div>`);
        //     mainDiv.innerHTML += `
        // <div class="card cryptocard" style="width: 15rem;">
        // <div class="card-body">
        // <img src=${coin.image.small} class="coinimgs">
        // <h5 class="card-title">${coin.name}</h5>
        // <p class="card-text"></p>
        // <div class="switch form-check form-switch">
        // <input class="form-check-input" type="checkbox" data-id=${coin.id} id="flexSwitchCheckChecked">
        // </div>
        // <button class="moreInfo btn btn-primary" type="button" data-id="0">More Info</button>
        // </div>
        // </div>
        // `;
    }
    for (const sym of filteredSym) {
        $(mainDiv).append(`
        <div class="card cryptocard" style="width: 15rem;">
        <div class="card-body">
        <img src=${sym.image.small} class="coinimgs">
        <h5 class="card-title">${sym.name}</h5>
        <p class="card-text"></p>
        <div class="switch form-check form-switch">
        <input class="form-check-input" type="checkbox" data-id=${sym.id} id="flexSwitchCheckChecked">
        </div>
        <button class="moreInfo btn btn-primary" type="button" data-id=${sym.id}>More Info</button>
        </div>
        </div>`);

    }
}
searchCoins.addEventListener("keyup", filterCoin);

// About Section:
let current = 1; //keeps track of the current div
let height = $('.roles').height(); //the height of the roles div
let numberDivs = $('.roles').children().length; //the number of children of the roles div
let first = $('.roles div:nth-child(1)'); //the first div nested in roles div
setInterval(function () {
    let number = current * -height;
    first.css('margin-top', number + 'px');
    if (current === numberDivs) {
        first.css('margin-top', '0px');
        current = 1;
    } else current++;
}, 2000);


