const url_href = window.location.href
const like_unlike_url = './../personal-post/like-unlike/'
const comment_like_unlike_url = url_href + 'personal-comment-like-unlike/'
const get_comment_url = url_href + 'comment/'
const comment_input = document.getElementById('pp-comment_input')
const comment_update_form = document.getElementById('pp-comment-update-form')
let comment_pk
const personal_post_comment_update_url = url_href + 'personal-post-comment-update/'
const alert_box = document.getElementById('alert-box')

// to get the csrf token

const csrftoken = getCookie('csrftoken');

// view for like unlike personal post
$(document).on('click', '#btn-like', function (event) {
    event.preventDefault();
    var personal_post_id = $(this).attr('post_pk')
    console.log(parseInt(personal_post_id));
    $.ajax({
        type: 'POST',
        url: like_unlike_url,
        data: {
            'personal_post_id': parseInt(personal_post_id),
            'csrfmiddlewaretoken': csrftoken,
        },
        dataType: 'json',
        success: function (response) {
            console.log(response.data['is_liked'])
            if (response.data['is_liked'] == true){
               $("#btn-like-icon"+parseInt(personal_post_id)).html('<i class="fa fa-heart blueiconcolor"></i>');
            }
            else{
               $("#btn-like-icon"+parseInt(personal_post_id)).html('<i class="fa fa-heart whiteiconcolor"></i>');
            }
             $("#like-count"+parseInt(personal_post_id)).html(response.data['like_count']);
        },
        error: function (error) {
            console.log(error)
        },

    })
})


// view for comment like unlike blog
$(document).on('click', '#btn-comment-like-unlike', function (event) {
    event.preventDefault();
    const comment_id = $(this).attr('comment_pk')
    $.ajax({
        type: 'POST',
        url: comment_like_unlike_url,
        data: {
            'id': comment_id,

        },
        dataType: 'json',
        success: function (response) {
            // changing the text of the button of a specific comment
            $('#pp-comment-like-unlike-section' + comment_id).html(response.data)
        },
        error: function (error) {
            console.log(error)
        },

    })
})

// for fill the comment modal input with comment using the pk
$(document).on('click', '#pp-btn-comment-update', function (event) {
    event.preventDefault()
    const pk = $(this).attr('pk')
    $.ajax({
        type: 'GET',
        url: get_comment_url,
        data: {
            'id': pk,
        },
        dataType: 'json',
        success: function (response) {
            comment_input.value = response.comment
        },
        error: function (error) {
            console.log(error)
        }
    })

    /*
    assign the pk of comment to a variable
     */
    comment_pk = pk

})

// to update the comment
//comment_update_form.addEventListener('submit', event => {
//    event.preventDefault()
//    const new_comment = document.getElementById('pp-comment_input').value
//    $.ajax({
//        type: 'POST',
//        url: personal_post_comment_update_url,
//        data: {
//            'id': comment_pk,
//            'new_comment': new_comment,
//            'csrfmiddlewaretoken': csrftoken,
//        },
//        dataType: 'json',
//        success: function (response) {
//
//            $("#comment-text-" + comment_pk).html(response.data.comment) // changing the comment text with the updated text
//            handleAlerts('success', 'comment has been updated')
//            $('#personal-post-comment-edit').modal('hide') // hide the modal
//        },
//        error: function (error) {
//            console.log(error)
//        }
//    })
//
//})

const handleAlerts = (type, msg) => {
    alert_box.innerHTML = `
        <div class="alert alert-${type}" role="alert">
            ${msg}
        </div>`
}
