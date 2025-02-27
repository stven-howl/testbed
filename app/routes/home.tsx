import { Link, useLoaderData, useNavigate } from "react-router";
import type { Route } from "./+types/home";
import { YAxis, Line, XAxis, LineChart, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, type ChartConfig } from "~/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ScrollBar } from "~/components/ui/scroll-area";
import { ScrollArea } from "~/components/ui/scroll-area";
import ArticlesSubjects from "~/components/common/articles_subjects";
import { Switch } from "~/components/ui/switch";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Academia" },
    { name: "description", content: "Academia" },
  ];
}
export { loader } from "~/components/layer0/layer0_loader";

const chartConfig = {
  x: {
    label: "Year",
    color: "bg-muted focus:bg-primary/80"
  },
  y: {
    label: "Ratio",
    color: "bg-muted focus:bg-primary/80"
  }
} satisfies ChartConfig;

const chartData = [
  {
    year: 2016,
    'General Economics and Teaching': 0.0198412698412698,
    'History of Economic Thought, Methodology, and Heterodox Approaches': 0,
    'Mathematical and Quantitative Methods': 0.0992063492063492,
    Microeconomics: 0.472222222222222,
    'Macroeconomics and Monetary Economics': 0.242063492063492,
    'International Economics': 0.0992063492063492,
    'Financial Economics': 0.186507936507937,
    'Public Economics': 0.174603174603175,
    'Health, Education, and Welfare': 0.265873015873016,
    'Labor and Demographic Economics': 0.277777777777778,
    'Law and Economics': 0.0555555555555556,
    'Industrial Organization': 0.170634920634921,
    'Business Administration and Business Economics - Marketing - Accounting - Personnel Economics': 0.0436507936507936,
    'Economic History': 0.0674603174603175,
    'Economic Development, Innovation, Technological Change, and Growth': 0.170634920634921,
    'Political Economy and Comparative Economic Systems': 0.0198412698412698,
    'Agricultural and Natural Resource Economics - Environmental and Ecological Economics': 0.0753968253968254,
    'Urban, Rural, Regional, Real Estate, and Transportation Economics': 0.111111111111111,
    'Miscellaneous Categories': 0,
    'Other Special Topics': 0.0555555555555556
  },
  {
    year: 2017,
    'General Economics and Teaching': 0.0642570281124498,
    'History of Economic Thought, Methodology, and Heterodox Approaches': 0,
    'Mathematical and Quantitative Methods': 0.156626506024096,
    Microeconomics: 0.51004016064257,
    'Macroeconomics and Monetary Economics': 0.196787148594378,
    'International Economics': 0.072289156626506,
    'Financial Economics': 0.160642570281124,
    'Public Economics': 0.1285140562249,
    'Health, Education, and Welfare': 0.236947791164659,
    'Labor and Demographic Economics': 0.393574297188755,
    'Law and Economics': 0.0602409638554217,
    'Industrial Organization': 0.180722891566265,
    'Business Administration and Business Economics - Marketing - Accounting - Personnel Economics': 0.0642570281124498,
    'Economic History': 0.0321285140562249,
    'Economic Development, Innovation, Technological Change, and Growth': 0.21285140562249,
    'Political Economy and Comparative Economic Systems': 0.0281124497991968,
    'Agricultural and Natural Resource Economics - Environmental and Ecological Economics': 0.0481927710843374,
    'Urban, Rural, Regional, Real Estate, and Transportation Economics': 0.0441767068273092,
    'Miscellaneous Categories': 0,
    'Other Special Topics': 0.0522088353413655
  },
  {
    year: 2018,
    'General Economics and Teaching': 0.0265486725663717,
    'History of Economic Thought, Methodology, and Heterodox Approaches': 0,
    'Mathematical and Quantitative Methods': 0.132743362831858,
    Microeconomics: 0.548672566371681,
    'Macroeconomics and Monetary Economics': 0.283185840707965,
    'International Economics': 0.141592920353982,
    'Financial Economics': 0.212389380530973,
    'Public Economics': 0.185840707964602,
    'Health, Education, and Welfare': 0.20353982300885,
    'Labor and Demographic Economics': 0.380530973451327,
    'Law and Economics': 0.0265486725663717,
    'Industrial Organization': 0.212389380530973,
    'Business Administration and Business Economics - Marketing - Accounting - Personnel Economics': 0.0707964601769911,
    'Economic History': 0.0619469026548673,
    'Economic Development, Innovation, Technological Change, and Growth': 0.238938053097345,
    'Political Economy and Comparative Economic Systems': 0.0265486725663717,
    'Agricultural and Natural Resource Economics - Environmental and Ecological Economics': 0.0442477876106195,
    'Urban, Rural, Regional, Real Estate, and Transportation Economics': 0.115044247787611,
    'Miscellaneous Categories': 0,
    'Other Special Topics': 0.0530973451327434
  },
  {
    year: 2019,
    'General Economics and Teaching': 0,
    'History of Economic Thought, Methodology, and Heterodox Approaches': 0,
    'Mathematical and Quantitative Methods': 0.181102362204724,
    Microeconomics: 0.559055118110236,
    'Macroeconomics and Monetary Economics': 0.275590551181102,
    'International Economics': 0.149606299212598,
    'Financial Economics': 0.188976377952756,
    'Public Economics': 0.196850393700787,
    'Health, Education, and Welfare': 0.204724409448819,
    'Labor and Demographic Economics': 0.236220472440945,
    'Law and Economics': 0.031496062992126,
    'Industrial Organization': 0.291338582677165,
    'Business Administration and Business Economics - Marketing - Accounting - Personnel Economics': 0.078740157480315,
    'Economic History': 0.0393700787401575,
    'Economic Development, Innovation, Technological Change, and Growth': 0.188976377952756,
    'Political Economy and Comparative Economic Systems': 0.031496062992126,
    'Agricultural and Natural Resource Economics - Environmental and Ecological Economics': 0.0866141732283465,
    'Urban, Rural, Regional, Real Estate, and Transportation Economics': 0.094488188976378,
    'Miscellaneous Categories': 0,
    'Other Special Topics': 0.047244094488189
  },
  {
    year: 2020,
    'General Economics and Teaching': 0.00847457627118644,
    'History of Economic Thought, Methodology, and Heterodox Approaches': 0.0254237288135593,
    'Mathematical and Quantitative Methods': 0.245762711864407,
    Microeconomics: 0.576271186440678,
    'Macroeconomics and Monetary Economics': 0.23728813559322,
    'International Economics': 0.0847457627118644,
    'Financial Economics': 0.194915254237288,
    'Public Economics': 0.144067796610169,
    'Health, Education, and Welfare': 0.194915254237288,
    'Labor and Demographic Economics': 0.203389830508475,
    'Law and Economics': 0.0338983050847458,
    'Industrial Organization': 0.194915254237288,
    'Business Administration and Business Economics - Marketing - Accounting - Personnel Economics': 0.0338983050847458,
    'Economic History': 0.0508474576271186,
    'Economic Development, Innovation, Technological Change, and Growth': 0.220338983050847,
    'Political Economy and Comparative Economic Systems': 0.0338983050847458,
    'Agricultural and Natural Resource Economics - Environmental and Ecological Economics': 0.101694915254237,
    'Urban, Rural, Regional, Real Estate, and Transportation Economics': 0.161016949152542,
    'Miscellaneous Categories': 0,
    'Other Special Topics': 0.0932203389830508
  },
  {
    year: 2021,
    'General Economics and Teaching': 0,
    'History of Economic Thought, Methodology, and Heterodox Approaches': 0,
    'Mathematical and Quantitative Methods': 0.21551724137931,
    Microeconomics: 0.603448275862069,
    'Macroeconomics and Monetary Economics': 0.181034482758621,
    'International Economics': 0.0517241379310345,
    'Financial Economics': 0.275862068965517,
    'Public Economics': 0.21551724137931,
    'Health, Education, and Welfare': 0.232758620689655,
    'Labor and Demographic Economics': 0.301724137931034,
    'Law and Economics': 0.0775862068965517,
    'Industrial Organization': 0.155172413793103,
    'Business Administration and Business Economics - Marketing - Accounting - Personnel Economics': 0.0517241379310345,
    'Economic History': 0.0517241379310345,
    'Economic Development, Innovation, Technological Change, and Growth': 0.21551724137931,
    'Political Economy and Comparative Economic Systems': 0.00862068965517241,
    'Agricultural and Natural Resource Economics - Environmental and Ecological Economics': 0.0689655172413793,
    'Urban, Rural, Regional, Real Estate, and Transportation Economics': 0.103448275862069,
    'Miscellaneous Categories': 0.00862068965517241,
    'Other Special Topics': 0.0689655172413793
  },
  {
    year: 2022,
    'General Economics and Teaching': 0.0173913043478261,
    'History of Economic Thought, Methodology, and Heterodox Approaches': 0.00869565217391304,
    'Mathematical and Quantitative Methods': 0.234782608695652,
    Microeconomics: 0.643478260869565,
    'Macroeconomics and Monetary Economics': 0.182608695652174,
    'International Economics': 0.0434782608695652,
    'Financial Economics': 0.226086956521739,
    'Public Economics': 0.208695652173913,
    'Health, Education, and Welfare': 0.208695652173913,
    'Labor and Demographic Economics': 0.295652173913043,
    'Law and Economics': 0.121739130434783,
    'Industrial Organization': 0.252173913043478,
    'Business Administration and Business Economics - Marketing - Accounting - Personnel Economics': 0.0521739130434783,
    'Economic History': 0.0521739130434783,
    'Economic Development, Innovation, Technological Change, and Growth': 0.252173913043478,
    'Political Economy and Comparative Economic Systems': 0.0260869565217391,
    'Agricultural and Natural Resource Economics - Environmental and Ecological Economics': 0.0869565217391304,
    'Urban, Rural, Regional, Real Estate, and Transportation Economics': 0.0782608695652174,
    'Miscellaneous Categories': 0,
    'Other Special Topics': 0.0260869565217391
  },
  {
    year: 2023,
    'General Economics and Teaching': 0.0210526315789474,
    'History of Economic Thought, Methodology, and Heterodox Approaches': 0,
    'Mathematical and Quantitative Methods': 0.157894736842105,
    Microeconomics: 0.578947368421053,
    'Macroeconomics and Monetary Economics': 0.2,
    'International Economics': 0.126315789473684,
    'Financial Economics': 0.231578947368421,
    'Public Economics': 0.242105263157895,
    'Health, Education, and Welfare': 0.221052631578947,
    'Labor and Demographic Economics': 0.231578947368421,
    'Law and Economics': 0.0631578947368421,
    'Industrial Organization': 0.221052631578947,
    'Business Administration and Business Economics - Marketing - Accounting - Personnel Economics': 0.0421052631578947,
    'Economic History': 0.115789473684211,
    'Economic Development, Innovation, Technological Change, and Growth': 0.189473684210526,
    'Political Economy and Comparative Economic Systems': 0.0842105263157895,
    'Agricultural and Natural Resource Economics - Environmental and Ecological Economics': 0.0421052631578947,
    'Urban, Rural, Regional, Real Estate, and Transportation Economics': 0.0631578947368421,
    'Miscellaneous Categories': 0,
    'Other Special Topics': 0.115789473684211
  },
  {
    year: 2024,
    'General Economics and Teaching': 0.00900900900900901,
    'History of Economic Thought, Methodology, and Heterodox Approaches': 0,
    'Mathematical and Quantitative Methods': 0.189189189189189,
    Microeconomics: 0.684684684684685,
    'Macroeconomics and Monetary Economics': 0.225225225225225,
    'International Economics': 0.0810810810810811,
    'Financial Economics': 0.252252252252252,
    'Public Economics': 0.216216216216216,
    'Health, Education, and Welfare': 0.234234234234234,
    'Labor and Demographic Economics': 0.306306306306306,
    'Law and Economics': 0.036036036036036,
    'Industrial Organization': 0.261261261261261,
    'Business Administration and Business Economics - Marketing - Accounting - Personnel Economics': 0.0810810810810811,
    'Economic History': 0.0810810810810811,
    'Economic Development, Innovation, Technological Change, and Growth': 0.315315315315315,
    'Political Economy and Comparative Economic Systems': 0.0720720720720721,
    'Agricultural and Natural Resource Economics - Environmental and Ecological Economics': 0.045045045045045,
    'Urban, Rural, Regional, Real Estate, and Transportation Economics': 0.0810810810810811,
    'Miscellaneous Categories': 0,
    'Other Special Topics': 0.036036036036036
  },
  {
    year: 2025,
    'General Economics and Teaching': 0,
    'History of Economic Thought, Methodology, and Heterodox Approaches': 0,
    'Mathematical and Quantitative Methods': 0.05,
    Microeconomics: 0.6,
    'Macroeconomics and Monetary Economics': 0.3,
    'International Economics': 0.05,
    'Financial Economics': 0.15,
    'Public Economics': 0.3,
    'Health, Education, and Welfare': 0.25,
    'Labor and Demographic Economics': 0.3,
    'Law and Economics': 0,
    'Industrial Organization': 0.3,
    'Business Administration and Business Economics - Marketing - Accounting - Personnel Economics': 0,
    'Economic History': 0,
    'Economic Development, Innovation, Technological Change, and Growth': 0.25,
    'Political Economy and Comparative Economic Systems': 0.1,
    'Agricultural and Natural Resource Economics - Environmental and Ecological Economics': 0.15,
    'Urban, Rural, Regional, Real Estate, and Transportation Economics': 0.05,
    'Miscellaneous Categories': 0,
    'Other Special Topics': 0.05
  }
]

