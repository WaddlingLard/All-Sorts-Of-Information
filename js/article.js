// Importing function
import { setArticle } from "./main.js";
import { populate } from "./populatesearch.js";

window.onload = loaded;
        
const links = document.querySelector("#link-list");
// console.log("Loading Articles!");

// function wait(milliseconds) {
//     return new Promise(resolve => setTimeout(resolve, milliseconds));
// }

// When the page is loaded, there will be a request that will grab all of the articles
function loaded() {

    console.log("Loading Articles!");
    const articleAPIRoute = "https://06hoz1o347.execute-api.us-east-2.amazonaws.com/article";
    const linksText = document.querySelector("h3");

    // If it takes time to load the list
    linksText.innerHTML += " (Loading)";

    try {

        let xhr = new XMLHttpRequest();
        // console.log("Created XHR Request");

        xhr.responseType = "json";

        xhr.addEventListener("load", async function() {

            console.log("Loaded!");
            // Making sure the body is clean
            if (xhr.status === 200) { 
                links.innerHTML = "";
            }

            await xhr.response.forEach(element => {
                const listItem = document.createElement("li");
                const link = document.createElement("a");

                // Grabbing the id
                let id = element.article_id;
                // console.log(id);

                link.href = `article.html`;
                link.addEventListener("click", async function () {

                    // Setting id to be loaded
                    sessionStorage.setItem('pageID', id);
                    // console.log("Clicked!")

                    // await setArticle(element.id);
                    // wait(2000).then();
                });
                link.innerHTML = `${id}`;

                // Adding link to the list item
                listItem.appendChild(link);

                // Adding the list item to the list
                links.appendChild(listItem);
            });

        });

        xhr.open("GET", articleAPIRoute);
        // Send request
        xhr.send();

    } catch (error) {
        console.error(`XHR error code ${xhr.status}`);
    }

    linksText.innerHTML = "Articles";

    // Populating list from the populatesearch.js module
    populate();

}