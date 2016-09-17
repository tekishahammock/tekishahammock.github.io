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
  project_nav();
});

function show_main(choice) {
  event.preventDefault();

  $(".landing-div").hide();
  // $(".landing-div").animate({
  //   "left":-$(".landing-div").outerWidth(true)
  // },{duration:250,queue:false,
  // specialEasing:{"left":"linear"}});

  $(".top-nav").show();

  $(".footer").show();

  switch (choice) {
  case "landing-projects-tab":
    $(".projects-view").show();
    break;
  case "landing-about-tab":
    $(".about-view").show();
    break;
  case "landing-contact-tab":
    $(".contact-view").show();
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
      `<div class="col-md-3 col-sm-4 col-xs-6">
        <div id="project-${i}" class="project-button">
          <img src="${project.image}" alt="${project.title}">
          <div id="button-hover-${i}" class="hover-overlay"><p>${project.title}</p></div>
        </div>
      </div>`
    );
    let hide_hover = `#button-hover-${i}`;
    $(hide_hover).hide();
  });
  const default_project = project_list.length - 1;
  current_project_display(default_project);

  $(".project-button").click(function() {
    current_project_display(event.currentTarget.id.replace("project-", ""));
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

  $(".project-button").mouseenter(function() {
    project_button_hover(event.currentTarget);
  });

  $(".project-button").mouseleave(function() {
    project_button_leave(event.currentTarget);
  });
}

function current_project_display(project_id) {
  let current_project = project_list[project_id];

  let deployed_link;
  if (current_project.deployed === false) {
      deployed_link = "N/A";
  } else {
      deployed_link = `<a href="${current_project.deployed}">Project Site</a>`;
  }

  $("#current-project").html(
    `<div id="current-image-container" class="col-md-8">
      <img id="current-project-image" src="${current_project.image}" alt="${current_project.title}">
    </div>
    <div id="current-text-container" class="col-md-4">
      <div class="interior-text">
        <p><span class="caps">Title:</span> ${current_project.title}</p>
        <p><span class="caps">Deployed Link:</span> ${deployed_link}</p>
        <p><span class="caps">Github:</span> <a href="${current_project.github}">Github</a></p>
        <p><span class="caps">Description:</span> ${current_project.description}</p>
      </div>
    </div>`
  );
}

function project_button_hover(mouseenter) {
  let this_project = mouseenter.id.replace("project-", "#button-hover-");
  $(this_project).show();
}

function project_button_leave(mouseleave) {
  let this_project = mouseleave.id.replace("project-", "#button-hover-");
  $(this_project).hide();
}




