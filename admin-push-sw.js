// 運営ビューア用Service Worker（Web Push受信専用）
//
// index.html本体とは別のスクリプトコンテキストで動く。アプリを閉じていても
// ブラウザがプッシュを受信するとここが起動し、OS通知を表示する。
// 依存ゼロ方針を維持するため外部ライブラリ（Firebase SDK等）は使わない。

self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = {};
  }
  event.waitUntil(
    self.registration.showNotification(data.title || 'Amicuna運営', {
      body: data.body || '',
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow('./'));
});
