(function() {
	var location = window.location.href;

	var dropdownHome = document.getElementById("sql-host");
	var urls = Array.prototype.slice.call(document.getElementsByClassName("sql-menu-item"));
	
	var dropdownSteps = document.getElementById("sql-steps-host");
	var navUrls = Array.prototype.slice.call(document.getElementsByClassName("sql-menutop-item"));

	if(dropdownHome){
		dropdownHome.addEventListener("change", function(){
			if(dropdownHome.value === "azure") {
				urls.forEach(function(url){
					url.href = url.href.replace("/server", "/az");
				})
			} else {
				urls.forEach(function(url){
					url.href = url.href.replace("/az", "/server");
				})
			}
		})

		if(dropdownHome.value === "azure") {
			urls.forEach(function(url){
				url.href = url.href.replace("/server", "/az");
			})
		} else {
			urls.forEach(function(url){
				url.href = url.href.replace("/az", "/server");
			})
		}

	} else if ( dropdownSteps) {
		
		dropdownSteps.addEventListener("change", function(){
			if(dropdownSteps.value === "azure"){
				window.location.replace(location.replace("/server", "/az"));
			} else {
				window.location.replace(location.replace("/az", "/server"));
			}
		})

		if(location.includes("/server")) {
			navUrls.forEach(function(url){
				url.href = url.href.replace("/az", "/server");
			})
		} else if (location.includes("/az")) {
			navUrls.forEach(function(url){
				url.href = url.href.replace("/server", "/az");
			})
		}
	}

  })();
  