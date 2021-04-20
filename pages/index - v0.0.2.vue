<template>
  <div class="container mx-auto flex flex-wrap lg:flex-no-wrap justify-start">
    <div
      v-if="!print"
      class="w-full hidden lg:block lg:w-1/6 lg:h-screen sticky top-0 mr-24"
    >
      <scroll-spy-nav
        class="bg-blue-100 px-2"
        title="Sections"
        :refs="
          isHS
            ? ['cover', 'cc', 'climate']
            : ['cover', 'ela', 'math', 'climate']
        "
        :target="thisComponent"
        orientation="col"
      />
      <button-group
        :options="[
          { value: '7400|K8', label: 'K-8' },
          { value: '8090|HS', label: 'HS' },
        ]"
        :selected-value="schoolReportKey"
        label="Select report type:"
        vertical
        @buttonClicked="handleReportChange"
      />
    </div>
    <div class="report">
      <!-- cover -->
      <div ref="cover" name="Cover">
        <div class="page">
          <h1 class="b-header">
            {{ $store.getters.sy_c }} School Progress Report on Education and
            Equity
          </h1>
          <h1 class="b-subheader">{{ schoolname }}</h1>
          <div class="b-schoolinfo flex">
            <div class="w-1/2">
              <div class="flex">
                <div class="b-schoolinfo__label">School Code</div>
                <div class="b-schoolinfo__value">{{ ulcs }}</div>
              </div>
              <div class="flex">
                <div class="b-schoolinfo__label">Principal Name</div>
                <div class="b-schoolinfo__value">{{ principal }}</div>
              </div>
              <div class="flex">
                <div class="b-schoolinfo__label">Sector</div>
                <div class="b-schoolinfo__value">{{ sector }}</div>
              </div>
              <div class="flex">
                <div class="b-schoolinfo__label">Address</div>
                <div class="b-schoolinfo__value">{{ address }}</div>
              </div>
              <div class="flex">
                <div class="b-schoolinfo__label">Phone</div>
                <div class="b-schoolinfo__value">{{ phonenumber }}</div>
              </div>
              <div class="flex">
                <div class="b-schoolinfo__label">Network</div>
                <div class="b-schoolinfo__value">{{ network }}</div>
              </div>
            </div>
            <div class="w-1/2">
              <div class="flex">
                <div class="b-schoolinfo__label">Website</div>
                <a
                  class="b-schoolinfo__value"
                  :href="'https://' + website"
                  target="_blank"
                  >{{ website }}</a
                >
              </div>
              <div class="flex">
                <div class="b-schoolinfo__label">Report Type</div>
                <div class="b-schoolinfo__value">{{ report }}</div>
              </div>
              <div class="flex">
                <div class="b-schoolinfo__label">Grades in Report</div>
                <div class="b-schoolinfo__value">{{ gradesServed }}</div>
              </div>
              <div class="flex">
                <div class="b-schoolinfo__label">Admissions Category</div>
                <div class="b-schoolinfo__value">{{ admissiontype }}</div>
              </div>
              <div class="flex">
                <div class="b-schoolinfo__label">Turnaround Model</div>
                <div class="b-schoolinfo__value">{{ turnaround }}</div>
              </div>
              <div class="flex">
                <div class="b-schoolinfo__label">
                  School Receives a High School Report
                </div>
                <div class="b-schoolinfo__value">{{ hasHS }}</div>
              </div>
            </div>
          </div>
          <div class="b-sep b-sep--clear" />
          <div class="b-cmetric-table">
            <div class="b-cmetric-table__title">
              Student Enrollment and Demographics
            </div>
            <div class="flex justify-start">
              <div class="b-cmetric-table__row-label w-1/2">
                # of Students Enrolled on October 1
              </div>
              <div class="b-cmetric-table__value">{{ score('ENR_OCT1') }}</div>
            </div>
            <div class="flex justify-start">
              <div class="b-cmetric-table__row-label w-1/2">
                Total # of Students Served for 10+ Days Over the Year
              </div>
              <div class="b-cmetric-table__value">{{ score('ENR') }}</div>
            </div>
          </div>
          <div class="b-sep" />
          <div class="b-cmetric">
            <div class="flex">
              <QdtComponent
                type="QdtViz"
                no-buttons
                :props="{
                  id: 'JRfps',
                  type: 'barchart',
                  height: '210px',
                }"
                class="w-1/2"
              />
              <QdtComponent
                type="QdtViz"
                no-buttons
                :props="{
                  id: 'JGcDeX',
                  type: 'barchart',
                  height: '210px',
                }"
                class="w-1/2"
              />
            </div>
          </div>
          <div class="b-sep" />
          <div class="b-cmetric-table">
            <div class="b-cmetric-table__title">Teachers</div>
            <div class="flex justify-start">
              <div class="b-cmetric-table__row-label w-1/2">
                Teachers Rated as Distinguished
              </div>
              <div class="b-cmetric-table__value">
                {{ score('TEACHERS_DISTINGUISHED') }}
              </div>
            </div>
            <div class="flex justify-start">
              <div class="b-cmetric-table__row-label w-1/2">
                Teachers Rated as Proficient
              </div>
              <div class="b-cmetric-table__value">
                {{ score('TEACHERS_PROFICIENT') }}
              </div>
            </div>
          </div>
          <div class="b-sep" />
          <div class="b-overall mb-2">
            <div class="flex justify-start">
              <div class="b-overall__title">Overall Rating:</div>
              <div
                class="b-overall__title--tier pl-4"
                :class="[`color-${overallTier.toLowerCase()}`]"
              >
                {{ overallTier }} {{ overallImprovingText }}
                {{ overallEquitableText }}
              </div>
            </div>
            <div class="pl-4">
              <div class="flex justify-start items-center">
                <div class="b-overall__row-label">Overall Performance:</div>
                <div class="b-overall__value">
                  At or Above Target for
                  <span class="b-overall__value--numeric"
                    >{{ overallCountAtAboveTarget }}
                  </span>
                  of
                  <span class="b-overall__value--numeric"
                    >{{ overallCountEligible }}
                  </span>
                  (<span class="b-overall__value--numeric"
                    >{{ overallPctAtAboveTarget }} </span
                  >)
                </div>
              </div>
              <div class="flex justify-start items-center">
                <div class="b-overall__row-label">
                  Year-Over-Year Performance:
                </div>
                <div class="b-overall__value">
                  Improving for
                  <span class="b-overall__value--numeric"
                    >{{ overallCountImproving }}
                  </span>
                  of
                  <span class="b-overall__value--numeric"
                    >{{ overallCountEligibleImproving }}
                  </span>
                  (<span class="b-overall__value--numeric"
                    >{{ overallPctImproving }} </span
                  >)
                </div>
              </div>
              <div class="flex justify-start items-center">
                <div class="b-overall__row-label">
                  Student Group Performance:
                </div>
                <div class="b-overall__value">
                  Improving for
                  <span class="b-overall__value--numeric"
                    >{{ overallCountImprovingEquity }}
                  </span>
                  of
                  <span class="b-overall__value--numeric"
                    >{{ overallCountEligibleImprovingEquity }}
                  </span>
                  (<span class="b-overall__value--numeric"
                    >{{ overallPctImprovingEquity }} </span
                  >)
                </div>
              </div>
            </div>
          </div>
          <div class="b-sep" />
          <div class="b-rollup mb-2">
            <div class="flex justify-between">
              <div class="b-rollup__title">Percent of Metrics At Target</div>
              <div style="width: 500px" class="flex justify-around">
                <span> {{ $store.getters.sy_p2 }} </span>
                <span> {{ $store.getters.sy_p }} </span>
                <span> {{ $store.getters.sy_c }} </span>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <div class="b-rollup__row-label">Overall</div>
              <QdtComponent
                type="QdtViz"
                no-buttons
                :props="{
                  id: 'pUvdwc',
                  type: 'linechart',
                  width: '500px',
                  height: '100px',
                }"
              />
            </div>
            <div v-if="!isHS" class="flex justify-between items-center">
              <div class="b-rollup__row-label">Reading/ELA</div>
              <QdtComponent
                type="QdtViz"
                no-buttons
                :props="{
                  id: 'akadPkX',
                  type: 'linechart',
                  width: '500px',
                  height: '100px',
                }"
              />
            </div>
            <div v-if="!isHS" class="flex justify-between items-center">
              <div class="b-rollup__row-label">Math/Science</div>
              <QdtComponent
                type="QdtViz"
                no-buttons
                :props="{
                  id: 'eCaEU',
                  type: 'linechart',
                  width: '500px',
                  height: '100px',
                }"
              />
            </div>
            <div class="flex justify-between items-center">
              <div class="b-rollup__row-label">
                Climate, Culture & Opportunity
              </div>
              <QdtComponent
                type="QdtViz"
                no-buttons
                :props="{
                  id: 'fyvQY',
                  type: 'linechart',
                  width: '500px',
                  height: '100px',
                }"
              />
            </div>
            <div v-if="isHS" class="flex justify-between items-center">
              <div class="b-rollup__row-label">College & Career</div>
              <QdtComponent
                type="QdtViz"
                no-buttons
                :props="{
                  id: 'CQqNCd',
                  type: 'linechart',
                  width: '500px',
                  height: '100px',
                }"
              />
            </div>
          </div>
          <div class="b-sep" />
          <div class="b-cmetric">
            <div v-if="!isHS">
              <div class="b-cmetric-title">
                Performance Against District Goals
              </div>
              <div class="flex flex-justify">
                <div class="w-4/5 b-cmetric-subtitle">
                  These goals are the District's key progress measures that are
                  monitored by the Board of Education
                </div>
                <div class="w-1/5 b-cmetric-subtitle">
                  Change from Prior Year
                </div>
              </div>
              <div
                v-for="(metric, mIndex) in coverBulletMetrics"
                :key="mIndex"
                class="b-cmetric"
              >
                <div class="b-cmetric__label">
                  {{ metric.label }}
                </div>
                <div class="flex">
                  <div class="w-64">
                    <div
                      class="b-cmetric__value b-cmetric__value--highlight"
                      :class="['color-tier-' + tier(metric.id, 'number')]"
                    >
                      {{ score(metric.id) }}
                      ({{ tier(metric.id) }})
                    </div>
                  </div>
                  <QdtComponent
                    type="QdtViz"
                    no-buttons
                    :props="{
                      id: metric.bulletChartId,
                      type: 'bulletchart',
                      height: '80px',
                    }"
                    class="w-1/2"
                  />
                  <div class="w-1/5 b-cmetric__value">
                    {{ yoy(metric.id) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-2 b-sep b-sep--text-inside flex justify-start">
            <span class="mx-4">Metric Tier Color Key:</span>
            <div class="flex justify-start w-2/3">
              <span class="color-tier-1 mx-2"> Not Meeting Target </span>
              <span class="color-tier-2 mx-2"> Approaching Target </span>
              <span class="color-tier-3 mx-2"> At Target </span>
              <span class="color-tier-4 mx-2"> Above Target </span>
            </div>
          </div>
        </div>
        <div class="page">
          <div class="b-sep" />
          <div class="b-cmetric-table">
            <div class="b-cmetric-table__title">
              Performance Against Guardrail Indicators
            </div>
            <div class="b-cmetric-table__subtitle">
              Guardrails are conditions the District must ensure in order for
              the District goals to be met.
            </div>
            <div class="flex">
              <div class="w-2/3">&nbsp;</div>
              <div class="w-1/3 flex">
                <div class="w-1/2 b-cmetric-table__header">Score</div>
                <div class="w-1/2 b-cmetric-table__header">
                  Change from Prior Year
                </div>
              </div>
            </div>
            <div v-for="(guardrail, grIndex) in coverGuardrails" :key="grIndex">
              <div
                class="b-cmetric-table__row-label b-cmetric-table__row-label--highlight"
              >
                {{ guardrail.title }}
              </div>
              <div
                v-for="(metric, mIndex) in guardrail.metrics"
                :key="mIndex"
                class="flex"
              >
                <div
                  class="b-cmetric-table__row-label b-cmetric-table__row-label--grouped w-2/3"
                >
                  {{ metric.label }}
                </div>
                <div class="w-1/3 flex">
                  <div class="w-1/2 b-cmetric-table__value">
                    <span v-if="!metric.isBoolean">
                      {{ score(metric.id) }}
                    </span>
                    <div v-else class="b-cmetric-table__value--icon">
                      <unicon
                        v-if="score(metric.id, 'number')"
                        name="check-square"
                      />
                      <unicon v-else name="square-full" />
                    </div>
                  </div>
                  <div class="w-1/2 b-cmetric-table__value">
                    {{ !metric.isBoolean ? yoy(metric.id) : '' }}
                  </div>
                </div>
              </div>
            </div>
            <div class="b-sep" />
          </div>
        </div>
      </div>
      <!-- domains -->
      <div
        v-for="domain in domainFacts"
        :key="domain.key"
        :ref="domain.key"
        :name="domain.label"
        class="domain"
      >
        <div v-for="(page, pIndex) in domain.pages" :key="pIndex" class="page">
          <div class="b-header flex justify-between">
            <h1>{{ schoolname }}</h1>
            <h1>
              {{ $store.getters.sy_c }} School Progress Report on Education and
              Equity
            </h1>
          </div>
          <div class="b-subheader">{{ domain.title }}</div>
          <div v-for="(goal, gIndex) in page.goals" :key="gIndex">
            <div v-if="gIndex > 0" class="b-sep" />
            <div v-else class="b-hr b-hr--heavy" />
            <div class="b-goal-title">
              {{ goal.title }}
            </div>
            <div class="b-hr" />
            <div v-for="(metric, mIndex) in goal.metrics" :key="mIndex">
              <div v-if="!metric.skip">
                <!-- Primary metrics have the name across the top, the targets beneath,
                the bulletchart below, then the table - with all the student subgroups -->
                <div v-if="metric.bulletChartId" class="my-2">
                  <div class="b-metric-title">{{ metricLabel(metric.id) }}</div>

                  <div v-if="metric.bulletChartId" class="b-metric-bullet">
                    <QdtComponent
                      type="QdtViz"
                      no-buttons
                      :props="{
                        id: metric.bulletChartId,
                        type: 'bulletchart',
                        height: '100px',
                        width: '400px',
                      }"
                    />
                    <!-- if there is no target don't print this row at all -->
                    <div
                      v-if="isFinite(atTarget(metric.id, 'number'))"
                      class="b-metric-targets"
                    >
                      <div class="w-full text-center">
                        Minimum Score for Tier
                      </div>
                      <div
                        v-if="isFinite(approaching(metric.id, 'number'))"
                        class="w-full flex justify-between"
                      >
                        <div class="b-metric-targets__label color-tier-2">
                          Approaching Target
                        </div>
                        <div class="b-metric-targets__value">
                          {{ approaching(metric.id) }}
                        </div>
                      </div>
                      <div class="w-full flex justify-between">
                        <div class="b-metric-targets__label color-tier-3">
                          At Target
                        </div>
                        <div class="b-metric-targets__value">
                          {{ atTarget(metric.id) }}
                        </div>
                      </div>
                      <div
                        v-if="isFinite(aboveTarget(metric.id, 'number'))"
                        class="w-full flex justify-between"
                      >
                        <div class="b-metric-targets__label color-tier-4">
                          Above Target
                        </div>
                        <div class="b-metric-targets__value">
                          {{ aboveTarget(metric.id) }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="ml-12">
                    <table class="table-fixed b-metric-table">
                      <thead>
                        <tr class="b-metric-table__header">
                          <th class="w-48">&nbsp;</th>
                          <th>Score</th>
                          <th>Change from Prior Year</th>
                          <th>Distance from Target</th>
                          <th class="w-48">Tier</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(group, groupIndex) in getGroups(metric)"
                          :key="groupIndex"
                        >
                          <td
                            class="b-metric-table__row-label"
                            :class="{
                              'b-metric-table__row-label--highlight':
                                group.key === 'all',
                            }"
                          >
                            {{ group.label }}
                          </td>
                          <td
                            class="b-metric-table__value"
                            :class="{
                              'b-metric-table__value--highlight':
                                group.key === 'all',
                            }"
                          >
                            {{ score(getMetricIdByGroup(metric, group)) }}
                          </td>
                          <td
                            class="b-metric-table__value"
                            :class="{
                              'b-metric-table__value--highlight':
                                group.key === 'all',
                            }"
                          >
                            {{ yoy(getMetricIdByGroup(metric, group)) }}
                          </td>
                          <td
                            class="b-metric-table__value"
                            :class="{
                              'b-metric-table__value--highlight':
                                group.key === 'all',
                            }"
                          >
                            {{ distance(getMetricIdByGroup(metric, group)) }}
                          </td>
                          <td
                            class="b-metric-table__value b-metric-table__value--tier"
                            :class="[
                              'color-tier-' +
                                tier(
                                  getMetricIdByGroup(metric, group),
                                  'number'
                                ),
                            ]"
                          >
                            {{ tier(getMetricIdByGroup(metric, group)) }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="b-metric-hr">&nbsp;</div>
                </div>
                <!-- Secondary metrics do not have bulletchart and the targets are not displayed,
                      may or may not have distance from target and tier (informational or not) -->
                <div v-else>
                  <table class="table-fixed b-smetric-table">
                    <!-- only put a table head if this is not the first informational metric in a row -->
                    <thead v-if="mIndex === 0">
                      <tr>
                        <th class="b-smetric-table__header-label">&nbsp;</th>
                        <th class="b-smetric-table__header-value">
                          {{
                            metric.parallel_metrics
                              ? metric.parallel_metrics.length > 0
                                ? metricLabel(metric.id)
                                : 'Score'
                              : 'Score'
                          }}
                        </th>
                        <th class="b-smetric-table__header-value">
                          {{
                            metric.parallel_metrics
                              ? metric.parallel_metrics.length > 0
                                ? metricLabel(metric.parallel_metrics[0].id)
                                : ''
                              : 'Change from Prior Year'
                          }}
                        </th>
                        <th class="b-smetric-table__header-value">
                          {{
                            metric.parallel_metrics
                              ? metric.parallel_metrics.length > 1
                                ? metricLabel(metric.parallel_metrics[1].id)
                                : ''
                              : !isInformational(metric.id)
                              ? 'Distance From Target'
                              : ''
                          }}
                        </th>
                        <th class="b-smetric-table__header-value w-48">
                          {{
                            metric.parallel_metrics
                              ? metric.parallel_metrics.length > 2
                                ? metricLabel(metric.parallel_metrics[2].id)
                                : ''
                              : !isInformational(metric.id)
                              ? 'Tier'
                              : ''
                          }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(group, groupIndex) in getGroups(metric)"
                        :key="groupIndex"
                      >
                        <td
                          class="b-smetric-table__row-label"
                          :class="{
                            'b-smetric-table__row-label--grouped':
                              groupIndex > 0,
                          }"
                        >
                          {{ group.label }}
                          <!-- {{ metricLabel(getMetricIdByGroup(metric, group)) }} -->
                        </td>
                        <td class="b-smetric-table__value">
                          <unicon
                            v-if="isBinary(getMetricIdByGroup(metric, group))"
                            :name="
                              score(getMetricIdByGroup(metric, group))
                                ? 'check-square'
                                : 'square-fill'
                            "
                          />
                          <div v-else>
                            {{ score(getMetricIdByGroup(metric, group)) }}
                          </div>
                        </td>
                        <td class="b-smetric-table__value">
                          {{
                            metric.parallel_metrics
                              ? metric.parallel_metrics.length > 0
                                ? score(getMetricIdByGroup(metric, group, 0))
                                : ''
                              : !isBinary(getMetricIdByGroup(metric, group))
                              ? yoy(getMetricIdByGroup(metric, group))
                              : ''
                          }}
                        </td>
                        <td class="b-smetric-table__value">
                          {{
                            metric.parallel_metrics
                              ? metric.parallel_metrics.length > 1
                                ? score(getMetricIdByGroup(metric, group, 1))
                                : ''
                              : !isInformational(
                                  getMetricIdByGroup(metric, group)
                                )
                              ? distance(getMetricIdByGroup(metric, group))
                              : ''
                          }}
                        </td>
                        <td
                          class="b-smetric-table__value w-48"
                          :class="[
                            metric.parallel_metrics
                              ? ''
                              : `color-tier-${tier(
                                  getMetricIdByGroup(metric, group),
                                  'number'
                                )}`,
                          ]"
                        >
                          {{
                            metric.parallel_metrics
                              ? metric.parallel_metrics.length > 2
                                ? score(getMetricIdByGroup(metric, group, 2))
                                : ''
                              : !isInformational(
                                  getMetricIdByGroup(metric, group)
                                )
                              ? tier(getMetricIdByGroup(metric, group))
                              : ''
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
import ScrollSpyNav from '~sdp-components/Navigation/ScrollSpyNav'
import SelectionsMixin from '~/mixins/SelectionsMixin'
import ButtonGroup from '~sdp-components/PageElements/ButtonGroup'

export default {
  name: 'SchoolReport',
  components: {
    ScrollSpyNav,
    QdtComponent,
    ButtonGroup,
  },
  mixins: [SelectionsMixin],
  data() {
    return {
      print: false,
      schoolReportKey: '7400|K8',
      // for loading data
      schoolReportSessionObject: null,
      schoolReportValues: null,
    }
  },
  computed: {
    /// needed for scroll spy
    thisComponent() {
      return this
    },

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

    // overall values from the store
    overallPctAtAboveTarget() {
      return this.$store.getters['schools/getFieldBySchoolReportKey'](
        '% Metrics At Target (Current)',
        this.schoolReportKey
      ).text
    },
    overallTier() {
      const val = this.$store.getters['schools/getFieldBySchoolReportKey'](
        '% Metrics At Target (Current)',
        this.schoolReportKey
      ).number
      if (Math.round(val * 100) > 80) {
        return 'High'
      } else if (Math.round(val * 100) >= 50) {
        return 'Medium'
      } else if (val >= 0) {
        return 'Low'
      } else {
        return 'N/A'
      }
    },

    overallCountAtAboveTarget() {
      return this.$store.getters['schools/getFieldBySchoolReportKey'](
        '# Metrics At Target (Current)',
        this.schoolReportKey
      ).text
    },

    overallCountEligible() {
      return this.$store.getters['schools/getFieldBySchoolReportKey'](
        '# Metrics Eligible (Current)',
        this.schoolReportKey
      ).text
    },

    overallPctImproving() {
      return this.$store.getters['schools/getFieldBySchoolReportKey'](
        '% Metrics Improving (Current)',
        this.schoolReportKey
      ).text
    },
    overallImprovingText() {
      const val = this.$store.getters['schools/getFieldBySchoolReportKey'](
        '% Metrics Improving (Current)',
        this.schoolReportKey
      ).number
      if (Math.round(val * 100) > 50) {
        return '+ Improving'
      } else {
        return ''
      }
    },
    overallCountImproving() {
      return this.$store.getters['schools/getFieldBySchoolReportKey'](
        '# Metrics Improving (Current)',
        this.schoolReportKey
      ).text
    },
    overallCountEligibleImproving() {
      return this.$store.getters['schools/getFieldBySchoolReportKey'](
        '# Metrics Improving Eligible (Current)',
        this.schoolReportKey
      ).text
    },

    overallPctImprovingEquity() {
      return this.$store.getters['schools/getFieldBySchoolReportKey'](
        '% Equity Metrics Improving (Current)',
        this.schoolReportKey
      ).text
    },
    overallEquitableText() {
      const val = this.$store.getters['schools/getFieldBySchoolReportKey'](
        '% Equity Metrics Improving (Current)',
        this.schoolReportKey
      ).number
      if (val > 0.5) {
        return '+ Equitable'
      } else {
        return ''
      }
    },
    overallCountImprovingEquity() {
      return this.$store.getters['schools/getFieldBySchoolReportKey'](
        '# Equity Metrics Improving (Current)',
        this.schoolReportKey
      ).text
    },
    overallCountEligibleImprovingEquity() {
      return this.$store.getters['schools/getFieldBySchoolReportKey'](
        '# Equity Metrics Eligible (Current)',
        this.schoolReportKey
      ).text
    },

    /**
     * The studentGroups are the list of suffixes and label assicated with student groups that are part of the equity breakouts.
     * For example black is used to append KEYSTONE_PROF (i.e., KEYSTONE_PROF_black) to find the % of Black students proficient.
     */
    studentGroups() {
      return [
        { key: 'BLACK', label: 'Black/African American' },
        { key: 'HISP', label: 'Hispanic/Latino' },
        { key: 'WHITE', label: 'White' },
        { key: 'ASIAN', label: 'Asian' },
        { key: 'MULTI', label: 'Multi Racial/Other' },
        { key: 'AIAN', label: 'American Indian/Alaskan Native' },
        { key: 'NHPI', label: 'Pacific Islander' },
        { key: 'ECDIS', label: 'Economically Disadvantaged' },
        { key: 'SPED', label: 'Special Education' },
        { key: 'EL', label: 'English Learner' },
      ]
    },
    coverBulletMetrics() {
      return [
        {
          id: 'PSSA_ELA_PROF',
          label: 'PSSA ELA: % of Students Proficient or Advanced, Grades 3-8',
          bulletChartId: 'VdzxMm',
        },
        {
          id: 'PSSA_ELA_PROF_GRADE3',
          label: 'PSSA ELA: % of Students Proficient or Advanced, Grade 3',
          bulletChartId: 'StEhCqp',
        },
        {
          id: 'PSSA_MATH_PROF',
          label: 'PSSA Math: % of Students Proficient or Advanced, Grades 3-8',
          bulletChartId: 'ZTfBeS',
        },
      ]
    },
    coverGuardrails() {
      return [
        {
          title: 'Guardrail 1: Welcoming & Supportive Schools',
          metrics: [
            {
              id: 'CLIMATE_SCORE',
              label: 'School Climate Score',
            },
            {
              id: 'INSTRUCTION_SCORE',
              label: 'School Instruction Score',
            },
            {
              id: 'LEAD_SAFE',
              isBoolean: true,
              label: 'Lead Safe',
            },
            {
              id: 'ASBESTOS_SAFE',
              isBoolean: true,
              label: 'Asbestos Safe',
            },
            {
              id: 'FTE_BEHAVIORALSUPPORTS_SUFFICIENT_YN',
              isBoolean: true,
              label: 'At Least 2 Behavioral/Mental Supports Per 500 Students',
            },
          ],
        },
        {
          title: 'Guardrail 2: Enriching & Well-Rounded School Experiences',
          metrics: [
            {
              id: 'ARTS_PARTICIPATION',
              label: '% of Students Enrolled in Visual/Performing Arts',
            },
          ],
        },
        {
          title: 'Guardrail 3: Partnering with Parents & Family Members',
          metrics: [
            {
              id: 'RELATIONSHIP_SCORE',
              label: 'School Relationship Score',
            },
            {
              id: 'SAC_MEETS_REGULARLY_YN',
              isBoolean: true,
              label: 'SAC Meets at Least 3 Times Per Year',
            },
          ],
        },
        {
          title: 'Guardrail 4: Addressing Racist Practices',
          metrics: [
            {
              id: 'SPECIAL_ADMIT_QUAL',
              label:
                '% of Black/African American and Hispanic/Latinx Students Qualified to Attend Special Admission High Schools',
            },
            {
              id: 'SUSPENSIONS_MINORITY',
              label:
                '% of Suspensions Received by Black/African American Students',
            },
          ],
        },
      ]
    },
    /**
     * The domain facts list the goals (split into pages) associated with each domain and provides the information
     * needed to display associated metrics and visualizations
     */
    domainFacts() {
      const ela = {
        key: 'ela',
        label: 'Reading/ELA',
        title: 'Reading/ELA: Every student reads on or above grade level',
        pages: [
          {
            goals: [
              {
                title:
                  'Goal 1: The percentage of students in grades 3-8 who are proficient on the state ELA assessment will grow from 35.7% in August 2019 to 65.0% by August 2026.',
                metrics: [
                  {
                    id: 'PSSA_ELA_PROF',
                    bulletChartId: 'CWDMjn',
                  },
                  {
                    id: 'PSSA_ELA_AGI',
                    bulletChartId: 'ynu',
                  },
                  {
                    id: 'WITHIN_ELA_MET_38',
                  },
                  {
                    id: 'WITHIN_ELA_PARTICIPATION_38',
                  },
                ],
              },
            ],
          },
          {
            goals: [
              {
                title:
                  'Goal 2: The percentage of 3rd grade students who are proficient on the state ELA assessment will grow from 32.5% in August 2019 to 62.0% by August 2026.',
                metrics: [
                  {
                    id: 'PSSA_ELA_PROF_GRADE3',
                    bulletChartId: 'BRwxpma',
                  },
                  {
                    id: 'WITHIN_ELA_MET_K3',
                  },
                  {
                    id: 'WITHIN_ELA_PARTICIPATION_K3',
                  },
                ],
              },
              {
                title: 'Other Key Indicators',
                metrics: [
                  {
                    id: 'GROWTH_MET_EL',
                    submetrics: [
                      {
                        id: 'GROWTH_MET_EL_5099',
                      },
                      {
                        id: 'GROWTH_MET_EL_049',
                      },
                      {
                        id: 'GROWTH_MET_EL_LT0',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }
      const math = {
        key: 'math',
        label: 'Math/Science',
        title: 'Math: Every student performs on or above grade level in math',
        pages: [
          {
            goals: [
              {
                title:
                  'Goal 3: The percentage of students in grades 3-8 who are proficient on the state Math assessment will grow from 21.5% in August 2019 to 52.0% by August 2026.',
                metrics: [
                  {
                    id: 'PSSA_MATH_PROF',
                    bulletChartId: '197a4edd-23f5-4114-ba97-09fa6356725e',
                  },
                  {
                    id: 'PSSA_MATH_AGI',
                    bulletChartId: 'f537d760-30e8-4a9d-818b-cc02026d3f8e',
                  },
                  {
                    id: this.isHS
                      ? 'WITHIN_MATH_MET_911'
                      : 'WITHIN_MATH_MET_38',
                  },
                  {
                    id: this.isHS
                      ? 'WITHIN_MATH_PARTICIPATION_911'
                      : 'WITHIN_MATH_PARTICIPATION_38',
                  },
                ],
              },
              {
                title: 'Other Key Indicators',
                grouped: true,
                metrics: [
                  {
                    id: 'PSSA_SCI_PROF',
                  },
                  {
                    id: 'PSSA_SCIENCE_AGI_GRADE4',
                  },
                  {
                    id: 'PSSA_SCIENCE_AGI_GRADE8',
                  },
                ],
              },
            ],
          },
        ],
      }
      const climate = {
        key: 'climate',
        label: 'Climate, Culture, & Opportunity',
        title: 'Climate, Culture, & Opportunity',
        pages: [
          {
            goals: [
              {
                title: 'Guardrail 1: Welcoming and Supportive Schools',
                metrics: [
                  {
                    id: 'CLIMATE_SCORE',
                    bulletChartId: '377c19df-f6c4-48db-b5bb-21801c9426b7',
                    submetrics: [
                      {
                        id: 'CLIMATE_RATING_STUDENT',
                      },
                      {
                        id: 'CLIMATE_RATING_PARENT',
                      },
                      {
                        id: 'CLIMATE_RATING_TEACHER',
                      },
                    ],
                  },

                  {
                    id: 'INSTRUCTION_SCORE',
                    bulletChartId: 'eJaHqv',
                    submetrics: [
                      {
                        id: 'INSTRUCTION_RATING_STUDENT',
                      },
                      {
                        id: 'INSTRUCTION_RATING_PARENT',
                      },
                      {
                        id: 'INSTRUCTION_RATING_TEACHER',
                      },
                    ],
                  },
                ],
              },
              {
                metrics: [
                  {
                    id: 'LEAD_SAFE',
                  },
                  {
                    id: 'ASBESTOS_SAFE',
                  },
                  {
                    id: 'FTE_BEHAVIORALSUPPORTS_SUFFICIENT_YN',
                    submetrics: [
                      {
                        id: 'ENR_OCT1',
                      },
                      {
                        id: 'FTE_BEHAVIORALSUPPORTS_NUMBER',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            goals: [
              {
                title:
                  'Guardrail 2: Enriching & Well-Rounded School Experiences',
                metrics: [
                  {
                    id: 'ARTS_PARTICIPATION',
                  },
                ],
              },
              {
                title:
                  'Guardrail 3: Partnering with Parents and Family Members',
                metrics: [
                  {
                    id: 'RELATIONSHIP_SCORE',
                    bulletChartId: 'pewShg',
                  },
                  {
                    id: 'SAC_MEETS_REGULARLY_YN',
                    submetrics: [
                      {
                        id: 'SAC_EXISTS',
                      },
                      {
                        id: 'SAC_MEETING',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            goals: [
              {
                title: 'Guardrail 4: Addressing Racist Practices',
                metrics: [
                  {
                    skip: this.isHS,
                    id: 'SPECIAL_ADMIT_QUAL',
                    parallel_metrics: [], // use this to hide yoy, distance, tier_label
                  },
                ],
              },
              {
                metrics: [
                  {
                    id: 'ENR',
                    parallel_metrics: [
                      {
                        id: 'SUSPENSIONS',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }
      const cc = {
        key: 'cc',
        label: 'College & Career',
        title: 'College & Career',
        pages: [
          {
            goals: [
              {
                title:
                  'Goal 4: The percentage of students who are proficient on all three state high school assessments (Algebra, Literature, and Biology) by the end of their 11th grade year will grow from 22.2% in August 2019 to 52.0% by August 2026.',
                metrics: [
                  {
                    id: 'KEYSTONE_PROF',
                    bulletChartId: 'YuaPhz',
                  },
                  {
                    id: 'KEYSTONE_ALG_AGI',
                    bulletChartId: 'NgMmy',
                  },
                  {
                    id: 'KEYSTONE_BIO_AGI',
                    bulletChartId: 'TtPaxh',
                  },
                  {
                    id: 'KEYSTONE_ELA_AGI',
                    bulletChartId: 'UfFgU',
                  },
                  {
                    id: 'WITHIN_ELA_MET_911',
                  },
                  {
                    id: 'WITHIN_ELA_PARTICIPATION_911',
                  },
                  {
                    id: this.isHS
                      ? 'WITHIN_MATH_MET_911'
                      : 'WITHIN_MATH_MET_38',
                  },
                  {
                    id: this.isHS
                      ? 'WITHIN_MATH_PARTICIPATION_911'
                      : 'WITHIN_MATH_PARTICIPATION_38',
                  },
                ],
              },
            ],
          },
          {
            goals: [
              {
                title:
                  'Goal 5: The percentage of Career and Technical Education (CTE) students who pass an industry standards-based competency assessment by the end of their 12th grade year will grow from 49.9% in August 2019 to 80.0% in August 2026.',
                metrics: [
                  {
                    id: 'NOCTI_MET',
                    bulletChartId: 'JdZgC',
                    submetrics: [
                      {
                        id: 'CTE_COURSEWORK_LEVEL2_PASSING',
                      },
                      {
                        id: 'CTE_COURSEWORK_LEVEL1_PASSING',
                      },
                    ],
                  },
                  {
                    id: 'APIB_PASSING',
                    submetrics: [
                      {
                        id: 'APIB_PARTICIPATION',
                      },
                      {
                        id: 'APIB_NOTPARTICIPATING',
                      },
                    ],
                  },
                ],
              },
              {
                title: 'Other Key Indicators',
                metrics: [
                  {
                    id: 'GROWTH_MET_EL',
                    submetrics: [
                      {
                        id: 'GROWTH_MET_EL_5099',
                      },
                      {
                        id: 'GROWTH_MET_EL_049',
                      },
                      {
                        id: 'GROWTH_MET_EL_LT0',
                      },
                    ],
                  },
                  {
                    id: 'ON_TRACK',
                  },
                  {
                    id: 'FAFSA',
                  },
                  {
                    id: 'GRAD_COHORT4',
                  },
                  {
                    id: 'FFM',
                  },
                ],
              },
            ],
          },
        ],
      }
      if (this.isHS) {
        return [cc, climate]
      } else {
        return [ela, math, climate]
      }
    },
  },
  async created() {
    await this.loadSessionObject()
  },
  methods: {
    async loadSessionObject() {
      // make selection in qlik app then load values
      await this.$qlik.selectFieldValues('SchoolReportKey', [
        { text: this.schoolReportKey },
      ])

      this.schoolReportSessionObject = await this.$qlik.generateHypercubeObjectFromDef(
        schoolReportMetricDef(this.schoolReportKey)
      )

      this.schoolReportSessionObject.addListener('changed', this.update)
      this.update()
    },
    async update() {
      if (this.schoolReportSessionObject) {
        this.schoolReportValues = await this.$qlik.getValuesFromHypercubeObject(
          this.schoolReportSessionObject
        )
        this.debugMetric('SUSPENSIONS_BLACK')
      }
    },

    handleReportChange({ value }) {
      this.schoolReportKey = value
      this.schoolReportSessionObject.removeListener('changed', this.update)
      this.loadSessionObject()
    },

    /// utilities
    formatChange(value) {
      return value > 0
        ? `+${Math.abs(value)}`
        : value < 0
        ? `-${Math.abs(value)}`
        : value
    },

    /// for getting values from the session objects matrices
    getGroups(metric) {
      if (metric?.id) {
        if (this.hasSubgroups(metric.id) === 1) {
          return [
            {
              key: 'all',
              label: 'All Students',
            },
          ].concat(this.studentGroups)
        } else if (metric.submetrics?.length > 0) {
          return [
            {
              key: 'all',
              label: this.metricLabel(metric.id),
            },
          ].concat(
            metric.submetrics.map(({ id }) => ({
              key: id,
              label: this.metricLabel(id),
            }))
          )
        } else {
          return [{ key: metric.id, label: this.metricLabel(metric.id) }]
        }
        // metric.parallel_metrics?.length > 0
        //           ? 'All Students'
        //           : this.metricLabel(metric.id),
      }
    },
    getMetricIdByGroup(metric, group, parallelMetricIndex) {
      // if (parallelMetricIndex === 0) debugger
      const metricId = isFinite(parallelMetricIndex)
        ? parallelMetricIndex + 1 >= metric.parallel_metrics?.length
          ? metric.parallel_metrics[parallelMetricIndex].id
          : ''
        : metric.id
      if (metricId && group?.key) {
        if (this.hasSubgroups(metricId) === 1) {
          return group.key === 'all' ? metricId : `${metricId}_${group.key}`
        } else if (metric.submetrics?.length > 0) {
          return group.key === 'all' ? metricId : group.key
        } else {
          return metricId
        }
      }
    },

    /**
     * used to gather the index of the particular index for a metric, used for gathering parallel metrics
     */
    metricIndex(metricId) {
      if (this.schoolReportValues?.metric?.length > 0) {
        const index = this.schoolReportValues.metric
          .map((obj, index) => ({
            ...obj,
            index,
          }))
          .filter(({ text }) => metricId === text)
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
    // will write to console all values for metric
    debugMetric(metricId) {
      const index = this.metricIndex(metricId)
      console.log('debug', metricId, index)
      if (index >= 0) {
        const obj = {}
        Object.keys(this.schoolReportValues).forEach((key) => {
          obj[key] = this.schoolReportValues[key][index].text
        })
        console.log(obj)
        return obj
      } else {
        return null
      }
    },
    metricLabel(metricId) {
      const index = this.metricIndex(metricId)
      return index >= 0
        ? this.schoolReportValues.metricLabel[index]?.text
        : metricId
    },
    isInformational(metricId) {
      const index = this.metricIndex(metricId)
      return index >= 0
        ? this.schoolReportValues.informational[index].number || 0
        : 0
    },
    isBinary(metricId) {
      const index = this.metricIndex(metricId)
      return index >= 0 ? this.schoolReportValues.binary[index].number || 0 : 0
    },
    hasSubgroups(metricId) {
      const index = this.metricIndex(metricId)
      return index >= 0
        ? this.schoolReportValues.hasSubgroups[index].number || 0
        : 0
    },
    approaching(metricId, textOrNumber) {
      const index = this.metricIndex(metricId)
      return index >= 0
        ? this.schoolReportValues.approaching[index][textOrNumber || 'text']
        : ''
    },
    tier(metricId, textOrNumber) {
      const index = this.metricIndex(metricId)
      return index >= 0
        ? this.schoolReportValues.tier[index][textOrNumber || 'text']
        : ''
    },
    atTarget(metricId, textOrNumber) {
      const index = this.metricIndex(metricId)
      return index >= 0
        ? this.schoolReportValues.atTarget[index][textOrNumber || 'text']
        : ''
    },
    aboveTarget(metricId, textOrNumber) {
      const index = this.metricIndex(metricId)
      return index >= 0
        ? this.schoolReportValues.aboveTarget[index][textOrNumber || 'text']
        : ''
    },
    score(metricId, textOrNumber) {
      const index = this.metricIndex(metricId)
      return index >= 0
        ? this.schoolReportValues.score[index][textOrNumber || 'text']
        : '-'
    },
    yoy(metricId, textOrNumber) {
      const index = this.metricIndex(metricId)
      return index >= 0
        ? this.schoolReportValues.yoy[index][textOrNumber || 'text']
        : '-'
    },
    distance(metricId, textOrNumber) {
      const index = this.metricIndex(metricId)
      return index >= 0
        ? this.schoolReportValues.distance[index][textOrNumber || 'text']
        : '-'
    },
    trend(metricId, textOrNumber) {
      const index = this.metricIndex(metricId)
      return index >= 0
        ? this.schoolReportValues.trend[index][textOrNumber || 'text']
        : '-'
    },
  },
}
</script>
<style lang="postcss" scoped>
/*
  Generally applying BEM approach, which keeps things modular and flat.
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

canvas[data-key='bar-axis'] {
  width: 12rem;
}

.color-low {
  color: #c0504d;
}
.color-medium {
  color: #00b050;
}
.color-high {
  color: #0070c0;
}

.color-tier-1 {
  color: #c0504d;
  font-weight: bold;
}
.color-tier-2 {
  color: #f79646;
  font-weight: bold;
}
.color-tier-3 {
  color: #00b050;
  font-weight: bold;
}
.color-tier-4 {
  color: #0070c0;
  font-weight: bold;
}

.report {
  width: 7.5in;
}

.page {
  margin-top: 0.5in;
  margin-bottom: 0.5in;
  min-height: 10in;
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
.b-hr--heavy {
  height: 2px;
  border-top: 2px solid black;
}
.b-hr--light {
  border-top: 0.5px solid #aaaaaa;
}
.b-hr--indent {
  margin-left: 4rem;
  margin-right: 1rem;
  width: calc(100% - 5rem);
}

.b-header {
  padding-left: 5pt;
  padding-right: 5pt;
  background-color: black;
  color: white;
  font-size: 16pt;
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
  width: 8rem;
  color: #888888;
}
.b-schoolinfo__value {
  margin-left: 2rem;
  margin-right: 2pt;
  color: black;
}

/* metrics on the cover page 
b-overall - is the overall rating and related metrics
b-rollup - is data rolled up to the overall or domain level
b-cmetric-table is simple grouped values in a table
b-cmetric is a metric row with the bulletchart
*/
.b-overall {
  color: black;
  font-size: 12pt;
}
.b-overall__title {
  font-size: 12pt;
  font-weight: bold;
  width: 16rem;
}
.b-overall__title--tier {
  font-size: 16pt;
  font-weight: bold;
}
.b-overall__row-label {
  font-size: 12pt;
  width: 16rem;
}
.b-overall__value {
  font-size: 14pt;
}
.b-overall__value--numeric {
  font-weight: bold;
}

.b-rollup {
  color: black;
  font-size: 10pt;
}
.b-rollup__title {
  font-size: 12pt;
  font-weight: bold;
  color: black;
}
.b-rollup__row-label {
  font-size: 12pt;
  font-weight: bold;
}

.b-cmetric-title {
  font-size: 12pt;
  font-weight: bold;
  color: black;
}
.b-cmetric-subtitle {
  font-size: 9.5pt;
  font-style: italic;
  color: black;
}
.b-cmetric {
  color: black;
}
.b-cmetric__label {
  width: 100%;
  font-size: 12pt;
  padding-right: 2pt;
  padding-top: 2px;
  font-weight: bold;
}
.b-cmetric__value {
  text-align: center;
  font-size: 11pt;
  padding-right: 2pt;
  padding-top: 2px;
}
.b-cmetric__value--highlight {
  font-weight: bold;
}

/* simple display and guardrail table */
.b-cmetric-table {
  color: black;
  font-size: 10pt;
}
.b-cmetric-table__title {
  font-size: 12pt;
  font-weight: bold;
}
.b-cmetric-table__subtitle {
  font-size: 9.5pt;
  font-style: italic;
}
.b-cmetric-table__header {
  text-align: center;
}

.b-cmetric-table__row-label {
  /* width: 24rem; */
  margin-right: 1rem;
  font-size: 11pt;
  padding-right: 2pt;
  padding-top: 2px;
}
.b-cmetric-table__row-label--highlight {
  font-weight: bold;
}
.b-cmetric-table__row-label--grouped {
  font-weight: normal;
  padding-left: 2rem;
}
.b-cmetric-table__value {
  text-align: center;
  font-size: 11pt;
  padding-right: 2pt;
  padding-top: 2px;
}
.b-cmetric-table__value--icon {
  max-height: 22px;
}

/* the following are for metrics - not on the cover sheet */
.b-goal-title {
  font-size: 12pt;
  font-weight: bold;
  font-style: italic;
}

.b-metric-title {
  text-align: center;
  color: black;
  font-size: 14pt;
  font-weight: bold;
}
.b-metric-targets {
  margin-left: 2rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border: gray solid 1px;
}
.b-metric-targets__label {
  font-size: 11pt;
  margin-right: 0.5rem;
}
.b-metric-targets__value {
  font-size: 11pt;
  font-weight: bold;
}
.b-metric-bullet {
  display: flex;
  justify-content: center;
  align-items: center;
}

.b-metric-table {
  background-color: #e8e8e8;
  padding-bottom: 0.25rem;
  color: black;
}

.b-metric-table__header {
  font-size: 10pt;
  padding-right: 2pt;
  padding-top: 2px;
  font-weight: bold;
  text-align: center;
}

.b-metric-table__row-label {
  font-size: 10pt;
  padding-left: 1rem;
  border-top: white solid 1px;
}
.b-metric-table__row-label--highlight {
  font-weight: bold;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.b-metric-table__value {
  text-align: center;
  font-size: 11pt;
  padding-right: 2pt;
  padding-top: 2px;
  border-top: white solid 1px;
}

.b-metric-table__value--highlight {
  font-weight: bold;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.b-metric-table__value--tier {
  font-weight: bold;
}

.b-metric-hr {
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-top: 0.5px solid #aaaaaa;
}

/* for Secondary metrics (those without a bullet chart and targets) */
.b-smetric-table {
  color: black;
}
.b-smetric-table__header-label {
  width: 15rem;
}
.b-smetric-table__header-value {
}
.b-smetric-table__row-label {
  width: 15rem;
  padding-right: 0.5rem;
  padding-bottom: 0.5rem;
  border-top: #cccccc solid 0.5px;
}
.b-smetric-table__row-label--grouped {
  padding-left: 2rem;
  color: #666666;
}
.b-smetric-table__value {
  text-align: center;
  border-top: #cccccc solid 0.5px;
}
</style>
