const {GoogleAuth} = require("google-auth-library");
const {GoogleApis} = require("googleapis");

const sourceNode = async ({ actions, createNodeId, createContentDigest, reporter }) => {
  const { createNode } = actions;
  await addPopularPageNodes();
  // `PopularPage` のノードを追加する
  async function addPopularPageNodes() {
    // Reporting API の利用に必要なデータを取ってくる
    // const CREDS = process.env['GCP_CREDS'];
    const CREDS = `{
  "type": "service_account",
  "project_id": "gatsby-283414",
  "private_key_id": "44444c5b91f3300ca58f974c6ef395f43e862d05",
  "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCnMOUauSOEHdi6\\nljlFnIu1Cxvk7GskrkXSnjnSZGHE9z7TgiypWEvKxaYQil+/xjaq9iIr96RYvZQ/\\n/sHgNLWZiiVc2w+I29oWZrZW1v1xR0MA3qs7vb1k6RSyTt5jbqNHf/BipNaptpxp\\nZU1vzwpP+uQ2KJEO6AkIVjKlf9Z5XQuBSrlr7Xn5O2HqA2nJjVCTT/tlq7CK9Ljh\\n3ilqk2CjnPkpx36cFNzlFUDEmzPJr2hikaCt9db3JlL6mm9Dnq0ManZdymYy90wb\\nlSh/TnHVkAiCQN9LAIOWZJIHbQZQ54YI9AzVhvo9iJTJB20a2cRfChC86icR/6zV\\nBg9p01/7AgMBAAECggEADM6R24GvZvPoVvv3PXitOlGJsfgANGpFvp6l3D1vQH4V\\n/xqwyXS83YwABAgC0fcLgf4NBmQtCn/UfDB2G8gTLxnmHHOgACz4dZB+9YOjcgrH\\nkainjOckZmH1AWb0NxanBZeXIN9H8u53kxqSRiHMbu2k5Jcn7Bs5xzyJxaQCGFVj\\nNXDKXny+FKMjPvdE8LZOSO1AEb7RpxK/xkIvQzLlTmwkhkjpNXUfVQXksIUmQhRM\\nH/GkW4fndEZvrtJojd1T601JJ7mRGUJdNAW66+roqi50FYFDGmBhLVWfbLUXLegl\\nDyBkIaBZ6XfK8UcBDp+TO3JsdeqAiCG2nhFgeo8loQKBgQDoE3xmgJ+Lp674ZBKv\\neeFRGOVUTtPq7W8Fx75cnkDkeUED8hEwTDL22pNxNwxtV9g+5YUTSLlCkqbDcTrY\\nj0Nk69NIoVWsUG1IkkAjgb7ULjl26oRIho7WJl27ohTEyaF12FHPy/XxM8lFInpB\\nl0utDDFRBOJYBHnWQ7fhHdHBYQKBgQC4bRVk6hveOA6kAic6frFt05hrmJhZRDGX\\nnZ+on6Si+RE6eLux018TLA7vaW2OIHWOmRC37tKupT/p1Zrxo5OzdIrQkakQVERQ\\noxz2bI8M+mkOwH0uNHZkSKkqKae1/beLWlmB4ybWcaVz/S0wqpNxwsv4lfFU2ugt\\nLyITrl4y2wKBgAFHQjMqWDajuNIDcxrmV/hjY7gAKyirICZvADxwXrkjddk4tyGF\\n+e3kLFW+UOI1TqqiBwahKuwT9Lk04XcZ6uweZG6M/PTTCJcSvymy6EMw8f4Wsp3X\\np+fEFFYZQXYICkyk4WZ8oCExANXRp8y+sZsFaywgE8MaWzVz8ApcaLBhAoGBAIS0\\nEUHk5pqWsYo39mwzv43sRG+fhHgvBpQ3Giwmezu9hjURrNT+6BmOiUyiCu/K0WwD\\nHbGMClMamwux5OTctCnbwQrk1MboK6PuSqfSY3iOMswnm6uEmm/8jKTHBmOApfKC\\n14cLoOWLLudwFHVBOAkShtxfYCCTx57DnHyW6jcjAoGBALijC75OPVh0gQ8XOjp9\\nRoWOg3Winis8gKZDjIctTR2lwpHmzBjGr3fq9TG7bx+TovZr1L1gMgCzdpmJIHMU\\nVzAw7C6zwfH/zToamdyNP/kIvwDCWjSYwo0yvFsZ+9vekW0/SwNSDpGm1c7G7Rco\\n+pupDglpVjGap+YOGJuDnuhj\\n-----END PRIVATE KEY-----\\n",
  "client_email": "ga-access@gatsby-283414.iam.gserviceaccount.com",
  "client_id": "102831993207113430880",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/ga-access%40gatsby-283414.iam.gserviceaccount.com"
}`;
    const VIEW_ID = '219075804';
    if (!CREDS || !VIEW_ID) {
      // reporter.panic(`GCP credentials missing.`);
      return
    }
    const auth = new GoogleAuth();
    const client = auth.fromJSON(JSON.parse(CREDS));
    client.scopes = [`https://www.googleapis.com/auth/analytics.readonly`];
    const analyticsreporting = new GoogleApis().analyticsreporting({
      version: 'v4',
      auth: client,
    });

    // 実際に API にリクエストをかけてデータを取得する
    // ここでは以下の条件でデータを取得しています
    // 期間: 30 日前から当日まで
    // ディメンション: ページパスとページタイトル
    // 指標: セッション数
    // 絞り込み: ページパスが `/content/` から始まるものに限定
    // 並び順: セッション数の降順
    // データ取得数: 20 件
    const res = await analyticsreporting.reports.batchGet({
      requestBody: {
        reportRequests: [
          {
            viewId: VIEW_ID,
            dateRanges: [
              {
                startDate: '60daysAgo',
                endDate: 'today',
              }
            ],
            dimensions: [
              {
                name: 'ga:pagePath'
              },
              {
                name: 'ga:pageTitle'
              }
            ],
            metrics: [
              {
                expression: 'ga:sessions',
              }
            ],
            // TODO env
            filtersExpression: `ga:pagePath=~^/posts/`,
            orderBys: {
              fieldName: 'ga:sessions',
              sortOrder: 'DESCENDING',
            },
            pageSize: 20
          }
        ]
      }
    });

    if (res.statusText !== 'OK') {
      reporter.panic(`Reporting API response status is not OK.`);
      return
    }

    const [report] = res.data.reports;
    const rows = report.data.rows;

    rows.forEach(r => {
      const data = {
        path: r.dimensions[0],
        title: r.dimensions[1],
        count: parseInt(r.metrics[0].values[0], 10)
      };

      const nodeMeta = {
        id: createNodeId(`PopularPage-${data.path}`),
        parent: null,
        children: [],
        internal: {
          type: `PopularPage`,
          contentDigest: createContentDigest(data),
        },
      };
      const node = Object.assign({}, data, nodeMeta);
      createNode(node);
    });
  }
};

module.exports = sourceNode;
