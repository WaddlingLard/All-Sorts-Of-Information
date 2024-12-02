import { populateArticles as populate } from "./populatesearch.js";
// import { postAPIRoute } from "./post.js";

window.onload = loaded;

let postID = sessionStorage.getItem("postID");

const postAPIRoute = "https://06hoz1o347.execute-api.us-east-2.amazonaws.com/posts";

function loaded() {

    console.log(`Loading post: ${postID}`);
    const header = document.querySelector("#content-header");
    const discussion = document.querySelector("#discussion");
    // console.log(header);

    try {
        
        let xhr = new XMLHttpRequest();
        xhr.resposneType = "json";

        xhr.addEventListener("load", async function() {

            if (xhr.response) {

                if (xhr.status === 200) {
                    // console.log("found something!");
                    // Clear Data
                }

                let body = JSON.parse(xhr.response);
                // console.log(body.content);

                let text = document.createElement("p");
                text.innerHTML = body.content;

                discussion.appendChild(text);

                header.innerHTML = postID;

            }

        });

        xhr.open("GET", `${postAPIRoute}/${postID}`);

        xhr.send();

    } catch (error) {
        console.error(`XHR error code; ${xhr.status}`);
    }

    populate();
}