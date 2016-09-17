$(".top-nav").hide();
$(".projects-view").hide();
$(".about-view").hide();
$(".contact-view").hide();
$(".footer").hide();

$("#landing-projects-tab").click(function() {
  show_main("projects");
});

$("#landing-about-tab").click(function() {
  show_main("about");
});

$("#landing-contact-tab").click(function() {
  show_main("contact");
});

function show_main(choice) {
  event.preventDefault();

  $(".landing-div").animate({
    "left":-$(".landing-div").outerWidth(true)
  },{duration:250,queue:false,
  specialEasing:{"left":"linear"}});

  $(".top-nav").show("slide");

  $(".footer").show("slide");

  switch (choice) {
  case "projects":
    console.log("going to projects page");
    break;
  case "about":
    console.log("going to about page");
    break;
  case "contact":
    console.log("going to the contact page");
    break;
  default:
    console.log("what?");
  }
}
