// Keep updates in reverse chronological order when entries are added.
const timeline = document.querySelector('.timeline');
const updates = Array.from(timeline.children);
updates.sort((a, b) => b.querySelector('time').dateTime.localeCompare(a.querySelector('time').dateTime));
timeline.append(...updates);

// Progressive enhancement: without JavaScript, every section remains readable.
const tabList = document.querySelector('.tabs');
const tabs = Array.from(tabList.querySelectorAll('button'));
tabList.setAttribute('role', 'tablist');

function selectTab(selected, focus = false) {
    tabs.forEach((tab) => {
        const active = tab === selected;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
    });
    if (focus) selected.focus();
}

tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    panel.setAttribute('role', 'tabpanel');
    panel.tabIndex = 0;
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (event) => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) {
            event.preventDefault();
            selectTab(tabs[next], true);
        }
    });
});
selectTab(tabs[0]);
