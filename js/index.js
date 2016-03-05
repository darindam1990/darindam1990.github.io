(function() {
  var careerChoices = ["an engineer.", "a hacker.", "a design-enthusiast.", "BATMAN... Just Kidding ;)"];
  var counter = 0;
  var str = careerChoices[counter];
  var len = careerChoices.length;
  var id = setInterval(animate, 200);
  function animate () {
    var nextIdx;
    var currTxt = $(".animated").text();
    if (currTxt == str) {
      currTxt = "";
      counter = (counter + 1) % len;
      str = careerChoices[counter];
    }
    if (currTxt) {
      nextIdx = str.indexOf(currTxt) + currTxt.length + 1;
    } else {
      nextIdx = 1;
    }
    $(".animated").text(str.substring(0, nextIdx));
    if ($(".animated").text() == str) {
      clearInterval(id);
      setTimeout(function(){
        id = setInterval(animate, 200);
      }, 1500);
    }
  }
})();

$(document).ready(function() {
  $(window).on('hashchange', hashchanged);
  hashchanged();
  // Thanks to http://suprb.com/apps/gridalicious/
  $("#misc").gridalicious({
    gutter: 13,
    animate: true
  });
});

function hashchanged() {
  removeAllListSelection();
  var section = window.location.href.split("#")[1];
  if (section) {
    var $link = $(".menu a[href='#" + section + "']");
    $link.addClass('selected');
  } else {
    var $link = $(".menu a[href='#']");
    $link.addClass('selected');
  }
  hideAllSections();
  var $id = (typeof section === "undefined" || section === "") ? "#home" : "#"+section;
  $("body").css({'background-image': setBgImg($id)});
  $($id).fadeIn(400);
}

$(".menu").on('click', "a", function(event){
  removeAllListSelection();
  $(this).addClass('selected');
  hideAllSections();
  var $id = $(this).attr('href') === "#" ? "#home" : $(this).attr('href');
  $("body").css({'background-image': setBgImg($id)});
  $($id).fadeIn(400);
});

function removeAllListSelection() {
  $(".menu > a").each(function(idx, elem) {
    $(elem).removeClass('selected');
  });
}

function hideAllSections() {
  $("section.views:visible").each(function(idx, elem) {
    $(elem).hide();
  });
}

function setBgImg(id) {
  switch(id) {
    case "#home":
      return "url(assets/dallas.jpg)";
    case "#projects":
      return "url(assets/death_valley.jpg)";
    case "#misc":
      return "url(assets/joshua.jpg)";
    case "#contact":
      return "url(assets/rio.jpg)";
  }
}


