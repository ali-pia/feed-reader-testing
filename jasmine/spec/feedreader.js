/* feedreader.js
 *
 * Spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* First test suite - RSS feeds definitions.
     * The allFeeds variable in our applicationa test suite just contains
     * a related set of tests. 
     */
    describe('RSS Feeds', function () {
        /* First test - allFeeds variable has been defined and that it is not
         * empty.  
         */
        it('Feed are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('Feed has url', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeTruthy();
            });
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('Feed has name', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeTruthy();
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */

    describe('The menu', function () {

        /* Test - menu element is 
         * hidden by default. 
         */

        it('Menu element is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toEqual(true);

        });

        /* Test - menu changes visibility when the menu icon is clicked. 
         * Write two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it('Working toggle on click event', function () {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function () {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('Feed has at least a single entry', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function () {
        var firstFeed, secondFeed;

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function (done) {
            $('.feed').empty();
            loadFeed(0, function () {
                firstFeed = $('.feed').find(allFeeds.url);
                done();
            });
            loadFeed(1, function () {
                secondFeed = $('.feed').find(allFeeds.url);
                done();
            });
        });

        it('Two feeds are different', function () {
            expect(firstFeed).not.toBe(secondFeed);
        });
    });
}());