import { populateArticles as populate } from "./populatesearch.js";

window.onload = loaded;

const links = document.querySelector("#posts");

function loaded() {

    console.log("Loading Posts!");
    const postAPIRoute = "https://06hoz1o347.execute-api.us-east-2.amazonaws.com/posts";
    const linksText = document.querySelector("#content-header");
    // const posts = document.querySelector("#posts");
    const posts = document.querySelector("#post-wrapper");

    try {

        let xhr = new XMLHttpRequest();

        xhr.responseType = "json";

        xhr.addEventListener("load", async function () {

            console.log("Loaded!");
            if (xhr.status === 200) {
                // links.innerHTML = "";
                posts.innerHTML = "";
            }

            await xhr.response.forEach(element => {
                let post = document.createElement("p");
                let articleLink = document.createElement("a");
                let postLink = document.createElement("a");
                let subText = document.createElement("p");

                let image = document.createElement("img");

                let id = element.post_id;
                let articleID = element.article_id;

                post.classList = "post";
                // post.style.display = "inline-block";

                postLink.href = "post.html";
                postLink.classList = "postLink";
                // postLink.classList = "postLink";

                articleLink.href = "article.html";
                articleLink.classList = "articleLink";
                // articleLink.classList = "articleLink";

                subText.style.margin = "0px";
                subText.classList = "sub-text";

                if (element.image) {
                    image.src = `${element.image}`;
                } else {
                    image.src = `/img/placeholder.jpg`;
                }

                image.style.width = "32px";
                image.classList = "post-image";
                image.alt = `An image of the "${id}" post.`
                
                postLink.innerText = `${id} `;
                articleLink.innerText = `Article: ${articleID} `;

                if (element.content.length >= 25) {
                    subText.innerText = `${element.content.substring(0, 25)}...`;                    
                } else {
                    subText.innerText = element.content;
                }

                postLink.addEventListener("click", () => {
                    sessionStorage.setItem("postID", id);
                })
                
                articleLink.addEventListener("click", () => {
                    sessionStorage.setItem("pageID", articleID);
                })

                post.appendChild(postLink);
                post.appendChild(articleLink);
                post.appendChild(image);
                post.appendChild(subText);

                posts.appendChild(post);

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