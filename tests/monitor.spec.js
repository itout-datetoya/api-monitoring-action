// tests/monitor.spec.js

const { test } = require('@playwright/test');

test('API /v1/hacking/tags の通信を監視する', async ({ page }) => {
  // ページ読み込みと同時にAPIレスポンスの待機を開始します。
  // これにより、ページの読み込み開始直後に発生するAPI通信も確実に捉えられます。
  const waitForApiResponse = page.waitForResponse(response =>
    // 1. レスポンスのURLに '/v1/hacking/tags' が含まれるか
    response.url().includes('/v1/hacking/tags') &&
    // 2. かつ、ステータスコードが200番台（成功）であるか
    response.ok()
  );

  // 監視対象のページにアクセスします。
  // process.env.TARGET_URL は後ほどGitHub Actionsで設定します。
  await page.goto(process.env.TARGET_URL || 'https://hack-info-timeline-frontend.onrender.com/');

  // 待機していたAPIレスポンスが、タイムアウトせずに条件を満たして返ってくるかを監視します。
  // もし条件を満たすAPIが返ってこない場合、ここでテストが失敗します。
  await waitForApiResponse;
});