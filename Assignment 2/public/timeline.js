function loadEventsToMainDiv() {
    $.ajax({
        url: "http://localhost:1444/timeline/getAllEvents",
        type: "get",
        success: (r) => {
            console.log(r)
            for (i = 0; i < r.length; i++) {
                $('main').append(`
                    <p> Event Text ${r[i].text} </p>
                    <p> Event Hits ${r[i].hits} </p>
                    <p> Event Time ${r[i].time} </p>
                    `);
            }
        }
    })
}

function setup() {
    loadEventsToMainDiv();
}

$(document).ready(setup)