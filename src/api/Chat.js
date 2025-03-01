import request from '@/utils/request'

export function stratNewChatReq(data) {
    return request({
      url: 'chat',
      method: 'POST',
      data
    })
}

