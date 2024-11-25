/**
 * This file is used solely for the purpose to populate the search bar with all the articles and discussions 
 * that a user needs to quickly access
 */
let articles = document.querySelector("#articles");
window.onload = populate;

const articleAPIRoute = "https://06hoz1o347.execute-api.us-east-2.amazonaws.com/article";

export function populate() {

    try {

    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.addEventListener("load", function() {
        console.log("Populating list with elements");

        if (xhr.status === 200) {
        articles.innerHTML = "";
        }

        xhr.response.forEach(element => {
        const option = document.createElement("option");

        // Grabbing the id and name
        // let id = element.article_id;
        let id = "Article";
        let title = element.title;

        option.value = title;
        option.innerHTML = id;

        articles.appendChild(option);
        });

    });

    xhr.open("GET", articleAPIRoute);

    xhr.send();

    } catch (error) {
    console.error(`XHR error code ${xhr.status}`);
    }

}