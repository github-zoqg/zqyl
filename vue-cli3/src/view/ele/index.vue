<template>
    <div>
        {{1234567890.125 | format_money(4)}}
        {{new Date() | format_date("hms")}}
        {{'1,234,567,890.1250' | format_money_number}}
        <el-button type="primary" size="mini" @click="$router.push({name:'GDamap'})">GDamap按钮</el-button>

        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动区域" prop="options">
                <el-select v-model="form.options" size="small" multiple placeholder="请选择">
                    <el-option
                        v-for="item in form.options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>

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
            form: {
                options: [
                    {
                        id: "选项1",
                        name: "黄金糕"
                    },
                    {
                        id: "选项2",
                        name: "双皮奶"
                    },
                    {
                        id: "选项3",
                        name: "蚵仔煎"
                    },
                    {
                        id: "选项4",
                        name: "龙须面"
                    },
                    {
                        id: "选项5",
                        name: "北京烤鸭"
                    }
                ]
            },
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