currentSeason = "2023-24";
gameTables = [];

buildNav();

loadData();

sortAll();

function buildNav() {
	gamesTabMenu = document.querySelector("#games");
	gamesContent = document.querySelector("#gameContent");
	for ( i=0 ; i!==42; i++ ) {
		gameTabLi = document.createElement("LI");
		gameTabLi.classList.add("nav-item");
		gameTabLi.setAttribute("role","presentation");
		gameTabButton = document.createElement("BUTTON");
		gameTabButton.classList.add("nav-link");
		if ( (i+1) > 38 ) {
			gameTabButton.classList.add("forty-two-games");
		}
		gameTabButton.setAttribute("id","game_"+(i+1)+"-tab");
		gameTabButton.setAttribute("data-bs-toggle","tab");
		gameTabButton.setAttribute("data-bs-target","#game_"+(i+1));
		gameTabButton.setAttribute("type","button");
		gameTabButton.setAttribute("role","tab");
		gameTabButton.setAttribute("aria-controls","game_"+(i+1));
		gameTabButton.setAttribute("true","true");
		gameTabButton.innerHTML = (i+1);
		gamesContentDiv = document.createElement("DIV");
		gamesContentDiv.classList.add("tab-pane")
		gamesContentDiv.classList.add("fade");
		gamesContentDiv.setAttribute("id","game_"+(i+1));
		gamesContentDiv.setAttribute("role","tabpanel");
		gamesContentDiv.setAttribute("aria-labelledby","game_"+(i+1)+"-tab");
		gamesContentDiv.innerHTML = "Game " + (i+1);
		if ( i === 0 ) {
			gameTabButton.classList.add("active");
			gamesContentDiv.classList.add("show");
			gamesContentDiv.classList.add("active");
		}
		gameTabLi.append(gameTabButton);
		gamesTabMenu.append(gameTabLi);
		table = document.createElement("TABLE");
		table.setAttribute("id","t_g_"+(i+1));
		table.classList.add("division");
		table.classList.add("mt-3");
		thead = document.createElement("THEAD");
		thead_tr = document.createElement("TR");
		headers = ["Season","P","W","D","L","F","A","GD","Pts"];
		for ( h=0; h<headers.length ; h++ ) {
			var th = document.createElement("th");
			var abbr = document.createElement("abbr");
			abbr.title = headers[h];
			abbr.textContent = headers[h];
			th.appendChild(abbr);
			thead_tr.appendChild(th);
		}
		thead.append(thead_tr);
		tbody = document.createElement("TBODY");
		table.append(thead);
		table.append(tbody);
		gamesContentDiv.append(table);
		gamesContent.append(gamesContentDiv);
		gameTables.push( document.querySelector("#t_g_"+(i+1)+" tbody") );
	}
}

function loadData() {
	data.forEach(function(season){
		_w = _d = _l = _f = _a = 0;
		for ( g=1; g!==season.length; g++ ) {
			result = season[g].split("-");
			_wBadge = _dBadge = _lBadge = _fBadge = _aBadge = 0;
			switch ( result[0] ) {
				case "w": _w++; _wBadge = 1; break;
				case "d": _d++; _dBadge = 1; break;
				case "l": _l++; _lBadge = 1; break;
			}
			_f += parseInt(result[1]);
			_fBadge = parseInt(result[1]);
			_a += parseInt(result[2]);
			_aBadge = parseInt(result[2]);
			tr = document.createElement("TR");
			tdS = document.createElement("TD");
			if ( season[0] === currentSeason ) {
				tr.classList.add("current-season");
			}
			tdS.innerHTML = season[0];
			tr.append(tdS);
			tdP = document.createElement("TD");
			tdP.innerHTML = _w + _d + _l;
			tr.append(tdP);
			tdW = document.createElement("TD");
			tdW.innerHTML = _w + badge("w",_wBadge);
			tr.append(tdW);
			tdD = document.createElement("TD");
			tdD.innerHTML = _d + badge("d",_dBadge);
			tr.append(tdD);
			tdL = document.createElement("TD");
			tdL.innerHTML = _l + badge("l",_lBadge);
			tr.append(tdL);
			tdF = document.createElement("TD");
			tdF.innerHTML = _f + badge("f",_fBadge);
			tdF.setAttribute("data-f",_f);
			tr.append(tdF);
			tdA = document.createElement("TD");
			tdA.innerHTML = _a + badge("a",_aBadge);
			tr.append(tdA);
			tdGD = document.createElement("TD");
			tdGD.innerHTML = _f - _a;
			tr.append(tdGD);
			tdPTS = document.createElement("TD");
			tdPTS.innerHTML = (_w*3) + _d;
			tr.append(tdPTS);
			gameTables[g-1].append(tr);
		}
	});
}

function badge(type,count) {
	if ( type === "f" || type === "a" ) {
		return '<span class="badge badge_'+type+'">'+count+'</span>';
	}
	if ( count === 0 ) {
		return "";
	} else {
		return '<span class="badge badge_'+type+'">+'+count+'</span>';
	}
}

function sortAll() {
	gameTables.forEach(function(tbody) {
		rows = Array.from(tbody.rows);
		rows.sort(function(a,b){
			// Pts
			ptsA = parseInt(a.cells[8].textContent);
			ptsB = parseInt(b.cells[8].textContent);
			if ( ptsA !== ptsB ) {
				return ptsB - ptsA;
			} else {
				// GD
				gdA = parseInt(a.cells[7].textContent);
				gdB = parseInt(b.cells[7].textContent);
				if ( gdA !== gdB ) {
					return gdB - gdA;
				} else {
					// GD
				fA = parseInt(a.cells[5].getAttribute("data-f"));
				fB = parseInt(b.cells[5].getAttribute("data-f"));
				if ( fA !== fB ) {
					return fB - fA;
				} else {
					console.log("SAME",a.cells[1],a.cells[0].textContent,b.cells[0].textContent);
				}
				}
			}
		});
		rows.forEach(function(row){
			tbody.appendChild(row);
		});
	});
}