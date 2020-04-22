(function() {
  var close = document.getElementById("cookie_close");
  var banner = document.getElementById("msccBanner");
  var cookie = getCookie("cookieMS");

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function initGA() {
    (function(i, s, o, g, r, a, m) {
      i["GoogleAnalyticsObject"] = r;
      (i[r] =
        i[r] ||
        function() {
          (i[r].q = i[r].q || []).push(arguments);
        }),
        (i[r].l = 1 * new Date());
      (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(
      window,
      document,
      "script",
      "https://www.google-analytics.com/analytics.js",
      "ga"
    );

    ga("create", "UA-62780441-15", "auto");
    ga("send", "pageview");
    $(document).ready(function() {
      $("code").bind({
        copy: function(event) {
          ga("send", "event", {
            eventCategory: window.location.pathname,
            eventAction: "copy_code"
          });
          console.log("Copy");
        },

        cut: function(event) {
          ga("send", "event", {
            eventCategory: window.location.pathname,
            eventAction: "copy_code"
          });
        }
      });

      $("a").click(function(event) {
        ga("send", "event", {
          eventCategory: window.location.pathname,
          eventAction: "click_link",
          eventLabel: event.target.href
        });
      });
    });
  }

  if (cookie) {
    banner.classList.add("hide");
    banner.classList.remove("active");
  }

  if (!cookie) {
    banner.classList.add("active");
    banner.classList.remove("hide");
  }

  if (close) {
    close.addEventListener("click", function() {
      banner.classList.add("hide");
      banner.classList.remove("active");
      setCookie("cookieMS", true, 30);
      initGA();
    });
  }
})();
