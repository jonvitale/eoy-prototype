export default {
  qInfo: { qType: 'visualization' },
  qHyperCubeDef: {
    qDimensions: [
      {
        qDef: {
          qFieldDefs: ['SchoolReportKey'],
          qFieldLabels: ['schoolReportKey'],
          qSortCriterias: [{ qSortByLoadOrder: 0, qSortByAscii: 1 }],
        },
        qNullSuppression: true,
      },
    ],
    qMeasures: [
      {
        qDef: {
          qDef: `$(v_pct_metrics_overall_to_metric(cy))`,
          qLabel: '% Metrics At Target (Current)',
        },
      },
      {
        qDef: {
          qDef: `$(v_count_metrics_overall_to_metric(cy))`,
          qLabel: '# Metrics At Target (Current)',
        },
      },
      {
        qDef: {
          qDef: `$(v_count_metrics_overall_to_metric(cy, eligible))`,
          qLabel: '# Metrics Eligible (Current)',
        },
      },
      {
        qDef: {
          qDef: `$(v_pct_metrics_overall_to_metric(cy, improving))`,
          qLabel: '% Metrics Improving (Current)',
        },
      },
      {
        qDef: {
          qDef: `$(v_count_metrics_overall_to_metric(cy, improving))`,
          qLabel: '# Metrics Improving (Current)',
        },
      },
      {
        qDef: {
          qDef: `$(v_count_metrics_overall_to_metric(cy, eligible_improving))`,
          qLabel: '# Metrics Improving Eligible (Current)',
        },
      },

      {
        qDef: {
          qDef: `$(v_pct_metrics_overall_to_metric(cy, equitable))`,
          qLabel: '% Equity Metrics At Target (Current)',
        },
      },
      {
        qDef: {
          qDef: `$(v_count_metrics_overall_to_metric(cy, equitable))`,
          qLabel: '# Equity Metrics At Target (Current)',
        },
      },
      {
        qDef: {
          qDef: `$(v_count_metrics_overall_to_metric(cy, eligible_equitable))`,
          qLabel: '# Equity Metrics Eligible (Current)',
        },
      },

      {
        qDef: {
          qDef: `$(v_pct_metrics_overall_to_metric(cy, improving_equitable))`,
          qLabel: '% Equity Metrics Improving (Current)',
        },
      },
      {
        qDef: {
          qDef: `$(v_count_metrics_overall_to_metric(cy, improving_equitable))`,
          qLabel: '# Equity Metrics Improving (Current)',
        },
      },
      {
        qDef: {
          qDef: `$(v_count_metrics_overall_to_metric(cy, eligible_improving_equitable))`,
          qLabel: '# Equity Metrics Improving Eligible (Current)',
        },
      },
    ],
    qInitialDataFetch: [{ qWidth: 20, qHeight: 500 }],
  },
}
