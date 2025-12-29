// server/utils/auth.ts
export const handleUserSession = async (event: any, dbUser: any) => {
  // 將資料庫的使用者資訊寫入加密的 Cookie Session 中
  await setUserSession(event, {
    user: {
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
      avatar: dbUser.avatar
    },
    // 可以在這裡加入登入時間或權限角色
    loggedInAt: new Date().toISOString()
  })
}