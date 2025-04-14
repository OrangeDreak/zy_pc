import request from '@/utils/request'

export const listTicket = (data) => {
  return request({
    url: "/app/ticket/list",
    method: "post",
    data,
  });
}

export const submitTicket = (data) => {
  return request({
    url: "/app/ticket/submit",
    method: "post",
    data,
  });
}

export const replyTicket = (data) => {
  return request({
    url: "/app/ticket/reply",
    method: "post",
    data,
  });
}

export const getRecords = (id) => {
  return request({
    url: "/app/ticket/records?ticketId=" + id,
    method: "get",
  });
}