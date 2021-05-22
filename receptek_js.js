
var receptekTomb = [];

$(function () {
//itt még nem létezik a tr tag
    $("article").on("click", "table tr", megjelenit); //az article tagben majd ha lesz tr tag, akkor hívódjon meg kattintásra a megjelenit függv.

    /*JOBBRA LÉPTETÉS*/
    $("section").on("click", "#jobbraleptet", function () {
        var kepEleresiUt = $("#kepkeret img").attr("src"); //lekérdezzük az aktuálisan a képkeretben látható kép elérési útját

        //keresés
        var objID = 0;
        for (var i = 0; i < receptekTomb.length; i++) {
            if (receptekTomb[i]["eleresi_ut"] === kepEleresiUt)
                objID = i;
        }
        if (objID < receptekTomb.length - 1) {
            megjelenitRecept(receptekTomb[objID + 1]);
        }
    });

    /*BALRA LÉPTETÉS*/
    $("section").on("click", "#balraleptet", function () {
        var kepEleresiUt = $("#kepkeret img").attr("src"); //lekérdezzük az aktuálisan a képkeretben látható kép elérési útját

        //keresés
        var objID = 0;
        for (var i = 0; i < receptekTomb.length; i++) {
            if (receptekTomb[i]["eleresi_ut"] === kepEleresiUt)
                objID = i;
        }
        if (objID > 0) {
            megjelenitRecept(receptekTomb[objID - 1]);
        }
    });





    $.ajax(
            {url: "receptek.json", success: function (result) {
//                    console.log(result);
                    receptekTomb = result;  //a beolvasott JSN file tartalmát egy termekTombbe mentem
//                    console.log(receptekTomb);
//                    $("article").append(receptekTomb+"");
                    tablazatbaKiir();
//                     $("table tr").click(megjelenit);
                }});
});



function megjelenit() {
    var ID = Number($(this).attr("id"));
    console.log(ID);
//   console.log(receptekTomb[ID]);
    megjelenitRecept(receptekTomb[ID]);

}

function megjelenitRecept(receptObjektum) { //a receptekTomb egy eleme a paraméter
    $("section").empty();
    /*LÉPÉSEK*/
    //adott recept adatainak megjelenítése
    //section h2-be kerüljön a recept neve
    //a section p tag-ébe kerüljön a leírás
    //a section div-jébe a hozzávalók felsorolása
    //a section img-be illesszük be a képet
    
    /*SZERKEZET KIALAKÍTÁSA*/

    $("section").append("<div id='fokeret'>\n\
        <div id='balraleptet'> << </div>\n\
        <div id='kepkeret'><img src='" + receptObjektum['eleresi_ut'] + "'></div>\n\
        <div id='jobbraleptet'> >> </div>\n\
        </div>");
    $("section").append("<h2>" + receptObjektum["nev"] + "</h2>");
    $("section").append("<div>" + hozzavalokKiir(receptObjektum) + "</div>");
    $("section").append("<div><h3>Az étel elkészítése</h3><p>" + receptObjektum["leiras"] + "</p></div>");

    /*FORMÁZÁSOK*/
    $("section h2").addClass("etelcim_formaz");

    $("#balraleptet").mouseenter(function () {
        $(this).css("background-color", "lemonchiffon");
    });
    $("#balraleptet").mouseleave(function () {
        $(this).css("background-color", "mistyrose");
    });
    
     $("#jobbraleptet").mouseenter(function () {
        $(this).css("background-color", "lemonchiffon");
    });
    $("#jobbraleptet").mouseleave(function () {
        $(this).css("background-color", "mistyrose");
    });

}

function hozzavalokKiir(receptObjektum) {
    var hvLista = "<p><h3>Hozzávalók:</h3></p>";
    //a hozzávalók listája maga is egy tömb
    for (var i = 0; i < receptObjektum["hozzavalok"].length; i++) {
        for (var item in receptObjektum["hozzavalok"][i]) {
            hvLista += "<ul><li>" + item + ": " + receptObjektum["hozzavalok"][i][item] + "</li></ul>";
        }
    }
    return hvLista;
}



function tablazatbaKiir() {
    csakFejlec();
    for (var i = 0; i < receptekTomb.length; i++) {
        $("table").append("<tr id='" + (i) + "'></tr>");
        for (var item in receptekTomb[i]) {
            if (item === "hozzavalok") { //ha ha hozzávalókat iratjuk ki, akkor szedje ki a Hozzávalók alatti objektumokból az adatokat, és írja ki li tag-ek közé
                var hvLista = "";
                for (var j = 0; j < receptekTomb[i]["hozzavalok"].length; j++) {
                    for (var hozzavalo in receptekTomb[i]["hozzavalok"][j]) {
                        hvLista += "<ul><li>" + hozzavalo + ": " + receptekTomb[i]["hozzavalok"][j][hozzavalo] + "</li></ul>"; //a hozzávaló neve és a hozzá tartozó mennyiség 
                    }
                }
                $("table tr").eq(i + 1).append("<td>" + hvLista + "</td>");
            } else {
                $("table tr").eq(i + 1).append("<td>" + receptekTomb[i][item] + "</td>"); //egyébként az i-edik objektumhoz tartozó item mező értékét illessze be a mezőbe 
            }
        }
    }

}


function csakFejlec() {
    $("article").append("<table></table>");
    $("article table").append("<tr id='-1';>\n\
        <th>Név</th>\n\
        <th>Elkészítési idő</th>\n\
        <th>Kép elérési útja</th>\n\
        <th>Leírás</th>\n\
        <th>Hozzávalók</th>\n\
        </tr>");

}

