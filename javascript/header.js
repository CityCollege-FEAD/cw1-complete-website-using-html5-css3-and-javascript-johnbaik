const headerNavbar = document.getElementById('header-navbar');
const logo = document.getElementById('logo');
const headerNavbarList = document.getElementById('header-navbar-list');
const headerLogoSearch = document.getElementById('header-logo-search');
const search = document.getElementById('search');
const searchButton = document.getElementById('search-button');
const hamburgerButton = document.getElementById('hamburger-button');
const hamburgerIcon = document.getElementById('hamburger-icon');
const searchInput = document.getElementById('search-input');
const headerSearchList = document.getElementById('header-search-list');
const searchList = document.getElementById('header-search-list');

const mobileSizeCondition = window.matchMedia("(min-width: 768px)");
mobileSizeCondition.addEventListener("change", function (e) {
    if (e.matches) {//desktop
        showNavigationMenu();
        showSearchBar();
        hideSearchButton();
        hideHamburgerButton();
        showHeaderNavbar();
        showLogo();
        hideHeaderSearchList();
        searchInput.value = "";

        //nav-menu-defaults
        showHorizontalNavBar()

        //searchbar defaults
        search.style.width = '100%';
        headerLogoSearch.style.width = '60%';
        headerLogoSearch.style.justifyContent = 'flex-start';
        console.log('event-listener 768 desktop');
    } else {//mobile
        hideNavigationMenu();
        hideSearchBar();
        showSearchButton();
        showHamburgerButton();
        showHeaderNavbar();
        hideHeaderSearchList();
        searchInput.value = "";
        console.log('event-listener 768 mobile');
    }
});

function showVerticalNavBar() {
    headerNavbarList.style.flexFlow = 'column nowrap'
    headerNavbarList.style.justifyContent = 'flex-start'
    hamburgerButton.style.scale = '1.2';
    headerNavbarList.style.position = 'fixed';
    headerNavbarList.style.zIndex = '2';
    headerNavbarList.style.backgroundColor = 'rgba(0,0,0, 0.9)';
    headerNavbarList.style.height = '100%';
    headerNavbarList.style.width = '35%';
    headerNavbarList.style.top = '40px';
    // headerNavbarList.style.fontSize = '16px';

    let navbarListItems = document.getElementsByClassName('navbar-list-item');
    for (let i = 0; i < navbarListItems.length; i++) {
        navbarListItems[i].style.top = '0%';
        navbarListItems[i].style.width = '100%';
        navbarListItems[i].style.textAlign = 'left';
        navbarListItems[i].style.marginTop = '40px';
    }
    let navbarListItemRef = document.getElementsByClassName('navbar-list-item-ref');
    for (let i = 0; i < navbarListItemRef.length; i++) {
        navbarListItemRef[i].style.padding = '1em';
    }
    console.log('showVerticalNavBar');
}

function showHorizontalNavBar() {
    hamburgerButton.style.scale = '1';
    headerNavbarList.style.position = 'static';
    headerNavbarList.style.flexFlow = 'row nowrap'
    headerNavbarList.style.justifyContent = 'flex-end'

    headerNavbarList.style.zIndex = '0';
    headerNavbarList.style.backgroundColor = 'rgba(1,1,1,1)';
    headerNavbarList.style.width = '100%';
    // headerNavbarList.style.fontSize = '16px';
    let navbarListItems = document.getElementsByClassName('navbar-list-item');
    for (let i = 0; i < navbarListItems.length; i++) {
        navbarListItems[i].style.top = '0%';
        navbarListItems[i].style.width = 'auto';
        navbarListItems[i].style.marginTop = '0px';
    }
    let navbarListItemRef = document.getElementsByClassName('navbar-list-item-ref');
    for (let i = 0; i < navbarListItemRef.length; i++) {
        navbarListItemRef[i].style.padding = '1vw';
    }
    console.log('showHorizontalNavBar');

}

function changeHamburgerMenuVisibility() {
    console.log('changeHamburgerMenuVisibility');

    headerNavbarList.style.display = headerNavbarList.style.display === 'flex' ? 'none' : 'flex';

    hamburgerIcon.innerHTML = hamburgerIcon.innerHTML.replace(/\s/g, '') === "menu" ? "close" : "menu";
    if (hamburgerIcon.innerHTML.replace(/\s/g, '') === 'close') { // the side menu is open
        showVerticalNavBar();
    } else {
        showHorizontalNavBar();
    }

}

function changeSearchVisibility() {
    search.style.display = search.style.display === 'flex' ? 'none' : 'flex';
    if (search.style.display === 'flex') {
        hideHeaderNavbar();
        logo.style.display = 'none';
        headerLogoSearch.style.width = '100%';
        headerLogoSearch.style.justifyContent = 'center';
        search.style.width = '70%';
    } else {
        showHeaderNavbar();
        showLogo();
        hideHeaderSearchList();
        searchInput.value = "";
        search.style.width = '50%';
        headerLogoSearch.style.width = '50%';
        headerLogoSearch.style.justifyContent = 'flex-start';
    }
}

function showNavigationMenu() {
    headerNavbarList.style.display = 'flex';
}

function showLogo() {
    logo.style.display = 'flex';
}

function showSearchBar() {
    search.style.display = 'flex';
}

function showSearchButton() {
    searchButton.style.display = 'flex';
}

function showHeaderNavbar() {
    headerNavbar.style.display = 'flex';
}

function showHamburgerButton() {
    hamburgerButton.style.display = 'flex';
    hamburgerIcon.innerHTML = 'menu'
}

function hideNavigationMenu() {
    headerNavbarList.style.display = 'none';
}

function hideSearchBar() {
    search.style.display = 'none';
}

function hideSearchButton() {
    searchButton.style.display = 'none';
}

function hideHamburgerButton() {
    hamburgerButton.style.display = 'none';
}

function hideHeaderNavbar() {
    headerNavbar.style.display = 'none';
}

function hideHeaderSearchList() {
    headerSearchList.style.display = 'none';
}

document.getElementById('search-input').addEventListener('input', function (e) {
    if (e.target.value !== '') {

        headerSearchList.style.display = "flex";

        let headerSearchItemSections = document.getElementsByClassName('header-search-item-section');
        for (let i = 0; i < headerSearchItemSections.length; i++) {
            headerSearchItemSections[i].style.display = "flex";
        }
        let headerSearchItems = document.getElementsByClassName('header-search-item');
        for (let i = 0; i < headerSearchItems.length; i++) {
            headerSearchItems[i].style.display = "flex";
        }

        let headerSearchItemImages = document.getElementsByClassName('header-search-item-img');
        for (let i = 0; i < headerSearchItemImages.length; i++) {
            headerSearchItemImages[i].style.display = "flex";
        }

    } else {
        headerSearchList.style.display = "none";
    }

});

function hideSearchListOnClickOutside(event) {
    if (!searchList.contains(event.target) && event.target !== searchInput) {
        hideHeaderSearchList();
        searchInput.value = "";
    }
}

document.addEventListener('click', hideSearchListOnClickOutside);
searchInput.addEventListener('click', (event) => {
    // Stop the click event propagation to prevent it from immediately hiding the list
    event.stopPropagation();
});