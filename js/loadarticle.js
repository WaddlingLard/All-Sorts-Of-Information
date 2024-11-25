import { populate } from "./populatesearch.js";

let pageID = sessionStorage.getItem('pageID');

window.onload = loaded;

function loaded() {
    
    // console.log(pageID);
    console.log(`Loading ${pageID}!`);
    const articleAPIRoute = "https://06hoz1o347.execute-api.us-east-2.amazonaws.com/article";
    const articleTitle = document.querySelector("#content-title");
    const articleContent = document.querySelector("#content");

    try {

        let xhr = new XMLHttpRequest();
        xhr.responseType = "json";

        xhr.addEventListener("load", async function() {

            if (xhr.status === 200) {
                articleContent.innerHTML = "";
                articleTitle.innerHTML = "";
            }
            console.log("Loaded article!");

            let body = xhr.response;

            // Add image and attribute integration

            articleTitle.innerHTML = body.article_id;
            articleContent.innerHTML = body.content;

        });

        xhr.open("GET", `${articleAPIRoute}/${pageID}`);

        xhr.send();

    } catch (error) {
        console.error(`XHR error code ${xhr.status}`);
    }

    populate();

}