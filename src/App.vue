<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/">书籍列表</el-menu-item>
        <el-menu-item index="/add">添加书籍</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
.el-menu-demo {
  border: none;
  background-color: #545c64;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
