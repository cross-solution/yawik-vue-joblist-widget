## Welcome to YAWIK Vue Joblist Widget

Display your YAWIK jobs on any website using a vue-custom-component.

### Example

<link rel="stylesheet" href="dist/0.1.0/yawik-job-list.css" />
<script src="dist/0.1.0/yawik-job-list.js" type="text/javascript"></script>
<yawik-job-list remote="https://yawik.org/demo/de/jobboard" count="5"></yawik-job-list>

### Usage

Include the following html snippets in your site:
``` html
<link rel="stylesheet" href="https://cross-solution.github.io/yawik-vue-joblist-widget/dist/0.1.0/yawik-job-list.css" />
<script src="https://cross-solution.github.io/yawik-vue-joblist-widget/dist/0.1.0/yawik-job-list.js"></script>
<yawik-job-list remote="[yawik-instance/jobboard]"></yawik-job-list>
```

Available attributes:

| Attribute | Description | 
| :--- | :--- |
| remote | URL to the yawik jobboard. e.g. https://yawik.org/demo/de/jobboard |
| count | Amount of jobs displayed at once. | 
| widget-title | Headline displayed above the jobs (default: YAWIK Job List) | 
| org | ID of an organization. If given, only jobs from this organization are displayed | 

### Customize CSS

This widget is rendered in a `div` container with the id `yawik-job-list`.

The following CSS ids and classes are used:

| CSS selector | Description |
| :--- | :--- |
| #yawik-job-list | The main widget container |
| #yawik-job-list > h3 | The main headline |
| .pagination | The pagination bar. This is rendered as an unordered list, where each link is separate list item |
| .pagination .active | The current active link |
| .yawik-job-list-items | The job list. Rendered as table where each row is a job posting |


### Files

#### 0.1

* [yawik-job-list.js](dist/0.1.0/yawik-job-list.js)
* [yawik-job-list.css](dist/0.1.0/yawik-job-list.css)

