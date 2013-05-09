
(function($){

  // customize isotope
  // modified Isotope methods for gutters in masonry
  $.Isotope.prototype._getMasonryGutterColumns = function() {
    var gutter = this.options.masonry && this.options.masonry.gutterWidth || 0;
        containerWidth = this.element.width();
  
    this.masonry.columnWidth = this.options.masonry && this.options.masonry.columnWidth ||
                  // or use the size of the first item
                  this.$filteredAtoms.outerWidth(true) ||
                  // if there's no items, use size of container
                  containerWidth;

    this.masonry.columnWidth += gutter;

    this.masonry.cols = Math.floor( ( containerWidth + gutter ) / this.masonry.columnWidth );
    this.masonry.cols = Math.max( this.masonry.cols, 1 );
  };

  $.Isotope.prototype._masonryReset = function() {
    // layout-specific props
    this.masonry = {};
    // FIXME shouldn't have to call this again
    this._getMasonryGutterColumns();
    var i = this.masonry.cols;
    this.masonry.colYs = [];
    while (i--) {
      this.masonry.colYs.push( 0 );
    }
  };

  $.Isotope.prototype._masonryResizeChanged = function() {
    var prevSegments = this.masonry.cols;
    // update cols/rows
    this._getMasonryGutterColumns();
    // return if updated cols/rows is not equal to previous
    return ( this.masonry.cols !== prevSegments );
  };

	function searchComplete(location,search) {
	console.log(location,search);
        // Check that we got results
        console.log(search);
        if (search.results && search.results.length > 0) {

          // Grab our content div, clear it.
          var contentDiv = document.getElementById(location);
          contentDiv.innerHTML = '';
          var items = [];

          // Loop through our results, printing them to the page.
          var results = search.results;

          for (var i = 0; i < results.length; i++) {
            // For each result write it's title and image to the screen
            var result = results[i];
            console.log(result);
            // var imgContainer = document.createElement('div');
            // var title = document.createElement('div');
            
            // // We use titleNoFormatting so that no HTML tags are left in the 
            // // title
            // title.innerHTML = result.titleNoFormatting;
            // var newImg = document.createElement('img');

            // // There is also a result.url property which has the escaped version
            // newImg.src = result.url;
            // imgContainer.appendChild(newImg);
            var base_size = 250;
            var image_size = base_size + (50*i);
            item = '<div class="image-result" style="width:' + base_size + 'px">'
              + '<img style="max-width: 100%; height: auto;" src="' + result.url + '" alt="" >'
              + '</div>';
            // Put our title + image in the content
            items.push(item);
          }
          
          $(contentDiv).isotope({
            itemSelector: '.image-result',
             masonry: {
              columnWidth: 250,
              gutterWidth: 10
             }
          });
          var $items = $( items.join('') );
          $items.imagesLoaded(function(){
            $(contentDiv).isotope( 'insert', $items );
          });
        }

    }

      	function initSearch(searchTerm,location) {
      
        // Create an Image Search instance.
        $.each(searchTerm, function(i, item){
          var imageSearch = new google.search.ImageSearch();
          imageSearch.setResultSetSize(8);
          imageSearch.setSiteRestriction("thesartorialist.com");
          imageSearch.setRestriction(google.search.ImageSearch.RESTRICT_IMAGESIZE, google.search.ImageSearch.IMAGESIZE_LARGE);
          // Set searchComplete as the callback function when a search is 
          // complete.  The imageSearch object will have results in it.
          imageSearch.setSearchCompleteCallback(this, searchComplete, [location[i], imageSearch] );
          // Find me a beautiful car.
          imageSearch.execute(item);
        });

        // var prints = new google.search.ImageSearch();

        // // Set searchComplete as the callback function when a search is 
        // // complete.  The imageSearch object will have results in it.
        // prints.setSearchCompleteCallback(this, searchComplete, ['content']);
        // // Find me a beautiful car.
        // prints.execute("site:thesartorialist.com prints");

        // Include the required Google branding
        google.search.Search.getBranding('branding');
     	
     	}
      function OnLoad (){

        initSearch(["floral pattern","black leather women"],["rec", "black"]);
        
      }
      google.setOnLoadCallback(OnLoad);
})(jQuery)