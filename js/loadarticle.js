import { populate } from "./populatesearch.js";

let pageID = sessionStorage.getItem('pageID');

window.onload = loaded;

let postButton = document.querySelector("#post-button");
let imageFile = document.querySelector("#post-image");
let base64image;

imageFile.onchange = async function () {
    
    if (!imageFile) {

    } else if (this.files[0].size >= 409600) {
        alert("File Too Large! (Less than 400 KB!)");
        imageFile.value = ""
    } else {
        const data = this.files[0];

        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            base64image = e.target.result;

            sessionStorage.setItem("image", base64image);
        }

        // Converting to base64
        await fileReader.readAsDataURL(data);
        let conversion = sessionStorage.getItem("image");

        let text = conversion.valueOf();

        if (text.length >= 409600) {
            alert("File Conversion Too Large! (Less than 400 KB!)");
            this.value = "";
        }
    }
}

// let pageID = sessionStorage.getItem("pageID");

// Autosave for posts
let titleSave = document.querySelector("#post-title");
let contentSave = document.querySelector("#post-content");

let titleName = `${pageID}titleAutosave`;
let contentName = `${pageID}contentAutosave`;

if (sessionStorage.getItem(titleName)) {
    titleSave.value = sessionStorage.getItem(titleName);
}

if (sessionStorage.getItem(contentName)) {
    contentSave.value = sessionStorage.getItem(contentName);
}

titleSave.onchange = () => {
    console.log("saved!");
    sessionStorage.setItem(titleName, titleSave.value);
}

contentSave.onchange = () => {
    sessionStorage.setItem(contentName, contentSave.value);
}


// Used for artifical wait time (like Thread.sleep())
function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

postButton.addEventListener("click", async () => {
    
    const postTitle = document.querySelector("#post-title").value;
    const postContent = document.querySelector("#post-content").value;

    // Handled differently
    // const postImage = document.querySelector("#post-image").value;
    const postImage = sessionStorage.getItem("image");
    
    const postMessage = document.querySelector("#posted-message");

    let xhr;

    // Removing script tags
    let safeTitle = postTitle.replace(/<script>/g, "");
    let safeContent = postContent.replace(/<script>/g,"");

    // Removing Autosave
    sessionStorage.removeItem(titleName);
    sessionStorage.removeItem(contentName);

    if (postTitle && postContent) {
        // console.log("XHR Initialized!");
        xhr = new XMLHttpRequest();

        // Removing script tags
        let safeTitle = postTitle.replace(/<script>/g, "");
        let safeContent = postContent.replace(/<script>/g,"");
    }

    try {
        
        xhr.open("PUT", "https://06hoz1o347.execute-api.us-east-2.amazonaws.com/posts");
        xhr.setRequestHeader("Content-Type", "application/json");

        // console.log(xhr);
        // console.log(safeTitle);

        await xhr.send(JSON.stringify({
            "title": safeTitle,
            "article_id": pageID,
            "content": safeContent,
            "image": postImage,
        }))

        // await xhr.send(JSON.stringify({
        //     "title": safeTitle,
        // }));

        sessionStorage.removeItem("image");

        postMessage.innerHTML = "Posted!";
        
    } catch (error) {   
        
        if (xhr) {
            console.error(`XHR error code ${xhr.status}`);
        } else {
            console.error("Non XHR error (Likely missing input)");
        }
        
        postMessage.innerHTML = "An error has occured! (Check Console)";
    }

    await wait(2000).then( () => {
        postMessage.innerHTML = "";
    })

})

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

            // console.log(xhr);

            // Processing if there is an item returned
            if (xhr.response) {

                if (xhr.status === 200) {
                    // articleContent.innerHTML = "";
                    // articleTitle.innerHTML = "";
                }
                // console.log("Loaded article!");
    
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