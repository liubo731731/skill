(function () {
    'use strict';
    angular
        .module('php', [
            'app.sidebar',
			'app.routes',
			'app.web'
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
        .module('app.web', []);
})();
(function () {
    'use strict';
    angular
        .module('app.routes', ['ui.router']);
})();
(function () {
    'use strict';
    angular
        .module('app.web')
        .controller('TemplateController', TemplateController);
    TemplateController.$inject = ['$rootScope', '$scope'];
    function TemplateController($rootScope, $scope) {
		
	}

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
	          $urlRouterProvider.otherwise('/first/readme');
		      $stateProvider
				.state('first', { //
					url: '/first/:mdName',
					templateUrl: 'first.html',
					controller: function($scope,$stateParams){
						   jQuery.ajax({
						    url: './md/'+$stateParams.mdName.replace(/\./g, '/')+'.md?t='+(new Date().getTime()/60000),
						    type: "GET",
						    dataType: "text",
						    success: function (data) {
						        jQuery("#mdcontent").text(data);
						        markdown("mdcontent");
						    }
						});
                          //markdownFromText(document.getElementById("mdcontent").innerText, "mdcontent");		
					}
			   })
	};
})()


