// Importing function
// import { setArticle } from "./main.js";
import { articleAPIRoute, populateArticles as populate, populateArticles, populateLoaded as searchFunctionality } from "./populatesearch.js";
import { testingToggle } from "../test/testToggle.js";

window.onload = loaded;
        
const APIRoute = "https://06hoz1o347.execute-api.us-east-2.amazonaws.com/article";

// When the page is loaded, there will be a request that will grab all of the articles
async function loaded() {

    if (!testingToggle) {
        await connectionEstablished(APIRoute, false);
        populate();
    }

}

export async function connectionEstablished(articleAPIRoute, testing) {

    // Testing mode
    const xhr = new XMLHttpRequest();
    let testStatus = 0;

    function testMode() {
        return new Promise((resolve) => {
            if (testing) {
                try {
                    // const xhr = XMLHttpRequest();
                    xhr.addEventListener("load", function () {
                        if (xhr.status === 200) {
                            console.log("Successful Operation!");
                            testStatus = 200;

                        } else {
                            testStatus = -1;
                        }
                        resolve();
                    });
                } catch (error) {
                    testStatus = -1;
                }
        
                xhr.open("GET", articleAPIRoute);
                xhr.send();
            } else {
                resolve();
            }
        })
    }

    await testMode().then( (e) => {
        if (testStatus !== 0) {
            console.log('Test Status!');
            return testStatus;
        }
    });

    await loadArticles();

}

export async function loadArticles() {

    const linksText = document.querySelector("#content-header");
    const links = document.querySelector("#link-list");

    try {

        const xhr = new XMLHttpRequest();

        xhr.responseType = "json";

        xhr.addEventListener("load", async function() {

            // Making sure the body is clean
            if (xhr.status === 200) { 
                links.innerHTML = "";
            } else {
                return -1;
            }

            await xhr.response.forEach(element => {
                const listItem = document.createElement("p");
                const deleteButton = document.createElement("button");

                listItem.classList = "list-item";

                const link = document.createElement("a");

                // Grabbing the id
                const id = element.article_id;

                link.href = `article.html`;
                link.addEventListener("click", function () {
                    
                    setItem(id);

                });

                deleteButton.addEventListener("click", async function () {
                    await deleteArticle(id);
                    await loadArticles();
                })

                link.innerHTML = `${id}`;
                deleteButton.innerHTML = `<b>Delete Article</b>`;
                deleteButton.style.margin = "0px 5px";


                // Adding link and button to the list item
                listItem.appendChild(link);
                listItem.appendChild(deleteButton);

                // Adding the list item to the list
                links.appendChild(listItem);
            });

        });

        xhr.open("GET", articleAPIRoute);
        // Send request
        xhr.send();

    } catch (error) {
        console.error(`XHR error code ${xhr.status}`);
        return -1;
    }

    linksText.innerHTML = "Articles";

    populateArticles();
    searchFunctionality();
    
    // Returning successful operation!
    return 200;
}

export async function deleteArticle(id) {

    let xhr = new XMLHttpRequest();
    try {
        console.log(`DELETING ${id}`);
        await xhr.open ("DELETE", `${articleAPIRoute}/${id}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    } catch (error) {
        console.error(`XHR error code: ${xhr.status}`);
    }

    await loadArticles();
}


export function setItem(ID) {
    sessionStorage.setItem('pageID', ID);
    return sessionStorage.getItem('pageID');
}