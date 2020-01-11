// EL ARGUMENTO DATA SE CONSTRUYE VIENDO 
// LA DOCUMENTACION EN EL MOTOR.

// Formación de parámetros:
// id_in_app=[String] sería {id_in_app:"String"}
// properties[property_tag] = [String] sería {property:{property_tag: "String"}}
// tags="a,b,c,d" sería {tags: ["a","b","c","d"]}

// Después de hacer LogIn, el id_in_app del jugador se
// puede acceder con window.engine.getUser()

//Para ingresar al motor:
// email: dev@devtest.com
// pass: devtest1
// Ver documentación en el menú "Docs".
// Solo necesita revisar los submenus: Players / Agents / Missions

window.engine = {
	api_token: "f011c5c672388270be56ee71720e1bba",
	base_url: 'https://engine.playngage.io/api/',
	test: false,
	debug: false,
	expDays: 3,
	log: function(a){if(this.debug){console.log(a)}},
	setDebug: function(){this.debug =true},
	logIn: function(cvalue){let d = new Date();d.setTime(d.getTime() + (this.expDays * 24 * 60 * 60 * 1000));const expires = "expires="+d.toUTCString();document.cookie = "iia=" + cvalue + ";" + expires + ";path=/";},
	getUser() {var ca = document.cookie.split(';');for(var i = 0; i < ca.length; i++){var c = ca[i]; while (c.charAt(0) == ' ') {c = c.substring(1);}; if (c.indexOf("iia=") == 0) {return c.split("=")[1];}}; return false;},
	logOut: function(){document.cookie = "iia=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"},
	setParams: function(data, get){var formData = get ? {} : new FormData();this.log("Params");this.log(data);var checkNested = function(fD, key, value){function ins(k,v){get ? fD[k] = v : fD.append(k,v)}if(typeof value != "object"){ins(key, value)} else {if(Array.isArray(value)){var v = value.join(",");ins(key, v) } else {for (var obj in value) {var k = key + "[" + obj + "]";checkNested(fD, k, value[obj]);}}}};for (var obj in data) {var key = obj;checkNested(formData, key, data[obj])};return formData;},
	setCall: function(data, defaults){if(data === undefined || data === null){data = {}};defaults = defaults || {};for (var key in defaults){data[key] = defaults[key]};},
	

	// INIT ENDPOINT CALLS
	postPlayer: function(id_in_app, data, listener){this.setCall(data = data || {}, {id_in_app: id_in_app});this.call("POST", "players/v2", this.setParams(data), listener)},
	getPlayer: function(id_in_app, listener, data){
		this.setCall(data = data || {}, {include: "items,basic,agent"});
		this.call("GET", "players/" + id_in_app, this.setParams(data, true),listener)},
	updateAgent:function(agent_id, agent_type, listener, data){
		this.setCall(data = data || {});
		this.call("PUT", "agents/"+agent_id+"/agent_type/"+agent_type, this.setParams(data), listener)
	},
	completeMission: function(id_in_app, id_or_tag, listener, data){
		this.setCall(data = data || {}, {id_in_app:id_in_app});
		this.call("POST", "missions/"+id_or_tag+"/complete", this.setParams(data), listener)
	},
	
	// Llama el motor
	call: function(method, service, formData, listener){
		var token = this.test ? this.test_api_token : this.api_token;
		var url = this.test ? this.test_url : this.base_url;
		//Set Headers
		var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Authorization", "Token token=" + token);
		var miInit = { method: method,headers: myHeaders,mode: 'cors',cache: 'default' };
      //Include formData in body if post or put
      if(formData && (method === "POST" || method === "PUT")){miInit.body = formData;}
      //Call
      function middlewareListener(data){window.engine.log("Returned from " + service);window.engine.log(data);
      if(listener != null && listener !== undefined){listener(data)}else{window.engine.log("No Listener")}}
      var built = new URL(url + service)
      if(method=="GET"){Object.keys(formData).forEach(key => built.searchParams.append(key, formData[key]))}
      this.log(built)
      fetch(built, miInit)
			.then(response => response.json()).then(function(data) {middlewareListener(data)});
	}
}

