let outer = document.getElementById('app'),
        wrapper = document.getElementById('wrap'),
        maxWidth  = outer.clientWidth,
        maxHeight = outer.clientHeight;
window.addEventListener("resize", resize);
resize();
function resize(){let scale,
    width = window.innerWidth,
  height = window.innerHeight,
  isMax = width >= maxWidth && height >= maxHeight;

    scale = Math.min(width/maxWidth, height/maxHeight);
    outer.style.transform = isMax?'':'scale(' + scale + ')';
    wrapper.style.width = isMax?'':maxWidth * scale;
    wrapper.style.height = isMax?'':maxHeight * scale;
}

const animated = document.querySelector(".ball");

animated.addEventListener("transitionend", () => {
    $('.ball .dust').addClass('show');
    $('.blitzball-map').addClass('anim-land');
    setTimeout(function(){
        $('.ball .dust').removeClass('show');
        $('.ball .graphic').removeClass('anim-land');
        $('.blitzball-map').removeClass('anim-land');
    },1400)
});




//old

let statCount = 0;
let lamp;
let statistic;

function EnableLamp(el) {
    el.removeClass('off');
    el.find('*').removeClass('off');
    console.log("a");
}

function AddStat(el,group) {
    let name = el.attr('name');
    let subname = el.attr('subname');
    let max = el.attr('max');
    let amount = el.attr('amount');
    let amount2 = el.attr('amount2');
    let format = el.attr('format');
    let amount1name = el.attr('amount1name');
    let amount2name = el.attr('amount2name');
    let s = statistic.clone();
    s.find('.name').html(name);
    if(subname != undefined) {
        s.find('.subname').html(subname);
    }
    if (format == "double") {
        s.find('.double-names .subname-1').html(amount1name);
        s.find('.double-names .subname-2').html(amount2name);
    }
    for (let index = 0; index < max; index++) {
        let l = lamp.clone();
        if (format == "double") {
            let l1 = lamp.clone();
            let l2 = lamp.clone();
            if (index < amount) {
                l1.addClass('green');
                setTimeout(EnableLamp,((statCount*4)+index)*40,l1);
            }
            if (index < amount2) {
                l2.addClass('green');
                setTimeout(EnableLamp,((4+statCount*4)+index)*40,l2);
            }
            l.append(l1);
            l.append(l2);
        } else {
            //s.find('.title').removeClass("col-3").addClass("col-4");
            s.find(".double-names").remove();
            if (index < amount) {
                l.addClass('green');
            }
            setTimeout(EnableLamp,((statCount*4)+index)*40,l);
        }
        s.find('.slots').append(l);
        
    }
    statCount++;
    group.append(s);
}

function Generate() {
    $('data>stats>group').each(function(){
        let groupName = $(this).attr('name');
        let group = $('.statistics-panel').append(`<h3>${groupName}</h3>`);
        $(this).find('stat').each(function(){
            AddStat($(this),group);
        });
    });
}

$( document ).ready(function() {
    lamp = $('elements>.lamp>lamp');
    console.log(lamp);
    statistic = $('elements>.statistic');
    Generate();

    $('.dropdown-name button').click(function(){
        var string = $(this).html();
        $('.btn-name').html(string);
    });

    $('.row.collapse').on('show.bs.collapse', function () {
        $(this).find("video").each(function(){
            $(this).get(0).play(); 
        });
    });
    $('.row.collapse').on('shown.bs.collapse', function () {
        //pause all still hidden
        $('.row.collapse:not(.show) video').each(function(){
            $(this).get(0).pause(); 
        }); 
    });
    $('.row.collapse').on('hidden.bs.collapse', function () {
        $(this).find("video").each(function(){
            $(this).get(0).pause(); 
        }); 
    });

    //play all shown
    $('.row.collapse.show video').each(function(){
        $(this).get(0).play(); 
    }); 
    //pause all hidden
    $('.row.collapse:not(.show) video').each(function(){
        $(this).get(0).pause(); 
    }); 

    $('.sectionPlayToggle').change(function() {
        if ($(this).prop('checked')) {
            $('video.'+$(this).attr('target')).each(function(){
                $(this).get(0).play();
            });
        } else {
            $('video.'+$(this).attr('target')).each(function(){
                $(this).get(0).pause();
            });
        }
    });
    $('.sectionVideoRestart').click(function() {
        $('video.'+$(this).attr('target')).each(function(){
            $(this).get(0).currentTime=0;
            $(this).get(0).play();
        });
    });
});