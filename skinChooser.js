$( document ).ready(function() {

	packButtonElement = $('elements>packButton>div');
	skinButtonElement = $('elements>skinButton>div');
	skinButtonRowElement = $('elements>skinButtonRow>div');
	console.log(skinButtonRowElement);
	zoom = '6';
	zooms = {
		'2':'col-6',
		'3':'col-4',
		'4':'col-3',
		'6':'col-2',
	}

	skins = [];
	skinGroups = {};
	skinGroupNames = [];

	packIds = [];
	packs = {};
	currentPack = undefined; //currently chosen pack
	currentGroupAttribute = undefined; 
	//collect packs data
	$('packs>pack').each(function(){
		var pack = {};
		pack.id = $(this).attr("packid"); 
		pack.name = $(this).attr("name");
		pack.imageSrc = $(this).attr("image");
		pack.defaultAttribute = $(this).attr("defaultAttribute");
		//get pack skins
		pack.skins = [];
		$(this).find('skinPath').each(function(){
			//figure out file stuff
			fileSrc = $(this).attr('fileSrc');
			fileExt = $(this).attr('fileExt');
			fileExtVideo = $(this).attr('fileExtVideo');
			thumbSrc = $(this).attr('thumbSrc');
			thumbExt = $(this).attr('thumbExt');
			thumbExtVideo = $(this).attr('thumbExtVideo');
			if (thumbSrc == undefined) { thumbSrc = fileSrc;}
			if (thumbExt == undefined) { thumbExt = fileExt;}
			if (thumbExtVideo == undefined) { thumbExtVideo = fileExtVideo;}
			//get attributes
			pathCategory = $(this).attr('category');
			pathBlock = $(this).attr('block');
			pathColor = $(this).attr('color');
			pathDirection = $(this).attr('direction');
			pathPlatform = $(this).attr('platform');
			pathEnvironment = $(this).attr('environment');
			console.log(pathBlock);
			$(this).find('skin').each(function(){
				var skin = {}
				skin.file = $(this).attr('file');
				skin.name = skin.file;
				skin.type = $(this).attr('type');
				if (skin.type === 'video') {
					skin.src = fileSrc + skin.file + fileExtVideo;
					skin.thumbSrc = thumbSrc + skin.file + thumbExtVideo;
				} else {
					skin.src = fileSrc + skin.file + fileExt;
					skin.thumbSrc = thumbSrc + skin.file + thumbExt;
				}
				
				//inherit attributes
				skin.category = pathCategory;
				skin.block = pathBlock;
				skin.color = pathColor;
				skin.direction = pathDirection;
				skin.platform = pathPlatform;
				skin.environment = pathEnvironment;
				
				if ($(this).attr('category') != undefined) { skin.category = $(this).attr('category'); }
				if ($(this).attr('block') != undefined) { skin.block = $(this).attr('block'); }
				if ($(this).attr('color') != undefined) { skin.color = $(this).attr('color'); }
				if ($(this).attr('direction') != undefined) { skin.direction = $(this).attr('direction'); }
				if ($(this).attr('platform') != undefined) { skin.platform = $(this).attr('platform'); }
				if ($(this).attr('environment') != undefined) { skin.environment = $(this).attr('environment'); }
				//finish
				pack.skins.push(skin);
			});
		});

		packs[pack.id] = pack;
		packIds.push(pack.id);
	});
	console.log(packs);

	//display pack buttons
	packIds.forEach(packId => {
		pack = packs[packId];
		element = packButtonElement.clone();
		element.find("button.packSelectButton").attr("packid",pack.id);
		element.find(".label").html(pack.name);
		element.find(".icon img").attr('src',pack.imageSrc);
		$('.packButtons .buttonContainer').append(element);
	});

    selectPack = function(packid) {
		//change button classes
		$("button.packSelectButton").removeClass('selected');
		$(`button.packSelectButton[packid="${packid}"]`).addClass('selected');

		console.log(packid);
		pack = packs[packid];
		currentPack = pack;

		$(".packTitle").html(pack.name);

		groupBy(pack.defaultAttribute);

		makeButtons();

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

	groupBy = function(attribute) {
		currentGroupAttribute = attribute;

		skinGroups = {}
		skinGroupNames = []

		pack.skins.forEach(skin => {
			//make group if necessary
			if (!(skin[attribute] in skinGroups)) {
				skinGroups[skin[attribute]] = []
				skinGroupNames.push(skin[attribute]);
			}
			skinGroups[skin[attribute]].push(skin);
		});

		console.log(skinGroups);
		console.log(skinGroupNames);
	}

	makeButtons = function() {
		//clear the content area
		$('.skinButtons .content').html("");
		//make skin buttons
		skinGroupNames.forEach(skinGroupName => {
			element = skinButtonRowElement.clone();
			element.find(".rowTitle").html(skinGroupName);			
			

			skinGroups[skinGroupName].forEach(skin => {
				//make individual skin buttons
				
				element2 = skinButtonElement.clone();
				//set zoom
				element2.attr("class",zooms[zoom] + " text-center");
				element2.find(".skinName").html(skin.name);			
				element2.find(".skinButton").attr("src",`http://mariejuku.github.io/${skin.src}`);

				if (skin.type === "video") {
					element2.find(".skinButton .video").removeClass('hidden');
					element2.find(".skinButton video").attr("src",skin.src);
				} else {
					element2.find(".skinButton .image").removeClass('hidden');
					element2.find(".skinButton img").attr("src",skin.thumbSrc);
				}

				element.find('.rowContent').append(element2);
				
			});
			$('.skinButtons .content').append(element);
		});
		//apply hooks to buttons
		$("button.skinButton").click(function(){
			copyTextToClipboard($(this).attr('src'));
	
			$("button.skinButton").each(function(){
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
	}

    // //generate available packs
    // $("skinChooserData > pack").each(function() {
	// 	$("skinChooser packs").append(`<button type="button" class="btn packSelectButton" packid="${$(this).attr("packid")}"><div class="icon"><img src="${$(this).attr("img")}" height="44"/></div><div class="label">${$(this).attr("name")}</div></button>`)
    // });

    // //complete initial loading
    // $("skinChooser > .loader").addClass("hidden");
    // $("skinChooser > .main").removeClass("hidden");

	setZoom = function(zoomValue) {
		zoom = zoomValue;
		$(".skinButtons .rowContent>div").attr("class",zooms[zoom] + " text-center");
    }

	
	//apply hooks to buttons (global)
	$("button.packSelectButton").click(function(){
		selectPack($(this).attr("packid"));
	});
	
	$("button.zoomButton").click(function(){
		setZoom($(this).attr("zoom"));
	});

	currentPack = selectPack("turbo");

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