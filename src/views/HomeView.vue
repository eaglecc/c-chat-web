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
        <el-header class="header">
          <label>C-Chat</label>
        </el-header>
        <el-main class="main">
          <div class="message">
            <!-- 消息列表 -->
            <div class="chat-message" v-for="(msg, index) in messages" :key="index" :class="msg.sender === 'user' ? 'user-message' : 'bot-message'">
              <div :class="msg.sender === 'user' ? 'user-msg' : 'bot-msg'">
                <span>{{ msg.text }}</span>
              </div>
            </div>
          </div>
          <!-- 输入框 -->
          <div class="message-input">
            <el-input
              v-model="inputMsg"
              class="m-input"
              size="large"
              placeholder="请输入内容"
            >
              <template #suffix>
                <img src="@/assets/images/send_msg.svg" style="width: 30px; height: 30px; cursor: pointer;">
              </template>
            </el-input>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {ref } from 'vue';

const inputMsg = ref('')

const modules = [
  { id: 1, text: 'ChatGPT', image: "/src/assets/images/Chatgpt.svg" },
  { id: 2, text: '豆包', image: '/src/assets/images/doubao.svg' },
  { id: 3, text: '元宝', image: '/src/assets/images/yuanbao.svg' }
]

// 消息列表
const messages = ref([
  { sender: 'bot', text: '你好，有什么问题吗？' },
  { sender: 'user', text: '你好，我想了解一下Vue3。' },
]);


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
          margin-top: 20%;
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
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        label {
            font-size: 20px;
            font-family: Monaco;
            font-weight: 450;
            color: #0a0a0a;
            line-height: 22px;
        }
      }
      .main {
        background-color: #ffffff;
        height: 600px;
        width: 100%;
        display: flex;
        flex-direction: column;
        
        .message {
          height: 90%;
          background-color: #ffffff;
        }
        .chat-message {
          margin-top: 10px;
          margin-bottom: 10px;
          margin-left: 5px;
          margin-right: 5px;
          display: flex;
        }
        .user-message {
          justify-content: flex-end;
        }
        .bot-message {
          justify-content: flex-start;
        }
        .user-msg {
          background-color: #daf8e3;
          padding: 10px;
          border-radius: 10px;
          max-width: 70%;
          align-self: flex-end;
          justify-content: flex-end;
          text-align: left;
        }
        .bot-msg {
          background-color: #f1f0f0;
          padding: 10px;
          border-radius: 10px;
          max-width: 70%;
          align-self: flex-start;
          text-align: left;
        }
        .message-input{
          height: 10%;
          display: flex;
          align-items: center;
          justify-content: center;
          .m-input{
            width: 80%;
            height: 80%;
          }
        }
      }
    }
}
</style>