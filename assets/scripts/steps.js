(function ($) {
    // Declare options
    var COPY_TIME = 2000;

    var selectors = {
        container: '.js-steps',
        header: '.js-stepsheader',
        copy: '.js-copy',
        loading: '.js-loading',
        quote: 'blockquote p',
        step: 'h2',
    };

    var classes = {
        title: 'sql-page_steps-title',
        block: 'sql-page_steps-block',
        hidden: 'is-hidden',
        copy: 'js-copy sql-page_steps-copy',
        intro: 'sql-page_steps-intro',
        sticky: 'is-sticky'
    };

    var texts = {
        copy: '<i class="fa fa-clipboard" aria-hidden="true"></i> Copy',
        copied: 'Copied!',
        star: '<i class="sql-page_steps-star fa fa-star" aria-hidden="true"></i>'
    };

    // Methods that we need
    var initContainer = function () {
        var $container = $(selectors.container);
        if ($container.length < 1) {
            return;
        }
        var $steps = $container.children(selectors.step);
        var $intro = $container.children(selectors.intro).first().addClass(classes.intro);
        var $newContainer = $('<div/>');
        $newContainer.html($intro);

        $steps.each(function (i, el) {
            var $el = $(el);
            $el.addClass(classes.title);
            var $step = $('<div/>');
            $step.addClass(classes.block);
            $step.append($el.nextUntil(selectors.step));
            $step.find(selectors.quote).prepend(texts.star);
            $step.prepend($el);
            $newContainer.append($step);
        });

        $container.append($newContainer);

        return $container;
    };

    var initSticky = function () {
        var $window = $(window);
        var $header = $(selectors.header);
        if ($header.length < 1) {
            return;
        }
        var position = $header.position();
        $window.on('scroll', function () {
            var top = $(window).scrollTop();
            if (top > position.top) {
                $header.addClass(classes.sticky);
                return;
            }

            $header.removeClass(classes.sticky);
        });
    };

    var initCopy = function () {
        var options = {
            target: function (trigger) {
                return trigger.previousElementSibling;
            }
        };

        var copy = new Clipboard(selectors.copy, options);

        copy.on('success', function (e) {
            e.clearSelection();
            $el = $(e.trigger);
            $el.html(texts.copied);
            setTimeout(function () {
                $el.html(texts.copy);
            }, COPY_TIME);
        });
    };

    var generateCopyButton = function () {
        var $btn = $('<button/>');
        $btn.html(texts.copy);
        $btn.addClass(classes.copy);
        return $btn;
    };
    /*
    $(document).ready(function() {

    console.log(window.location.href);
    console.log("test");
    var path = window.location.href;
    var windows = "windows";
    var isWindows;
    isWindows = path.includes(windows);
    });

*/
    var checkContent = function ($container) {
        // Terminal

        console.log(window.location.href);
        console.log("test");
        var path = window.location.href;
        var windows = "windows";
        var isWindows;

        isWindows = path.indexOf(windows);
        if (isWindows >=0){
            $container
                .find('.language-terminal.highlighter-rouge pre')
                .addClass('command-line')
                .attr('data-prompt', '>');
        }
        else{
            $container
                .find('.language-terminal.highlighter-rouge pre')
                .addClass('command-line')
                .attr('data-prompt', '$');
        }        
        // Clipboard
        $container
            .find('.highlighter-rouge pre')
            .attr('tabindex', '0')
            .append(generateCopyButton());

        $container
            .find('.language-results')
            .parent()
            .attr('tabindex', '0');

        return $container;
    };

    // Init Sticky
    initSticky();

    // Init the info of the container
    var $container = initContainer();

    if ($container) {
        var $loading = $(selectors.loading);

        // Check for modifications
        $container = checkContent($container);

        // Initialize copy button
        initCopy();

        // Show the content
        var TIME = 250;
        $loading.fadeOut(TIME);
        setTimeout(function() {
            $container.fadeIn(TIME * .5);
        }, TIME * .9);
    }
})(jQuery);
