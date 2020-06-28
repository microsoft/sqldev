(function() {
	var location = window.location.href;
	var button = document.getElementsByClassName("sql-switch")[0];
	var urls = Array.prototype.slice.call(document.getElementsByClassName("sql-menutop-item"));

	if(button){
		button.addEventListener("click", function(){
			console.log(window.location.href);
			if(window.location.href.includes("/server")){
				window.location.replace(window.location.href.replace("/server", "/az"));
			} else {
				window.location.replace(window.location.href.replace("/az", "/server"));
			}
		})
	}

	if(location.includes("/server")) {
		urls.forEach(function(url){
			url.href = url.href.replace("/az", "/server");
		})
	} else if (location.includes("/az")) {
		urls.forEach(function(url){
			url.href = url.href.replace("/server", "/az");
		})
	}

  })();
  