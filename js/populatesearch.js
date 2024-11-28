/**
 * This file is used solely for the purpose to populate the search bar with all the articles and discussions 
 * that a user needs to quickly access
 */
let articles = document.querySelector("#articles");
window.onload = populateArticles;

const searchButton = document.querySelector("#search-button");
let searchValue = document.querySelector("#search-bar");
let searchForm = document.querySelector("#search-form form") 

// console.log(searchValue);

searchValue.addEventListener("change", () => {
    if (searchValue.value == "") {
        searchForm.action = "javascript:void(0);";
    } else {
        searchForm.action = "/article.html";
    }
});

searchButton.addEventListener("click", async function () {
    console.log(`Changing article to ${searchValue.value}`);
    await sessionStorage.setItem("pageID", searchValue.value);
});

const articleAPIRoute = "https://06hoz1o347.execute-api.us-east-2.amazonaws.com/article";

export function populateArticles() {

    let xhr = new XMLHttpRequest();


    try {

    // let xhr = new XMLHttpRequest();
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
            let title = element.article_id;
            // let title = element.id;

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