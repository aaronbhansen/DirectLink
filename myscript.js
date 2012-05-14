$(function() {
	var mainStream = 'div.UIIntentionalStream';
	var postSelector = 'div.mainWrapper, div.ogAggregationSubstorySingle > div.storyContent';
	var appName = 'a[data-appname]';
	var mainTitle = 'div.uiAttachmentTitle, div.ogAggregationSubstoryHeadline';
	var newUrl = '.direct-link';
	var url = "http://google.com/search?sourceid=navclient&btnI=1&q={SEARCH};";
	var lastDivCount = 0;
	var delay = 1000;

	var addDirectLink = function() {
		var posts = $(postSelector);
		if (posts.length === lastDivCount) {
			setTimeout(addDirectLink, delay);
			return;
		}

		var apps = $(postSelector).filter(function() {
			if ($(this).find(appName).length === 0) return false;
			if ($(this).find(postSelector).length !== 0) return false;
			return $(this).find(newUrl).length === 0;
		});

		for (var i = 0; i < apps.length; i++) {
			var target = $(apps[i]);
			var title = target.find(mainTitle);
			var name = target.find(appName).text();
			var titleText = title.text();
			var newTitle = title.clone();
			//var uri = encodeURIComponent(name + ' ' + titleText);
			var uri = encodeURIComponent(titleText);
			var href = newTitle.find('a');
			href.attr('href', url.replace('{SEARCH}', uri));
			href.html('Direct Link');
			href.addClass('direct-link');
			href.removeAttr('rel');
			href.attr('target', '_blank');
			title.append(newTitle);
		}
		lastDivCount = posts.length;

		setTimeout(addDirectLink, delay);
	}

	addDirectLink();
});