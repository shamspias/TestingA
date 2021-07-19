const url_href = window.location.href
const delete_form = document.getElementById('cr-delete-form')
const like_unlike_url = url_href +'like-unlike/'
const delete_url = url_href.replace("/detail/","")+"/delete/"
const alert_box = document.getElementById('alert-box')


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

// view for like unlike carrer_resource post
$(document).on('click', '#btn-cr', function (event){
    event.preventDefault();
    var cr_id = $(this).attr('value')
    $.ajax({
        type: 'POST',
        url: like_unlike_url,
        data: {
            'id': cr_id,
            'csrfmiddlewaretoken': csrftoken,
        },
        dataType: 'json',
        success: function (response){
             $('#like-section').html(response['data']) // change the html bases on response data
        },
        error: function (rs, e){
            console.log(rs.responseText)
        },
    })
})

// for delete career_resource post
delete_form.addEventListener('submit', event=>{
    event.preventDefault()
    $.ajax({
        type: 'POST',
        url: delete_url,
        data: {
            'csrfmiddlewaretoken': csrftoken,
        },
        dataType: 'json',
        success: function (response) {
            // setting post_delete=True in localStorage
            localStorage.setItem('post_delete', response.deleted)
            // url for redirect to the career_resource post list page
            window.location.href = window.location.origin + '/career_resource/'

        },
        error: function (error) {
            console.log(error)
            $('#crDelete').modal('hide') // hide the modal
            handleAlerts('danger', 'Permission Denied')

        }
    })

})

const handleAlerts = (type, msg) => {
        alert_box.innerHTML = `
        <div class="alert alert-${type}" role="alert">
            ${msg}
        </div>`
}