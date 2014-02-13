
$(function() {
	/*var ngui = require('nw.gui');
	var nwin = ngui.Window.get();
	var fs = require('fs');
	var sys = require('sys');*/
	

	var ta = [];
	$('.panel-body').each(function(index){
		$('a',this).each(function(index) {
			var cla = $('i',this).attr('class');
			var text = cla.replace('fa fa-','');
            ta.push(text);
        });
	});
	$('#icon-search').typeahead({
        minLength: 1,
        local: ta,
		template: [
			'<p style="font-size:16px;"><i class="fa fa-{{value}}"></i> {{value}}</p>'
		].join(''),
		engine: Hogan 
      });
	$('#icon-search').on('typeahead:selected',function(){
		var iconhtml = $('#icon-search').val();
		$('#icon-canvas').html();
		$('#icon-canvas').html('<i class="fa fa-' + iconhtml + '"></i>');
		$('#filename').val(iconhtml);
	});
	
	
	
	
	$('#aside').niceScroll({
		zindex: 9999,
		cursorcolor: '#111',
		cursorborder: '1px solid rgba(255,255,255,0.5)',
		horizrailenabled: false
	});
	
	$('#section').niceScroll({
		zindex: 9999,
		cursorcolor: '#111',
		cursorborder: '1px solid rgba(255,255,255,0.5)'
	});
	
	
	function resizer(){
		$('#aside').css({'height': ( $(window).height()-( $('#header').height()+$('#subheader').height()+$('#footer').height() ) ) + 'px' });
		
		$('#section').css({'height': ( $(window).height()-( $('#header').height()+$('#subheader').height()+$('#footer').height() ) ) + 'px' });
		
		$("#aside").getNiceScroll().resize();
		$("#section").getNiceScroll().resize();
		
		$('#icon-holder').css({'margin-left': -($('#icon-holder').width()/2) + 'px','margin-top': -($('#icon-holder').height()/2) + 'px'})
	}
	
	$(window).on( 'resize', function (){
		resizer();
	});
	
	
	resizer();
	
	
	
	
	$('.dropdown-toggle').dropdown();
	$('#accordion').collapse({
		toggle: false
	});
	$('#accordion').on('shown.bs.collapse', function () {
		$("#aside").getNiceScroll().resize();
	});
	
	$('#background-menu a').each(function(){
		if($(this).hasClass('tt')){
			$(this).tooltip({
				html: true,
				title: '<img src="backgrounds/' + $(this).attr('data-src') + '.jpg">'
			});
		}
		$(this).on('click',function(){
			var preview = $(this).attr('data-src');
			$('#bg-option').html($(this).html());
			if($(this).attr('data-type') == 'image'){
				$('#icon-canvas').css({
					'background-image': 'url(backgrounds/' + preview + '.png)',
					'background-repeat': 'no-repeat',
					'background-position': 'center center'
				});
			}
			if($(this).attr('data-type') == 'pattern'){
				$('#icon-canvas').css({
					'background-image': 'url(backgrounds/' + preview + '.png)',
					'background-repeat': 'repeat',
					'background-position': 'center center'
				});
			}
			if($(this).attr('data-type') == 'none'){
				$('#icon-canvas').css({
					'background-image': 'none'
				});
			}
		});
	});

	

	
	$('#sl-icon-size').slider({
		formater: function(value) {
			$('#icon-holder').css({'font-size': value + 'px'});
			$('#sl-icon-size-val').val(value);
			return value;
		}
	});
	
	$('#sl-icon-size-val').on('change', function(){
		var slIcon = $('#sl-icon-size').slider().data('slider');
		slIcon.setValue( $('#sl-icon-size-val').val() );
		$('#img-render').css({
				'width': value + 'px',
				'height': value + 'px',
			});
	});
	
	$('#sl-shape-size').slider({
		formater: function(value) {
			
			$('#icon-holder').css({
				'line-height': value + 'px',
				'width': value + 'px',
				'height': value + 'px',
				'margin-top': -(value/2) + 'px',
				'margin-left': -(value/2) + 'px'
			});
			var slIcon = $('#sl-icon-size').slider().data('slider')
			if(slIcon.getValue() > value){
				slIcon.setValue(value)
			}
			$('#sl-shape-size-val').val(value);
			
			
			return value;
		}
	});
	
	$('#sl-shape-size-val').on('change', function(){
		var slShape = $('#sl-shape-size').slider().data('slider');
		slShape.setValue( $('#sl-shape-size-val').val() );
		$('#icon-holder').css({
				'width': value + 'px',
				'height': value + 'px',
			});
	});
	
	
	$('#sl-border-size').slider({
		formater: function(value) {
			$('#icon-canvas').css({
				'box-shadow': 'inset 0px 0px 0px ' + value + 'px ' + $('#cp-border-color').val(),
			});
			$('#sl-border-size-val').val(value);
			return value;
		}
	});
	
	$('#sl-border-size-val').on('change', function(){
		var slBorder = $('#sl-border-size').slider().data('slider');
		slBorder.setValue( $('#sl-border-size-val').val() );
		$('#icon-canvas').css({
			boxShadow: 'inset 0px 0px 0px ' + $('#sl-border-size-val').val() +'px ' + $('#cp-border-color').val()
		});
			
	});
	
	
	
	
	$('.panel-body').each(function(){
		$('a', this).each(function(){
			$(this).on('click',function(){
				$('.panel-body a').css({opacity:1});
				$(this).css({opacity:0.5});
				var iconhtml = $('i',this).attr('class');
				$('#icon-canvas').html();
				$('#icon-canvas').html('<i class="' + iconhtml + '"></i>');
				$('#filename').val(iconhtml.replace('fa fa-',''));
			});
		});
	});
	
	
	$('#cp-icon-color').colorpicker().on('changeColor', function(ev){
		$('#icon-canvas').css({'color':'rgba(' + ev.color.toRGB()['r'] + ',' + ev.color.toRGB()['g'] + ',' + ev.color.toRGB()['b'] + ',' + ev.color.toRGB()['a'] + ')'});
		$('#cp-icon-color-preview').css({'backgroundColor':'rgba(' + ev.color.toRGB()['r'] + ',' + ev.color.toRGB()['g'] + ',' + ev.color.toRGB()['b'] + ',' + ev.color.toRGB()['a'] + ')'});
		$('#cp-icon-color-preview').parent('.pattern-holder').css({
			'border-color':'rgba(' + ev.color.toRGB()['r'] + ',' + ev.color.toRGB()['g'] + ',' + ev.color.toRGB()['b'] + ',' + ev.color.toRGB()['a'] + ')'
		});
	});
	
	$('#cp-shape-color').colorpicker().on('changeColor', function(ev){
		$('#icon-canvas').css({'backgroundColor':'rgba(' + ev.color.toRGB()['r'] + ',' + ev.color.toRGB()['g'] + ',' + ev.color.toRGB()['b'] + ',' + ev.color.toRGB()['a'] + ')'});
		$('#cp-shape-color-preview').css({'backgroundColor':'rgba(' + ev.color.toRGB()['r'] + ',' + ev.color.toRGB()['g'] + ',' + ev.color.toRGB()['b'] + ',' + ev.color.toRGB()['a'] + ')'});
		$('#cp-shape-color-preview').parent('.pattern-holder').css({
			'border-color':'rgba(' + ev.color.toRGB()['r'] + ',' + ev.color.toRGB()['g'] + ',' + ev.color.toRGB()['b'] + ',' + ev.color.toRGB()['a'] + ')'
		});
	});
	

	
	
	$('#sl-icon-rotate').slider({
		value: 0,
		formater: function(value) {
			$('#icon-holder i').removeClass("fa-rotate-0 fa-rotate-90 fa-rotate-180 fa-rotate-270")
			$('#icon-holder i').addClass('fa-rotate-' + value);
			$('#sl-icon-rotate-val').val(value + '°')
			return value;
		}
	});
	

	
	var buildFile = function(name, value) {
        var img = new Buffer(value, 'base64');
        fs.writeFile(name, img, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });
    }
	
	$('#save-icon').on('click',function(){
		

		html2canvas($('#icon-canvas'), {
          onrendered: function(canvas) {
			 
			  
			  canvas.toBlob(function(blob) {
				saveAs(
					  blob
					, ($("#filename").val() || $("#filename").attr('placeholder')) + ".png"
				);
			}, "image/png");
			  
			  
			
			  
          }
        });
	
	});
	
	function chooseFile(name) {
    var chooser = $(name);
		chooser.change(function(evt) {
		  console.log($(this).val());
		});
	
		chooser.trigger('click');  
	  }
	function query_for_save_path(cb) {
      $('#save-img-box input').one('change', function (event) {
        cb($(this).val());
      });
    }
	
	
	
	//$('#menu-info').modal();
	
	
	$('#maximize').on('click',function(){
		if($(this).hasClass('4restore')){
			nwin.unmaximize();
			$(this).removeClass('4restore');
		}else{
			$(this).addClass('4restore');
			nwin.maximize();
		}
	});
	$('#minimize').on('click',function(){
		nwin.minimize()();
	});
	$('#menu-close, #closer').on('click',function(){
		nwin.close();
	});
	
	
	
	
	
	
	
	
	
});



