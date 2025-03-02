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
              <div class="chat-message" v-for="(msg, index) in messages" :key="index"
                :class="msg.role === 'user' ? 'user-message' : 'bot-message'">
                <div :class="msg.role === 'user' ? 'user-msg' : 'bot-msg'">
                  <div v-if="msg.role === 'assistant'" v-html="formatContent(msg.content)"></div>
                  <div v-else>{{ msg.content }}
                  </div>
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
              <el-input type="textarea" :rows="5" :autofocus="true" v-model="inputMsg" class="m-input"
                placeholder="请输入你的问题" @keyup.enter="sendMessage()">
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
import { stratNewChatReq } from '@/api/Chat'
import { ElMessage, ElMessageBox } from 'element-plus'

const inputMsg = ref('')
const selectedModule = ref('')
let currentIndex = 1

const modules = [
  { id: 1, text: 'ChatGPT', image: "/src/assets/images/Chatgpt.svg" },
  { id: 2, text: '豆包', image: '/src/assets/images/doubao.svg' },
  { id: 3, text: '元宝', image: '/src/assets/images/yuanbao.svg' },
  { id: 4, text: 'DeepSeek', image: '/src/assets/images/deepseek.svg' },
]

const chatHistory = [
  { id: 1, text: 'C++是什么？' },
  { id: 2, text: 'Java是什么？' },
  { id: 3, text: 'Python是什么？' },

]

// 消息列表
const messages = ref([{
  "role": "system",
  "content": "You are a helpful assistant."
}]);

function formatContent(content) {
  return marked.parse(content);
}


const sendMessage = async () => {
  messages.value.push({ role: 'user', content: inputMsg.value })
  try {
    const dataInfo = {
      messages: messages.value,
      temperature: 0.7,
      max_tokens: 4096
    }
    const ws = new WebSocket("ws://localhost:9998/api/v1/chat/ws");
    // 监听消息响应
    ws.onmessage = (event) => {
      console.log('Message from server: ', event.data);
      const res = event
      if (res.type === "message") {
        messages.value[currentIndex].content += res.data
      } else {
        ElMessage({
          type: 'error',
          message: '服务器繁忙，请稍后再试！'
        })
      }
    };

    // onopen 中可以发送数据
    ws.onopen = () => {
      console.log("WebSocket 连接成功！");
      ws.send(JSON.stringify(dataInfo));
      
      messages.value.push({ role: 'assistant', content: "" }) // 创建bot返回消息体
      currentIndex += 1 // 索引+1，指向assistant返回的消息体
      inputMsg.value = '' // 清空对话框

    };

    ws.onclose = () => {
      console.log("WebSocket 连接关闭！");
      currentIndex += 1 // 索引+1，指向assistant返回的消息体
    };

    ws.onerror = (error) => {
      console.log("WebSocket 发生错误:", error);
    };
  } catch (error) {
    console.log("error...", error)
    ElMessage({
      type: 'error',
      message: '服务器内部错误，请稍后再试！'
    })
  }
}

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
        display: flex;
        justify-content: center;
        background-color: #daf8e3;
        padding: 10px;
        border-radius: 10px;
        max-width: 70%;
        text-align: left;
      }

      .bot-msg {
        background-color: #f1f0f0;
        padding: 10px;
        border-radius: 10px;
        max-width: 70%;
        /* align-self: flex-start; */
        /* text-align: left; */
      }

      .m-select {
        width: 200px;
        margin-right: 10px;
      }
    }
  }
}
</style>