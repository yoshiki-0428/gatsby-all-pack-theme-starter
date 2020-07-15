const {GoogleAuth} = require("google-auth-library");
const {GoogleApis} = require("googleapis");

const sourceNode = async ({ actions, createNodeId, createContentDigest, reporter }) => {
  const { createNode } = actions;
  await addPopularPageNodes();
  // `PopularPage` のノードを追加する
  async function addPopularPageNodes() {
    // Reporting API の利用に必要なデータを取ってくる
    const CREDS = process.env['GCP_CREDS'];
    const VIEW_ID = process.env['GCP_VIEW_ID'];
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
