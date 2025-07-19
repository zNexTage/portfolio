import {Typing} from "./typing.js";

const translateNavbar = (translateJson) => {
    // Translate navbar items
    const navbarItems = document.querySelectorAll("[id^='navbar-']");
    navbarItems.forEach(navItem => navItem.textContent = translateJson.navbarItems[navItem.id]);
}

const translateIntro = translateJson => {
    // Translate intro
    const intro = document.querySelector("#intro-nice-to-meet-you");
    intro.textContent = translateJson.introItems[intro.id];    

    const introRoles = document.querySelector("#intro-my-roles");
    introRoles.setAttribute("data-type", JSON.stringify(translateJson.introItems[introRoles.id]));    
}

const translateAboutMe = translateJson => {
    const aboutMeTitle = document.querySelector("#about-me-title");
    aboutMeTitle.textContent = translateJson.aboutMeItems[aboutMeTitle.id];

    const myHistoryTitle = document.querySelector("#about-me-my-history-title");
    myHistoryTitle.textContent = translateJson.aboutMeItems[myHistoryTitle.id];

    const myHistoryDescription = document.querySelector("#about-me-my-history-description");
    myHistoryDescription.innerHTML = translateJson.aboutMeItems[myHistoryDescription.id];
}

const translateAcademicEducation = translateJson => {
    const academicTitle = document.querySelector("#academic-education-title");
    academicTitle.textContent = translateJson.academicEducationItems[academicTitle.id];

    const academicUfabc = document.querySelector("#academic-formation-ufabc");
    academicUfabc.innerHTML = translateJson.academicEducationItems[academicUfabc.id];

    const academicFatec = document.querySelector("#academic-formation-fatec-maua");
    academicFatec.innerHTML = translateJson.academicEducationItems[academicFatec.id];

    const academicEtec = document.querySelector("#academic-formation-etec-maua");
    academicEtec.innerHTML = translateJson.academicEducationItems[academicEtec.id];
}

const translateProfessionalExperience = translateJson => {
    const professionalExpTitle = document.querySelector("#professional-experiencie-title");
    professionalExpTitle.textContent = translateJson.professionExperiencieItems[professionalExpTitle.id];

    const professionPositionTitle = document.querySelector("#professional-experiencie-position-title");
    professionPositionTitle.innerHTML = translateJson.professionExperiencieItems["professional-experiencie-position-title"];

    const webDeveloper = document.querySelector("#professional-experiencie-web-developer");
    webDeveloper.innerHTML = translateJson.professionExperiencieItems["professional-experiencie-web-developer"];

    const intern = document.querySelector("#professional-experiencie-intern");
    intern.innerHTML = translateJson.professionExperiencieItems["professional-experiencie-intern"];

    const professionalActivitiesTitle = document.querySelectorAll(`[data-id="professional-experiencie-activities"]`);
    professionalActivitiesTitle.forEach(element => element.innerHTML= translateJson.professionExperiencieItems["professional-experiencie-activities"]);

    console.log(translateJson.professionExperiencieItems["professional-experiencies"]);
}



const translate = async (language) => {
    const fallbackLang = "pt-BR";

    if(!language in ["en-US", "pt-BR"]){
        language = fallbackLang;
    }

    const translateJson = await (await fetch(`./languages/${language.toLowerCase()}.json`)).json();

    const translateFunctions = [
        translateNavbar,
        translateIntro,
        translateAboutMe,
        translateAcademicEducation,
        translateProfessionalExperience
    ];

    translateFunctions.forEach(func => func(translateJson));
}


document.addEventListener("DOMContentLoaded", () => {
    // const txtType = typing();
    const typing = Typing.Create("intro-my-roles");

    translate(navigator.language)
        .then(() => {
            console.log("Page translated with success");
        })

    const btnPortuguese = document.querySelector("#navbar-portuguese-button");
    btnPortuguese.addEventListener("click", event=> {
        typing.stop();
        translate("pt-BR");
        typing.tick();
    });

    const btnEnglish = document.querySelector("#navbar-english-button");
    btnEnglish.addEventListener("click", ()=>{
        typing.stop();
        translate("en-US");
        typing.tick();
    });
});