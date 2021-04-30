jQuery(document).ready(function ($) {
	//variables
	var hijacking = $('.testing_main').data('hijacking'),  //하이재킹
		animationType = $('.testing_main').data('animation'), // 애니매이션 타입 설정
		delta = 0, // 델타
		scrollThreshold = 5, //
		actual = 1, //
		animating = false; //애니매이팅

	//DOM elements
	var sectionsAvailable = $('.cd-section'), //cd-section 클래서
		verticalNav = $('.cd-vertical-nav'), //cd-vertical 클래스
		prevArrow = verticalNav.find('a.cd-prev'), //내부 a
		nextArrow = verticalNav.find('a.cd-next'); //내부 a


	//check the media query and bind corresponding events
	var MQ = deviceType(),
		bindToggle = false;

	bindEvents(MQ, true);

	$(window).on('resize', function () { //윈도우 크기 변환 할 때 일어나는 작업
		MQ = deviceType();
		bindEvents(MQ, bindToggle);
		if (MQ == 'mobile') bindToggle = true;
		if (MQ == 'desktop') bindToggle = false;
	});

	function bindEvents(MQ, bool) {

		if (MQ == 'desktop' && bool) {  //데스크 탑일 경우
			//bind the animation to the window scroll event, arrows click and keyboard
			if (hijacking == 'on') {
				initHijacking();// OPACITY 0 으로 설정 velocity 설정용
				$(window).on('DOMMouseScroll mousewheel', scrollHijacking); // 스크롤 할 시 하이재킹 스크롤 일어남
				$(window).on("mousewheel", function (event) { console.log(event.originalEvent.wheelDelta, "마우스 휠 테스트"); });
				// $(window).on("DOMMouseScroll", function (event) { console.log(event.originalEvent.detail, "마우스 휠 테스트"); }); 파이어폭스용

			} else {
				scrollAnimation();
				$(window).on('scroll', scrollAnimation);
			}
			prevArrow.on('click', prevSection);//이거 누르면 다음 일 일어남 visible 치우고 안지우고
			nextArrow.on('click', nextSection);//이거 누르면 앞의 일 일어남 visible 치우고 안치우고

			$(document).on('keydown', function (event) {
				if (event.which == '40' && !nextArrow.hasClass('inactive')) {
					event.preventDefault();
					nextSection();
				} else if (event.which == '38' && (!prevArrow.hasClass('inactive') || (prevArrow.hasClass('inactive') && $(window).scrollTop() != sectionsAvailable.eq(0).offset().top))) {
					event.preventDefault();
					prevSection();
				}
			});
			//set navigation arrows visibility
			checkNavigation();
		} else if (MQ == 'mobile') {
			//reset and unbind
			resetSectionStyle();
			$(window).off('DOMMouseScroll mousewheel', scrollHijacking);
			$(window).off('scroll', scrollAnimation);
			prevArrow.off('click', prevSection);
			nextArrow.off('click', nextSection);
			$(document).off('keydown');
		}
	}

	function scrollAnimation() {
		//normal scroll - use requestAnimationFrame (if defined) to optimize performance
		(!window.requestAnimationFrame) ? animateSection() : window.requestAnimationFrame(animateSection);
	}

	function animateSection() {
		var scrollTop = $(window).scrollTop(),
			windowHeight = $(window).height(),
			windowWidth = $(window).width();

		sectionsAvailable.each(function () {
			var actualBlock = $(this),
				offset = scrollTop - actualBlock.offset().top;

			//according to animation type and window scroll, define animation parameters
			var animationValues = setSectionAnimation(offset, windowHeight, animationType);

			transformSection(actualBlock.children('div'), animationValues[0], animationValues[1], animationValues[2], animationValues[3], animationValues[4]);
			(offset >= 0 && offset < windowHeight) ? actualBlock.addClass('visible') : actualBlock.removeClass('visible');
		});

		checkNavigation();
	}

	function transformSection(element, translateY, scaleValue, rotateXValue, opacityValue, boxShadow) {
		//transform sections - normal scroll
		element.velocity({
			translateY: translateY + 'vh',
			scale: scaleValue,
			rotateX: rotateXValue,
			opacity: opacityValue,
			boxShadowBlur: boxShadow + 'px',
			translateZ: 0,
		}, 0);
	}

	function initHijacking() {
		// initialize section style - scrollhijacking
		var visibleSection = sectionsAvailable.filter('.visible'), //visible 찾는다
			topSection = visibleSection.prevAll('.cd-section'), //앞에 있는 모든 section
			bottomSection = visibleSection.nextAll('.cd-section'),// 뒤에 있는 모든 section
			animationParams = selectAnimation(animationType, false), // 애니매이션 타입 정함 false는 스크롤 바 관련
			//return [animationVisible, animationTop, animationBottom, animDuration, easing]; 로테이트의 경우
			//animationTop = 'rotation';
			//easing = 'easeInCubic';
			//animationVisible = 'translateNone',
			//animationTop = 'translateUp',
			//animationBottom = 'translateDown',
			//animDuration = 800;
			animationVisible = animationParams[0], //애니매이션 visible
			animationTop = animationParams[1], // 애니매이션 top (로테는 x)
			animationBottom = animationParams[2]; // 애니매이션 보톰 // 로테는 x

			visibleSection.children('div').velocity(animationVisible, 1, function () {
			visibleSection.css('opacity', 1);
			topSection.css('opacity', 1);
			bottomSection.css('opacity', 1);//visible 섹션 안에 해당 값들 넣는다.
		});
		topSection.children('div').velocity(animationTop, 0);//VEL 설정
		bottomSection.children('div').velocity(animationBottom, 0);//VEL설정
	}

	function scrollHijacking(event) {
		// on mouse scroll - check if animate section
		if (event.originalEvent.detail < 0 || event.originalEvent.wheelDelta > 0) {
			// 스크롤이 내려간다면 델타를 1 낮추고 스크롤이 올라간다면 델타를 1 늘린다.
			delta--;
			(Math.abs(delta) >= scrollThreshold) && prevSection();
		} else {
			delta++;
			(delta >= scrollThreshold) && nextSection();
		}
		return false;
	}

	function prevSection(event) {
		//go to previous section
		typeof event !== 'undefined' && event.preventDefault(); //이벤트가 정해지지 않았으면 바로 취소

		var visibleSection = sectionsAvailable.filter('.visible'), // visible 을 찾고
			middleScroll = (hijacking == 'off' && $(window).scrollTop() != visibleSection.offset().top) ? true : false;//미들스크롤 false
		visibleSection = middleScroll ? visibleSection.next('.cd-section') : visibleSection; //visibleSection

		var animationParams = selectAnimation(animationType, middleScroll, 'prev');
		//return [animationVisible, animationTop, animationBottom, animDuration, easing];
		//var animationVisible = 'translateNone',
		//animationTop = 'translateUp',
		//animDuration = 800;
		//animationTop = 'rotation';
		//easing = 'easeInCubic';

		unbindScroll(visibleSection.prev('.cd-section'), animationParams[3]); //hijecking에서는 의미 없음

		if (!animating && !visibleSection.is(":first-child")) { // 섹션중 처음이 아니고 animating 이 false 면 
			animating = true;// animationg true
			visibleSection.removeClass('visible').children('div').velocity(animationParams[2], animationParams[3], animationParams[4])
				.end().prev('.cd-section').addClass('visible').children('div').velocity(animationParams[0], animationParams[3], animationParams[4], function () {
					animating = false;
					if (hijacking == 'off') $(window).on('scroll', scrollAnimation);
				});//앞의 요소에 visible 추가, 현제 섹션 visible 취소

			actual = actual - 1;
		}

		resetScroll();
	}

	function nextSection(event) {
		//go to next section
		typeof event !== 'undefined' && event.preventDefault();

		var visibleSection = sectionsAvailable.filter('.visible'),
			middleScroll = (hijacking == 'off' && $(window).scrollTop() != visibleSection.offset().top) ? true : false;
			visibleSection = middleScroll ? visibleSection.prev('.cd-section') : visibleSection;

		var animationParams = selectAnimation(animationType, middleScroll, 'next');
		unbindScroll(visibleSection.next('.cd-section'), animationParams[3]);

		if (!animating && !visibleSection.is(":last-of-type")) {
			animating = true;
			visibleSection.removeClass('visible').children('div').velocity(animationParams[1], animationParams[3], animationParams[4])
				.end().next('.cd-section').addClass('visible').children('div').velocity(animationParams[0], animationParams[3], animationParams[4], function () {
					animating = false;
					if (hijacking == 'off') $(window).on('scroll', scrollAnimation);
				});

			actual = actual + 1;
		}
		resetScroll();
	}

	function unbindScroll(section, time) {
		//if clicking on navigation - unbind scroll and animate using custom velocity animation
		if (hijacking == 'off') {
			$(window).off('scroll', scrollAnimation);
			(animationType == 'catch') ? $('body, html').scrollTop(section.offset().top) : section.velocity("scroll", { duration: time });
		}
	}

	function resetScroll() {
		delta = 0;
		checkNavigation();
	}

	function checkNavigation() {
		//update navigation arrows visibility
		(sectionsAvailable.filter('.visible').is(':first-of-type')) ? prevArrow.addClass('inactive') : prevArrow.removeClass('inactive');
		(sectionsAvailable.filter('.visible').is(':last-of-type')) ? nextArrow.addClass('inactive') : nextArrow.removeClass('inactive');
	}

	function resetSectionStyle() {
		//on mobile - remove style applied with jQuery
		sectionsAvailable.children('div').each(function () {
			$(this).attr('style', '');
		});
	}

	function deviceType() {
		//detect if desktop/mobile
		return window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
	}

	function selectAnimation(animationName, middleScroll, direction) {
		// select section animation - scrollhijacking
		var animationVisible = 'translateNone',
			animationTop = 'translateUp',
			animationBottom = 'translateDown',
			easing = 'ease',
			animDuration = 800;

		switch (animationName) {
			case 'scaleDown':
				animationTop = 'scaleDown';
				easing = 'easeInCubic';
				break;
			case 'rotate':
				if (hijacking == 'off') {
					animationTop = 'rotation.scroll';
					animationBottom = 'translateNone';
				} else {
					animationTop = 'rotation';
					easing = 'easeInCubic';
				}
				break;
			case 'gallery':
				animDuration = 1500;
				if (middleScroll) {
					animationTop = 'scaleDown.moveUp.scroll';
					animationVisible = 'scaleUp.moveUp.scroll';
					animationBottom = 'scaleDown.moveDown.scroll';
				} else {
					animationVisible = (direction == 'next') ? 'scaleUp.moveUp' : 'scaleUp.moveDown';
					animationTop = 'scaleDown.moveUp';
					animationBottom = 'scaleDown.moveDown';
				}
				break;
			case 'catch':
				animationVisible = 'translateUp.delay';
				break;
			case 'opacity':
				animDuration = 700;
				animationTop = 'hide.scaleUp';
				animationBottom = 'hide.scaleDown';
				break;
			case 'fixed':
				animationTop = 'translateNone';
				easing = 'easeInCubic';
				break;
			case 'parallax':
				animationTop = 'translateUp.half';
				easing = 'easeInCubic';
				break;
		}

		return [animationVisible, animationTop, animationBottom, animDuration, easing];
		//var animationVisible = 'translateNone',
		//animationTop = 'translateUp',
		//animDuration = 800;
		//animationTop = 'rotation';
		//easing = 'easeInCubic';
	}

	function setSectionAnimation(sectionOffset, windowHeight, animationName) {
		// select section animation - normal scroll
		var scale = 1,
			translateY = 100,
			rotateX = '0deg',
			opacity = 1,
			boxShadowBlur = 0;

		if (sectionOffset >= -windowHeight && sectionOffset <= 0) {
			// section entering the viewport
			translateY = (-sectionOffset) * 100 / windowHeight;

			switch (animationName) {
				case 'scaleDown':
					scale = 1;
					opacity = 1;
					break;
				case 'rotate':
					translateY = 0;
					break;
				case 'gallery':
					if (sectionOffset >= -windowHeight && sectionOffset < -0.9 * windowHeight) {
						scale = -sectionOffset / windowHeight;
						translateY = (-sectionOffset) * 100 / windowHeight;
						boxShadowBlur = 400 * (1 + sectionOffset / windowHeight);
					} else if (sectionOffset >= -0.9 * windowHeight && sectionOffset < -0.1 * windowHeight) {
						scale = 0.9;
						translateY = -(9 / 8) * (sectionOffset + 0.1 * windowHeight) * 100 / windowHeight;
						boxShadowBlur = 40;
					} else {
						scale = 1 + sectionOffset / windowHeight;
						translateY = 0;
						boxShadowBlur = -400 * sectionOffset / windowHeight;
					}
					break;
				case 'catch':
					if (sectionOffset >= -windowHeight && sectionOffset < -0.75 * windowHeight) {
						translateY = 100;
						boxShadowBlur = (1 + sectionOffset / windowHeight) * 160;
					} else {
						translateY = -(10 / 7.5) * sectionOffset * 100 / windowHeight;
						boxShadowBlur = -160 * sectionOffset / (3 * windowHeight);
					}
					break;
				case 'opacity':
					translateY = 0;
					scale = (sectionOffset + 5 * windowHeight) * 0.2 / windowHeight;
					opacity = (sectionOffset + windowHeight) / windowHeight;
					break;
			}

		} else if (sectionOffset > 0 && sectionOffset <= windowHeight) {
			//section leaving the viewport - still has the '.visible' class
			translateY = (-sectionOffset) * 100 / windowHeight;

			switch (animationName) {
				case 'scaleDown':
					scale = (1 - (sectionOffset * 0.3 / windowHeight)).toFixed(5);
					opacity = (1 - (sectionOffset / windowHeight)).toFixed(5);
					translateY = 0;
					boxShadowBlur = 40 * (sectionOffset / windowHeight);

					break;
				case 'rotate':
					opacity = (1 - (sectionOffset / windowHeight)).toFixed(5);
					rotateX = sectionOffset * 90 / windowHeight + 'deg';
					translateY = 0;
					break;
				case 'gallery':
					if (sectionOffset >= 0 && sectionOffset < 0.1 * windowHeight) {
						scale = (windowHeight - sectionOffset) / windowHeight;
						translateY = - (sectionOffset / windowHeight) * 100;
						boxShadowBlur = 400 * sectionOffset / windowHeight;
					} else if (sectionOffset >= 0.1 * windowHeight && sectionOffset < 0.9 * windowHeight) {
						scale = 0.9;
						translateY = -(9 / 8) * (sectionOffset - 0.1 * windowHeight / 9) * 100 / windowHeight;
						boxShadowBlur = 40;
					} else {
						scale = sectionOffset / windowHeight;
						translateY = -100;
						boxShadowBlur = 400 * (1 - sectionOffset / windowHeight);
					}
					break;
				case 'catch':
					if (sectionOffset >= 0 && sectionOffset < windowHeight / 2) {
						boxShadowBlur = sectionOffset * 80 / windowHeight;
					} else {
						boxShadowBlur = 80 * (1 - sectionOffset / windowHeight);
					}
					break;
				case 'opacity':
					translateY = 0;
					scale = (sectionOffset + 5 * windowHeight) * 0.2 / windowHeight;
					opacity = (windowHeight - sectionOffset) / windowHeight;
					break;
				case 'fixed':
					translateY = 0;
					break;
				case 'parallax':
					translateY = (-sectionOffset) * 50 / windowHeight;
					break;

			}

		} else if (sectionOffset < -windowHeight) {
			//section not yet visible
			translateY = 100;

			switch (animationName) {
				case 'scaleDown':
					scale = 1;
					opacity = 1;
					break;
				case 'gallery':
					scale = 1;
					break;
				case 'opacity':
					translateY = 0;
					scale = 0.8;
					opacity = 0;
					break;
			}

		} else {
			//section not visible anymore
			translateY = -100;

			switch (animationName) {
				case 'scaleDown':
					scale = 0;
					opacity = 0.7;
					translateY = 0;
					break;
				case 'rotate':
					translateY = 0;
					rotateX = '90deg';
					break;
				case 'gallery':
					scale = 1;
					break;
				case 'opacity':
					translateY = 0;
					scale = 1.2;
					opacity = 0;
					break;
				case 'fixed':
					translateY = 0;
					break;
				case 'parallax':
					translateY = -50;
					break;
			}
		}

		return [translateY, scale, rotateX, opacity, boxShadowBlur];
	}
});





























