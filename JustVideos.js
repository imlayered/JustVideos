// ==UserScript==
// @name         Just Videos
// @namespace    https://github.com/imlayered/JustVideos
// @version      1.0
// @description  No more shorts & community posts
// @author       You
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const BAD_STUFF = [
        'ytd-rich-shelf-renderer[is-shorts]',
        'ytd-reel-shelf-renderer',
        'ytd-video-renderer [href*="/shorts/"]',
        'ytd-compact-video-renderer [href*="/shorts/"]',
        'ytd-grid-video-renderer [href*="/shorts/"]',
        'ytd-guide-entry-renderer [href*="/shorts"]',
        '[role="heading"][aria-label*="Shorts"]',
        'ytd-horizontal-card-list-renderer:has([href*="/shorts/"])',
        '.ytd-mini-guide-entry-renderer[href*="/shorts"]',
        'ytd-backstage-post-renderer',
        'ytd-post-renderer',
        'ytd-shared-post-renderer',
        'ytd-c4-tabbed-header-renderer [href*="/community"]',
        'ytd-rich-item-renderer:has(ytd-backstage-post-renderer)',
        'ytd-rich-item-renderer:has(ytd-post-renderer)',
        'ytd-rich-item-renderer:has(ytd-shared-post-renderer)'
    ];

    function removeBadStuff() {
        BAD_STUFF.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (element.matches('ytd-rich-shelf-renderer[is-shorts], ytd-reel-shelf-renderer')) {
                    element.style.display = 'none';
                }
                else if (element.matches('ytd-backstage-post-renderer, ytd-post-renderer, ytd-shared-post-renderer')) {
                    let container = element.closest('ytd-rich-item-renderer, ytd-video-renderer, div[class*="item"]');
                    if (container) {
                        container.style.display = 'none';
                    } else {
                        element.style.display = 'none';
                    }
                }
                else if (element.matches('[href*="/shorts/"]')) {
                    let container = element.closest('ytd-video-renderer, ytd-compact-video-renderer, ytd-grid-video-renderer');
                    if (container) {
                        container.style.display = 'none';
                    } else {
                        element.closest('div, li, article')?.style.setProperty('display', 'none', 'important');
                    }
                }
                else {
                    element.style.display = 'none';
                }
            });
        });
    }
    removeBadStuff();
    const observer = new MutationObserver((mutations) => {
        let shouldRemove = false;
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                shouldRemove = true;
            }
        });

        if (shouldRemove) {
            setTimeout(removeBadStuff, 100);
        }
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    let currentUrl = window.location.href;
    setInterval(() => {
        if (window.location.href !== currentUrl) {
            currentUrl = window.location.href;
            setTimeout(removeBadStuff, 500);
        }
    }, 1000);

})();
// somewhat ai 
