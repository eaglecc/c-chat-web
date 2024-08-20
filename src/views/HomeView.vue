<template>
  <div class="container">
    <el-container class="el-container">
      <el-aside class="aside">
        <el-list :data="items" class="el-list">
          <el-list-item v-for="item in items" :key="item.id" class="el-list-item">
            <div class="el-list-item-content">
              <el-icon :size="18">
                
              </el-icon>
              <span>{{ item.text }}</span>
            </div>
          </el-list-item>
        </el-list>

      </el-aside>
      <el-container>
        <el-header class="header">Header</el-header>
        <el-main class="main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {ref, reactive} from 'vue'

const items = reactive([
  { id: 1, text: '列表项一' },
  { id: 2, text: '列表项二' },
  { id: 3, text: '列表项三' },
])

</script>

<style scoped >
.container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .el-container {
      height: 100%;
    }

    .aside {
      height: auto;
      width: 15%;
      background-color: #ffffff;
      .el-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .el-list-item {
          width: 100%;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          .el-list-item-content {
            width: 80%;
            height: 80%;
            display: flex;
            flex-direction: row;
            border-radius: 10px;
            align-items: center;
            justify-content: center;
            &:hover {
              background-color: #c9c9c9;
            }
          }
        }
      }
    }
    .header {
      height: 60px;
      background-color: #f0f0f0;
    }
    .main {
      background-color: #6b4e4e;
    }

}
</style>