$( document ).ready(function() {

	//consolidate skinItems
	$('packData').find('skinPath').each(function(){
		path = $(this).attr("src");
		$(this).children("skinItem").each(function(){
			file = $(this).attr("file");
			$(this).attr("src",`${path}${file}`);
			$(this).attr("name",`${file.split('.')[0]}`);
		});
	});

	skinButtonHTML = $("skinChooserData .skinButtonContainer")[0].outerHTML;

	spawnButton = function(skinItemElement) {
		skinItemElement.append(skinButtonHTML);
		src = skinItemElement.attr("src");
		name = skinItemElement.attr("name");
		skinItemElement.find(".skinButton").attr("src",`http://mariejuku.github.io/${src}`);
		skinItemElement.find(".skinButton img").attr("src",src);
		skinItemElement.find(".skinButton video").attr("src",src);
		skinItemElement.find(".skinButton .skinName").html(name);
		type = skinItemElement.attr("type");
		if (type === "video") {
			skinItemElement.find(".skinButton .video").removeClass('hidden');
		} else {
			skinItemElement.find(".skinButton .image").removeClass('hidden');
		}
		return skinItemElement.children(".skinButtonContainer");
	}

    selectPack = function(packid) {
		console.log(packid);

		$(".packTitle").html($(`.packSelectButton[packid="${packid}"]`).find(".label").html());
		packData = $(`packData[packid="${packid}"]`);
		//make category rows
		packData.find('category').each(function(){
			category = $(this).html();
			$('packDisplay').append(`<category categoryid="${category}"><div class="buttonRow row no-gutters"></div></category>`);
			$(`packData[packid="${packid}"] skinItem[category="${category}"]`).each(function(){
				spawnButton($(this)).appendTo($(`packDisplay category[categoryid="${category}"] .buttonRow`));
			});
		});
		// $("skinChooser .packloader").removeClass("hidden");
    	
		// $(".packSelectButton").removeClass("selected");
		// $(`.packSelectButton[packid="${packid}"]`).addClass("selected");

		// //populate pack
		// $("skinChooser .packTitle").html($(`skinChooserData > pack[packid="${packid}"]`).attr("name"));
		// //generate available environments
		// $("skinChooser environments").html("");
		// //add 'any'
		// $("skinChooser environments").append(`<button type="button" class="btn environmentSelectButton" environment="any"><div class="label">All</div></button>`)
		
		// $(`skinChooserData > pack[packid="${packid}"] > environment`).each(function() {
		// 	$("skinChooser environments").append(`<button type="button" class="btn environmentSelectButton" environment="${$(this).attr("type")}"><div class="label">${$(this).attr("name")}</div></button>`)
		// });
		
		
		// //end loading
		// $("skinChooser .pack").removeClass("hidden");
		// $("skinChooser .packloader").addClass("hidden");
    }

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
	//selectPack($(".packSelectButton:first-of-type").attr("packid"));
	

	
	console.log(skinButtonHTML);
	//spawn packs
	$("packData").each(function(){
		packid = $(this).attr("packid");
		$("buttons").append(`<pack packid="${packid}"></pack>`);
		//spawn buttons
		
	});
	
	//apply hooks to buttons
	$(".skinButton").click(function(){
		copyTextToClipboard($(this).attr('src'));

		$(".skinButton").each(function(){
			$(this).find('.copyText').addClass("hidden");
			$(this).find('.skinName').removeClass("hidden");
		});
		$(this).find('.skinName').addClass("hidden");
		$(this).find('.copyText').removeClass("hidden");
		var unhide = function(el){
			el.find('.copyText').addClass("hidden");
			el.find('.skinName').removeClass("hidden");
		};
		setTimeout(unhide,1000,$(this));
	});
	$(".packSelectButton").click(function(){
		
	});

	selectPack("vtt");

	

	function copyTextToClipboard(text) {
		var textArea = document.createElement("textarea");

		textArea.style.position = 'fixed';textArea.style.top = 0;textArea.style.left = 0;
		textArea.style.width = '2em';textArea.style.height = '2em';
		textArea.style.padding = 0;
		textArea.style.border = 'none';textArea.style.outline = 'none';textArea.style.boxShadow = 'none';
		textArea.style.background = 'transparent';
		
		textArea.value = text;
		
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		
		try { document.execCommand('copy'); } catch (err) { console.log('Oops, unable to copy'); }
		
		document.body.removeChild(textArea);
	}
});