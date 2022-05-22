function loadEventsToMainDiv() {
    $.ajax({
        url: "http://localhost:1444/timeline/getAllEvents",
        type: "get",
        success: (r) => {
            // console.log(r)
            for (i = 0; i < r.length; i++) {
                $('main').append(`
                    <p> ${r[i].text} </p>
                    <p> ${r[i].time} </p>
                    <p> Hits: ${r[i].hits} </p>

                    <button class="likeButtons" id="${r[i]["_id"]}"> Like! </button>
                    <button class="deleteButtons" id="${r[i]["_id"]}"> Delete </button>
                    `);
            }
        }
    })
}

function increaseHits() {
    x = this.id
    $.ajax({
        url: `http://localhost:1444/timeline/increaseHits/${x}`,
        type: "get",
        success: function (x) {
            console.log(x);
        }
    })
    $('main').html('');
    loadEventsToMainDiv()
}

function deleteID() {
    x = this.id
    $.ajax({
        url: `http://localhost:1444/timeline/delete/${x}`,
        type: "get",
        success: x => {
            console.log(x)
        }
    })
    $('main').html('');
    loadEventsToMainDiv()
}

function setup() {
    loadEventsToMainDiv();

    $("body").on("click", ".likeButtons", increaseHits)

    $("body").on("click", ".deleteButtons", deleteID)
}

$(document).ready(setup)