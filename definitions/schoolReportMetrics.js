export default function (schoolReportKey) {
  const set = `{<[schoolyear]={'$(v_schoolyear_current)'}, [key_school_report]={'${schoolReportKey}'}>}`
  const qMeasures = [
    {
      qDef: {
        qDef: `Only(${set} score)`,
        qLabel: 'score',
      },
    },
    {
      qDef: {
        qDef: `Only(${set} rating)`,
        qLabel: 'rating',
      },
    },
    {
      qDef: {
        qDef: `Only(${set} yoy_change)`,
        qLabel: 'yoy',
      },
    },
    {
      qDef: {
        qDef: `Only(${set} trend)`,
        qLabel: 'trend',
      },
    },
    {
      qDef: {
        qDef: `Only(${set} target_distance)`,
        qLabel: 'distance',
      },
    },
  ]

  return {
    qInfo: { qType: 'visualization' },
    qHyperCubeDef: {
      qDimensions: [
        {
          qDef: {
            qFieldDefs: ['metric_name'],
            qFieldLabels: ['metric'],
          },
          qNullSuppression: true,
        },
        {
          qDef: {
            qFieldDefs: ['metric_label'],
            qFieldLabels: ['metricLabel'],
          },
          qNullSuppression: false,
        },
        {
          qDef: {
            qFieldDefs: ['domain'],
            qFieldLabels: ['domain'],
          },
          qNullSuppression: false,
        },
      ],
      qMeasures,
      qInitialDataFetch: [{ qWidth: 50, qHeight: 200 }],
    },
  }
}
