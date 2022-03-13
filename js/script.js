// DOM Part

const jobsContent = document.querySelector(".jobs");
const filterGroup = document.querySelector(".filters");

function getJobTags(job) {
  let tagsHTML = "";
  job.languages.forEach((item) => {
    tagsHTML += `<span class="tag" data-id="${item}">${item}</span>`;
  });
  job.tools.forEach((item) => {
    tagsHTML += `<span class="tag" data-id="${item}">${item}</span>`;
  });

  tagsHTML += `<span class="tag" data-id="${job.role}">${job.role}</span>`;
  tagsHTML += `<span class="tag" data-id="${job.level}">${job.level}</span>`;

  return tagsHTML;
}

function getJobMeta(job) {
  let metaHTML = "";
  metaHTML += `<span class="meta">${job.postedAt}</span>`;
  metaHTML += `<span class="meta">${job.location}</span>`;
  metaHTML += `<span class="meta">${job.contract}</span>`;

  return metaHTML;
}

function getJobStatus(job) {
  let statusHTML = "";
  if (job.new) {
    statusHTML += `<span class="status status--new">New!</span>`;
  }
  if (job.featured) {
    statusHTML += `<span class="status status--featured">Featured</span>`;
  }

  return statusHTML;
}

const jobsData = axios.get("../data.json").then((response) => {
  let jobHTML = "";
  response.data.map((job) => {
    let jobTags = getJobTags(job);
    let jobMeta = getJobMeta(job);
    let jobStatus = getJobStatus(job);

    jobHTML += `<div class="job ${job.featured ? "job--featured" : ""}">
      <img src="${job.logo}" alt="" class="job__logo">
      <div class="job__content">
      <span class="job__content__company">${job.company}</span>
      <div class="job__content__status">${jobStatus}</div>
      <h1 class="job__content__title">Senior Frontend Developer</h1>
      <div class="job__content__meta">${jobMeta}</div>
  </div>
  <div class="job__tags">${jobTags}</div>
</div>`;
  });

  jobsContent.innerHTML = jobHTML;
});

// Filter Part

window.addEventListener("load", () => {
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      const filterItem = e.currentTarget.dataset.id;
      addFilters(filterItem);
    });
  });
});

let activeFilters = [];

function addFilters(tagName) {
  if (!activeFilters.includes(tagName)) {
    activeFilters.push(tagName);
  }

  showFilters(activeFilters);
}

function showFilters(filters) {
  let filtersHTML = "";
  filters.forEach((filter) => {
    filtersHTML += ` <div class="filter">
        <button class="filter__title" data-id="${filter}">${filter}</button>
        <div class="filter__remove"><img src="/images/icon-remove.svg" alt="remove button"></div>
      </div>`;
  });

  filterGroup.innerHTML = filtersHTML;
}

// const removeBtn = document.querySelectorAll("filter__remove");
// removeBtn.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     console.log("its working");
//   });
// });
