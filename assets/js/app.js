(function () {
    'use strict';
    angular
        .module('php', [
            'app.sidebar',
			'app.routes'
        ]);
})();
(function () {
    'use strict';
    angular
        .module('app.sidebar', []);
})();
(function () {
    'use strict';
    angular
        .module('app.routes', ['ui.router']);
})();

(function () {
    'use strict';
    angular
        .module('app.sidebar')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$rootScope', '$scope'];
    function SidebarController($rootScope, $scope) {
	autoLeftNav();
	$(window).resize(function() {
	    autoLeftNav();
	    console.log($(window).width())
	});
	function autoLeftNav() {
		    $('.tpl-header-switch-button').on('click', function() {
		        if ($('.left-sidebar').is('.active')) {
		            if ($(window).width() > 1024) {
		                $('.tpl-content-wrapper').removeClass('active');
		            }
		            $('.left-sidebar').removeClass('active');
		        } else {
		
		            $('.left-sidebar').addClass('active');
		            if ($(window).width() > 1024) {
		                $('.tpl-content-wrapper').addClass('active');
		            }
		        }
		    })
		
		    if ($(window).width() < 1024) {
		        $('.left-sidebar').addClass('active');
		    } else {
		        $('.left-sidebar').removeClass('active');
		    }
		}
		
		
		// 侧边菜单
 		$('.sidebar-nav-sub-title').on('click', function() {
 		    $(this).siblings('.sidebar-nav-sub').slideToggle(80)
 		        .end()
 		        .find('.sidebar-nav-sub-ico').toggleClass('sidebar-nav-sub-ico-rotate');
		})	
		
	}

})();
(function($) {
	  angular.module('app.routes').config(routeConfig);
		routeConfig.$inject = ['$stateProvider', '$urlRouterProvider','$locationProvider'];
		function  routeConfig($stateProvider, $urlRouterProvider,$locationProvider) {
        $locationProvider.hashPrefix('');
		      $locationProvider.html5Mode(false);
	          $urlRouterProvider.otherwise('/form');
		      $stateProvider
				.state('form', { //单一视图
					url: '/form',
					templateUrl: 'form.html',
			   
			   })
			   .state('404', { //单一视图
					url: '/404',
					templateUrl: '404.html',
				})     
	};
})()


