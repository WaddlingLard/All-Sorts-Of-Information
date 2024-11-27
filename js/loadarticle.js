import { populate } from "./populatesearch.js";

let pageID = sessionStorage.getItem('pageID');

window.onload = loaded;

function loaded() {
    
    // console.log(pageID);
    console.log(`Loading ${pageID}!`);
    const articleAPIRoute = "https://06hoz1o347.execute-api.us-east-2.amazonaws.com/article";
    const articleTitle = document.querySelectorAll(".content-title");
    const articleContent = document.querySelector("#text-content");
    const articleImage = document.querySelector("#cover-image");

    const articleAttributes = document.querySelector("#attributes-body");

    try {

        let xhr = new XMLHttpRequest();
        xhr.responseType = "json";

        xhr.addEventListener("load", async function() {

            console.log(xhr);

            // Processing if there is an item returned
            if (xhr.response) {

                if (xhr.status === 200) {
                    // articleContent.innerHTML = "";
                    // articleTitle.innerHTML = "";
                }
                console.log("Loaded article!");
    
                let body = xhr.response;
    
                // Add image and attribute integration
    
                let text = document.createElement("p");
                text.innerHTML = body.content;
    
                articleTitle.forEach(element => {
                    element.innerHTML = body.article_id;
                });

                // articleTitle.innerHTML = body.article_id;
                // articleContent.innerHTML = body.content;
                articleContent.appendChild(text);
    
                if (body.image) {
                    // Setting the source to the cover image;
                    articleImage.src = `${body.image}`;
                } else {
                    articleImage.src = `/img/placeholder.jpg`;
                }

                if (body.attributes) {
                    let attributes = body.attributes;

                    const list = attributes.split(",");
                    
                    console.log(list);

                    let keys = [];
                    let values = [];

                    for (let i = 0; i < list.length; i+=2) {
                        keys.push(list[i]);
                        values.push(list[i+1]);
                    }

                    // console.log(keys);
                    // console.log(values);

                    // Populating attributes with the keys and values
                    for (let i = 0; i < keys.length; i++) {
                        let row = document.createElement("tr");

                        let key = keys[i];
                        let value = values[i];

                        let firstCol = document.createElement("th");
                        let secondCol = document.createElement("td");
                        firstCol.innerHTML = key;
                        secondCol.innerHTML = value;

                        row.appendChild(firstCol);
                        row.appendChild(secondCol);

                        articleAttributes.appendChild(row);
                    }

                }

                document.querySelector("#text-content h3").innerHTML = "";

            // 404
            } else {

                let text = document.createElement("p");
                text.innerHTML = "Content Not Found! How did you even get here? :)";

                articleTitle.innerHTML = "404";
                articleContent.appendChild(text);

            }


        });

        xhr.open("GET", `${articleAPIRoute}/${pageID}`);
        // xhr.open("GET", `${articleAPIRoute}/Alligator`);

        xhr.send();

    } catch (error) {
        console.error(`XHR error code ${xhr.status}`);
    }

    populate();

}