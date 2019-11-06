<template>
    <div>
        {{1234567890.125 | format_money(4)}}
        {{new Date() | format_date("hms")}}
        {{'1,234,567,890.1250' | format_money_number}}
        <el-button type="primary" size="mini" @click="$router.push({name:'GDamap'})">GDamap按钮</el-button>
        <el-button
            type="success"
            size="mini"
            @click="$router.push({name:'selectTree'})"
        >selectTree按钮</el-button>
        <pageComponent
            :total="total"
            :pageSize="pageSize"
            :pageSizeS="pageSizeS"
            :currentPage="currentPage"
            @changePage="changePage"
        ></pageComponent>
    </div>
</template>

<script>
import pageComponent from "../../components/page";

export default {
    components: {
        pageComponent
    },
    data() {
        return {
            pageSize: 10,
            pageSizeS: [5, 10, 20],
            total: 100,
            currentPage: null
        };
    },
    mounted() {
        console.log(process.env, process.env.NODE_ENV);
    },
    methods: {
        changePage(pageData) {
            console.log(pageData);
            this.pageSize = pageData.pageSize;
            this.currentPage = pageData.currentPage;
        }
    },
    watch: {},
    computed: {}
};
</script>

<style lang="scss" scoped>
</style>