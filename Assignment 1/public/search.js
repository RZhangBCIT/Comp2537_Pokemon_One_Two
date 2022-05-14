region_global = ""
habitat_global = ""
type_global = ""
generation_global = ""

function processType(data) {
    for (i = 0; i < data.types.length; i++)
        if (data.types[i].type.name == type_global)
            $("main").append("<p>"+ data.id + "</p>");
}

function displayType(type_) {
    $("main").empty()
    type_global = type_
    for(i = 1; i < 898; i++) {
        $.ajax({
            type: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${i}`,
            success: processType
        })
    }
}

function processHabitat(data) {
    if (data.habitat !== null) {
        if (data.habitat.name == habitat_global)
            $("main").append("<p>"+ data.id + "</p>");
    }
}

function displayHabitat(habitat_) {
    $("main").empty()
    habitat_global = habitat_
    for(i = 1; i < 898; i++) {
        $.ajax({
            habitat: "get",
            url: `https://pokeapi.co/api/v2/pokemon-species/${i}`,
            success: processHabitat
        })
    }
}

function processRegion(data) {
    if (region_global == "Kanto") {
        generation_global = "generation-i"
    } else if (region_global == "Johto") {
        generation_global = "generation-ii"
    } else if (region_global == "Hoenn") {
        generation_global = "generation-iii"
    } else if (region_global == "Sinnoh") {
        generation_global = "generation-iv"
    } else if (region_global == "Unova") {
        generation_global = "generation-v"
    } else if (region_global == "Kalos") {
        generation_global = "generation-vi"
    } else if (region_global == "Alola") {
        generation_global = "generation-vii"
    } else if (region_global == "Galar") {
        generation_global = "generation-viii"
    }
    if (data.generation.name == generation_global)
    $("main").append("<p>"+ data.id + "</p>");
}

function displayRegion(region_) {
    $("main").empty()
    region_global = region_
    for(i = 1; i < 898; i++) {
        $.ajax({
            region: "get",
            url: `https://pokeapi.co/api/v2/pokemon-species/${i}`,
            success: processRegion
        })
    }
}

function processGeneration(data) {
    if (data.generation.name == generation_global)
        $("main").append("<p>"+ data.id + "</p>");
}

function displayGeneration(gen_) {
    $("main").empty()
    generation_global = gen_
    for(i = 1; i < 898; i++) {
        $.ajax({
            generation: "get",
            url: `https://pokeapi.co/api/v2/pokemon-species/${i}`,
            success: processGeneration
        })
    }
}

function setup() {

    $("#pokemon_type").change(() => {
        pokemon_type = $("#pokemon_type option:selected").val();
        displayType($("#pokemon_type option:selected").val())
    })

    $("#region").change(() => {
        pokemon_region = $("#region option:selected").val();
        displayRegion($("#region option:selected").val())
    })

    $("#generation").change(() => {
        pokemon_generation = $("#generation option:selected").val();
        displayGeneration($("#generation option:selected").val())
    })

    $("#habitat").change(() => {
        pokemon_habitat = $("#habitat option:selected").val();
        displayHabitat($("#habitat option:selected").val())
    })
}

$(document).ready(setup)