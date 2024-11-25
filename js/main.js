window.onload = loaded;

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
    console.log(pageID);
}

/**
 * This function returns the string 'hello'
 * @return {string} the string hello
 */
export function sayHello() {
    return 'hello';
}

export async function setArticle(id) {
    console.log(id);
    articleID = id;
}
