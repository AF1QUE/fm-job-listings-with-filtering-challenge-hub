const jobsContent = document.querySelector(".jobs");
const jobsData = axios.get("../data.json");

function getJobTags(job) {
  let tagsHTML = "";
  job.languages.forEach((item) => {
    tagsHTML += `<span class="tag">${item}</span>`;
  });
  job.tools.forEach((item) => {
    tagsHTML += `<span class="tag">${item}</span>`;
  });

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

jobsData.then((response) => {
  let jobHTML = "";
  response.data.map((job) => {
    let jobTags = getJobTags(job);
    let jobMeta = getJobMeta(job);
    let jobStatus = getJobStatus(job);

    jobHTML += `<div class="job job--featured">
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
