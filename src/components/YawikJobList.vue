<template>
    <div id="yawik-job-list">
        <h3>{{ title ? title : 'YAWIK Jobs List' }}</h3>
        <div v-if="loading">Lädt...</div>
        <div v-if="error">{{ errmsg }}</div>
        <div v-if="!loading && !error">
            <p>
                Page {{ result.currentPage }} / {{ result.totalPages }} |
                Showing {{ ((result.currentPage - 1) * result.jobsPerPage) }} - {{ ((result.currentPage - 1) * result.jobsPerPage) + result.count }}
                of {{ result.total }}
            </p>
            <ul v-for="job in result.jobs" :key="job.id">
                <li><a :href="job.link">{{ job.organization }}: {{ job.title }} [ {{ job.location }} ]</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "YawikJobList",
    data: function() {
        return {
            loading: true,
            error: false,
            errmsg: '',
            jobs: [],
            result: {},
        }
    },
    props: ['url', 'title', 'count', 'page'],
    mounted: function() {
        this.load()
    },
    methods: {
        load: function() {
            this.loading = true;
            this.error = false;

            if (!this.url) {
                this.error = true;
                this.errmsg = 'No yawik url provided. Please use the attribute "url".';
                this.loading = false;
                return;
            }
            var query = {
                json: '1',
                count: this.count ? this.count : 10,
                page: this.page ? this.page : 1,
            };
            /* Found on https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
             * Converts Object to query string
             * e.g. { param: 'value', other: 'test' } => 'param=value&other=test'
             */
            var queryStr = Object.keys(query).map(k => `${k}=${encodeURIComponent(query[k])}`).join('&');
            var that = this
            axios.get(this.url + '?' + queryStr)
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

<style scoped>
</style>