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


    /* ******************* NEXT TEST ******************* */

    /* Loop through each feed in the allFeeds object. It should
     * have a URL defined and the URL should not empty.
     */
    var regularExpressionUrl = new RegExp(
        /* Thanks to Diego Perini for the following regular
         * expression for matching URLs.
         * The regular expression is Copyright (c) 2010-2013 Diego Perini (http://www.iport.it).
         */
        "^" +
        // protocol identifier
        "(?:(?:https?|ftp)://)" +
        // user:pass authentication
        "(?:\\S+(?::\\S*)?@)?" +
        "(?:" +
        // IP address exclusion
        // private & local networks
        "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
        "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
        "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
        // IP address dotted notation octets
        // excludes loopback network 0.0.0.0
        // excludes reserved space >= 224.0.0.0
        // excludes network & broacast addresses
        // (first & last IP address of each class)
        "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
        "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
        "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
        "|" +
        // host name
        "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
        // domain name
        "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
        // TLD identifier
        "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
        // TLD may end with dot
        "\\.?" +
        ")" +
        // port number
        "(?::\\d{2,5})?" +
        // resource path
        "(?:[/?#]\\S*)?" +
        "$", "i"
    );

    // Test each feed for a non-empty defined URL
    function testEachFeedInAllFeeds(url) {
      it('should have a feed with a defined URL which is not empty', function() {
        expect(url).toBeDefined();
        expect(url).toMatch(regularExpressionUrl);
      });
    }

    // Loop to verify each feed URL in allFeeds
    allFeeds.forEach(function(feed) {
      var url = feed.url;
      testEachFeedInAllFeeds(url);
    });


    /* ******************* NEXT TEST ******************* */

    /* Loop through each feed in the allFeeds object. It should have
     * a name defined and the name should not empty.
     */
    allFeeds.forEach(function(feed) {
      var name = feed.name;
      it('should have feeds with defined names which are not empty', function() {
        expect(name).toBeDefined();
        expect(name).not.toBe('');
      });
    });
  });


  /* ******************* NEXT SUITE ******************* */

  describe('The menu', function() {

    /* ******************* NEXT TEST ******************* */

    /* The menu element should be hidden by default. You'll
     * have to analyze the HTML and the CSS to determine how we're
     * performing the hiding/showing of the menu element.
     */
    it('should not be displayed on load of index page', function() {
      expect($('body').hasClass('menu-hidden')).toBeTruthy();
    });


    /* ******************* NEXT TEST ******************* */

    /* The menu should change visibility when the menu icon is clicked.
     * This test should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('should be toggled open when the menu icon is clicked', function() {
      // var menuButton = document.getElementsByClassName('menu-icon-link')[0];
      var menuButton = $('.menu-icon-link');
      menuButton.click();
      expect($('body').hasClass('menu-hidden')).toBeFalsy();
      menuButton.click();
      expect($('body').hasClass('menu-hidden')).toBeTruthy();
    })


  });


  /* ******************* NEXT SUITE ******************* */

  describe('Initial Entries', function() {

    /* ******************* NEXT TEST ******************* */

    beforeEach(function(done) {
      loadFeed(0, done);
    });

    /* When the loadFeed function is called and completes its work, there
     * is at least a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test wil require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    it('should display at least one entry in the feed container after load', function() {
      var feedContainer = $('.feed').first();
      expect(feedContainer.children('a').length).toBeGreaterThan(0);
    });

  });


  /* ******************* NEXT SUITE ******************* */

  describe('New Feed Selection', function() {

    /* ******************* NEXT TEST ******************* */

    /* When a new feed is loaded by the loadFeed function
     * that the content should actually change.
     * Remember, loadFeed() is asynchronous.
     */
    var initialFeedTexts;

    /* Get the text content of all diplayed articles in feed. */
    function getFeedTexts() {
      return $('.feed > .entry-link article h2').text();
    }

    /* Load feed 0 first, then record feed texts, then load feed 1. */
    beforeEach(function(done) {
      function reloadFeed() {
        initialFeedTexts = getFeedTexts();
        loadFeed(1, done);
      }

      loadFeed(0, reloadFeed);
    });

    it('should display new article entries after a new feed is loaded', function() {
      var subsequentFeedTexts = getFeedTexts();
      expect(subsequentFeedTexts).not.toBe(initialFeedTexts);
    });
  });
});

