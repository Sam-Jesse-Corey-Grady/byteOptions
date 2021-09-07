
mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JhZG1hbiIsImEiOiJja3BwbXZlMWswaG54MnVxamZwZTI4eTQxIn0.__eOLAN4s3MLNu7CNS79YQ';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
});
// $(document).ready(function(){
//     var url,
//         API_KEY = YOUTUBE_API_KEY,
//         maxResults = 10;
//     $.ajax({
//         method: "GET",
//         url: `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=testing&maxResults=${maxResults}&type=video`,
//         success: function(data){
//             console.log(data);
//         },
//         error: function(e){
//             console.log(e);
//         }
//     })
//
//     }
// )
function getLocations(q){
    $.ajax({
        method: "GET",
        url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`,
        data: {
            key: GOOGLE_API_KEY,
            input: q,
            inputtype: "textquery",
        },
        success: function (data){
            console.log(data);
        }
    })
}



function getVideo(q) {
    $.ajax({
        method: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: GOOGLE_API_KEY,
            q: `${q} recipes`,
            part: 'snippet',
            maxResults: 4,
            type: 'video',
            videoEmbeddable: true,
        },
        success: function(data){
            console.log(data)
            embedData(data);
        },
        error: function(response){
            console.log("Request Failed");
            console.log(response)
        }
    });
}
function embedData(data){
    let dataArr = data.items
    dataArr.forEach(function(video){
        $("#home").append(`
            <iframe class="videoBox col-auto" src="https://www.youtube.com/embed/${video.id.videoId}" title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>`)

    })
}
function spoonCall(q){
    $.ajax({
        method: "GET",
        url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONTACULAR_KEY}&query=${q}&offset=0&number=10`,
        success: function(data){
            console.log(data);
            ingredientsCall(data)
        }
    })
}
function returnIngredients(data){
   return data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join("");
}


function ingredientsCall(data){
    $.ajax({
        method: "GET",
        url: `https://api.spoonacular.com/recipes/${data.results[0].id}/information?apiKey=${SPOONTACULAR_KEY}&includeNutrition=true`,
        success: function(data){
            console.log(data);
            $("#spoon").html(`${data.title}<br> <ul>${returnIngredients(data)}</ul>${data.instructions}`)
        }
    })

}
$(document).ready(

    function(){
        $("#button").click(function(){
            let q = $("#search").val();
                console.log(q)
            getLocations(q);
            // getVideo(q);
            console.log(q.indexOf("test") >= 0);
            let qq = document.getElementById("search").value.replaceAll(" ", "+");
            spoonCall(qq);
            console.log(qq);

            // $("#google").append(`<iframe
            //     width="600"
            //     height="450"
            //     style="border:0"
            //     loading="lazy"
            //     allowfullscreen
            //     src="https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}
            //      &q=${qq},San+Antonio+TX">
            //      </iframe>`)

        })
    }
)