document.addEventListener("DOMContentLoaded", function() {
    const gyujtemenyLetrehozasBtn = document.getElementById("gyujtemeny-letrehozas-btn");   //Gyűjtemény létrehozása gomb
    const gyujtemenyForm = document.getElementById("gyujtemeny-form");                      //Div amiben új gyűjteményt lehet felvenni
    const letrehozasBtn = document.getElementById("letrehozas-btn");                        //Gyűjtemény létrehozása gomb
    const gyujtemenyLista = document.getElementById("gyujtemeny-lista");                    //Ul amiben fel lesznek sorolva a gyűjtemények

    gyujtemenyLetrehozasBtn.addEventListener("click", formMegjelenitese);                   //Rejtett div megjelenítése

    

    letrehozasBtn.addEventListener("click", function() {                                    //Gyűjtemény létrehozása esemény
        const cimInput = document.getElementById("cim").value;                              //Cím input
        const temakorInput = document.getElementById("temakor").value;                      //Témakör input
        const datumInput = document.getElementById("datum").value;                          //Dátum input

        if (cimInput && temakorInput && datumInput) {                                       //Ellenőrzés hogy üresek-e
            var gyujtemenyId = cimInput;                                                    //Gyűjtemény ID-ja
            var gyujtemeny = document.createElement("li");                                  //Új lista item
            gyujtemeny.id = gyujtemenyId;                                                   //ID beállítása ténylegesen
            gyujtemeny.classList.add("boxli");                                              //stílus beállítása
            const cim = document.createElement("span");                                     //Új span amiben ki lesz írva a gyűjtemény neve stb.
            cim.classList.add("cim");
            cim.textContent = `${cimInput} - ${temakorInput} - ${datumInput}`;
            gyujtemeny.appendChild(cim);

            const atnevezesBtn = document.createElement("button");                          //Gyújtemény átnevezése gomb
            atnevezesBtn.textContent = "Átnevezés";
            atnevezesBtn.classList.add("rename");
            atnevezesBtn.addEventListener("click", GyujtemenyAtnevezes);                    //Átnevezés action

            function GyujtemenyAtnevezes(){
                const ujNev = prompt("Adj meg egy új nevet a gyűjteménynek:");
                if (ujNev) {
                    cim.textContent = ujNev + ` - ${temakorInput} - ${datumInput}`;
                    gyujtemenyId = ujNev;
                    gyujtemeny.id = gyujtemenyId;                                           //ID frissítése
                }
            }

            const ujElemBtn = document.createElement("button");                             //Elem hozzáadása a gyűjteményhez
            ujElemBtn.textContent = "Új elem hozzáadása";
            ujElemBtn.classList.add("add");
            ujElemBtn.addEventListener("click", function() {                                //Elem hozzáadása action
                const ujElemCim = prompt("Adj meg egy címet az új elemnek:");
                if (ujElemCim) {
                    const ujElemLista = document.createElement("ul");
                    const ujElem = document.createElement("li");
                    const ikonList = document.createElement("select");                      //Ikonra kattintva majd ez jelenik meg
                    const elemIkonBtn = document.createElement("button");                   //Ikon gomb
                    elemIkonBtn.textContent = " ♋ ";
                    elemIkonBtn.classList.add("icon");
                    elemIkonBtn.addEventListener("click", function() {                      //Ikon action
                        console.log("ikon megnyomva");                                      //Select feltöltése
                        ikonList.innerHTML = `                                              
                        <option value="ures">Válassz</option>
                        <option value="athelyezes">Áthelyezés</option>
                        <option value="atnevezes">Átnevezés</option>
                        <option value="torles">Törlés</option>
                        `;

                        ikonList.addEventListener("change", ikon);                          //Select action
                            

                        function ikon(){
                            const selectedAction = ikonList.value;
                            switch (selectedAction) {
                                case "ures":                                                   
                                    break;
                                case "athelyezes":
                                    const gyujtemenyValasztas = prompt("Add meg, hogy melyik gyűjteménybe szeretnéd hozzáadni az elemet:");
                                    const gyujtemeny = document.getElementById(gyujtemenyValasztas);
                                    if (gyujtemeny) {
                                        const ujUlElem = document.createElement("ul");
                                        ujUlElem.appendChild(ujElem);
                                        gyujtemeny.appendChild(ujUlElem);
                                    } else {
                                        alert("Nem létezik ilyen nevű gyűjtemény!");
                                    }
                                    break;
                                case "atnevezes":
                                    const ujNev = prompt("Adj meg egy új nevet az elemnek:");                                   
                                    if (ujNev) {
                                        ujElem.textContent = ujNev;
                                        ujElem.appendChild(elemIkonBtn);
                                        ikonList.removeEventListener("change", ikon);
                                    }
                                    break;
                                case "torles":
                                    ujElem.parentNode.removeChild(ujElem);
                                    break;
                                default:
                                    break;
                            }
                        }

                        ujElem.appendChild(ikonList);                                       //Li elemhez hozzáadjuk a Select-et
                    })

                    ujElem.textContent = ujElemCim;                                         //Li cím értékül adása
                    ujElem.appendChild(elemIkonBtn);                                        //Li kiegészítése az ikonnal
                    ujElemLista.appendChild(ujElem);                                        //Ul kiegészítése az li-vel
                    gyujtemeny.appendChild(ujElemLista);                                //Li-hez ul hozzáadása
                }
            });

            gyujtemeny.appendChild(atnevezesBtn);                                       //Gyűjtemény li-hez átnevezés gomb hozzáadása
            gyujtemeny.appendChild(ujElemBtn);                                          //Gyűjtemény li-hez új elem gomb hozzáadása
            gyujtemenyLista.appendChild(gyujtemeny);                                    //Ul-hez hozzáadjuk a gyűjtemény-t
        } else {
            alert("Kérlek, töltsd ki az összes mezőt!");
        }
    });

    function formMegjelenitese(){
        gyujtemenyForm.style.display = "block";
        gyujtemenyLetrehozasBtn.style.display = "none";
    }
});