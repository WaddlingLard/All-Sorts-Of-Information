import { populateArticles as populate } from "./populatesearch.js";

window.onload = loaded;

const links = document.querySelector("#posts");

function loaded() {

    console.log("Loading Posts!");
    const postAPIRoute = "https://06hoz1o347.execute-api.us-east-2.amazonaws.com/posts";
    const linksText = document.querySelector("#content-header");
    // const posts = document.querySelector("#posts");

    try {

        let xhr = new XMLHttpRequest();

        xhr.responseType = "json";

        xhr.addEventListener("load", async function () {

            console.log("Loaded!");
            if (xhr.status === 200) {
                links.innerHTML = "";
            }

            await xhr.response.forEach(element => {
                let post = document.createElement("p");
                let articleLink = document.createElement("a");
                let postLink = document.createElement("a");

                let id = element.post_id;
                let articleID = element.article_id;

                post.style.display = "inline-block";
                postLink.src = "post.html";
                articleLink.src = "article.html";
                
                postLink.innerText = id;
                articleLink.innerText = `References: ${articleID}`;

                postLink.addEventListener("click", () => {
                    sessionStorage.setItem("postID", id);
                })
                
                articleLink.addEventListener("click", () => {
                    sessionStorage.setItem("pageID", articleID);
                })

                post.appendChild(postLink);
                post.appendChild(articleLink);

                links.appendChild(post);

            });

            linksText.innerText = "Discussion Board";

        });

        xhr.open("GET", postAPIRoute);

        xhr.send();


    } catch (error) {
        console.error(`XHR error code: ${xhr.status}`);
    }

    populate();
}