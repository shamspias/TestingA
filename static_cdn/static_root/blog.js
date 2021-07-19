const alert_box = document.getElementById('alert-box')
// for csrf protect
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


// to show alert on template
const handleAlerts = (type, msg1, msg2) => {
    alert_box.innerHTML = `
        <div class="alert alert-${type}" role="alert">
        <h3>${msg1}</h3>
            ${msg2}
        </div>
    `

}
// for showing alert on blog list template after successful delete
const deleted = localStorage.getItem('post_delete')
if (deleted === 'True') {
    handleAlerts('secondary', 'Post removed', 'Post successfully deleted.')
    localStorage.clear()
}


