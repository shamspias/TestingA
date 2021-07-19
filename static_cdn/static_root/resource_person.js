const resource_person_form = document.getElementById('resource-person-form')


const url_href = window.location.href
const resource_person_url = url_href + 'ajax/'
const resource_person_image_url = url_href + 'ajax/image/'


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


$("#addResourcePerson").click(function () {

    $("#resourcePersonModal").modal();
});


resource_person_form.addEventListener('submit', event => {
    event.preventDefault()

    const image_id = document.getElementById('id_image').value
    const name = document.getElementById('id_name').value
    const current_position = document.getElementById('id_current_position').value
    const details = document.getElementById('id_details').value


    //console.log(name)
    //console.log(current_position)
    //console.log(details)
    console.log("My Image Is")
    console.log(image_id)

    $.ajax({
        type: 'POST',
        url: resource_person_url,
        data: {

            'name': name,
            'current_position': current_position,
            'details': details,
            'csrfmiddlewaretoken': csrftoken,
        },
        dataType: 'json',
        success: function (response) {


            const rp = document.getElementById("id_resource_person");
            const new_value = rp.value;
            console.log(new_value)
            $("#id_resource_person").append(new Option(name, new_value));

            console.log('success', 'New Resources Person Added')
            $('#resourcePersonModal').modal('hide') // hide the modal
        },
        error: function (error) {
            console.log(error)
        }
    })

});


$("#addResourcePersonImage").click(function () {

    $("#resourcePersonImageModal").modal();

});

$("#submitResourcePersonImageModal").on('click', e => {
    e.preventDefault();
    // console.log(this)
    let formData = new FormData();
    const file = $('#modal2_image')[0].files[0];
    const name = $('#modal2_name')[0].value;

    console.log('run')

    formData.append('image', file);
    formData.append('name', name);
    formData.append("csrfmiddlewaretoken", csrftoken);

    // console.log('-----start----')
    // formData.forEach(data => {
    //     console.log(data);
    // })
    // console.log('-----end----')

    $.ajax({
        type: 'POST',
        url: resource_person_image_url,
        contentType: false,
        processData: false,
        data: formData,
        dataType: 'json',
        success: (response) => {
            console.log('success', 'New Resources Person Image Added')

            const model1_image = document.getElementById("id_image");
            const new_value = model1_image.value;
            console.log("New Value is")
            console.log(new_value)
            $("#id_image").append(new Option(name, new_value));
            $('#resourcePersonImageModal').modal('hide') // hide the modal

            delete (formData);
        },
        error: (error) => {
            console.log(error)
        }
    })
});
