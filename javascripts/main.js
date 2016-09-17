let project_list = [];

$(".top-nav").hide();
$(".projects-view").hide();
$(".about-view").hide();
$(".contact-view").hide();
$(".footer").hide();

$(".landing-nav-button").click(function() {
  show_main(event.currentTarget.id);
});

$(".nav-button").click(function() {
  show_page(event.currentTarget.id);
});

$.getJSON("projects/projects.json", function(data) {
  for (let i = 0; i < data.projects.length; i++) {
    project_list.push(data.projects[i]);
  }
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
  case "landing-projects-tab":
    $(".projects-view").show("slide");
    project_nav();
    break;
  case "landing-about-tab":
    $(".about-view").show("slide");
    break;
  case "landing-contact-tab":
    $(".contact-view").show("slide");
    break;
  default:
    console.log("what?");
  }
};

function show_page(choice) {
  event.preventDefault();

  switch (choice) {
  case "projects-tab":
    $(".projects-view").show();
    $(".about-view").hide();
    $(".contact-view").hide();
    project_nav();
    break;
  case "about-tab":
    $(".projects-view").hide();
    $(".about-view").show();
    $(".contact-view").hide();
    break;
  case "contact-tab":
    $(".projects-view").hide();
    $(".about-view").hide();
    $(".contact-view").show();
    break;
  default:
    console.log("what?");
  }
}

function project_nav() {
  $.each(project_list, function(i, project) {
    $("#project-navigation").append(
      `<div>
        <img id="project-${i}" src="${project.image}" alt="${project.title}">
      </div>`
    );
  });
  const default_project = project_list.length - 1;
  current_project_display(default_project);
}

function current_project_display(project_id) {
  let current_project = project_list[project_id];

  let deployed_link;
  if (current_project.deployed === false) {
      deployed_link = "N/A";
  } else {
      deployed_link = current_project.deployed;
  }

  $("#current-project").append(
    `<div>
      <img id="current-project-image" src="${current_project.image}" alt="${current_project.title}">
      <div>
        <p><span class="caps">Title:</span> ${current_project.title}</p>
        <p><span class="caps">Deployed Link:</span> ${deployed_link}</p>
        <p><span class="caps">Github:</span> ${current_project.github}</p>
        <p><span class="caps">Description:</span> ${current_project.description}</p>
      </div>
    </div>`
  );
}




