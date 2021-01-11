export default {
  qInfo: { qType: 'visualization' },
  qHyperCubeDef: {
    qDimensions: [
      {
        qDef: {
          qFieldDefs: ['key_school_report'],
          qFieldLabels: ['schoolReportKey'],
          qSortCriterias: [{ qSortByLoadOrder: 0, qSortByAscii: 1 }],
        },
        qNullSuppression: true,
      },
      {
        qDef: {
          qFieldDefs: ['schoolname'],
          qFieldLabels: ['schoolname'],
          qSortCriterias: [{ qSortByLoadOrder: 0, qSortByAscii: 1 }],
        },
        qNullSuppression: true,
      },
      // {
      //   qDef: {
      //     qFieldDefs: ['SchoolProfiles_Handle Name'],
      //     qFieldLabels: ['slug'],
      //     qSortCriterias: [{ qSortByLoadOrder: 0, qSortByAscii: 1 }],
      //   },
      //   qNullSuppression: true,
      // },
      {
        qDef: {
          qFieldDefs: ['ulcs'],
          qFieldLabels: ['ulcs'],
        },
        qNullSuppression: true,
      },
      {
        qDef: {
          qFieldDefs: ['network'],
          qFieldLabels: ['network'],
        },
        qNullSuppression: true,
      },
      {
        qDef: {
          qFieldDefs: ['governance'],
          qFieldLabels: ['sector'],
        },
        qNullSuppression: false,
      },
      {
        qDef: {
          qFieldDefs: ['grades_served'],
          qFieldLabels: ['gradesServed'],
        },
        qNullSuppression: false,
      },
      // {
      //   qDef: {
      //     qFieldDefs: ['PersonName_SchoolLeader'],
      //     qFieldLabels: ['schoolLeader'],
      //   },
      //   qNullSuppression: false,
      // },
      {
        qDef: {
          qFieldDefs: ['street_address'],
          qFieldLabels: ['address'],
        },
        qNullSuppression: false,
      },
      {
        qDef: {
          qFieldDefs: ['phonenumber'],
          qFieldLabels: ['phonenumber'],
        },
        qNullSuppression: false,
      },
      {
        qDef: {
          qFieldDefs: ['website'],
          qFieldLabels: ['website'],
        },
        qNullSuppression: false,
      },
      {
        qDef: {
          qFieldDefs: ['report'],
          qFieldLabels: ['report'],
        },
        qNullSuppression: false,
      },
      {
        qDef: {
          qFieldDefs: ['admissiontype'],
          qFieldLabels: ['admissiontype'],
        },
        qNullSuppression: true,
      },
      {
        qDef: {
          qFieldDefs: ['turnaround'],
          qFieldLabels: ['turnaround'],
        },
        qNullSuppression: true,
      },
    ],
    qMeasures: [
      {
        qDef: {
          qDef: `Count(distinct {<[schoolyear]={'$(v_schoolyear_current)'}>} 1)`,
          qLabel: 'Flag_CY',
        },
      },
    ],
    qInitialDataFetch: [{ qWidth: 20, qHeight: 500 }],
  },
}
