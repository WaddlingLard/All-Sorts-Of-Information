// window.onload = loaded;

// let articleID;
let pageID = sessionStorage.getItem('pageID');

/**
 * Simple Function that will be run when the browser is finished loading.
 */
function loaded() {

    // Assign to a variable so we can set a breakpoint in the debugger!
    const hello = sayHello();
    console.log(hello);
    console.log("The page loaded!");

    // console.log("The article that needs to be loaded is. " + articleID);
    if (pageID) {
        console.log(pageID);
    }

}

/**
 * This function returns the string 'hello'
 * @return {string} the string hello
 */
export function sayHello() {
    return 'hello';
}

/**
 * Sets the articleID with a provided value.
 * @param {string} id 
 */
export function setArticle(id) {
    sessionStorage.setItem("pageID", id);
    return sessionStorage.getItem("pageID");
}