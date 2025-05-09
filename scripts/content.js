function waitForElm(selector) {
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

async function ShowAllAction() {
    // toggle all

    const parent = await waitForElm('div[aria-label="My calendars"]');
    if (!parent) {
        console.warn("Parent element with aria-label 'My calendars' not found.");
        return;
    }

    const targets = parent.querySelectorAll('li > div');
    if (targets.length === 0) {
        console.warn("No target elements found within the parent.");
        return;
    }
    targets.forEach(el => el.click());
}

const ShowAllButton = document.createElement("button");
ShowAllButton.type = 'button';
ShowAllButton.textContent = 'Toggle all';
//ShowAllButton.onclick = ShowAllAction;
ShowAllButton.addEventListener('click', ShowAllAction);

const buttons = document.querySelectorAll('button');
let MyCalendarsButton = null;
for (const button of buttons) {
    if (button.textContent.includes('My calendars')) {
        MyCalendarsButton = button;
        break;
    }
}
if (MyCalendarsButton && MyCalendarsButton.parentElement) {
    MyCalendarsButton.parentElement.parentElement.parentElement.parentElement.insertAdjacentElement("afterbegin", ShowAllButton);
} else {
    console.error("Could not find the 'My calendars' button or its parent to insert 'Toggle all' button.");
}
