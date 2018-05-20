# André's Goodreads Toolbox as a Service

![Maintenance](https://img.shields.io/maintenance/yes/2018.svg)


## The landing page

![Screenshot](screenshot-20180402.jpg "Screenshot")

[Responsive](https://en.wikipedia.org/wiki/Responsive_web_design), [static](https://en.wikipedia.org/wiki/Static_web_page), transactional [landing page](https://en.wikipedia.org/wiki/Landing_page) I can easily host on GitHub:
- form submission is supported by external free services
- color scheme and typography refer to the Goodreads.com website
- minimal design form: as less text and controls as possible 
- problem statement -> solution statement -> call to action
- [privacy notice](privacy.txt) and consent checkbox (GDPR)
- left half of the page: slightly animated informative slides 
- slides help users understand the form on the right side:
  - where do they find the info they have to enter 
  - how does the service or notifications mail look like 
- slides change when the user changes between the input controls
- slides are actually HTML and not real screenshots: 
  - I found this easier to update
  - fonts scale better
  - page loads faster
  - screenshots need editing due to copyrighted book covers


### Older

![Screenshot](screenshot-20180131.png "Screenshot")


## Copiers

You need to search-replace my email address datakadabra@gmail.com in _all_ files, and my Google Analytics code in index.html
