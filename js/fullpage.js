(function () {
	'use strict';

	var links = Array.prototype.slice.call(document.querySelectorAll('[data-section-link]'));
	var sections = links.map(function (link) {
		return document.getElementById(link.getAttribute('data-section-link'));
	}).filter(Boolean);

	if (!links.length || !sections.length || !('IntersectionObserver' in window)) return;

	var setActive = function (id) {
		links.forEach(function (link) {
			var active = link.getAttribute('data-section-link') === id;
			link.classList.toggle('active', active);
			if (active) link.setAttribute('aria-current', 'true');
			else link.removeAttribute('aria-current');
		});
	};

	var observer = new IntersectionObserver(function (entries) {
		var visible = entries.filter(function (entry) { return entry.isIntersecting; })
			.sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
		if (visible.length) setActive(visible[0].target.id);
	}, {
		rootMargin: '-22% 0px -48% 0px',
		threshold: [0, 0.15, 0.35, 0.6]
	});

	sections.forEach(function (section) { observer.observe(section); });
	setActive('home-section');
})();
