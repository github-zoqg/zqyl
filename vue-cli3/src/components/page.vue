<template>
    <div class="position">
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageData.currentPage"
            :page-sizes="pageSizeS  || [10, 20, 50,]"
            :page-size="pageData.pageSize || 20"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
    </div>
</template>

<script>
export default {
    props: ["currentPage", "total", "pageSize", "pageSizeS"],
    data() {
        return {
            pageData:{
                pageSize:this.pageSize,
                currentPage:this.currentPage,
            }
        }
    },
    mounted() {
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageData.pageSize = val;
            this.pageData.currentPage = 1;
            this.$emit("changePage", {
                pageSize:val,
                currentPage:1
            });
        },
        handleCurrentChange(val) {
            this.pageData.currentPage = val;

            this.$emit("changePage", {
                pageSize:this.pageData.pageSize,
                currentPage:val
            });
            console.log(`当前页: ${val}`);
        }
    },
    watch: {}
};
</script>

<style lang="scss" scoped>
.position{
    float:right;
}
</style>