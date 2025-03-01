<template>
  <div class="container">
    <el-container>
      <el-aside class="aside">
        <h3 style="padding: 0%; margin-top: 10px;  display: flex; justify-content: center;">历史记录</h3>
        <!-- 聊天记录历史 -->
        <div :data="chatHistory" class="m-list">
          <div v-for="item in chatHistory" :key="item.id" class="m-list-item">
            <div class="m-list-item-content">
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
          <el-scrollbar height="90%">
            <div class="m-message">
              <!-- 消息列表 -->
              <div class="chat-message" v-for="(msg, index) in messages" :key="index"
                :class="msg.sender === 'user' ? 'user-message' : 'bot-message'">
                <div :class="msg.sender === 'user' ? 'user-msg' : 'bot-msg'">
                  <span>{{ msg.text }}</span>
                </div>
              </div>
            </div>
          </el-scrollbar>
          <div style="display: flex; align-items: center;">
            <!-- 模型选择框 -->
            <el-select v-model="selectedModule" class="m-select" placeholder="选择模型">
              <el-option v-for="item in modules" :key="item.id" :label="item.text" :value="item.id"
                :style="{ display: 'flex', alignItems: 'center' }">
                <img :src="item.image" alt="" style="width: 20px; height: 20px; margin-right: 10px;">
                <span>{{ item.text }}</span>
              </el-option>
            </el-select>
            <!-- 输入框 -->
            <div class="message-input">
              <el-input v-model="inputMsg" class="m-input" placeholder="请输入内容">
                <template #suffix>
                  <img src="@/assets/images/send_msg.svg" class="input-img">
                </template>
              </el-input>
            </div>
          </div>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const inputMsg = ref('')
const selectedModule = ref('')

const modules = [
  { id: 1, text: 'ChatGPT', image: "/src/assets/images/Chatgpt.svg" },
  { id: 2, text: '豆包', image: '/src/assets/images/doubao.svg' },
  { id: 3, text: '元宝', image: '/src/assets/images/yuanbao.svg' },
  { id: 4, text: 'DeepSeek', image: '/src/assets/images/deepseek.svg' },
]

const chatHistory = [
  { id: 1, text: 'C++是什么？'},
  { id: 2, text: 'Java是什么？'},
  { id: 3, text: 'Python是什么？'},

]

// 消息列表
const messages = ref([
  { sender: 'bot', text: '你好，有什么问题吗？' },
  { sender: 'user', text: '你好，我想了解一下Vue3。' },
  { sender: 'bot', text: '你好，有什么问题吗？' },
  { sender: 'user', text: '你好，我想了解一下Vue3。' },
]);

</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .el-container {
    height: 100%;

    .aside {
      max-height: 100vh;
      overflow-y: auto;
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
      height: 8vh;
      background-color: rgb(246, 249, 252);
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
      background-color: rgb(246, 249, 252);
      height: 90vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .m-message {
        height: 100%;
        /* overflow-y: auto; */
      }

      .message-input {
        /* height: 7%; */
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: center;

        .m-input {
          /* width: 80%; */
          /* height: 80%; */
        }

        .input-img {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
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

      .m-select {
        width: 200px;
        margin-right: 10px;
      }
    }
  }
}
</style>