const subjects = [
  'General Economics and Teaching',
  'History of Economic Thought, Methodology, and Heterodox Approaches',
  'Mathematical and Quantitative Methods',
  'Microeconomics',
  'Macroeconomics and Monetary Economics',
  'International Economics',
  'Financial Economics',
  'Public Economics',
  'Health, Education, and Welfare',
  'Labor and Demographic Economics',
  'Law and Economics',
  'Industrial Organization',
  'Business Administration and Business Economics - Marketing - Accounting - Personnel Economics',
  'Economic History',
  'Economic Development, Innovation, Technological Change, and Growth',
  'Political Economy and Comparative Economic Systems',
  'Agricultural and Natural Resource Economics - Environmental and Ecological Economics',
  'Urban, Rural, Regional, Real Estate, and Transportation Economics',
  'Miscellaneous Categories',
  'Other Special Topics',
]

const subjects_code = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'Y',
  'Z',
]


export default function Home() {
  const { articles, activeSubjects } = useLoaderData();
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-full">
      <div className="flex flex-col gap-4 w-[1400px] mx-auto items-start">
        <div className="grid grid-cols-3 gap-4 mb-6 h-[600px] p-4 pt-20 w-[1400px] mx-auto gap-4">
          <Card className="col-span-2 h-[600px]">
            <CardHeader>
              <CardTitle>Ratio of Articles</CardTitle>
              <p>from 2016 to 2025</p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <LineChart
                  accessibilityLayer={true}
                  data={chartData}
                >
                  {/* {subjects.map((subjectName: string, index: number) => {
                    if (activeSubjects.includes(subjects_code[index])) return null;
                    return (
                      <Line
                        key={`subject-line-${index}`}
                        type="monotone"
                        dataKey={subjectName}
                        stroke={`hsla(${index * 360 / subjects.length}, 70%, 50%, 0.2)`}
                        strokeWidth={2}
                      />
                    );
                  })} */}
                  {subjects.map((subjectName: string, index: number) => {
                    if (!activeSubjects.includes(subjects_code[index])) return null;
                    return (
                      <Line
                        key={`subject-line-active-${index}`}
                        type="monotone"
                        dataKey={subjectName}
                        stroke={`hsla(${index * 360 / subjects.length}, 70%, 50%, 1)`}
                        strokeWidth={3}
                        dot={true}
                      />
                    );
                  })}
                  <ChartTooltip />
                  <CartesianGrid />
                  <XAxis
                    dataKey="year"
                  />
                  <YAxis />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="h-[600px]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Subjects</CardTitle>
              <div className="flex items-center space-x-2">
                <Switch
                  id="select-all"
                  checked={subjects_code.length === activeSubjects.length}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      // 모든 subjects 선택
                      // setPreviousSubjects(activeSubjects)
                      navigate(`?activeSubjects=${subjects_code.join(',')}`);
                    } else {
                      // 이전 상태로 복귀
                      navigate(`?activeSubjects=`);
                    }
                  }}
                />
                <label htmlFor="select-all" className="text-sm">
                  Select All
                </label>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ScrollArea className="max-h-[500px] w-[400px]">
                <div className="flex flex-col gap-2 w-[400px]">
                  {subjects.map((subject: string, index: number) => {
                    const isActive = activeSubjects.includes(subjects_code[index]);
                    const newSet = new Set(activeSubjects) as Set<string>;
                    if (isActive) {
                      newSet.delete(subjects_code[index]);
                    } else {
                      newSet.add(subjects_code[index]);
                    }
                    const newActiveSubjects = Array.from(newSet);
                    const newActiveSubjectsforParam = newActiveSubjects.filter((subject: string) => subject.length === 1).join(',');

                    return (
                      <Link
                        key={subject}
                        to={`?activeSubjects=${newActiveSubjectsforParam}`}
                        className={`w-full relative h-9 p-2 border rounded-md ${isActive ? 'bg-primary/10' : 'bg-background hover:bg-secondary hover:text-secondary-foreground '
                          } items-center flex text-sm justify-between`}
                      >
                        <div className="flex items-center">
                          <div
                            className="w-4 h-9 rounded-md absolute left-0"
                            style={{ backgroundColor: `hsl(${index * 360 / subjects.length}, 70%, 50%)` }}
                          />
                          <span className="pl-6">{subject}</span>
                        </div>
                        <Link
                          to={`/layer1?upperSubjectCode=${subjects_code[index]}&upperSubjectName=${subject}`}
                          className="hover:bg-secondary-foreground/10 p-1 rounded"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </Link>
                      </Link>
                    );
                  })}
                </div>
                <ScrollBar forceMount={true} />
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <ArticlesSubjects activeSubjects={activeSubjects} subjects={subjects} subjects_code={subjects_code} initialArticles={articles} />

      </div>
    </div>
  );
}
