import { sayHello, setArticle } from '../js/main.js';
import { connectionEstablished } from '../js/article.js';
import { setItem } from '../js/article.js';

const articleAPIRoute = "https://06hoz1o347.execute-api.us-east-2.amazonaws.com/article";

QUnit.module('hello', function() {

    QUnit.test('make sure the hello function says hello', function(assert) {
        var result = sayHello();
        assert.equal(result, 'hello');
    });

    QUnit.test("make sure there is a connection to the article DB", async function(assert) {
        const connectionValue = await connectionEstablished(articleAPIRoute, true);
        assert.equal(connectionValue, 200);
    });

    // QUnit.test("make sure there is a connection to the post DB", function(assert) {
        
    // });

    QUnit.test("testing setItem function", function(assert) {
        const value = setItem("Hello");
        assert.equal(value, "Hello");
    });

    QUnit.test("testing setArticle function", function(assert) {
        const value = setArticle("Alligator");
        assert.equal(value, "Alligator");
    });

    // QUnit.test("testing file conversion", function(assert) {

    // })

});