/* Custom effects registration - feature available in the Velocity UI pack */
//none
$.Velocity
	.RegisterEffect("translateUp", {
		defaultDuration: 1,
		calls: [
			[{ translateY: '-100%' }, 1]
		]
	});
$.Velocity
	.RegisterEffect("translateDown", {
		defaultDuration: 1,
		calls: [
			[{ translateY: '100%' }, 1]
		]
	});
$.Velocity
	.RegisterEffect("translateNone", {
		defaultDuration: 1,
		calls: [
			[{ translateY: '0', opacity: '1', scale: '1', rotateX: '0', boxShadowBlur: '0' }, 1]
		]
	});

//scale down
$.Velocity
	.RegisterEffect("scaleDown", {
		defaultDuration: 1,
		calls: [
			[{ opacity: '0', scale: '0.7', boxShadowBlur: '40px' }, 1]
		]
	});
//rotation
$.Velocity
	.RegisterEffect("rotation", {
		defaultDuration: 1,
		calls: [
			[{ opacity: '0', rotateX: '90', translateY: '-100%' }, 1]
		]
	});
$.Velocity
	.RegisterEffect("rotation.scroll", {
		defaultDuration: 1,
		calls: [
			[{ opacity: '0', rotateX: '90', translateY: '0' }, 1]
		]
	});
