import { populate } from "./populatesearch.js";

let pageID = sessionStorage.getItem('pageID');

window.onload = loaded;

function loaded() {
    
    // console.log(pageID);
    console.log(`Loading ${pageID}!`);
    const articleAPIRoute = "https://06hoz1o347.execute-api.us-east-2.amazonaws.com/article";
    const articleTitle = document.querySelector("#content-title");
    const articleContent = document.querySelector("#text-content");
    const articleImage = document.querySelector("#cover-image");

    try {

        let xhr = new XMLHttpRequest();
        xhr.responseType = "json";

        xhr.addEventListener("load", async function() {

            console.log(xhr);

            if (xhr.status === 200) {
                // articleContent.innerHTML = "";
                // articleTitle.innerHTML = "";
            }
            console.log("Loaded article!");

            let body = xhr.response;

            // Add image and attribute integration

            let text = document.createElement("p");
            text.innerHTML = body.content;

            articleTitle.innerHTML = body.article_id;
            // articleContent.innerHTML = body.content;
            articleContent.appendChild(text);

            if (body.image) {
                // Setting the source to the cover image;
                // articleImage.src = `url(${body.image})` 
                getImage(body.image);
            } else {
                articleImage.src = `/img/placeholder.jpg`;
            }

        });

        xhr.open("GET", `${articleAPIRoute}/${pageID}`);
        // xhr.open("GET", `${articleAPIRoute}/Alligator`);

        xhr.send();

    } catch (error) {
        console.error(`XHR error code ${xhr.status}`);
    }

    async function getImage(src) {
        const image = await fetch(src);
    }

    populate();

}