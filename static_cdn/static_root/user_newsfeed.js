var infinite = new Waypoint.Infinite({
      element: $('.infinite-container')[0],
      onBeforePageLoad: function () {
        $('.loading').show();
      },
      onAfterPageLoad: function ($items) {
        $('.loading').hide();
    }
    });

$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

//SSE to capture data/event sent from server, when new post created (model:personal_post.PersonalPost)
var targetContainer = document.getElementById("newpost_notification");
var eventSource = new EventSource("/newpost_notification");
eventSource.onmessage = function(e) {
    targetContainer.innerHTML = "<a type='submit' href='.'>"+e.data+"</a>";
};