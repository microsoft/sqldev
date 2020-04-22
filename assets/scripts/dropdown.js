(function() {
	// var button = document.getElementById("testing");
	var dropdown = document.getElementById("sql-host")
	var urls = Array.prototype.slice.call(document.getElementsByClassName("sql-menu-item"));

	console.log(window.location.href)
	console.log(dropdown)
	// console.log(button)

	// if(button){
	// 	button.addEventListener("click", function(){
	// 		console.log(window.location.href);
	// 		if(window.location.href.includes("/server/")){
	// 			window.location.replace(window.location.href.replace("/server/", "/az/"));
	// 		} else {
	// 			window.location.replace(window.location.href.replace("/az/", "/server/"));
	// 		}
	// 	})
	// }

	if(dropdown){
		dropdown.addEventListener("change", function(){
			if(dropdown.value === "azure") {
				urls.forEach(function(url){
					url.href = url.href.replace("/server", "/az");
				})
			} else {
				urls.forEach(function(url){
					url.href = url.href.replace("/az", "/server");
				})
			}
		})
	}
  })();
  