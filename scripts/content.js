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
    const parent1 = await waitForElm('div[aria-label="My calendars"]');
    if (!parent1) {
        console.warn("Parent element with aria-label 'My calendars' not found.");
        return;
    }

    const targets1 = parent1.querySelectorAll('li > div');
    if (targets1.length === 0) {
        console.warn("No target elements found within the parent.");
        return;
    }
    targets1.forEach(el => el.click());

    const parent2 = await waitForElm('div[aria-label="Other calendars"]');
    if (!parent2) {
        console.warn("Parent element with aria-label 'Other calendars' not found.");
        return;
    }

    const targets2 = parent2.querySelectorAll('li > div');
    if (targets2.length === 0) {
        console.warn("No target elements found within the parent.");
        return;
    }
    targets2.forEach(el => el.click());
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
