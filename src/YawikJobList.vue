<template>
    <div id="yawik-job-list">
        <h3>{{ widgetTitle ? widgetTitle : 'YAWIK Jobs List' }}</h3>

        <div v-if="!error && result.totalPages > 1">
            <nav class="pagination">
                <paginate
                    v-model="curpage"
                    :page-count="result.totalPages"
                    :page-range="5"
                    :click-handler="load"
                    prev-text="&lt;"
                    next-text="&gt;">
                </paginate>
            </nav>
        </div>
        <div v-if="loading" class="yjl-loading-overlay">
            <div class="yjl-lo-spinner-wrapper">
                <moon-loader color="blue"></moon-loader>
            </div>
        </div>
        <div v-if="error">{{ errmsg }}</div>
        <div v-if="result.totalPages > 0 && !error">

            <p>
                {{ ((result.currentPage - 1) * result.jobsPerPage) }} - {{ ((result.currentPage - 1) * result.jobsPerPage) + result.count }}
                / {{ result.total }}
            </p>
            <table class="yawik-job-list-items">
                <tbody>
                    <tr v-for="job in result.jobs" :key="job.id">
                        <td>
                            <a :href="job.link">{{ job.title }}</a>
                        </td>
                        <td width="20%">
                            <img v-if="job.organizationLogo" :src="job.organizationLogo" :alt="job.organization"/>
                            <span v-else>{{ job.organization }}</span>
                        </td>
                        <td width="15%" v-if="job.locations.length">
                            <div v-for="loc in job.locations" :key="loc.city">
                                {{ loc.city ? loc.city : loc.region }}<br>
                            </div>
                        </td>
                        <td width="15%" v-else>
                            {{ job.location }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Paginate from 'vuejs-paginate'
import { MoonLoader } from '@saeris/vue-spinners'

export default {
    name: "YawikJobList",
    components: { Paginate, MoonLoader },
    data: function() {
        return {
            loading: true,
            error: false,
            errmsg: '',
            jobs: [],
            result: {
                totalPages: 0
            },
            curpage: 1
        }
    },
    props: ['remote', 'widget-title', 'count', 'org'],
    mounted: function() {
        this.load()
    },
    methods: {
        load: function(pageNum) {
            this.curpage = pageNum;
            this.loading = true;
            this.error = false;

            if (!this.remote) {
                this.error = true;
                this.errmsg = 'No yawik url provided. Please use the attribute "url".';
                this.loading = false;
                return;
            }
            var query = {
                json: '1'
            }
            if (this.count) query.count = this.count
            if (this.curpage) query.page = this.curpage
            if (this.org) query.o = this.org

            /* Found on https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
             * Converts Object to query string
             * e.g. { param: 'value', other: 'test' } => 'param=value&other=test'
             */
            var queryStr = Object.keys(query).map(k => `${k}=${encodeURIComponent(query[k])}`).join('&');
            var that = this
            axios.get(this.remote + '?' + queryStr)
            .then(function(response) {
                that.jobs = response.data.jobs
                that.result = response.data;
            })
            .catch(function(err) { that.error = true; that.errmsg = err})
            .then(function() { that.loading = false })
        }
    }
}
</script>

<style>
#yawik-job-list {
    text-align: center;
    position: relative;
    min-height: 235px;
}
#yawik-job-list .yjl-loading-overlay {
    background-color: rgba(40,40,40,0);
    position:absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
}
#yawik-job-list .yjl-loading-overlay div.yjl-lo-spinner-wrapper {
    margin: 5em auto;
    display: inline-block;
    padding: 5px;
    background-color: rgba(255,255,255,0.7);
    border-radius: 40px;
    box-shadow: 0 0 40px #777777;
}
#yawik-job-list .yawik-job-list-items {
    border-collapse: collapse;
}
#yawik-job-list .yawik-job-list-items tr {
    border-bottom: 1px solid grey;
}
#yawik-job-list .yawik-job-list-items tr:last-child {
    border-bottom: 0px solid grey;
}
#yawik-job-list .yawik-job-list-items td {
    text-align: left;
    vertical-align: middle;
}
#yawik-job-list .yawik-job-list-items td a {
    display: block;
    padding: 1.5em;

}
#yawik-job-list .yawik-job-list-items img {
    max-width: 120px;
    max-height: 60px;
}
#yawik-job-list .pagination ul {
    display: inline-block;
    list-style:none;
    /* center in chrome */
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    -webkit-padding-start: 0;
}
#yawik-job-list .pagination ul li {
    display: flex;
    margin: 0;
    padding: 0;
    float: left;
}
#yawik-job-list .pagination ul li a {
    position: relative;
    margin: 0px 0px 0px -1px;
    padding: 0.3em 0.7em;
    border: 1px solid grey;
    cursor: pointer;
}
#yawik-job-list .pagination ul li.active a {
    background-color: lightblue;
    color: blue;
}
#yawik-job-list .pagination ul li a:hover {
    background-color: lightgrey;
}
#yawik-job-list .pagination ul li.disabled a {
    cursor: default;
    color: lightgrey;
}
#yawik-job-list .pagination ul li.disabled a:hover {
    background-color: white;
}
#yawik-job-list .pagination ul li:first-child a {
    border-top-left-radius: 0.25em;
    border-bottom-left-radius: 0.25em;
}
#yawik-job-list .pagination ul li:last-child a {
    border-top-right-radius: 0.25em;
    border-bottom-right-radius: 0.25em;
}
</style>