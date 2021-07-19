const comment_input = document.getElementById('comment_input')
const comment_update_form = document.getElementById('comment-update-form')
const blog_delete_form = document.getElementById('blogDelete')
const url_href = window.location.href
const like_unlike_url = url_href + 'like-unlike/'
const get_comment_url = url_href + 'comment/'
const blog_comment_update_url = url_href + 'blog-comment-update/'
const comment_like_unlike_url = url_href + 'blog-comment-like-unlike/'
const blog_delete_url = url_href.replace('detail/', '') + 'delete/'
const alert_box = document.getElementById('alert-box')
let comment_pk


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

// view for like unlike blog
$(document).on('click', '#btn-like', function (event) {
    event.preventDefault();
    var blog_id = $(this).attr('value')
    $.ajax({
        type: 'POST',
        url: like_unlike_url,
        data: {
            'id': blog_id,
            'csrfmiddlewaretoken': csrftoken,
        },
        dataType: 'json',
        success: function (response) {
            $('#like-section').html(response['data'])
        },
        error: function (error) {
            console.log(error)
        },

    })
})

// for fill the comment modal input with comment using the pk
$(document).on('click', '#btn-comment-update', function (event) {
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
comment_update_form.addEventListener('submit', event => {
    event.preventDefault()
    const new_comment = document.getElementById('comment_input').value

    $.ajax({
        type: 'POST',
        url: blog_comment_update_url,
        data: {
            'id': comment_pk,
            'new_comment': new_comment,
            'csrfmiddlewaretoken': csrftoken,
        },
        dataType: 'json',
        success: function (response) {

            $("#comment-text"+comment_pk).html(response.data.comment) // changing the comment text with the updated text
            handleAlerts('success', 'comment has been updated')
            $('#commentEdit').modal('hide') // hide the modal
        },
        error: function (error) {
            console.log(error)
        }
    })

})

// blog delete
blog_delete_form.addEventListener('submit', event => {
    event.preventDefault()
    $.ajax({
        type: 'POST',
        url: blog_delete_url,
        data: {
            'csrfmiddlewaretoken': csrftoken,
        },
        dataType: 'json',
        success: function (response) {
            // setting post_delete=True in localStorage
            localStorage.setItem('post_delete', response.deleted)
            // url for redirect to the blog list page
            window.location.href = window.location.origin + '/blogs/'

        },
        error: function (error) {
            console.log(error)
        }
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
            'csrfmiddlewaretoken': csrftoken,
        },
        dataType: 'json',
        success: function (response) {
            // changing the text of the button of a specific comment
            $('#comment-like-unlike-section'+comment_id).html(response.data)
        },
        error: function (error) {
            console.log(error)
        },

    })
})


const handleAlerts = (type, msg) => {
        alert_box.innerHTML = `
        <div class="alert alert-${type}" role="alert">
            ${msg}
        </div>`
}