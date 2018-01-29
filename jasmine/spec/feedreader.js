/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URL defined and not empty', () => {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have name defined and not empty', () => {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', () => {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        const bodyElem = $('body'),
            menuIcon = $('.menu-icon-link');
        let menuHidden;
        const menuStatus = () => bodyElem.hasClass('menu-hidden');
        const menuTrigger = () => menuIcon.triggerHandler('click');

        it('is hidden by default', () => {
            menuHidden = menuStatus();
            expect(menuHidden).toBe(true);
        });


        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when the menu icon is clicked', () => {
            // expect the menu to display when clicked:
            menuTrigger();
            menuHidden = menuStatus();
            expect(menuHidden).toBe(false);
            // expect the menu to be hidden when clicked again:
            menuTrigger();
            menuHidden = menuStatus();
            expect(menuHidden).toBe(true);
        });
    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', () => {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        const feedContainer = $('.feed');
        const findEntries = () => feedContainer.find('.entry');
        let entriesObject,
            entryQuantity;

        beforeEach(done => loadFeed(0, done));

        it('contain at least one entry', () => {
            entriesObject = findEntries();
            entryQuantity = entriesObject.length;
            expect(entryQuantity).toBeGreaterThan(0);
        });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {
        /* TODO: Write a test that ensures when a new feed is loaded
            * by the loadFeed function that the content actually changes.
            * Remember, loadFeed() is asynchronous.
            */
        const feedContainer = $('.feed');
        const getEntryLink = () => feedContainer.find('.entry-link').attr('href');
        let initEntryLink,
            newEntryLink;

        // async-operation-chaining
        beforeEach(done => {
            loadFeed(0, () => {
                initEntryLink = getEntryLink();
                loadFeed(1, done);
            });
        });

        it('actually changes the page content to a new feed', () => {
            newEntryLink = getEntryLink();
            expect(initEntryLink).not.toMatch(newEntryLink);
        });
    });

}());