//gallery
$.Velocity
	.RegisterEffect("scaleDown.moveUp", {
		defaultDuration: 1,
		calls: [
			[{ translateY: '-10%', scale: '0.9', boxShadowBlur: '40px' }, 0.20],
			[{ translateY: '-100%' }, 0.60],
			[{ translateY: '-100%', scale: '1', boxShadowBlur: '0' }, 0.20]
		]
	});
$.Velocity
	.RegisterEffect("scaleDown.moveUp.scroll", {
		defaultDuration: 1,
		calls: [
			[{ translateY: '-100%', scale: '0.9', boxShadowBlur: '40px' }, 0.60],
			[{ translateY: '-100%', scale: '1', boxShadowBlur: '0' }, 0.40]
		]
	});
$.Velocity
	.RegisterEffect("scaleUp.moveUp", {
		defaultDuration: 1,
		calls: [
			[{ translateY: '90%', scale: '0.9', boxShadowBlur: '40px' }, 0.20],
			[{ translateY: '0%' }, 0.60],
			[{ translateY: '0%', scale: '1', boxShadowBlur: '0' }, 0.20]
		]
	});
$.Velocity
	.RegisterEffect("scaleUp.moveUp.scroll", {
		defaultDuration: 1,
		calls: [
			[{ translateY: '0%', scale: '0.9', boxShadowBlur: '40px' }, 0.60],
			[{ translateY: '0%', scale: '1', boxShadowBlur: '0' }, 0.40]
		]
	});
