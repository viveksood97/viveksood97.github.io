feather.replace({ 'stroke-width': 3.2 });

function diff_months(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 7 * 4);
    return Math.abs(Math.round(diff));

}

function getWords(monthCount) {
    function getPlural(number, word) {
        return number === 1 && word.one || word.other;
    }

    var months = { one: 'month', other: 'months' },
        years = { one: 'year', other: 'years' },
        m = monthCount % 12,
        y = Math.floor(monthCount / 12),
        result = [];

    y && result.push(y + ' ' + getPlural(y, years));
    m && result.push(m + ' ' + getPlural(m, months));
    return result.join(' and ');
}


const details = {
    "Rezoom": {
        "title": "Graduate Student Researcher",
        "organization": "Maryland Robotics Center",
        "duration": "June 2021 - Present",
        "website": "http://cdcl.umd.edu/",
        "name": "ReZoom",
        "details": ["REZOOM is an artificial intelligence (AI) logistics, operations, and management solution easily retrofitted to e-scooters and other micro mobility platforms to enable self-driving.",
            "Developing hardware and software for autonomous electric scooters.",
            "Architected and implemented a highly modular TCP based communication pipeline for varied data streams for IOT and Robotic applications.",
            "Contributed extensively to the hardware prototyping for the autonomous scooter"]
    },
    "DIT": {
        "title": "Student Software Developer",
        "organization": "Department of Information Technology",
        "duration": "October 2021 - January 2022",
        "website": "https://www.analog.com/",
        "details": ["Developed and shipped highly interactive web applications for Apple Music using Ember.js",
            "Built and shipped the Apple Music Extension within Facebook Messenger leveraging third-party and internal APIs",
            "Architected and implemented the front-end of Apple Music's embeddable web player widget, which lets users log in and listen to fdivl songs in the browser ",
            "Contributed extensively to MusicKit.js, a JavaScript framework that allows developers to add an Apple Music player to their web apps "]
    },
    "Airtel": {
        "title": "Network Automation Engineer",
        "organization": "Airtel",
        "duration": "June 2019 - December 2020",
        "website": "https://www.airtel.in/",
        "name": "Bharti Airtel Ltd.",
        "details": ["Designed and developed a web-based inventory viewing utility (Ingress).",
            "Developed an automatic end to end device connectivity verification for PAN India network",
            "Architected an auto-ticketing and auto-resolving script for day to day network issues.",
            "Developed and deployed business process model notation (BPMN) workflows for automation of network operation tasks.",
            "Designed a python-based web application for the centralization of scripts required for daily tasks"]
    },
    "Analog Devices": {
        "title": "Project Intern",
        "organization": "Analog Devices",
        "duration": "June 2018 - September 2018",
        "website": "https://www.analog.com/",
        "name": "Analog Devices Inc.",
        "details": ["Collaborated to develop and design a system to weigh vehicles in motion",
            "Developed SPI driver for communication between AD4003(SAR ADC) and AD4050, STM32L476(Micro-controllers)",
            "Built a configurable python based signal generator to mimic input signals",
            "Built a test bench for testing and calibrating the system"]
    }
}
const orgs = ["Rezoom", , "Airtel", "Analog Devices"]

