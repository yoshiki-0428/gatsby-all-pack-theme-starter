const config = require("../../loadYaml.js");
const { GoogleAuth } = require("google-auth-library");
const { GoogleApis } = require("googleapis");

const sourceNode = async ({ actions, createNodeId, createContentDigest, reporter }) => {
  const { createNode } = actions;
  await addPopularPageNodes();
  // `PopularPage` のノードを追加する
  async function addPopularPageNodes() {
    const CREDS = process.env['GA_CRED'];
    const VIEW_ID = config.secretConfig.googleAnalyticsViewId;
    if (!CREDS || !VIEW_ID) {
      reporter.warn('Not set secretConfig.googleAnalyticsCred || secretConfig.googleAnalyticsViewId');
      return
    }
    const auth = new GoogleAuth();
    const client = auth.fromJSON(JSON.parse(CREDS));
    client.scopes = [`https://www.googleapis.com/auth/analytics.readonly`];
    const analyticsreporting = new GoogleApis().analyticsreporting({
      version: 'v4',
      auth: client,
    });

    const res = await analyticsreporting.reports.batchGet({
      requestBody: {
        reportRequests: [
          {
            viewId: VIEW_ID,
            dateRanges: [
              {
                startDate: config.siteConfig.popularView.googleAnalyticsStartDate,
                endDate: config.siteConfig.popularView.googleAnalyticsEndDate,
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
                expression: config.siteConfig.popularView.googleAnalyticsMetrics,
              }
            ],
            filtersExpression: `ga:pagePath=~^${config.siteConfig.popularView.googleAnalyticsFiltersUrl}`,
            orderBys: {
              fieldName: config.siteConfig.popularView.googleAnalyticsMetrics,
              sortOrder: 'DESCENDING',
            },
            pageSize: config.siteConfig.popularView.googleAnalyticsPageSize
          }
        ]
      }
    });

    if (res.statusText !== 'OK') {
      reporter.panic(`Reporting API response status is not OK.`);
      return
    }

    const [report] = res.data.reports;
    const rows = report.data.rows || [];
    console.info("GA:Views", rows);

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
