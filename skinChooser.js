$( document ).ready(function() {

    // selectPack = function(packid) {
	// 	$("skinChooser .packloader").removeClass("hidden");
    // 	console.log(packid);
	// 	$(".packSelectButton").removeClass("selected");
	// 	$(`.packSelectButton[packid="${packid}"]`).addClass("selected");

	// 	//populate pack
	// 	$("skinChooser .packTitle").html($(`skinChooserData > pack[packid="${packid}"]`).attr("name"));
	// 	//generate available environments
	// 	$("skinChooser environments").html("");
	// 	//add 'any'
	// 	$("skinChooser environments").append(`<button type="button" class="btn environmentSelectButton" environment="any"><div class="label">All</div></button>`)
		
	// 	$(`skinChooserData > pack[packid="${packid}"] > environment`).each(function() {
	// 		$("skinChooser environments").append(`<button type="button" class="btn environmentSelectButton" environment="${$(this).attr("type")}"><div class="label">${$(this).attr("name")}</div></button>`)
	// 	});
		
		
	// 	//end loading
	// 	$("skinChooser .pack").removeClass("hidden");
	// 	$("skinChooser .packloader").addClass("hidden");
    // }

    // //generate available packs
    // $("skinChooserData > pack").each(function() {
	// 	$("skinChooser packs").append(`<button type="button" class="btn packSelectButton" packid="${$(this).attr("packid")}"><div class="icon"><img src="${$(this).attr("img")}" height="44"/></div><div class="label">${$(this).attr("name")}</div></button>`)
    // });

    // //complete initial loading
    // $("skinChooser > .loader").addClass("hidden");
    // $("skinChooser > .main").removeClass("hidden");

	// //apply hooks
	// $(".packSelectButton").click(function(){
	// 	selectPack($(this).attr("packid"));
	// });

    // //pre-select the first pack
	// selectPack($(".packSelectButton:first-of-type").attr("packid"));
});