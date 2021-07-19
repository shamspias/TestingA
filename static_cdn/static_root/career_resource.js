const alert_box = document.getElementById('alert-box')
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
