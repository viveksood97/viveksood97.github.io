const details = {
    "Rezoom": {
        "title": "Graduate Student Researcher",
        "organization": "Maryland Robotics Center",
        "duration": "Jun 2021 - Present",
        "details": ["Developed and shipped highly interactive web applications for Apple Music using Ember.js",
            "Built and shipped the Apple Music Extension within Facebook Messenger leveraging third-party and internal APIs",
            "Architected and implemented the front-end of Apple Music's embeddable web player widget, which lets users log in and listen to fdivl songs in the browser ",
            "Contributed extensively to MusicKit.js, a JavaScript framework that allows developers to add an Apple Music player to their web apps "]
    },
    "DIT": {
        "title": "Student Software Developer",
        "organization": "Department of Information Technology",
        "duration": "Oct 2021 - Present",
        "details": ["Developed and shipped highly interactive web applications for Apple Music using Ember.js",
            "Built and shipped the Apple Music Extension within Facebook Messenger leveraging third-party and internal APIs",
            "Architected and implemented the front-end of Apple Music's embeddable web player widget, which lets users log in and listen to fdivl songs in the browser ",
            "Contributed extensively to MusicKit.js, a JavaScript framework that allows developers to add an Apple Music player to their web apps "]
    },
    "Airtel": {
        "title": "Network Automation Engineer",
        "organization": "Bharti Airtel",
        "duration": "Jun 2019 - Dec 2020",
        "details": ["Developed and shipped highly interactive web applications for Apple Music using Ember.js",
            "Built and shipped the Apple Music Extension within Facebook Messenger leveraging third-party and internal APIs",
            "Architected and implemented the front-end of Apple Music's embeddable web player widget, which lets users log in and listen to fdivl songs in the browser ",
            "Contributed extensively to MusicKit.js, a JavaScript framework that allows developers to add an Apple Music player to their web apps "]
    },
    "Analog Devices": {
        "title": "Project Intern",
        "organization": "Analog Devices Inc.",
        "duration": "Oct 2021 - Present",
        "details": ["Developed and shipped highly interactive web applications for Apple Music using Ember.js",
            "Built and shipped the Apple Music Extension within Facebook Messenger leveraging third-party and internal APIs",
            "Architected and implemented the front-end of Apple Music's embeddable web player widget, which lets users log in and listen to fdivl songs in the browser ",
            "Contributed extensively to MusicKit.js, a JavaScript framework that allows developers to add an Apple Music player to their web apps "]
    }
}
const orgs = ["DIT", "Rezoom", "Airtel", "Analog Devices"]
const latestOrg = "DIT";

function insertOrgs() {
    let orgContainer = document.querySelector('.work-experience-list')
    orgs.forEach(org => {
        orgContainer.innerHTML += `<div class="checkbox" onclick="toggleExperience(this)">
                    <div class="input">
                    <div class="label">${org}</div class="label">
                    </div>
                  </div>`
    })
}
function toggleExperience(e) {
    const experiences = document.querySelectorAll(".input");
    var object = details[e.childNodes[1].childNodes[1].innerHTML];

    var part_one = `<div class="card-info">
    <div class="experience-title">${object.title}<span> @ ${object.organization}</span></div>
    <div class="experience-duration">${object.duration}</div>`
    var experienceDetails = "";
    object.details.forEach(detail => {
        experienceDetails += `<div class="experience-detail-item">${detail}</div>`
    })

    var part_two = `<div class="experience-details">${experienceDetails}</div></div>`

    for (let experience of experiences) {
        experience.classList.remove('checked');
    }
    e.childNodes[1].classList.add('checked');
    document.querySelector(".work-experience-content-left").innerHTML = part_one + part_two;
}
insertOrgs();
toggleExperience(document.querySelector(".work-experience-list").childNodes[1])

async function auto_update_projects() {
    let response = await fetch(`https://api.github.com/users/viveksood97/repos`);
    let data = await response.json().then(ele => {
        ele.forEach(element => {
            if (element.description !== null && element.description.includes("#")) {
                folder = "#";
                id = element.id;
                default_branch = element.default_branch;
                github = element.html_url;
                projectLink = "#";
                title = element.name;
                content = element.description;
                tech = "<li>Next.js</li><li>GitHub API</li><li>Chart.js</li>";
                string = ` <a class="corner-box" href=${github} target="_blank">
                            <div class="left-legend">
                                <div class="data-source">
                                    INTERNAL_DOC_ID: [${id}]
                                </div>
                            </div>
                            <div class="corner-box-content-wrapper"><div class="corner-box-content-bg">
                                <div class="corner-box-content">
                                    ${title}<br>
                                ${content}</div>
                                
                            </div></div>
                            <div class="right-legend">
                                <div class="data-source">
                                    904add5c-50c9-4a39-a945-36cb99cc3327
                                </div>
                            </div>
                        </a>`;
                document.querySelector('.wrapper').innerHTML += string;


            }
        });
    })
}

auto_update_projects()