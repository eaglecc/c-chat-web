<template>
  <div class="container">
    <el-container>
      <el-aside class="aside">
        <div :data="modules" class="m-list">
          <div v-for="item in modules" :key="item.id" class="m-list-item">
            <div class="m-list-item-content">
              <img :src="item.image" alt="" style="width: 20px; height: 20px;">
              <span>{{ item.text }}</span>
            </div>
          </div>
        </div>
      </el-aside>
      <el-container>
        <el-header class="header">Header</el-header>
        <el-main class="main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {ref } from 'vue';


const modules = [
  { id: 1, text: 'ChatGPT', image: "/src/assets/images/Chatgpt.svg" },
  { id: 2, text: '豆包', image: '/src/assets/images/doubao.svg' },
  { id: 3, text: '元宝', image: '/src/assets/images/yuanbao.svg' }
]

</script>

<style scoped >
.container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .el-container {
      height: 100%;
      .aside {
        height: auto;
        width: 12%;
        background-color: #ffffff;
        .m-list {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          .m-list-item {
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            .m-list-item-content {
              width: 80%;
              height: 80%;
              padding-left: 20px;
              display: flex;
              flex-direction: row;
              border-radius: 10px;
              align-items: center;
              justify-content: flex-start;
              gap: 10px;
              cursor: pointer;
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
}
</style>