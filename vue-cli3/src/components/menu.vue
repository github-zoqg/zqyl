<template>
    <div>
        <el-menu class="el-menu-vertical-demo">
            <el-submenu v-for="(item,index) in subMenuData" :index="index.toString()" :key="index">
                <template slot="title">
                    <span>{{item.label}}</span>
                </template>

                <el-menu-item v-for="(ITEM,ind) in item.children" :index="(index+'-'+ind).toString()" :key="ind" >{{ITEM.label}}</el-menu-item>

            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            subMenuData: [
                {
                    label: "一级 1",
                    children: [
                        {
                            label: "二级 1-1",
                            children: [
                                {
                                    label: "三级 1-1-1"
                                }
                            ]
                        }
                    ]
                },
                {
                    label: "一级 2",
                    children: [
                        {
                            label: "二级 2-1",
                            children: [
                                {
                                    label: "三级 2-1-1"
                                }
                            ]
                        },
                        {
                            label: "二级 2-2",
                            children: [
                                {
                                    label: "三级 2-2-1"
                                }
                            ]
                        }
                    ]
                },
                {
                    label: "一级 3",
                    children: [
                        {
                            label: "二级 3-1",
                            children: [
                                {
                                    label: "三级 3-1-1"
                                }
                            ]
                        },
                        {
                            label: "二级 3-2",
                            children: [
                                {
                                    label: "三级 3-2-1"
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    },
    mounted() {},
    methods: {},
    watch: {},
    computed: {}
};
</script>

<style lang="scss" scoped>
</style>