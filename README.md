# Shopping List

## Deployed link

https://celebrated-dolphin-e13744.netlify.app/

## Description

A simple app that allows users to add items onto a shopping list.

## Usage

Users are able to add or remove items onto a list and change its order (by clicking and dragging items around).

Items are stored in the browser's local storage, so when refreshing the page the list is repopulated with those items, in the order that it was last in.

## Background

Building this app helped me to understand [jquery](https://api.jquery.com/) and [jquery ui](https://api.jqueryui.com/) a bit better, in particular the [`sortable()`](https://jqueryui.com/sortable/) widget/method, and generally just practice splitting code into functions, event listeners, and generally working out the logic required to build a slightly more complex app.

## Credits

The base HTML and CSS were provided by the bootcamp I'm currently involved in (week 7, day 1, activity 10: event delegation deletion)

## Improvements

Thinking about ways the app could be improved, perhaps changing it to a bookmark app that also tracks the number of times a link has been clicked (this could be stored in local storage) and giving the user the option to order the list by the popularity of each bookmark.