function insertOrgs() {
    let orgContainer = document.querySelector('.work-experience-list')
    orgs.forEach(org => {
        orgContainer.innerHTML += `<div class="checkbox" onclick="toggleExperience(this)">
                    <div class="input">
                    <div class="label">${org}</div>
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
    var [dt1, dt2] = object.duration.split("-");
    var dtF = (dt2 === " Present") ? Date.today() : Date.parse(dt2);
    let duration = diff_months(Date.parse(dt1), dtF) + 1
    document.querySelector(".work-experience-content-left").innerHTML = part_one + part_two;
    document.querySelector(".work-experience-content-right").innerHTML = `duration: &nbsp;${getWords(duration)}`;
    document.querySelector(".work-experience-footer-content").innerHTML = `<span class="part-one">Website: &nbsp;<a href="${object.website}" target="_blank">${object.website}</a></span>
                                                <span class="part-two">Registered Name: &nbsp;${object.name}</span>`
}
insertOrgs();
toggleExperience(document.querySelector(".work-experience-list").childNodes[1])

let projectObject = {};
async function auto_update_projects() {
    let response = await fetch(`https://api.github.com/users/viveksood97/repos`);
    let data = await response.json().then(ele => {
        ele.forEach(element => {
            if (element.description !== null && element.description.includes("#")) {
                folder = "#";
                id = element.id;
                topics = element.topics;
                topicsArr = []
                topicsString = `<div class="project-topics">`;
                topics.forEach(topic => {
                    topicsArr.push(topic)
                    topicsString += `<span class="topics">${topic}</span>`
                });
                topicsString += "</div>"

                default_branch = element.default_branch;
                github = element.html_url;
                projectLink = "#";
                title = element.name;
                content = element.description;
                content = content.slice(0, -1)
                bg = element.homepage;
                bg = bg ? bg : "https://cdna.artstation.com/p/assets/images/images/008/571/854/large/klaus-wittmann-overdrive-b-w.jpg?1513640413";
                projectObject[id] = {"project-title":`Project: ${title}`, "project-description":content, "project-topics":topicsArr}
                string = ` <a class="corner-box" href=${github} target="_blank">
                            <div class="left-legend">
                                <div class="data-source">
                                    INTERNAL_DOC_ID: [${id}]
                                </div>
                            </div>
                            <div class="corner-box-content-wrapper"><div class="corner-box-content-bg" style="background:url(${bg}); background-size:cover;">
                            <div class="triangle"></div>
                                <div class="corner-box-content" id="${id}" onmouseover="randomOnHover(this)" onmouseout="normalOnNotHover(this)">
                                    <div class="project-top">
                                        <h1 class="project-title">Project: ${title}</h1>
                                        <p class="project-description">${content}</p>
                                    </div>
                                    ${topicsString}
                            </div>
                                
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

const scrambleText = text => {
    const randomInt = max => Math.floor(Math.random() * max)
    const randomFromArray = array => array[randomInt(array.length)]
    const chars = '*?><[]&@#)(.%$-_:/;?!'.split('')
    return text
        .split('')
        .map(x => randomInt(3) > 1 ? randomFromArray(chars) : x)
        .join('')
}

function scrambleHandler(e, id) {
    let count = 0;
    
    let interval = setInterval(() => {
        if (++count === 5) {
            clearInterval(interval)
            e.innerText = projectObject[id][e.className]
        } else {
            e.innerText = scrambleText(projectObject[id][e.className])
        }
    }

        , 100)
}

function scrambleHandlerTopics(e, id, index) {
    let count = 0;
    let interval = setInterval(() => {
        if (++count === 5) {
            clearInterval(interval)
            e.innerText = projectObject[id]["project-topics"][index].toUpperCase();
        } else {
            e.innerText = scrambleText(projectObject[id]["project-topics"][index].toUpperCase())
        }
    }

        , 70)
}





function randomOnHover(e) {
    let id = e.id
    let index = 0;
    
    let arr = [e.querySelector("h1"), e.querySelector("p")]
    let arrTopics = e.querySelectorAll("span")
    
    arr.forEach(ele => scrambleHandler(ele,id))
    arrTopics.forEach(ele => {
        scrambleHandlerTopics(ele,id,index)
        index += 1
    })
    
}

function normalOnNotHover(e) {
    let id = e.id
    let arr = [e.querySelector("h1"), e.querySelector("p")]
    arr.forEach(ele => scrambleHandler(ele,id))
}

window.addEventListener("scroll", () => {
    let element =  document.querySelector('.scroll-down')
    let distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;
	let scrollTop = document.documentElement.scrollTop;

    var fontSize = 25;
    
	
	let opacity = 1;
    diff = scrollTop - distanceToTop;    
	let diffOpacity = opacity - (diff / 500);
    let diffFont = fontSize - (diff/70);
	element.style.opacity = diffOpacity;
	
    if (diffFont < 0) {
        element.style.fontSize = "0px";
    }
    else {
        element.style.fontSize = `${diffFont}px`;
    }
    

    
});








// document.onreadystatechange = function () {
//     if(document.readyState === "complete"){
//         document.querySelector(".loader").setAttribute("style", "height: 0; visibility:hidden");
//         document.querySelector(".page-wrapper").style.visibility = "visible";
//     }
//   }
