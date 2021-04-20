export default function (schoolReportKey) {
  // use [flag_agg_all]={1} to ensure we are not gathering data at a subgroup level
  const set = `{<[year_academic]={'$(v_cy)'}, [SchoolReportKey]={'${schoolReportKey}'}>}`
  const setPY = `{<[year_academic]={'$(v_py)'}, [SchoolReportKey]={'${schoolReportKey}'}>}`
  const setPY2 = `{<[year_academic]={'$(v_py2)'}, [SchoolReportKey]={'${schoolReportKey}'}>}`
  const qMeasures = [
    {
      qDef: {
        qDef: `Num(Avg(${set} score), MaxString(${set} score_format))`,
        qLabel: 'score',
      },
    },
    {
      qDef: {
        qDef: `MaxString(${set} tier_label)`,
        qLabel: 'tier',
      },
    },
    {
      qDef: {
        qDef: `Num(
          Avg(${set} score) - Avg(${setPY} score)
          , MaxString(${set} score_format_yoy))`,
        qLabel: 'yoy',
      },
    },
    {
      qDef: {
        qDef: `Num(
          Avg(${set} score) - Avg(${setPY2} score)
          , MaxString(${set} score_format_yoy))`,
        qLabel: 'trend',
      },
    },
    {
      qDef: {
        qDef: `Num(
          Avg(${set} target_distance)
          , MaxString(${set} score_format_yoy))`,
        qLabel: 'distance',
      },
    },
    {
      qDef: {
        qDef: `Num(Avg(${set} target_approaching), MaxString(${set} score_format))`,
        qLabel: 'approaching',
      },
    },
    {
      qDef: {
        qDef: `Num(Avg(${set} target_at), MaxString(${set} score_format))`,
        qLabel: 'atTarget',
      },
    },
    {
      qDef: {
        qDef: `Num(Avg(${set} target_above), MaxString(${set} score_format))`,
        qLabel: 'aboveTarget',
      },
    },
  ]

  return {
    qInfo: { qType: 'visualization' },
    qHyperCubeDef: {
      qDimensions: [
        {
          qDef: {
            qFieldDefs: ['metric_code_group'],
            qFieldLabels: ['metric'],
          },
          qNullSuppression: true,
        },
        {
          qDef: {
            qFieldDefs: ['metric_label_group'],
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
        {
          qDef: {
            qFieldDefs: ['flag_informational'],
            qFieldLabels: ['informational'],
          },
          qNullSuppression: false,
        },
        {
          qDef: {
            qFieldDefs: ['flag_has_breakouts'],
            qFieldLabels: ['hasSubgroups'],
          },
          qNullSuppression: false,
        },
        {
          qDef: {
            qFieldDefs: ['subgroup_agg'],
            qFieldLabels: ['subgroup'],
          },
          qNullSuppression: false,
        },
        {
          qDef: {
            qFieldDefs: ['flag_binary'],
            qFieldLabels: ['binary'],
          },
          qNullSuppression: false,
        },
      ],
      qMeasures,
      qInitialDataFetch: [{ qWidth: 15, qHeight: 666 }],
    },
  }
}
