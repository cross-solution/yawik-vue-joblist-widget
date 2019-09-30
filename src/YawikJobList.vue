<template>
    <div id="yawik-job-list">
        <h3>{{ widgetTitle ? widgetTitle : 'YAWIK Jobs List' }}</h3>

        <div v-if="fullTextEnabled">
            <input name="test" type="text" v-on:keyup.enter="search" v-model="q"/>
            <button type="button" v-on:click="search">Search</button>
        </div>
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
    components: { 
        Paginate, 
        MoonLoader 
    },
    data: function() {
        return {
            loading: true,
            error: false,
            fullTextEnabled: true,
            q: '',
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
        search: function(){
            this.load();
        },
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
            if ('' !== this.q) query.q = this.q

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

<style lang="scss" scoped>
@import 'layout.scss';

h3 {
    color: #123;    
}
</style>