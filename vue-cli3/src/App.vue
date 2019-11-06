<template>
    <div id="app">
        <el-container class="container">
            <el-header class="header">Header</el-header>

            <el-container class="content">
                <el-aside width="200px" class="aside">
                    <menuComponent></menuComponent>
                </el-aside>

                <el-container>
                    <el-main>
                        <router-view></router-view>
                    </el-main>

                    <el-footer class="foot">&copy;版权所有</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import menuComponent from "./components/menu";
export default {
    name: "app",
    components: { menuComponent },
    data() {
        return {};
    },
    mounted() {},
    methods: {},
    watch: {}
};
</script>
