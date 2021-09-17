$( document ).ready(function() {

	packButtonElement = $('elements>packButton>div');
	packButtonAttributeElement = $('elements>packAttributeButton>div');
	packAttributeButtonOptionElement = $('elements>packAttributeButtonOption>button');
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
	skinDisplayGroups = {};
	skinDisplayGroupNames = [];

	packIds = [];
	packs = {};
	currentPack = undefined; //currently chosen pack
	groupAttribute = undefined; 

	platform = 'tm2';
	environment = 'stadium';
	//collect packs data
	$('packs>pack').each(function(){
		var pack = {};
		pack.id = $(this).attr("packid"); 
		pack.name = $(this).attr("name");
		pack.imageSrc = $(this).attr("image");
		pack.defaultPlatform = $(this).attr("defaultPlatform");
		pack.defaultEnvironment = $(this).attr("defaultEnvironment");
		pack.defaultAttribute = $(this).attr("defaultAttribute");
		pack.showPlatform = $(this).attr("showPlatform") !== undefined;
		pack.showEnvironment = $(this).attr("showEnvironment") !== undefined;

		//get pack attributes
		pack.attributes = {};
		pack.attributesNames = [];

		$(this).find('attributes').children().each(function(){
			attributeName = $(this).prop("tagName").toLowerCase();
			pack.attributesNames.push(attributeName);
			pack.attributes[attributeName] = {
				name: attributeName,
				options: [],
				collapse: false, //if collapse is true, false matches in this attribute get discarded instead of delayed
			};
			$(this).children('*').each(function(){
				pack.attributes[attributeName].options.push($(this).prop("tagName"));
			});
		});

		//set up pack variants
		pack.variantNames = [];
		pack.variants = {};

		$(this).find('variants').children().each(function(){
			variantName = $(this).prop("tagName").toLowerCase();
			pack.variantNames.push(variantName);
			pack.variants[variantName] = {
				name: variantName,
				options: [],
				selected: undefined
			};
		});

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
			pathColour = $(this).attr('colour');
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
				skin.colour = pathColour;
				skin.direction = pathDirection;
				skin.platform = pathPlatform;
				skin.environment = pathEnvironment;
				
				if ($(this).attr('category') != undefined) { skin.category = $(this).attr('category'); }
				if ($(this).attr('block') != undefined) { skin.block = $(this).attr('block'); }
				if ($(this).attr('colour') != undefined) { skin.colour = $(this).attr('colour'); }
				if ($(this).attr('direction') != undefined) { skin.direction = $(this).attr('direction'); }
				if ($(this).attr('platform') != undefined) { skin.platform = $(this).attr('platform'); }
				if ($(this).attr('environment') != undefined) { skin.environment = $(this).attr('environment'); }
				//add skin to pack
				pack.skins.push(skin);

				//update pack variant options
				pack.variantNames.forEach(variantName => {
					
					if (skin[variantName] != undefined) {
						
						//the skin contains a variant
						variantOption = skin[variantName];
						if (pack.variants[variantName].options.indexOf(variantOption) == -1) {
							pack.variants[variantName].options.push(variantOption);
						}
					}
				});
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

	makePackControls = function(packId) {
		//clear the content area
		$('.packControls .buttonContainer').html("");
		pack = packs[packId];
		attributesNames = pack.attributesNames;
		attributes = pack.attributes;
		attributesNames.forEach(attributeName => {
			attribute = attributes[attributeName];
			element = packButtonAttributeElement.clone();
			element.find("button.packAttributeButton").attr("attribute",attributeName);
			element.find(".label").html(attributeName);
			$('.packControls .buttonContainer').append(element);

			//add options
			attribute.options.forEach(option => {
				element2 = packAttributeButtonOptionElement.clone();
				element2.html(option);
				element2.attr('attribute',attributeName);
				element2.attr('option',option);
				$(`.packAttributeButton[attribute="${attributeName}"]`).parent('.dropdown').children('.dropdown-menu').append(element2);
			});
		});
		//hook controls
		$("button.packAttributeButtonOption").click(function(){
			console.log($(this).attr('attribute'),$(this).attr('option'));
			selectPackAttribute($(this).attr('attribute'),$(this).attr('option'));
		});
	}

	selectPackPlatform = function(platformName) {
		platform = platformName;
		$("button.platformButton").removeClass('selected');
		$(`button.platformButton[platform="${platformName}"]`).addClass('selected');
		if (platformName === '2020') {
			selectPackEnvironment('stadium2020');
			$(".environmentControls").addClass('hidden');
		} else {
			selectPackEnvironment(pack.defaultEnvironment);
			$(".environmentControls").addClass('hidden');
			if (pack.showEnvironment) { $(".environmentControls").removeClass('hidden');}
		}
	}

	selectPackEnvironment = function(environmentName) {
		environment = environmentName;
		$("button.environmentButton").removeClass('selected');
		$(`button.environmentButton[environment="${environmentName}"]`).addClass('selected');
		
	}

	// selectPackVariant = function(variantName,optionName) {
	// 	pack = currentPack;
	// 	//choose option
	// 	pack.variants[variantName].selected = optionName;

	// 	//update button look
	// 	labelName = variantName.toLowerCase();
	// 	labelName = labelName[0].toUpperCase() + labelName.slice(1).toLowerCase();
	// 	labelOption = optionName.toLowerCase();
	// 	labelOption = labelOption[0].toUpperCase() + labelOption.slice(1).toLowerCase();
	// 	$(`button.packAttributeButton[attribute="${variantName}"] .label`).html(`${labelName}: ${labelOption}`);
	// }

	// selectPackAttribute = function(attributeName,optionName) {
	// 	pack = currentPack;
	// 	//choose option
	// 	pack.attributes[attributeName].selected = optionName;

	// 	//update button look
	// 	labelName = attributeName.toLowerCase();
	// 	labelName = labelName[0].toUpperCase() + labelName.slice(1).toLowerCase();
	// 	labelOption = optionName.toLowerCase();
	// 	labelOption = labelOption[0].toUpperCase() + labelOption.slice(1).toLowerCase();
	// 	$(`button.packAttributeButton[attribute="${attributeName}"] .label`).html(`${labelName}: ${labelOption}`);
	// }

    selectPack = function(packid) {
		//change button classes
		$("button.packSelectButton").removeClass('selected');
		$(`button.packSelectButton[packid="${packid}"]`).addClass('selected');

		console.log(packid);
		pack = packs[packid];
		currentPack = pack;

		groupAttribute = pack.defaultAttribute;

		$(".packTitle").html(pack.name);

		$(".platformControls").addClass('hidden');
		$(".environmentControls").addClass('hidden');

		if (pack.showPlatform) { $(".platformControls").removeClass('hidden');}

		
		selectPackPlatform(pack.defaultPlatform);
		

		makePackControls(packid);

		pack.variantNames.forEach(variantName => {
			variant = pack.variants[variantName];
			selectPackVariant(variantName,variant.options[0]);	
		});

		displaySkins();
    }

	displaySkins = function() {
		console.log(currentPack);
		skins = skinsPlatformFilter(currentPack.skins);
		if (platform !== '2020') {
			skins = skinsEnvironmentFilter(skins);
		}

		makeDisplayGroups(skins,groupAttribute);

		makeButtons();		
	}

	skinsPlatformFilter = function(skins) {
		newSkins = [];
		skins.forEach(skin => {
			if (skin.platform === platform) {
				newSkins.push(skin);
			}
		});
		return newSkins;
	}

	skinsEnvironmentFilter = function(skins) {
		newSkins = [];
		skins.forEach(skin => {
			if (skin.environment === environment) {
				newSkins.push(skin);
			}
		});
		return newSkins;
	}

	makeDisplayGroups = function(skins,attribute) {
		currentGroupAttribute = attribute;

		skinDisplayGroups = {}
		skinDisplayGroupNames = []
		itemCount = 0;

		skins.forEach(skin => {
			//make group if necessary
			if (!(skin[attribute] in skinDisplayGroups)) {
				skinDisplayGroups[skin[attribute]] = []
				skinDisplayGroupNames.push(skin[attribute]);
			}
			skinDisplayGroups[skin[attribute]].push(skin);
			itemCount++;
		});
		$('.packDetails .itemCount').html(`${itemCount} / ${currentPack.skins.length} items`);
		console.log(skinDisplayGroups);
		console.log(skinDisplayGroupNames);
	}

	makeButtons = function() {
		//clear the content area
		$('.skinButtons .content').html("");
		//fail to
		if (skinDisplayGroupNames.length === 0) {
			$('.skinButtons .content').html(`<div class="col"><h3 class="stretchX">No items found with these filters.</h3></div>`);
			return;
		}
		//make skin buttons
		skinDisplayGroupNames.forEach(skinDisplayGroupName => {
			element = skinButtonRowElement.clone();
			element.find(".rowTitle").html(skinDisplayGroupName);			
			
			skinDisplayGroups[skinDisplayGroupName].forEach(skin => {
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

	setZoom = function(zoomValue) {
		zoom = zoomValue;
		$(".skinButtons .rowContent>div").attr("class",zooms[zoom] + " text-center");
    }
	
	//apply hooks to buttons (global)
	$("button.platformButton").click(function(){
		selectPackPlatform($(this).attr("platform"));
		displaySkins();
	});

	$("button.environmentButton").click(function(){
		selectPackEnvironment($(this).attr("environment"));
		displaySkins();
	});

	$("button.packSelectButton").click(function(){
		selectPack($(this).attr("packid"));
	});
	
	$("button.zoomButton").click(function(){
		setZoom($(this).attr("zoom"));
	});

	selectPack("modern");

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