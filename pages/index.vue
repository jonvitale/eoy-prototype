<template>
  <div class="container report mx-auto">
    <!-- cover -->
    <div>
      <div class="page">
        <h1 class="b-header">{{ $store.getters.sy_c }} End of Year Report</h1>
        <h1 class="b-subheader">{{ schoolname }}</h1>
        <div class="b-schoolinfo flex justify-between">
          <div class="flex justify-between">
            <div class="b-schoolinfo__label">
              <div>School Code</div>
              <div>Principal Name</div>
              <div>Sector</div>
              <div>Address</div>
              <div>Phone</div>
              <div>Network</div>
            </div>
            <div class="b-schoolinfo__value">
              <div>{{ ulcs }}</div>
              <div>{{ principal }}</div>
              <div>{{ sector }}</div>
              <div>{{ address }}</div>
              <div>{{ phonenumber }}</div>
              <div>{{ network }}</div>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="b-schoolinfo__label">
              <div>Website</div>
              <div>Report Type</div>
              <div>Grades in Report</div>
              <div>Admissions Category</div>
              <div>Turnaround Model</div>
              <div>School Receives a High School Report</div>
            </div>
            <div class="b-schoolinfo__value">
              <a :href="'https://' + website" target="_blank">{{ website }}</a>
              <div>{{ report }}</div>
              <div>{{ gradesServed }}</div>
              <div>{{ admissiontype }}</div>
              <div>{{ turnaround }}</div>
              <div>{{ hasHS }}</div>
            </div>
          </div>
        </div>
        <div class="b-sep b-sep--clear" />
        <div class="b-metric">
          <div class="b-metric__title">Student Enrollment and Demographics</div>
          <div class="flex justify-between">
            <div class="b-metric__label">
              <div># of Students Enrolled on October 1</div>
              <div>Total # of Students Served for 10+ Days Over the Year</div>
            </div>
            <div class="b-metric__value w-1/2">
              <div class="w-full text-center">{{ score('enr_oct1') }}</div>
              <div class="w-full text-center">{{ score('enr') }}</div>
            </div>
          </div>
        </div>
        <div class="b-sep" />
        <div class="b-metric">
          <div class="flex">
            <QdtComponent
              type="QdtViz"
              no-buttons
              :props="{
                id: 'JRfps',
                type: 'barchart',
                height: '220px',
              }"
              class="w-1/2"
            />
            <QdtComponent
              type="QdtViz"
              no-buttons
              :props="{
                id: 'JGcDeX',
                type: 'barchart',
                height: '220px',
              }"
              class="w-1/2"
            />
          </div>
        </div>
        <div class="b-sep" />
        <div class="b-metric">
          <div class="b-metric__title">Teachers</div>
          <div class="flex justify-between">
            <div class="b-metric__label">
              <div>Teachers Rated as Distinguished</div>
              <div>Teachers Rated as Proficient</div>
            </div>
            <div class="b-metric__value w-1/2">
              <div class="w-full text-center">
                {{ score('teachers_distinguished') }}
              </div>
              <div class="w-full text-center">
                {{ score('teachers_proficient') }}
              </div>
            </div>
          </div>
        </div>
        <div class="b-sep" />
        <div class="b-metric">
          <div v-if="!isHS">
            <div class="b-metric__title">
              Performance Against District Goals
            </div>
            <div class="flex flex-justify">
              <div class="w-4/5 b-metric__subtitle">
                These goals are the District's key progress measures that are
                monitored by the Board of Education
              </div>
              <div class="w-1/5 b-metric__subtitle--right">
                Three-Year Trend
              </div>
            </div>
            <div class="flex metric">
              <div class="w-64">
                <div class="b-metric__label b-metric__label--dark">
                  {{ metricLabel('pssa_ela_prof') }}
                </div>
                <div
                  class="b-metric__value b-metric__value--dark b-metric__value--large"
                  :class="['color-' + ratingToKey(rating('pssa_ela_prof'))]"
                >
                  {{ scorePct('pssa_ela_prof') }}
                  ({{ rating('pssa_ela_prof') }})
                </div>
              </div>
              <QdtComponent
                type="QdtViz"
                no-buttons
                :props="{
                  id: 'VdzxMm',
                  type: 'bulletchart',
                  height: '100px',
                }"
                class="w-1/2"
              />
              <div class="w-1/5 b-metric__value b-metric__value--large">
                {{ trendPct('pssa_ela_prof') }}
              </div>
            </div>
            <div class="flex metric b-metric--fit-bullet-chart">
              <div class="w-64">
                <div class="b-metric__label b-metric__label--dark">
                  {{ metricLabel('pssa_ela_prof_grade3') }}
                </div>
                <div
                  class="b-metric__value b-metric__value--dark b-metric__value--large"
                  :class="[
                    'color-' + ratingToKey(rating('pssa_ela_prof_grade3')),
                  ]"
                >
                  {{ scorePct('pssa_ela_prof_grade3') }}
                  ({{ rating('pssa_ela_prof_grade3') }})
                </div>
              </div>
              <QdtComponent
                type="QdtViz"
                no-buttons
                :props="{
                  id: 'StEhCqp',
                  type: 'bulletchart',
                  height: '100px',
                }"
                class="w-1/2"
              />
              <div class="w-1/5 b-metric__value b-metric__value--large">
                {{ trendPct('pssa_ela_prof_grade3') }}
              </div>
            </div>
            <div class="flex metric b-metric--fit-bullet-chart">
              <div class="w-64 flex-shrink">
                <div class="b-metric__label b-metric__label--dark">
                  {{ metricLabel('pssa_math_prof') }}
                </div>
                <div
                  class="b-metric__value b-metric__value--dark b-metric__value--large"
                  :class="['color-' + ratingToKey(rating('pssa_math_prof'))]"
                >
                  {{ scorePct('pssa_math_prof') }}
                  ({{ rating('pssa_math_prof') }})
                </div>
              </div>
              <QdtComponent
                type="QdtViz"
                no-buttons
                :props="{
                  id: 'ZTfBeS',
                  type: 'bulletchart',
                  height: '100px',
                }"
                class="w-1/2"
              />
              <div class="w-1/5 b-metric__value b-metric__value--large">
                {{ trendPct('pssa_math_prof') }}
              </div>
            </div>
          </div>
        </div>
        <div class="b-sep b-sep--text-inside flex justify-around">
          <span>Metric Ratings:</span>
          <span class="color-notmeeting"> Not Meeting </span>
          <span class="color-approaching"> Approaching </span>
          <span class="color-meeting"> Meeting </span>
          <span class="color-exceeding"> Exceeding </span>
        </div>
      </div>
      <div class="page">
        <div>
          <div class="b-sep" />
          <div class="b-metric__title">
            Performance Against Guardrail Indicators
          </div>
          <div class="flex">
            <div class="w-4/5 b-metric__subtitle">
              Guardrails are conditions the District must ensure in order for
              the District goals to be met.
            </div>
            <div class="w-1/5 b-metric__subtitle--right">Three-Year Trend</div>
          </div>
          <div class="b-metric">
            <div class="b-metric__label b-metric__label--dark">
              Guardrail 1: Welcoming & Supportive Schools
            </div>
          </div>
          <div class="flex metric">
            <div class="flex w-4/5">
              <div
                class="b-metric__label b-metric__label--light b-metric__label--indent w-64"
              >
                School Climate Score
              </div>
              <div class="b-metric__value">
                <span>{{ score('climate_score') }}</span>
              </div>
            </div>
            <div class="w-1/5 b-metric__value b-metric__value--large">
              {{ trend('climate_score') }}
            </div>
          </div>
          <div class="flex metric">
            <div class="flex w-4/5">
              <div
                class="b-metric__label b-metric__label--light b-metric__label--indent w-64"
              >
                School Instruction Score
              </div>
              <div class="b-metric__value">
                <span>{{ score('instruction_score') }}</span>
              </div>
            </div>
            <div class="w-1/5 b-metric__value b-metric__value--large">
              {{ trend('instruction_score') }}
            </div>
          </div>
          <div class="flex metric">
            <div class="flex w-4/5">
              <div
                class="b-metric__label b-metric__label--light b-metric__label--indent w-64"
              >
                Lead Safe
              </div>
              <div class="b-metric__value">
                <unicon
                  v-if="scoreText('lead_safe') === 'Yes'"
                  name="check-square"
                />
                <unicon v-else name="square-full" />
              </div>
            </div>
          </div>
          <div class="flex metric">
            <div class="flex w-4/5">
              <div
                class="b-metric__label b-metric__label--light b-metric__label--indent w-64"
              >
                Asbestos Safe
              </div>
              <div class="b-metric__value">
                <unicon
                  v-if="scoreText('asbestos_safe') === 'Yes'"
                  name="check-square"
                />
                <unicon v-else name="square-full" />
              </div>
            </div>
          </div>
          <div class="flex metric">
            <div class="flex w-4/5">
              <div
                class="b-metric__label b-metric__label--light b-metric__label--indent w-64"
              >
                At Least 2 Behavioral/Mental Supports Per 500 Students
              </div>
              <div class="b-metric__value">
                <unicon
                  v-if="
                    scoreText('fte_behavioralsupports_sufficient_yn') === 'Yes'
                  "
                  name="check-square"
                />
                <unicon v-else name="square-full" />
              </div>
            </div>
          </div>
          <div class="b-metric">
            <div class="b-metric__label b-metric__label--dark">
              Guardrail 2: Enriching & Well-Rounded School Experiences
            </div>
          </div>
          <div class="flex metric">
            <div class="flex w-4/5">
              <div
                class="b-metric__label b-metric__label--light b-metric__label--indent w-64"
              >
                % of Students Enrolled in Visual/Performing Arts
              </div>
              <div class="b-metric__value">
                <span>{{ scorePct('arts_participation') }}</span>
              </div>
            </div>
            <div class="w-1/5 b-metric__value b-metric__value--large">
              {{ trendPct('arts_participation') }}
            </div>
          </div>
          <div class="b-metric">
            <div class="b-metric__label b-metric__label--dark">
              Guardrail 3: Partnerinng with Parents & Family Members
            </div>
          </div>
          <div class="flex metric">
            <div class="flex w-4/5">
              <div
                class="b-metric__label b-metric__label--light b-metric__label--indent w-64"
              >
                School Relationship Score
              </div>
              <div class="b-metric__value">
                <span>{{ score('relationship_score') }}</span>
              </div>
            </div>
            <div class="w-1/5 b-metric__value b-metric__value--large">
              {{ trend('relationship_score') }}
            </div>
          </div>
          <div class="flex metric">
            <div class="flex w-4/5">
              <div
                class="b-metric__label b-metric__label--light b-metric__label--indent w-64"
              >
                SAC Meets at Least 3 Times Per Year
              </div>
              <div class="b-metric__value">
                <unicon
                  v-if="scoreText('sac_meets_regularly_yn') === 'Yes'"
                  name="check-square"
                />
                <unicon v-else name="square-full" />
              </div>
            </div>
          </div>
          <div class="b-metric">
            <div
              class="b-metric__label b-metric__label--light b-metric__label--indent w-64"
            >
              Guardrail 4: Addressing Racist Practices
            </div>
          </div>
          <div class="flex metric">
            <div class="flex w-4/5">
              <div
                class="b-metric__label b-metric__label--light b-metric__label--indent w-64"
              >
                % of Black/African American and Hispanic/Latinx Students
                Qualified to Attend Special Admission High Schools
              </div>
              <div class="b-metric__value">
                <span>{{ scorePct('special_admit_qual_minority') }}</span>
              </div>
            </div>
            <div class="w-1/5 b-metric__value b-metric__value--large">
              {{ trendPct('special_admit_qual_minority') }}
            </div>
          </div>
          <div class="flex metric">
            <div class="flex w-4/5">
              <div
                class="b-metric__label b-metric__label--light b-metric__label--indent w-64"
              >
                % of Suspensions Received by Black/African American Students
              </div>
              <div class="b-metric__value">
                <span>{{ scorePct('suspensions_minority') }}</span>
              </div>
            </div>
            <div class="w-1/5 b-metric__value b-metric__value--large">
              {{ trendPct('suspensions_minority') }}
            </div>
          </div>
          <div class="b-sep" />
        </div>
      </div>
    </div>
    <!-- domains -->
    <div v-for="domain in domainFacts" :key="domain.key" class="domain">
      <div v-for="(page, pIndex) in domain.pages" :key="pIndex" class="page">
        <div class="b-header flex justify-between">
          <h1>{{ schoolname }}</h1>
          <h1>{{ $store.getters.sy_c }} End of Year Report</h1>
        </div>
        <div class="b-subheader">{{ domain.title }}</div>
        <div v-for="(goal, gIndex) in page.goals" :key="gIndex">
          <div v-if="gIndex > 0" class="b-sep" />
          <div v-else class="b-hr b-hr-heavy" />
          <div class="b-metric__title b-metric__title--goal">
            {{ goal.title }}
          </div>
          <div class="b-hr" />
          <div v-for="(metric, mIndex) in goal.metrics" :key="mIndex">
            <div v-if="!metric.isInformational" class="b-metric flex my-2">
              <div class="b-metric__label b-metric__label--dark w-1/3">
                &nbsp;
              </div>
              <div class="b-metric__value b-metric__value--dark w-1/6">
                Metric Score
              </div>
              <div class="b-metric__value b-metric__value--dark w-1/6">
                Distance from target
              </div>
              <div class="b-metric__value b-metric__value--dark w-1/6">
                Change from Prior Year
              </div>
              <div class="b-metric__value b-metric__value--dark w-1/6">
                Rating
              </div>
            </div>
            <div class="b-metric flex">
              <div
                class="b-metric__label w-1/3"
                :class="[
                  metric.isInformational
                    ? 'b-metric__label--light'
                    : 'b-metric__label--dark',
                  metric.isGrouped ? 'b-metric__label--indent' : '',
                ]"
              >
                {{ metricLabel(metric.id) }}
              </div>
              <div
                class="b-metric__value w-1/6"
                :class="
                  metric.isInformational
                    ? 'b-metric__value--light'
                    : 'b-metric__value--dark'
                "
              >
                {{ metric.isAGI ? score(metric.id) : scorePct(metric.id) }}
              </div>
              <div
                class="b-metric__value w-1/6"
                :class="
                  metric.isInformational
                    ? 'b-metric__value--light'
                    : 'b-metric__value--dark'
                "
              >
                {{
                  metric.isInformational
                    ? ''
                    : metric.isAGI
                    ? distance(metric.id)
                    : distancePct(metric.id)
                }}
              </div>
              <div
                class="b-metric__value w-1/6"
                :class="
                  metric.isInformational
                    ? 'b-metric__value--light'
                    : 'b-metric__value--dark'
                "
              >
                {{ metric.isAGI ? yoy(metric.id) : yoyPct(metric.id) }}
              </div>
              <div
                class="b-metric__value w-1/6"
                :class="[
                  metric.isInformational
                    ? 'b-metric__value--light'
                    : 'b-metric__value--dark',
                  'color-' + ratingToKey(rating(metric.id)),
                ]"
              >
                {{ rating(metric.id) }}
              </div>
            </div>
            <div v-if="metric.bulletChartId" class="flex">
              <div class="w-1/3">&nbsp;</div>
              <QdtComponent
                type="QdtViz"
                no-buttons
                :props="{
                  id: metric.bulletChartId,
                  type: 'bulletchart',
                  height: '100px',
                }"
                class="w-2/3"
              />
            </div>
            <div v-if="metric.byGroup" class="b-metric b-metric--equity">
              <div class="b-metric__title b-metric__title--equity w-full">
                Equity in Student Achievement - {{ metricLabel(metric.id) }}, by
                Student Group
              </div>
              <div
                v-for="group in studentGroups"
                :key="group.key"
                class="b-metric flex"
              >
                <div class="b-metric__label b-metric__label--equity w-1/3">
                  {{ group.label }}
                </div>
                <div class="b-metric__value w-1/6">
                  {{
                    metric.isAGI
                      ? scoreByGroup(metric.id, group.key)
                      : scorePctByGroup(metric.id, group.key)
                  }}
                </div>
                <div class="b-metric__value w-1/6">
                  {{
                    metric.isAGI
                      ? distanceByGroup(metric.id, group.key)
                      : distancePctByGroup(metric.id, group.key)
                  }}
                </div>
                <div class="b-metric__value w-1/6">
                  {{
                    metric.isAGI
                      ? yoyByGroup(metric.id, group.key)
                      : yoyPctByGroup(metric.id, group.key)
                  }}
                </div>
                <div
                  class="b-metric__value b-metric__value--dark w-1/6"
                  :class="[
                    'color-' + ratingToKey(ratingByGroup(metric.id, group.key)),
                  ]"
                >
                  {{ ratingByGroup(metric.id, group.key) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QdtComponent from '~sdp-components/Qdt/QdtComponent'
import schoolReportMetricDef from '~/definitions/schoolReportMetrics'

export default {
  components: {
    QdtComponent,
  },
  data() {
    return {
      schoolReportKey: '1111|K8',
      // for loading data
      schoolReportSessionObject: null,
      schoolReportValues: null,
    }
  },
  computed: {
    // info for the cover sheet
    schoolname() {
      return this.$store.getters['schools/getFieldBySchoolReportKey'](
        'schoolname',
        this.schoolReportKey
      ).text
    },
    ulcs() {
      return this.$store.getters['schools/getFieldBySchoolReportKey'](
        'ulcs',
        this.schoolReportKey
      ).text
    },
    sector() {
      return this.$store.getters['schools/getFieldBySchoolReportKey'](
        'sector',
        this.schoolReportKey
      ).text
    },
    address() {
      return this.$store.getters['schools/getFieldBySchoolReportKey'](
        'address',
        this.schoolReportKey
      ).text
    },
    phonenumber() {
      return this.$store.getters['schools/getFieldBySchoolReportKey'](
        'phonenumber',
        this.schoolReportKey
      ).text
    },
    network() {
      return this.$store.getters['schools/getFieldBySchoolReportKey'](
        'network',
        this.schoolReportKey
      ).text
    },
    website() {
      return this.$store.getters['schools/getFieldBySchoolReportKey'](
        'website',
        this.schoolReportKey
      ).text
    },
    report() {
      return this.$store.getters['schools/getFieldBySchoolReportKey'](
        'report',
        this.schoolReportKey
      ).text
    },
    gradesServed() {
      return this.$store.getters['schools/getFieldBySchoolReportKey'](
        'gradesServed',
        this.schoolReportKey
      ).text
    },
    admissiontype() {
      return this.$store.getters['schools/getFieldBySchoolReportKey'](
        'admissiontype',
        this.schoolReportKey
      ).text
    },
    turnaround() {
      return this.$store.getters['schools/getFieldBySchoolReportKey'](
        'turnaround',
        this.schoolReportKey
      ).text
    },
    principal() {
      return 'Jalen Hurts'
    },
    isHS() {
      return this.report === 'HS'
    },
    hasHS() {
      return 'Yes'
    },

    /**
     * The studentGroups are the list of suffixes and label assicated with student groups that are part of the equity breakouts.
     * For example black is used to append keystone_prof_all (i.e., keystone_prof_all_black) to find the % of Black students proficient.
     */
    studentGroups() {
      return [
        { key: 'black', label: 'Black/African American' },
        { key: 'hispanic', label: 'Hispanic/Latino' },
        { key: 'white', label: 'White' },
        { key: 'asian', label: 'Asian' },
        { key: 'multirace', label: 'Multi Racial/Other' },
        { key: 'native', label: 'American Indian/Alaskan Native' },
        { key: 'pacific', label: 'Pacific Islander' },
        { key: 'ecdis', label: 'Economically Disadvantaged' },
        { key: 'sped', label: 'SPED' },
        { key: 'el', label: 'English Learner' },
      ]
    },
    /**
     * The domain facts list the goals (split into pages) associated with each domain and provides the information
     * needed to display associated metrics and visualizations
     */
    domainFacts() {
      return [
        {
          key: 'ela',
          title: 'Reading/ELA: Every student reads on or above grade level.',
          pages: [
            {
              goals: [
                {
                  title:
                    'Goal 1: The percentage of students in grades 3-8 who are proficient on the state ELA assessment will grow from 35.7% in August 2019 to 65.0% by August 2026.',
                  metrics: [
                    {
                      id: 'pssa_ela_prof',
                      byGroup: true,
                      bulletChartId: 'CWDMjn',
                    },
                    {
                      id: 'pssa_ela_agi',
                      byGroup: true,
                      bulletChartId: 'ynu',
                      isAGI: true,
                    },
                    {
                      id: 'within_ela_met',
                      byGroup: false,
                      isInformational: true,
                    },
                    {
                      id: 'within_ela_participation',
                      byGroup: false,
                      isInformational: true,
                    },
                  ],
                },
                {
                  title:
                    'Goal 2: The percentage of 3rd grade students who are proficient on the state ELA assessment will grow from 32.5% in August 2019 to 62.0% by August 2026.',
                  metrics: [
                    {
                      id: 'pssa_ela_prof_grade3',
                      byGroup: true,
                      bulletChartId: 'BRwxpma',
                    },
                    {
                      id: 'within_ela_met',
                      byGroup: false,
                      isInformational: true,
                    },
                    {
                      id: 'within_ela_participation',
                      byGroup: false,
                      isInformational: true,
                    },
                  ],
                },
                {
                  title: 'Other Key Indicators',
                  metrics: [
                    {
                      id: 'growth_met_el',
                      byGroup: false,
                    },
                    {
                      id: 'growth_met_el_50_99',
                      byGroup: false,
                      isInformational: true,
                      isGrouped: true,
                    },
                    {
                      id: 'growth_met_el_0_49',
                      byGroup: false,
                      isInformational: true,
                      isGrouped: true,
                    },
                    {
                      id: 'growth_met_el_0',
                      byGroup: false,
                      isInformational: true,
                      isGrouped: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ]
    },
  },
  async created() {
    // for loading data
    this.schoolReportSessionObject = await this.$qlik.generateHypercubeObjectFromDef(
      schoolReportMetricDef(this.schoolReportKey)
    )
    this.schoolReportSessionObject.on('changed', this.update)
    this.update()
  },
  methods: {
    async update() {
      if (this.schoolReportSessionObject) {
        this.schoolReportValues = await this.$qlik.getValuesFromHypercubeObject(
          this.schoolReportSessionObject
        )
      }
    },

    /// utilities
    /**
     * method converts the rating, e.g., "Not Meeting" to a key that can be used to pull a color, e.g, "notmeeting"
     */
    ratingToKey(rating) {
      return rating?.toLowerCase().replace(' ', '') || ''
    },
    formatChangeAsArrow(value) {
      return value > 0
        ? `🠕 ${Math.abs(value)}`
        : value < 0
        ? `🠗 ${Math.abs(value)}`
        : value
    },

    /// for getting values from the session objects matrices

    /**
     * used to gather the index of the particular index for a metric, used for gathering parallel metrics
     */
    metricIndex(metric) {
      if (this.schoolReportValues?.metric?.length > 0) {
        const index = this.schoolReportValues.metric
          .map((obj, index) => ({
            ...obj,
            index,
          }))
          .filter(({ text }) => metric === text)
          .map(({ index }) => index)
        if (index.length >= 0) {
          return index[0]
        } else {
          return -1
        }
      } else {
        return -1
      }
    },
    rating(metric) {
      const index = this.metricIndex(metric)
      const text = index >= 0 ? this.schoolReportValues.rating[index]?.text : ''
      if (text) {
        return text.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        )
      } else {
        return ''
      }
    },
    score(metric) {
      const index = this.metricIndex(metric)
      return index >= 0
        ? Math.round(100 * this.schoolReportValues.score[index]?.number) /
            100 || '-'
        : '-'
    },
    scoreText(metric) {
      const index = this.metricIndex(metric)
      return index >= 0 ? this.schoolReportValues.score[index]?.text : '-'
    },
    scorePct(metric) {
      const value = this.score(metric)
      if (isFinite(value)) {
        return Math.round(100 * value) + '%'
      } else {
        return '-'
      }
    },
    yoy(metric) {
      const index = this.metricIndex(metric)
      const value =
        Math.round(100 * this.schoolReportValues.yoy[index]?.number) / 100
      return isFinite(value) ? this.formatChangeAsArrow(value) : '-'
    },
    yoyPct(metric) {
      const index = this.metricIndex(metric)
      const value = Math.round(100 * this.schoolReportValues.yoy[index]?.number)
      return isFinite(value) ? this.formatChangeAsArrow(value) + '%' : '-'
    },
    distance(metric) {
      const index = this.metricIndex(metric)
      return index >= 0
        ? Math.round(100 * this.schoolReportValues.distance[index]?.number) /
            100 || '-'
        : '-'
    },
    distancePct(metric) {
      const distance = this.distance(metric)
      if (isFinite(distance)) {
        return Math.round(100 * distance) + '%'
      } else {
        return '-'
      }
    },
    trend(metric) {
      const index = this.metricIndex(metric)
      const value =
        Math.round(100 * this.schoolReportValues.trend[index]?.number) / 100
      return isFinite(value) ? this.formatChangeAsArrow(value) : '-'
    },
    trendPct(metric) {
      const index = this.metricIndex(metric)
      const value = Math.round(
        100 * this.schoolReportValues.trend[index]?.number
      )
      return isFinite(value) ? this.formatChangeAsArrow(value) + '%' : '-'
    },
    metricLabel(metric) {
      const index = this.metricIndex(metric)
      return index >= 0
        ? this.schoolReportValues.metricLabel[index]?.text
        : metric
    },
    // repeat the previous with a particular group
    ratingByGroup(metric, group) {
      return this.rating(metric + '_' + group)
    },
    scoreByGroup(metric, group) {
      return this.score(metric + '_' + group)
    },
    scorePctByGroup(metric, group) {
      return this.scorePct(metric + '_' + group)
    },
    yoyByGroup(metric, group) {
      return this.yoy(metric + '_' + group)
    },
    yoyPctByGroup(metric, group) {
      return this.yoyPct(metric + '_' + group)
    },
    distanceByGroup(metric, group) {
      return this.distance(metric + '_' + group)
    },
    distancePctByGroup(metric, group) {
      return this.distancePct(metric + '_' + group)
    },
  },
}
</script>
<style lang="postcss" scoped>
/*
  Generally applying BEN approach, which keeps things modular and flat.
  This is helpful when trying to implement some other system.
  Keep Tailwind to a minium so that this can be replicated outside of NUXT
 */
a {
  color: blue;
  text-decoration: underline;
}
hr {
  border-top: 1px solid #444444;
}

.color-notmeeting {
  color: #c0504d;
  font-weight: bold;
}
.color-approaching {
  color: #f79646;
  font-weight: bold;
}
.color-meeting {
  color: #00b050;
  font-weight: bold;
}
.color-exceeding {
  color: #0070c0;
  font-weight: bold;
}

.report {
  width: 7.5in;
}

.page {
  margin-top: 0.5in;
  margin-bottom: 0.5in;
  height: 10in;
}

.b-sep {
  background-color: #aaaaaa;
  width: 100%;
  min-height: 1rem;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-left: none;
  border-right: none;
}
.b-sep--clear {
  background-color: transparent;
}
.b-sep--text-inside {
  background-color: transparent;
  min-height: 1.5rem;
}
.b-hr {
  width: 100%;
  height: 1px;
  border-top: 1px solid black;
  border-bottom: none;
  border-left: none;
  border-right: none;
}
.b-hr-heavy {
  height: 2px;
  border-top: 2px solid black;
}

.b-header {
  padding-left: 5pt;
  padding-right: 5pt;
  background-color: black;
  color: white;
  font-size: 18pt;
}
.b-header-small {
  font-size: 14pt;
}

.b-subheader {
  color: black;
  font-size: 16pt;
  font-weight: bold;
}

/* The schoolinfo block shows key-value pairs in two columns */
.b-schoolinfo {
  font-size: 10pt;
}
.b-schoolinfo__label {
  white-space: nowrap;
  color: #888888;
}
.b-schoolinfo__value {
  white-space: nowrap;
  margin-left: 2rem;
  margin-right: 2pt;
  color: black;
}

.b-metric {
  color: black;
  font-size: 10pt;
}
.b-metric--fit-bullet-chart {
  height: 7rem;
}
.b-metric--equity {
  background-color: #e0e0ff;
  padding-bottom: 0.5rem;
  width: 100%;
  min-height: 1rem;
  border-top: 1px solid #888888;
  border-bottom: 1px solid #888888;
  border-left: none;
  border-right: none;
}
.b-metric__title {
  font-size: 12pt;
  font-weight: bold;
}
.b-metric__title--equity {
  font-size: 10pt;
  font-style: italic;
  padding-left: 2rem;
}
.b-metric__title--goal {
  font-style: italic;
}
.b-metric__subtitle {
  font-size: 9pt;
  font-style: italic;
}
.b-metric__subtitle--right {
  text-align: center;
}
.b-metric__label {
  font-size: 11pt;
  padding-right: 2pt;
  padding-top: 2px;
}
.b-metric__label--dark {
  font-weight: bold;
}
.b-metric__label--light {
  color: #888888;
  padding-right: 2pt;
}
.b-metric__label--indent {
  padding-left: 2rem;
}
.b-metric__label--equity {
  padding-left: 4rem;
}
.b-metric__value {
  text-align: center;
  font-size: 11pt;
  padding-right: 2pt;
  padding-top: 2px;
}
.b-metric__value--dark {
  font-weight: bold;
}
.b-metric__value--light {
  color: #888888;
  & span {
    padding-left: 3px;
  }
}
.b-metric__value--large {
  font-size: 12pt;
  text-align: center;
}

.b-metric__rating {
  font-size: 12pt;
  font-weight: bold;
  width: 100%;
  text-align: center;
}
</style>
