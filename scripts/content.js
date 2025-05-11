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
    // console.log("looking for containers");
    MyCalendarsContainer = await waitForElement('div[aria-label="My calendars"]');
    if (!MyCalendarsContainer) {
        console.warn("MyCalendarsContainer not found.");
        return;
    }

    OtherCalendarsContainer = await waitForElement('div[aria-label="Other calendars"]');
    if (!OtherCalendarsContainer) {
        console.warn("OtherCalendarsContainer not found.");
        return;
    }
}

async function ToggleAll() {
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

    // console.log("toggling all");
    MyCalendars.forEach(el => el.click());
    OtherCalendars.forEach(el => el.click());
}

async function ShowAll() {

}

async function HideAll() {

}

async function createButtons() {
    // console.log("creating buttons");

    const createButton = (id, text, onClick) => {
        const btn = document.createElement("button");
        btn.type = 'button';
        btn.id = id;
        btn.textContent = text;
        btn.addEventListener('click', onClick);
        return btn;
    };

    const TheButtons = [
        createButton('ToggleAllButton', 'Toggle all', ToggleAll),
        createButton('ShowAllButton', 'Show all', ShowAll),
        createButton('HideAllButton', 'Hide all', HideAll)
    ];

    const buttonsContainer = document.createElement("div");
    buttonsContainer.id = 'buttonsContainer';
    buttonsContainer.style.display = 'flex';
    TheButtons.forEach(btn => buttonsContainer.insertAdjacentElement("beforeend", btn));

    const ButtonsLocation = MyCalendarsContainer.parentElement.parentElement.parentElement.parentElement.parentElement;
    if (ButtonsLocation)
        ButtonsLocation.insertAdjacentElement("afterbegin", buttonsContainer);
    else
        console.warn("Could not place buttons");
}

async function start() {
    // console.log('waiting');
    await findCalendarsContainers();
    // console.log('found');
    await createButtons();

}

start();