// to get the csrf token
const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');


// view for follow/unfollow user
$(document).on('click', '#btn-follow-unfollow', function(event){
//    event.preventDefault();
    const followee_id = $(this).attr('value');
    console.log(csrftoken);
    $.ajax({
        type: 'POST',
        url: '../follow_unfollow/',
        data: {
            'followee_id': followee_id,
            'csrfmiddlewaretoken': csrftoken,
        },
        dataType: 'json',
        success: function(response){
            // changing text between 'follow' and 'following'
            $('#btn-follow-unfollow').html(response.data['text_data'])
        },
        error: function(error){
            console.log(error);
        },
    })
})