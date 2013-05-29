$(document).ready(function() {

	$('a').on('click', function() {
		if ($(this).attr('current') == $('input').val())
			getTweets($('input').val());
		else {
			$('#tweets').empty();
			getTweets($('input').val());
		}
	})

	function getTweets(username) {
		$.ajax({
				url: 'http://search.twitter.com/search.json?',
				data: { q:username },
				dataType: 'jsonp',
				success: function (data) {
					$('a').attr('current',$('input').val());

					$.each(data.results, function (index, tweet) {
						$tweets = $('.tweet').first().clone();

						$tweets.find('.img').attr('src',tweet.profile_image_url);
						$tweets.find('.name').text(tweet.from_user_name);
						$tweets.find('.username').html("<a target='blank_' href='http://twitter.com/"+tweet.from_user+"'>"+tweet.from_user+"</a>");
						$tweets.find('.date').text((tweet.created_at).substring(0, (tweet.created_at).length - 5));
						$tweets.find('.text').text(tweet.text);

						$tweets.hide().appendTo('#tweets').fadeIn();

					})
				}
			});
	}
})