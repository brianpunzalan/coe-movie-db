$(function() {
    var config;
    var baseUrl = 'http://api.themoviedb.org/3/';
    var api_key = '52330cd572ac45cc5d00091b9b0c73e6';


    function initialize(callback){
    	console.log('initializing..');
        
        // setting required parameters of get request for configuration
        var configUrl = baseUrl+'configuration';
        var configParams = {
            api_key : api_key
        }
        var configResponse = function(response){
            config = response;
            callback(config);    
        }

        // get request for configuration (JSON object)
        $.get(configUrl , configParams, configResponse);
    }
    function setEventHandlers(config){
    	
        console.log('setting event handlers..')
    	loadNowShowing();
        function clearActive(){
            $(".navbar-nav > .active").removeClass('active');
        }

        // fetching DOM of search form for handling event query when submitted.
        $('#form-search').submit(function(){
    		searchMovie($('#search-query').val());    // passing query to searchMovie function.
    		return false;                             // return false after searchMovie, to search movies without loading the webpage.     
    	});

        $('#now_showing').click(function(){
            clearActive();
            $(this).parent().addClass("active");
            loadNowShowing();
            return false;
        });

        $('#latest').click(function(){
            clearActive();
            $(this).parent().addClass("active");
            loadLatest();
            return false;
        });

        $('#upcoming').click(function(){
            clearActive();
            $(this).parent().addClass("active");
            loadUpcoming();
            return false;
        });

        $('#popular').click(function(){
            clearActive();
            $(this).parent().addClass("active");
            loadPopular();
            return false;
        });

        $('#top_rated').click(function(){
            clearActive();
            $(this).parent().addClass("active");
            loadTopRated();
            return false;
        });
    }

    function searchMovie(query){
        
        console.log('searching..');

        // setting required parameters of get request for search
        var searchUrl = baseUrl+'search/movie';
    	var searchParams = {
    		api_key: api_key,
    		query: query
    	};
        var searchResponse = function(response){ 
            displayMovies(response, "Search &quot;"+query+"&quot; : "+response.total_results+" results found."); 
        }; // pass data response to displayMovie function to display Movies in the page.

        // get request for searching movies (JSON object)
    	$.get(searchUrl, searchParams, searchResponse);
    }

    function displayMovies(data,category){
        $('.movie-list').html('');
        console.log('displaying movies..');
        console.log('\n\n\n')
        if(data.results.length > 0){
            var headerStr = [
                            '<div class="col-lg-12">',
                                '<h1 class="page-header">'+category+'</h1>',
                            '</div>'
                        ];
            $('.movie-list').append($(headerStr.join('')));
            data.results.forEach(function(movie){
                var poster = config.images.base_url + config.images.poster_sizes[2] + movie.poster_path;
                console.log(poster);
               var htmlStr = [
                                '<div class="col-lg-3 col-md-4 col-xs-6 thumb">',
                                    '<a class="thumbnail" href="#">',
                                        '<img class="img-responsive" src="'+poster+'" alt="">',
                                    '</a>',
                                    '<h4>',
                                        '<a href="#">'+movie.title+'</a>',
                                    '</h4>',
                                '</div>'
                            ];
                $('.movie-list').append($(htmlStr.join('')));
            });
        /*
            var pagination = [
            '<div class="row text-center">',
                '<div class="col-lg-12">',  
                    '<ul class="pagination">',
                        '<li>',
                            '<a href="#">«</a>',
                        '</li>',
                        '<li>',
                            '<a href="#">»</a>',
                        '</li>',
                    '</ul>',
                '</div>',
            '</div>'
                        ];
            for(var i=data.total_pages; i>0 ; i--){
                pagination.splice(5,0,
                    '<li>',
                        '<a href="#">'+i+'</a>',
                    '</li>');
            }

            $('.movie-list').append($(pagination.join('')));          
        */
        }
        else{
            var htmlStr = [
                    '<h3>',
                        'No Results Found.',
                    '</h3>'
            ];
            $('.movie-list').append($(htmlStr.join('')));
        }
    }

    function loadNowShowing(){
        $.get(
            baseUrl+'movie/now_playing',
            {
                api_key:api_key
            },
            function(response){
                displayMovies(response,"Now Showing");
            }
        );
    }

    function loadUpcoming(){
        $.get(
            baseUrl+'movie/upcoming',
            {
                api_key:api_key
            },
            function(response){
                displayMovies(response, "Upcoming");
            }
        );   
    }

    function loadPopular(){
        $.get(
            baseUrl+'movie/popular',
            {
                api_key:api_key
            },
            function(response){
                displayMovies(response, "Popular");
            }
        );
    }

    function loadTopRated(){
        $.get(
            baseUrl+'movie/top_rated',
            {
                api_key:api_key
            },
            function(response){
                displayMovies(response, "Top Rated");
            }
        );
    }

    initialize(setEventHandlers);

});