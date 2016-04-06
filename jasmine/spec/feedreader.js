/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* Loop through each feed in the allFeeds object. It should have a URL defined
     * and the URL should not empty.
     */
    it('should have feeds with defined URLs which are not empty', function() {
      allFeeds.forEach(function(feed) {
        var url = feed.url;
        expect(url).toBeDefined();
        expect(url).not.toBe('');
      });
    });


    /* Loop through each feed in the allFeeds object. It should have
     * a name defined and the name should not empty.
     */
    it('should have feeds with defined names which are not empty', function() {
      allFeeds.forEach(function(feed) {
        var name = feed.name;
        expect(name).toBeDefined();
        expect(name).not.toBe('');
      });
    })
  });


  /* TODO: Write a new test suite named "The menu" */
  describe('The menu', function() {

  /* The menu element should be hidden by default. You'll
   * have to analyze the HTML and the CSS to determine how we're
   * performing the hiding/showing of the menu element.
   */
    it('should not be displayed on load of index page', function() {
      expect(document.body.classList.contains('menu-hidden')).toBe(true);
    });

  /* The menu should change visibility when the menu icon is clicked.
   * This test should have two expectations: does the menu display when
   * clicked and does it hide when clicked again.
   */
    it('should be toggled open when the menu icon is clicked', function() {
      var menuButton = document.getElementsByClassName('menu-icon-link')[0];
      menuButton.click();
      expect(document.body.classList.contains('menu-hidden')).toBe(false);
      menuButton.click();
      expect(document.body.classList.contains('menu-hidden')).toBe(true);
    })


  });

  describe('Initial Entries', function() {

    beforeEach(function(done) {
      loadFeed(0, done);
    });

  /* When the loadFeed function is called and completes its work, there
   * is at least a single .entry element within the .feed container.
   * Remember, loadFeed() is asynchronous so this test wil require
   * the use of Jasmine's beforeEach and asynchronous done() function.
   */
    it('should display at least one entry in the feed container after load', function(done) {
      var feedContainer = document.getElementsByClassName('feed')[0];
      expect(feedContainer.hasChildNodes()).toBe(true);
      done();
    });

  });

  describe('New Feed Selection', function() {

    var startingFirstItemText;

    function getFirstItemText() {
      return document.querySelector('.feed > .entry-link article h2').textContent;
    }

    beforeEach(function(done) {
      startingFirstItemText = getFirstItemText();
      console.log('here');
      function reloadFeed() {
        loadFeed(1, done);
      }
      loadFeed(0, reloadFeed);
    });

   /* When a new feed is loaded by the loadFeed function
    * that the content should actually change.
    * Remember, loadFeed() is asynchronous.
    */
    it('should display new article entries after a new feed is loaded', function() {
      var subsequentFirstItemText = getFirstItemText();
      expect(subsequentFirstItemText).not.toBe(startingFirstItemText);
    });

  });
}());