$.Velocity
	.RegisterEffect("scaleDown.moveDown", {
		defaultDuration: 1,
		calls: [
			[{ translateY: '10%', scale: '0.9', boxShadowBlur: '40px' }, 0.20],
			[{ translateY: '100%' }, 0.60],
			[{ translateY: '100%', scale: '1', boxShadowBlur: '0' }, 0.20]
		]
	});
$.Velocity
	.RegisterEffect("scaleDown.moveDown.scroll", {
		defaultDuration: 1,
		calls: [
			[{ translateY: '100%', scale: '0.9', boxShadowBlur: '40px' }, 0.60],
			[{ translateY: '100%', scale: '1', boxShadowBlur: '0' }, 0.40]
		]
	});
$.Velocity
	.RegisterEffect("scaleUp.moveDown", {
		defaultDuration: 1,
		calls: [
			[{ translateY: '-90%', scale: '0.9', boxShadowBlur: '40px' }, 0.20],
			[{ translateY: '0%' }, 0.60],
			[{ translateY: '0%', scale: '1', boxShadowBlur: '0' }, 0.20]
		]
	});
//catch up
$.Velocity
	.RegisterEffect("translateUp.delay", {
		defaultDuration: 1,
		calls: [
			[{ translateY: '0%' }, 0.8, { delay: 100 }],
		]
	});
//opacity
$.Velocity
	.RegisterEffect("hide.scaleUp", {
		defaultDuration: 1,
		calls: [
			[{ opacity: '0', scale: '1.2' }, 1]
		]
	});
$.Velocity
	.RegisterEffect("hide.scaleDown", {
		defaultDuration: 1,
		calls: [
			[{ opacity: '0', scale: '0.8' }, 1]
		]
	});
//parallax
$.Velocity
	.RegisterEffect("translateUp.half", {
		defaultDuration: 1,
		calls: [
			[{ translateY: '-50%' }, 1]
		]
	});