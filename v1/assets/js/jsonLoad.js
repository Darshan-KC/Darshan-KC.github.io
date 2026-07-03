$(document).ready(function () {
  // Load education
  $.getJSON("json/education.json", function (data) {
    let educationHTML = "";
    data.forEach(function (item) {
      educationHTML += `<div class="resume-item">
                        <h4>${item.degree}</h4>
                        <h5>${item.graduationDate}</h5>
                        <p><em>${item.university}</em></p>
                        <p>${item.fieldOfStudy}</p>
                      </div>`;
    });
    $("#education").html(educationHTML);
  });

  // Load work experience
  $.getJSON("json/experience.json", function (data) {
    // Sort by id descending
    data.sort((a, b) => b.id - a.id);

    let workHTML = "";
    data.forEach(function (item) {
      workHTML += `<div class="resume-item">
                   <h4>${item.jobTitle}</h4>
                   <h5>${item.dates}</h5>
                   <p><em>${item.company}${
        item.location ? ", " + item.location : ""
      }</em></p>
                   <ul>`;
      item.responsibilities.forEach(function (resp) {
        workHTML += `<li>${resp}</li>`;
      });
      workHTML += `</ul></div>`;
    });

    $("#work-experience").html(workHTML);
  });

  // Load community experience
  $.getJSON("json/community.json", function (data) {
    // Sort by id descending
    data.sort((a, b) => b.id - a.id);

    let communityHTML = `<div class="row">`;
    data.forEach(function (item, index) {
      communityHTML += `<div class="col-lg-6 col-md-12 mb-4">
                        <div class="resume-item">
                          <h4>${item.role}</h4>
                          <h5>${item.dates}</h5>
                          <p><em>${item.organization}</em></p>
                          <ul>`;
      item.responsibilities.forEach(function (resp) {
        communityHTML += `<li>${resp}</li>`;
      });
      communityHTML += `</ul></div></div>`;
    });
    communityHTML += `</div>`;

    $("#community-experience").html(communityHTML);
  });

  // Load skills data
  $.getJSON("json/skills.json", function (data) {
    let skillsHTML = "";

    // First Row: Soft Skills and Languages
    skillsHTML += `<div class="row d-flex align-items-stretch">`;

    // Soft Skills
    skillsHTML += `<div class="col-md-6 mb-4 d-flex">
    <div class="skills-item flex-fill" data-aos="fade-up" data-aos-delay="200">
      <h3 class="skill-category">Soft Skills</h3>
      <ul class="list-unstyled">`;
    data.softSkills.forEach(function (skill) {
      skillsHTML += `<li class="skill"><i class="bi bi-check-circle-fill"></i> ${skill}</li>`;
    });
    skillsHTML += `</ul></div></div>`;

    // Languages
    skillsHTML += `<div class="col-md-6 mb-4 d-flex">
    <div class="skills-item flex-fill" data-aos="fade-up" data-aos-delay="300">
      <h3 class="skill-category">Languages</h3>
      <ul class="list-unstyled">`;
    data.languages.forEach(function (language) {
      skillsHTML += `<li class="skill"><i class="bi bi-check-circle-fill"></i> ${language}</li>`;
    });
    skillsHTML += `</ul></div></div>`;
    skillsHTML += `</div>`; // Close first row

    // Second Row: Technical Skills
    skillsHTML += `<div class="row">`;
    Object.keys(data.technicalSkills).forEach(function (category, catIndex) {
      skillsHTML += `<div class="col-md-6 col-lg-4 mb-4">
      <div class="skills-item" data-aos="fade-up" data-aos-delay="${
        400 + catIndex * 100
      }">
        <h3 class="skill-category">${category}</h3>
        <ul class="list-unstyled">`;
      data.technicalSkills[category].forEach(function (skill) {
        skillsHTML += `<li class="skill"><i class="bi bi-check-circle-fill"></i> ${skill}</li>`;
      });
      skillsHTML += `</ul></div></div>`;
    });
    skillsHTML += `</div>`; // Close technical skills row

    $("#skills-list").html(skillsHTML);
  }).fail(function (jqxhr, textStatus, error) {
    console.error("Error loading JSON: " + textStatus + ", " + error);
  });

  // Load awards data
  $.getJSON("json/awards.json", function (data) {
    let awardsHTML = "";
    data.forEach(function (item) {
      awardsHTML += `<div class="award-item">
                        <h3>${item.awardName}</h3>
                        <h4>${item.issuingOrganization}</h4>
                        <p>${item.dateReceived}</p>
                    </div>`;
    });
    $("#awards").html(awardsHTML);
  });

  // Load portfolio data
  $.getJSON("json/projects.json", function (data) {
    let portfolioHTML = "";
    let countryFiltersHTML = `<li data-filter="*" class="filter-active">All</li>`;
    let uniqueCountries = [];

    // Sort by id descending
    data.sort((a, b) => b.id - a.id);

    data.forEach((item) => {
      if (!uniqueCountries.includes(item.country))
        uniqueCountries.push(item.country);
    });
    uniqueCountries.forEach((country) => {
      countryFiltersHTML += `<li data-filter=".filter-${country}">${country}</li>`;
    });
    $("#countryFilters").html(countryFiltersHTML);

    const levelMap = {
      1: "badge-junior",
      2: "badge-mid",
      3: "badge-mid",
      4: "badge-senior",
    };

    data.forEach((item) => {
      let badgeClass =
        item.level === 1
          ? "badge-junior"
          : item.level === 2
          ? "badge-associate"
          : item.level === 3
          ? "badge-mid"
          : item.level === 4
          ? "badge-senior"
          : "badge-junior";

      let badgeText =
        item.level === 1
          ? "Junior"
          : item.level === 2
          ? "Associate"
          : item.level === 3
          ? "Mid"
          : item.level === 4
          ? "Senior"
          : "Junior";

      portfolioHTML += `
      <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-${
        item.country
      }">
        <img src="${item.image}" alt="${item.title}">
        <span class="badge-level ${badgeClass}">${badgeText}</span>
        <div class="portfolio-info">
          <h4 class="text-primary">${item.title}</h4>
          <p>${item.type} | ${item.role}</p>
          <strong>Key Features:</strong>
          <ul>
            ${item.features.map((f) => `<li>${f}</li>`).join("")}
          </ul>
          <div class="tech-list">
            ${item.technologiesUsed
              .map((t) => `<span class="tech-item-small text-dark">${t}</span>`)
              .join("")}
          </div>
          <div class="text-center">
            <a href="project-details.html?slug=${
              item.slug
            }" class="btn btn-outline-light btn-lg px-4 py-2 mt-2" target="_blank">View Details</a>
          </div>
        </div>
      </div>
    `;
    });

    $("#projectContainer").html(portfolioHTML);

    var $grid = $(".isotope-container").isotope({
      itemSelector: ".portfolio-item",
      layoutMode: "fitRows",
    });

    $(".isotope-filters li").on("click", function () {
      $(".isotope-filters li").removeClass("filter-active");
      $(this).addClass("filter-active");
      var filterValue = $(this).attr("data-filter");
      $grid.isotope({ filter: filterValue });
    });

    $grid.imagesLoaded().progress(function () {
      $grid.isotope("layout");
    });
  });

  // Load mentorship data
  //   $.getJSON("json/mentorship.json", function (data) {
  //     let mentorshipHTML = "";
  //     data.forEach(function (item) {
  //       mentorshipHTML += `<div class="mentorship-item">
  //                         <h3>${item.title}</h3>
  //                         <h4>${item.organization}</h4>
  //                         <p>${item.location}</p>
  //                         <p>${item.dates}</p>
  //                         <p>${item.details}</p>
  //                     </div>`;
  //     });
  //     $("#mentorship").html(mentorshipHTML);
  //   });
});
