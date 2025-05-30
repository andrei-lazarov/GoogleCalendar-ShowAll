let MyCalendarsContainer;
let OtherCalendarsContainer;

function waitForElement(selector) {
    // console.log("waiting for " + selector);
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

async function findCalendarsContainers() {
    // console.log("looking for MyCalendarsContainer");
    MyCalendarsContainer = await waitForElement('div[role="list"]');
    if (!MyCalendarsContainer) {
        console.warn("MyCalendarsContainer not found.");
        return;
    }

    // console.log("looking for OtherCalendarsContainer");
    OtherCalendarsContainer = document.querySelectorAll('div[role="list"]')[1];
    if (!OtherCalendarsContainer) {
        console.warn("OtherCalendarsContainer not found.");
        return;
    }
}

function isCalendarEnabled(calendar) {
    // inspect the checkbox and see if it has the tick
    // right now it looks like this KGC9Kd-MPu53c-OWXEXe-gk6SMd

    const regex = /^[a-zA-Z0-9]{6}(-[a-zA-Z0-9]{6}){3}$/;
    return Array.from(calendar.querySelector('div > div > div > div').classList).some(cls => regex.test(cls));
}

async function switchAll(switchType) {
    // console.log("looking for my calendars");
    const MyCalendars = MyCalendarsContainer.querySelectorAll('li > div');
    if (MyCalendars.length === 0) {
        console.warn("No calendars found within MyCalendarsContainer.");
        return;
    }

    // console.log("looking for other calendars");
    const OtherCalendars = OtherCalendarsContainer.querySelectorAll('li > div');
    if (OtherCalendars.length === 0) {
        console.warn("No calendars found within OtherCalendarsContainer.");
        return;
    }

    // console.log("switching calendars");
    if (switchType === 'Show') {
        MyCalendars.forEach(el => { if (!isCalendarEnabled(el)) { el.click() } });
        OtherCalendars.forEach(el => { if (!isCalendarEnabled(el)) { el.click() } });
        return;
    }

    if (switchType === 'Hide') {
        MyCalendars.forEach(el => { if (isCalendarEnabled(el)) { el.click() } });
        OtherCalendars.forEach(el => { if (isCalendarEnabled(el)) { el.click() } });
        return;
    }

    if (switchType === 'Toggle') {
        MyCalendars.forEach(el => el.click());
        OtherCalendars.forEach(el => el.click());
        return;
    }
}

async function createButtons() {
    // console.log("creating buttons");

    const createButton = (id, text, onClick) => {
        const btn = document.createElement("button");
        btn.type = 'button';
        btn.id = id;
        btn.textContent = text;
        btn.addEventListener('click', onClick);
        btn.className = 'GCSA-Button';
        return btn;
    };

    const TheButtons = [
        createButton('ShowAllButton', 'Show all', () => switchAll('Show')),
        createButton('HideAllButton', 'Hide all', () => switchAll('Hide')),
        createButton('ToggleAllButton', 'Toggle all', () => switchAll('Toggle'))
    ];

    const ButtonsContainer = document.createElement("div");
    ButtonsContainer.id = 'GCSA-ButtonsContainer';
    TheButtons.forEach(btn => ButtonsContainer.insertAdjacentElement("beforeend", btn));

    const ButtonsLocation = MyCalendarsContainer.parentElement.parentElement.parentElement.parentElement.parentElement;
    if (ButtonsLocation)
        ButtonsLocation.insertAdjacentElement("afterbegin", ButtonsContainer);
    else
        console.warn("Could not place buttons");
}

async function start() {
    await findCalendarsContainers();
    await createButtons();
}

let lastUrl = location.href;

new MutationObserver(() => {
    if (location.href !== lastUrl) {
        if (lastUrl.includes('settings') && !location.href.includes('settings')) {
            // console.log("URL changed from settings to calendar");
            start();
        }

        lastUrl = location.href;
    }
}).observe(document, { subtree: true, childList: true });


if (!location.href.includes('settings'))
    start();